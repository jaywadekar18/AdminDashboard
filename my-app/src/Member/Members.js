import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import Modalcomp from '../Modal/Modal'
import axios from "axios"
import Tables from '../Tables/MembersTables'
import NavBar from '../Navbar/Navbar'
import Modal from 'react-modal';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';




function Members() {
    const [edit, setedit] = useState()
    let [members, setmembers] = useState([]);
    let [search, setsearch] = useState();
    let [searchresult, setsearchresult] = useState(null);
    const [modalIsOpen, setmodalIsOpen] = useState(false);
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const [refresh, setrefresh] = useState(1)
    function openModal() { setmodalIsOpen(true) }
    function closeModal() { setmodalIsOpen(false) }
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'
        }
    };
    const [formData, setFormData] = React.useState({
        Name: "",
        Status: "",
        Userrole: "",
        Email: ""
    });
    useEffect(() => {
        GetMembers();

    }, [refresh])

    useEffect(() => {
        searchmember();

    }, [search])
    function GetMembers() {
        axios.get('http://localhost:5000/Admindata')
            .then((data) => { setmembers(data.data.reverse()) })
            .catch((err) => { console.log(err) })
    }
    const onSubmit = (data, e) => {
        e.target.reset();
        console.log(data);
        axios.post('http://localhost:5000/Admindata', data)
            .then((data) => {
                console.log(data);
                setrefresh((data) => (data + 1))
               
            })
            
            .catch((err) => { console.log(err) })
    }
    function EditformSubmit() {
        console.log(formData);

        axios.put('http://localhost:5000/Admindata', formData).then((data) => { console.log(data) }).catch((err) => { console.log(err) });
        closeModal();
        alert("Refresh page to see changes")
    }
    function deletemember(_id) {
        console.log(_id)
        axios.delete('http://localhost:5000/Admindata', { data: { _id: _id } })
            .then((data) => { console.log(data); setrefresh((data) => (data + 1)) })
            .catch((err) => { console.log(err) });
    }
    function searchmember() {
        axios.get(`http://localhost:5000/Admindata/${search}`)
            .then((res) => { console.log(searchresult); if (res.data.length != 0) { setsearchresult(res.data.reverse()); } else setsearchresult(null) })
            .catch((err) => { console.log(err) })
    }
    return (
        <div className="container-fluid">

            <div className="row">
                <div className="col-lg-2 col-md-12"> <NavBar /></div>
                <div className="col-lg-10 col-md-12 mt-5 pt-5">

                    <h1 className="text-primary">Members </h1>
                    <h4 className="mt-3 mb-3 text-muted">Search</h4>
                     <TextField size="small" variant="outlined" label="Enter name or email id..." onChange={(event) => { setsearch(event.target.value) }} ></TextField>
                   

                    <Modalcomp title="Add a member">
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <label>Name</label>
                            <br />
                            <input {...register('Name', { required: true })} />
                            {errors.Name && <p className="text-muted ">Name is required*</p>}
                            <br />
                            <label className="">Email</label>
                            <br />
                            <input {...register('Email', { required: true })} />
                            {errors.Email && <p className="text-muted">Email is required*</p>}
                            <br />
                            <label>Status</label><br />
                            <input value='Pending' {...register('Status')} />
                            <br />
                            <label>Password</label>
                            <br />
                            <input value='Password' {...register('Password', { required: true })} />
                            <br />
                            <label>Userrole</label>
                            <br />
                            <select {...register("Userrole")}>
                                <option value="Super Admin">Super Admin</option>
                                <option value="Admin">Admin</option>
                            </select>
                            {errors.Userrole && <p className="text-muted">This field is required.</p>}
                            <br /><br />
                            <button className="btn btn-outline-primary">Add</button>

                        </form>
                    </Modalcomp>

                    {edit && <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        style={customStyles} ><br />

                        <h2 style={{color: "rgb(76, 68, 187)"}}>Edit</h2>
                        <TextField label="Name" onChange={e => setFormData({ ...formData, Name: e.target.value })} defaultValue={edit.Name}></TextField><br /><br />
                        <TextField label="Status" onChange={e => setFormData({ ...formData, Status: e.target.value })} defaultValue={edit.Status}></TextField> <br /><br />
                        <Select labelId="demo-simple-select-label" id="demo-simple-select" onChange={e => setFormData({ ...formData, Userrole: e.target.value })} defaultValue={edit.Userrole}>
                            <MenuItem value="Admin">Admin</MenuItem>
                            <MenuItem value="Super Admin">Super Admin</MenuItem>
                        </Select>
                        <br /><br />


                        <Button color="primary" variant="outlined" onClick={EditformSubmit}>Submit</Button>
                        <Button color="primary" variant="outlined" onClick={closeModal}>Close</Button>
                    </Modal>}


                    <div className="mt-5 ">

                        {searchresult ? (<Tables Edit={(data) => {
                            setedit(data); setmodalIsOpen(true); console.log(formData); setFormData({ Name: data.Name, Email: data.Email, Status: data.Status, Userrole: data.Userrole, _id: data._id });
                            console.log(formData)
                        }} Delete={(Email) => { deletemember(Email) }} rows={searchresult} columns={['No', 'Name', 'Email', 'Status', 'UserRole', 'Actions']} ></Tables>)
                            :
                            <Tables Edit={(data) => {
                                setedit(data); setmodalIsOpen(true); console.log(formData); setFormData({ Name: data.Name, Email: data.Email, Status: data.Status, Userrole: data.Userrole, _id: data._id });
                                console.log(formData)
                            }} Delete={(Email) => { deletemember(Email) }}
                                rows={members} columns={['No', 'Name', 'Email', 'Status', 'UserRole', 'Actions']} />}
                    </div>


                </div>
            </div>
           
        </div>
    )
}



export default Members;