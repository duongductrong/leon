import React from 'react';
import { Tree, Icon, Row, Col, Form, Typography, Table, Modal, Button, Dropdown, Menu, message } from 'antd'
import { FetchNavigationBuilt, FetchMenuItem, FetchSubmenu } from './request';
import WrapperCreateMenuSystem from '../Create/CreateMenuSystem';
import { columns } from './constants';

const { TreeNode } = Tree;
const { Title } = Typography;

const styleSheet = {
    background: "white",
    padding: "15px",
    height: "100%"
}

class FetchMenuPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            navigation: [],
            isVisible: false
        }
    }

    fetchNav = () => {
        FetchNavigationBuilt()
        .then(res => {
            const { data } = res;
            if(data["status"] !== "error" && data["status"] === "ok") {
                this.setState({
                    navigation: data["menu"]
                })
            }
            else {
                message.error(data["msgVi"]);
            }
        })
        .catch(err => {
            message.error(err);
        })
    }

    componentDidMount() {
        this.fetchNav();
    }

    render() {
        const { isVisible, navigation } = this.state;
        return (
            <React.Fragment>
                <Button onClick={() => this.setState({isVisible: true})} type="dashed"> Tree Navigation </Button>
                <Modal
                title="Tree navigation" 
                visible={ isVisible }
                onOk={() => this.setState({isVisible: false})}
                onCancel={() => this.setState({isVisible: false})}>
                    <Tree defaultExpandedKeys={["website"]} showLine={true} switcherIcon={<Icon type="ant-design" />}>
                        <TreeNode icon={<Icon type="ant-design" />} title="Website" key="website">
                            {
                                navigation && navigation.map((nav, i) => (
                                    <TreeNode icon={<Icon type="ant-design" />} title={nav.label} key={nav._id}>
                                        {
                                            nav["submenu"].length > 0 && nav["submenu"].map((submenu, i) => (
                                                <TreeNode icon={<Icon type="ant-design" />} title={submenu.label} key={submenu._id} />
                                            ))
                                        }
                                    </TreeNode>
                                ))
                            }
                        </TreeNode>
                        <TreeNode icon={<Icon type="ant-design" />} title="Administrator" key="1-0">
                        </TreeNode>
                    </Tree>
                </Modal>
            </React.Fragment>
        )
    }
}

export default FetchMenuPage;