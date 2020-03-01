import React from 'react';
import WrapperCreateMenuSystem from '../Create/CreateMenuSystem';
import { Modal, Button } from 'antd';

class ModalCreate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isVisible: false
        }
    }
    render() {
        const { isVisible } = this.state;
        return (
            <React.Fragment>
                <Button onClick={() => this.setState({isVisible: !isVisible})} type="dashed"> Create Menu </Button>
                <Modal 
                    title="Create Menu Item"
                    visible={ isVisible }
                    onOk={() => this.setState({isVisible: false})}
                    onCancel={() => this.setState({isVisible: false})}>
                        <WrapperCreateMenuSystem />
                </Modal>
            </React.Fragment>
        )
    }
}

export default ModalCreate;