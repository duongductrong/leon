import React from 'react'
import Axios from 'axios'
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faMinus, faBars } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import LayoutMedium from '../../LayoutMedium/LayoutMedium'
import ItemMenuUI from './ItemMenuUI'
import ItemCommunityUI from './ItemCommunityUI'
import SubMenuUI from './SubMenuUI'
import Searching from './Searching'

//assets
import Logo from '../../../../../assets/images/impose-logo.png'
import { message, Spin } from 'antd';

const fetchMenu = () => {
    return new Promise((resolve, reject) => {
        return Axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_ENDPOINT}/api/menu/buildingMenu`
        })
        .then(res => resolve(res.data))
        .catch(err => reject(err))
    })
}

class MenuUI extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            isSearch : false,
            isShow : window.innerWidth > 1024 ? true : false,
            isDesktop: false,
            loading: false,
            menu: []
        }
    }

    getMenu = () => {
        this.setState({loading: true}, () => {
            fetchMenu()
            .then(data => {
                const { status, menu, msgVi, code } = data;
                if(status !== "error" && status === "ok") {
                    this.setState({
                        loading: false,
                        menu
                    })
                }
                else {
                    this.setState({loading: false}, () => message.error(`${status} ${code}: ${msgVi}`));
                }
            })
            .catch(err => {
                this.setState({loading: false}, () => message.error(err));
            })
        })
    }

    componentDidMount() {

        //call function
        this.getMenu();

        window.addEventListener("resize", () => {
            //If width > 1024, menu - always show
            if(window.innerWidth > 1024) {
                this.setState({ isShow: true });
            } //Else it's hidden, waiting event click to toggle isShow
            else {
                this.setState({ isShow: false });
            }
        })
    }

    componentWillUnmount() {
        window.removeEventListener("resize", () => {
            //If width > 1024, menu - always show
            if(window.innerWidth > 1024) {
                this.setState({ isShow: true });
            } //Else it's hidden, waiting event click to toggle isShow
            else {
                this.setState({ isShow: false });
            }
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        //If isShow new not equal isShow now return true, it'll be re-render
        if(nextState.isShow !== this.state.isShow) {
            return true;
        }
        else if(nextState.isSearch !== this.state.isSearch) {
            return true;
        }
        else if(nextState.menu.length !== this.state.menu.length) {
            return true;
        }
        else {
            return false;
        }
    }

    render() {
        const { children } = this.props;
        const { isSearch, isShow, menu, loading } = this.state;
        return (
            <div className="menu-ui">
                <div className="menu-ui__container">
                    <LayoutMedium className="menu-ui__layout">
                        <div className="menu-ui__container__logo">
                            <NavLink to="/">
                                <img src={Logo} className="menu-ui__container__logo__image" />
                            </NavLink>
                        </div>
                        {
                            <div style={{display: isShow ? "initial" : "none"}} className={`menu-ui__container__category`}>
                                <ul className="menu-ui__container__category__box">
                                    {
                                        loading ? <Spin /> : menu && menu.map((item, i) => (
                                            <ItemMenuUI key={item._id} label={item.label} url={item.url}>
                                                {
                                                    item.submenu.length > 0 && <SubMenuUI submenu={item.submenu} />
                                                }
                                            </ItemMenuUI>
                                        ))
                                    }
                                </ul>
                            </div>
                        }
                        <div className="menu-ui__container__community">
                            <ItemCommunityUI icon={faFacebookF} url="https://www.facebook.com/" />
                            <ItemCommunityUI icon={faTwitter} url="/" />
                            <ItemCommunityUI icon={faInstagram} url="/" />
                            <ItemCommunityUI icon={faLinkedin} url ="/" />
                            <ItemCommunityUI 
                            icon={isSearch ? faMinus : faSearch} 
                            url={() => null}
                            onClick={() => this.setState({isSearch: !isSearch})} dark />

                            <FontAwesomeIcon 
                            onClick={() => this.setState({isShow: !isShow})}
                            className="menu-ui__container__community__bars" 
                            icon={faBars} />
                        </div>
                    </LayoutMedium>
                </div>
                {
                    isSearch && <Searching />
                }
            </div>
        )
    }
}

export default MenuUI;