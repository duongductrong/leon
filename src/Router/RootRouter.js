import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import PrivateRoute from './PrivateRoute';

import HomePage from '../pages/UI/HomePage';
import BlogPage from '../pages/UI/BlogPage';
import ReadBlogPage from '../pages/UI/ReadBlogPage';
import CategoryPage from '../pages/UI/CategoryPage';
import LoginPage from '../pages/UI/LoginPage';
import RegisterPage from '../pages/UI/RegisterPage';
import OverviewPage from '../pages/Administrator/OverviewPage';

//Administrator
import FetchCategoryPage from '../pages/Administrator/Category/FetchView/FetchCategoryPage';
import CreateCategoryPage from '../pages/Administrator/Category/Create/CreateCategoryPage';
import EditCategoryPage from '../pages/Administrator/Category/Edit/EditCategoryPage';
import FetchBlogPage from '../pages/Administrator/Blog/FetchView/FetchBlogPage';
import CreateBlogPage from '../pages/Administrator/Blog/Create/CreateBlogPage';
import EditBlogPage from '../pages/Administrator/Blog/Edit/EditBlogPage';
import FetchUserPage from '../pages/Administrator/User/FetchView/FetchUserPage';
import CreateUserPage from '../pages/Administrator/User/Create/CreateUserPage';
import EditUserPage from '../pages/Administrator/User/Edit/EditUserPage';
import Error404 from '../pages/UI/Error404';
import ResumePage from '../pages/UI/ResumePage';
import MenuSystem from '../pages/Administrator/Systems/Menu/MenuSystem';

import { AnimatedSwitch, spring } from 'react-router-transition'
import RestoreBlogPage from '../pages/Administrator/Blog/Restore/RestoreBlogPage';
import RestoreCategoriesPage from '../pages/Administrator/Category/Restore/RestoreCategoriesPage';
import RestoreUserPage from '../pages/Administrator/User/Restore/RestoreUserPage';
import CountWordExtension from '../pages/UI/CountWordExtension';

// we need to map the `scale` prop we define below
// to the transform style property
function mapStyles(styles) {
    let props = {};
    if(styles.scale === 1) {
        props = {opacity : styles.opacity, transform: "initial"}
    }
    else {
        props = {...styles, transform: `scale(${styles.scale})`};
    }
    return {...props};
}

// wrap the `spring` helper to use a bouncy config
function bounce(val) {
    return spring(val, {
      stiffness: 330,
      damping: 22,
    });
}

const animation = {
    // start in a transparent, upscaled state
    atEnter: {
        opacity: 0.5,
        scale: 1.1
    },
    // leave in a transparent, downscaled state
    atLeave: {
        opacity: 0,
        scale: bounce(0.5)
    },
    // and rest at an opaque, normally-scaled state
    atActive: {
        opacity: 1,
        scale: bounce(1)
    },
}

class BlogRouter extends React.Component {
    render() {
        return (
            // <Router>
                <AnimatedSwitch className="switch-wrapper" {...animation} mapStyles={mapStyles}>
                    <Route path={`/`} exact component={HomePage} />
                    <Route path={`/blog`} exact component={BlogPage} />
                    <Route path={`/blog/:id`} exact component={ReadBlogPage} />
                    <Route path={`/category/:id`} exact component={CategoryPage} />
                    <Route path={`/login`} exact component={LoginPage} />
                    <Route path={`/register`} exact component={RegisterPage} />
                    <Route path={`/resume`} exact component={ResumePage} />
                    <Route path={`/countword`} exact component={CountWordExtension} />
                    <PrivateRoute path={`/administrator`} exact component={OverviewPage} />
                    <PrivateRoute path={`/administrator/category`} exact component={FetchCategoryPage} />
                    <PrivateRoute path={`/administrator/category/new`} exact component={CreateCategoryPage} />
                    <PrivateRoute path={`/administrator/category/edit/:id`} exact component={EditCategoryPage} />
                    <PrivateRoute path={`/administrator/category/restore`} exact component={RestoreCategoriesPage} />
                    <PrivateRoute path={`/administrator/blog`} exact component={FetchBlogPage} />
                    <PrivateRoute path={`/administrator/blog/new`} exact component={CreateBlogPage} />
                    <PrivateRoute path={`/administrator/blog/edit/:id`} exact component={EditBlogPage} />
                    <PrivateRoute path={`/administrator/blog/restore`} exact component={RestoreBlogPage} />
                    <PrivateRoute path={`/administrator/user/`} exact component={FetchUserPage} />
                    <PrivateRoute path={`/administrator/user/new`} exact component={CreateUserPage} />
                    <PrivateRoute path={`/administrator/user/edit/:id`} exact component={EditUserPage} />
                    <PrivateRoute path={`/administrator/user/restore`} exact component={RestoreUserPage} />
                    <PrivateRoute path={`/administrator/system/menu`} exact component={MenuSystem} />
                    <Route path={`*`} component={Error404} />
                </AnimatedSwitch>
            // </Router>
        )
    }
}

export default BlogRouter;