import React, { useState } from 'react'
import styles from './navbar.module.css';
import { NavLink } from 'react-router-dom';
import CategoryRoundedIcon from '@material-ui/icons/CategoryRounded';
import ShoppingBasketRoundedIcon from '@material-ui/icons/ShoppingBasketRounded';
import WorkIcon from '@material-ui/icons/Work';
import PeopleIcon from '@material-ui/icons/People';
import { Button } from '@material-ui/core';
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";



const NavBar = (props) => {
    const [Auth, setAuth] = useState(true);
    function logout() {
        localStorage.removeItem('auth');
        setAuth(null)

    }
    return (
        <div className={styles.container}>
            <div className={styles.header}>

                <h1>Admin Dashboard</h1>
            </div>

            <div className={styles.navItems}>
                <NavLink className={styles.navItem} to="/admin/members" activeClassName={styles.activeNavItem}>
                    <PeopleIcon />
                    <p>Members</p>
                </NavLink>


                <NavLink className={styles.navItem} to="/admin/service-partners" activeClassName={styles.activeNavItem}>
                    <WorkIcon />
                    <p>Service Partners</p>
                </NavLink>

                <NavLink className={styles.navItem} to="/admin/categories" activeClassName={styles.activeNavItem}>
                    <CategoryRoundedIcon />
                    <p>Category</p>
                </NavLink>

                <NavLink className={styles.navItem} to="/admin/services" activeClassName={styles.activeNavItem}>
                    <ShoppingBasketRoundedIcon />
                    <p>Service</p>
                </NavLink>

                <div className={styles.navItem}>
                    <Button  onClick={logout} >Logout</Button>
                </div>
                {
                    !Auth && <Redirect from="/" to="/login" />
                }

            </div>
        </div>


    )
}


export default NavBar;