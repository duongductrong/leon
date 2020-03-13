import React from 'react';
import { Layout, Menu, Input } from 'antd';
import { SiderMenu } from './constants';
import {
    AntDesignOutlined,
} from '@ant-design/icons'

//assets
import Logo from '../../../../../assets/images/impose-logo.png';
import { NavLink } from 'react-router-dom';

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;


const GroupMenu = [
    {
        id: "default",
        title: "Default"
    },
    {
        id: "blog",
        title: "Blog"
    },
    {
        id: "system",
        title: "System"
    }
]

const styleSheet = {
    logo: {
        padding: "10px", 
        background: "white",
        height: "64px"
    },
    sider: {
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
    },
    mainLayout: {
        marginLeft: "200px",
        height: "100vh",
        overflow: "auto"
    },
    mainLayoutCollapse: {
        marginLeft: "80px",
        height: "100vh",
        overflow: "auto"
    },
    content: {
        padding: "15px"
    }
}

class NavigationAdministrator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            openKeys: JSON.parse(localStorage.getItem("keys")) || []
        };
    }

    onOpenChange = (openKeys) => {
        const lastKeyOpen = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if(lastKeyOpen) {
            this.setState({openKeys: [lastKeyOpen]}, () => window.localStorage.setItem("keys", JSON.stringify(this.state.openKeys)))
        }
        else {
            this.setState({openKeys: []}, () => window.localStorage.setItem("keys", JSON.stringify([])));
        }
    }
    
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    componentDidMount() {
        if(!localStorage.getItem("keys")) {
            localStorage.setItem("keys", JSON.stringify([]));
        }
    }
    
    render() {
        const { children } = this.props;
        const { collapsed, openKeys } = this.state;
        return (
            <React.Fragment>
                <Layout>
                    <Sider collapsible collapsed={collapsed} onCollapse={this.toggle} style={styleSheet.sider}>
                        <div className="logo" style={styleSheet.logo}> <img src={Logo} style={{width: "100%"}} /> </div>
                        <Menu onOpenChange={this.onOpenChange} openKeys={openKeys} defaultOpenKeys={openKeys} theme="dark" mode="inline">
                            {
                                GroupMenu.map((group, i) => (
                                    <Menu.ItemGroup title={group.title} key={`group-${group.id}-${i}`}>
                                        {
                                            SiderMenu.filter(e => e.kind === group.id).map((menuItem, i) => (
                                                menuItem.submenu.length ?
                                                <SubMenu
                                                key={`subtitle-${menuItem.id}-${i}`}
                                                title={
                                                    menuItem.url === null ?  //Not have url
                                                    <span onClick={menuItem["onFunc"]}>
                                                        {
                                                            <> {menuItem.icon} </>
                                                        }
                                                        <span>{menuItem.name}</span>
                                                    </span> : //Have url
                                                    <a style={{color: "inherit"}} href={menuItem.url}>
                                                        {
                                                            <> {menuItem.icon} </>
                                                        }
                                                        <span>{menuItem.name}</span>
                                                    </a>
                                                }>
                                                    {
                                                        menuItem.submenu.length > 0 && menuItem.submenu.map((elSmall,i) => (
                                                            <Menu.Item key={`submenu-${menuItem.id}-${i}`}>
                                                                <NavLink to={elSmall.url}> {elSmall.name} </NavLink>
                                                            </Menu.Item>
                                                        ))
                                                    }
                                                </SubMenu>
                                                 : <Menu.Item key={i}>
                                                     {
                                                        menuItem.url === null ?  //Not have url
                                                        <span onClick={menuItem["onFunc"]}>
                                                            {
                                                                <> {menuItem.icon} </>
                                                            }
                                                            <span>{menuItem.name}</span>
                                                        </span> : //Have url
                                                        <a style={{color: "inherit"}} href={menuItem.url}>
                                                            {
                                                                <> {menuItem.icon} </>
                                                            }
                                                            <span>{menuItem.name}</span>
                                                        </a>
                                                     }
                                                 </Menu.Item>
                                            ))
                                        }
                                    </Menu.ItemGroup>
                                ))
                            }
                        </Menu>
                    </Sider>
                    <Layout style={collapsed ? {...styleSheet.mainLayoutCollapse}  : {...styleSheet.mainLayout}}>
                        <Header theme="normal">
                            {/* <Input type="text" placeholder="Search something" /> */}
                        </Header>
                        <Content style={styleSheet.content}>
                        {
                            children
                        }
                        </Content>
                    </Layout>
                </Layout>
            </React.Fragment>
        )
    }
}

export default NavigationAdministrator;