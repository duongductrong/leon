import React from 'react';
import { Row, Col, Button, message, Upload, Popconfirm } from 'antd';
import { fetchImages, deleteImageAPI } from './Request';
import Axios from 'axios';

const propsUpload = {
    multiple: true,
    listType: "picture",
    className: "library-images__wrapper__header__upload__btn",
    action: `${process.env.REACT_APP_API_ENDPOINT}/api/uploads/multipleFiles`,
    headers: {
        Authorization: `Bearer ${window.localStorage.getItem("access_token")}`
    },
    method: "POST",
    showUploadList: true
}

class LibraryImages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            chooseItem: [],
            loading: false
        }
    }

    getImage = () => {
        let url = `${process.env.REACT_APP_API_ENDPOINT}/api/uploads/resources${window.location.search}`;
        
        this.setState({loading: true}, () => {
            fetchImages(url)
            .then(data => {
                //get data
                const { resources } = data;
                //add resource and loading to false
                this.setState({
                    dataSource: resources,
                    loading: false
                })
            })
            .catch(err => {
                //catch error to show
                this.setState({loading: false})
                message.error(err);
            })
        })
    }

    onDeleteImage = (public_id) => {
        this.setState({loading: true}, () => {
            deleteImageAPI(public_id)
            .then(data => {
                const { status, code, msgVi } = data;
                switch(status) {
                    case "error": 
                        this.setState({loading: false}, () => message.error(`${status} ${code}: ${msgVi}`))
                        break;
                    case "ok":
                        this.setState({loading: false} , () => {
                            this.getImage()
                            message.success(msgVi)
                        });
                        break;
                    default: this.setState({loading: false}, () => message.warn("Chưa được xử lý"));

                }
            })
            .catch(err => {
                this.setState({loading: false}, () => message.error(err))
            })
        })
    }

    onChoose = (url) => () => {
        const { chooseItem } = this.state; //Item choosed
        const { amountAdd } = this.props; //amount of add
        let exists; 
        exists = this.state.chooseItem.filter(e => e === url);
        //If url new add have a exists to remove else to add
        if(exists.length > 0) {
            this.setState({chooseItem: this.state.chooseItem.filter(e => e !== url)});
        }
        else if(amountAdd && chooseItem.length < amountAdd && exists.length <= 0) {
            this.setState({
                chooseItem: [...this.state.chooseItem, url]
            })
        }
        else {
            message.error('Do not add more than the specified amount')
        }
    }

    onUploaded = (progress) => {
        const { file } = progress;
        //file have three status: uploading, done, error
        
        if(file.status === "done") {
            const { response } = file;
            if(response.status === "error") {
                message.error(response.msgVi)
            }
            else if(response.status === "ok") {
                this.getImage();
                message.success(response.msgVi);
            }
        }
        else if(file.status === "error") {
            message.error(file.error.message);
        }
    }

    UNSAFE_componentWillMount() {
        this.getImage();
    }

    render() {
        const { dataSource, chooseItem, loading } = this.state;
        const { onAdd, onClose } = this.props; //Function to get image
        return (
            <div className="library-images">
                <div className="library-images__wrapper">
                    <div className="library-images__wrapper__header">
                        <h1>Let choose your image</h1>
                        <div className="library-images__wrapper__header__upload">
                            <Upload {...propsUpload} onChange={this.onUploaded}>
                                <Button icon="upload" type="dashed" disabled={loading}>Upload</Button>
                            </Upload>
                        </div>
                    </div>
                    <div className="library-images__wrapper__main">
                        {
                            dataSource && dataSource.map((e, i) => (
                                <div key={i} className={`library-images__wrapper__main__image`}>

                                    <img onClick={this.onChoose(e.secure_url)} src={e.secure_url} 
                                    className={`library-images__wrapper__main__image__child${chooseItem.indexOf(e.secure_url) !== -1 ? " library-images--choose" : ""}`} />
                                    
                                    <Popconfirm
                                    title="Are you sure delete this image ?"
                                    onConfirm={() => this.onDeleteImage(e.public_id)} >
                                        <Button className="library-images__wrapper__main__image__remove" size="small" shape="circle" icon="close" />
                                    </Popconfirm>
                                </div>
                            ))
                        }
                    </div>
                    <div className="library-images__wrapper__footer">
                        <div className="library-images__wrapper__footer__right">
                            <Button className="library-images__wrapper__footer__right__btn" type="secondary" onClick={onClose} disabled={loading}>Cancel</Button>
                            <Button className="library-images__wrapper__footer__right__btn" type="primary" onClick={onAdd(chooseItem)} disabled={loading}>Add {chooseItem.length} </Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

LibraryImages.defaultProps = {
    onAdd: function(arr) {}
}

export default LibraryImages;