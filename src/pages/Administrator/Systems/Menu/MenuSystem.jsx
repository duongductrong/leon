import React from 'react';
import { Tree, Icon, Row, Col, Form, Typography, Table, Modal, Button, Dropdown, Menu } from 'antd'
import { columns } from './Fetch/constants';
import TableMenu from './Fetch/TableMenu';
import TableSubmenu from './Fetch/TableSubmenu';
import TreeNavigation from './Fetch/TreeNavigation';
import ModalCreateMenu from './Fetch/ModalCreateMenu';
import ModalCreateSub from './Fetch/ModalCreateSub';

const { Title } = Typography;

const styleSheet = {
    background: "white",
    padding: "15px"
}

class FetchMenuPage extends React.Component {
    render() {
        const myOptions = (
            <Menu>
                <Menu.Item type="primary" > <TreeNavigation /> </Menu.Item>
                <Menu.Item type="primary" > <ModalCreateMenu /> </Menu.Item>
                <Menu.Item type="primary" > <ModalCreateSub /> </Menu.Item>
            </Menu>
        )
        return (
            <div style={styleSheet} className="menu-page">
                <Row className="menu-page__introduction">
                    <Col span={8} offset={8}>
                        <Title>Navigation management</Title>
                    </Col>
                    <Col span={8} offset={8}>
                        <Dropdown overlay={myOptions}>
                            <Button>
                                Options
                            </Button>
                        </Dropdown>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <TableMenu />
                    </Col>
                    <Col span={24}>
                        <TableSubmenu />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default FetchMenuPage;