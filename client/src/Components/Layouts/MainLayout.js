import { Children, useState } from 'react';
import { useHistory } from 'react-router';
import { Menu } from 'antd';
import { Route } from "react-router-dom";



const MainLayout = ({ children }) => {
    const [menuKey, setMenuKey] = useState('/public')
    const history = useHistory()

    const handleClick = e => {
        setMenuKey(e.key)
        console.log(e.key)
        history.push(menuKey)
    };

    return (
        <div className='container'>
            <header>
                <h1>Imagehub</h1>
                <p> Your top rated image repository</p>
            </header>

            <Menu onClick={handleClick} selectedKeys={[menuKey]} mode="horizontal">
                <Menu.Item key="/public" >
                    Public Image Repo
                </Menu.Item>
                <Menu.Item key="/register">
                    Register
                </Menu.Item>
                <Menu.Item key="/login" >
                    Login
                </Menu.Item>
                
            </Menu>
            <div className='mainContent'>
            {children}

            </div>

        </div>
    );
}

const MainLayoutRoute = ({ component: Component, title, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => (
                <MainLayout title={title}>
                    <Component {...props} />
                </MainLayout>
            )}
        />
    );
}

export default MainLayoutRoute;
