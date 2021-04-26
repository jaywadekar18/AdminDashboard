import React, { useState } from 'react'
import styles from './login.module.css'
import { useForm } from 'react-hook-form';
import axios from 'axios'
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';
import { Button } from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
function Home(props) {
    const { register, handleSubmit, formState: { errors }, } = useForm();
    function OnSubmit(data) {
  
        axios.post(`http://localhost:5000/Admindata/Login` ,data)
            .then((res) => { console.log(res.data);
             localStorage.setItem( "auth" ,res.data.accesstoken )
                props.history.push('/admin/members');
            })
            .catch((err) => { console.log(err);alert('No such record found') })



    }
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.header}>

                    <h1 className={styles.head}>Ahya Dashboard</h1>
                </div>
                <div className={styles.loginContainer}>
                    <div className={styles.loginContent}>
                        <h1 className={styles.loginHead}>Sign In <SupervisorAccountIcon fontSize="large" color="primary"/></h1>
                        <label className={styles.label}>Enter Email    <EmailIcon color="primary" /></label>

                        <input  className={styles.textField} {...register('Email', { required: true })} className={styles.textField} />
                        {errors.Email && <p className="text-muted">Email is required*</p>}

                        <label className={styles.label}>Enter Password  <LockIcon color="primary"/> </label>

                        <input   className={styles.textField}{...register('Password', { required: true  })} className={styles.textField} type='password' ></input>
                        {errors.Password && <p className="text-muted">Password is required*</p>}
                        
                        <Button  className="mt-4" variant="contained" color="primary" endIcon={<ArrowForwardRoundedIcon />}  onClick={handleSubmit(OnSubmit)}>Sign in</Button>


                    </div>
                </div>
                <div className={styles.loginFooter}>&nbsp;</div>
            </div>
        </div>
    )
}

export default Home;
