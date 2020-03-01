import React from 'react';
import WrapperCreateSubmenuSystem from '../Create/CreateSubmenuSystem';
import { Modal, Button } from 'antd';

class ModalCreateSub extends React.Component {
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
                <Button onClick={() => this.setState({isVisible: !isVisible})} type="dashed"> Create SubMenu </Button>
                <Modal 
                    title="Create Menu Item"
                    visible={ isVisible }
                    onOk={() => this.setState({isVisible: false})}
                    onCancel={() => this.setState({isVisible: false})}>
                        <WrapperCreateSubmenuSystem />
                </Modal>
            </React.Fragment>
        )
    }
}

export default ModalCreateSub;