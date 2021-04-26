import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import Modalcomp from '../Modal/Modal'
import axios from "axios"
import Modal from 'react-modal';
import Tables from '../Tables/ServicePartnersTable'
import Button from '@material-ui/core/Button'
import { TextField } from '@material-ui/core';
import NavBar from '../Navbar/Navbar'


function Services() {
    const [edit, setedit] = useState();
    const [refresh, setrefresh] = useState(1)
    const [category, setcategory] = useState()
    const { register, handleSubmit, formState: { errors }, } = useForm();
    let [members, setmembers] = useState([]);
    let [search, setsearch] = useState();
    let [searchresult, setsearchresult] = useState(null);
    const [modalIsOpen, setmodalIsOpen] = useState(false);
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
        StoreAddress: "",
        VatNumber: "",
        Email: "",
        ContactNumber: "",
        Category: "",
        Status: ""

    });
    useEffect(() => {
       
        GetMembers();
        Getcategory()

        
    }, [refresh])
    useEffect(() => {
        searchmember();
       
    }, [search])
    function Getcategory() {
        axios.get('http://localhost:5000/CategoryData')
            .then((data) => { setcategory(data.data); console.log(data.data) })
            .catch((err) => { console.log(err) })
    }
    function GetMembers() {
        axios.get('http://localhost:5000/ServicePartnerData')
            .then((data) => { console.log(data.data.reverse()); setmembers(data.data) })
            .catch((err) => { console.log(err) })
    }

    const onSubmit = (data, e) => {
        e.target.reset();
        var template = {
            to: data.Email,
            name: data.Name,
        };
        axios.post('http://localhost:5000/ServicePartnerData', data)
            .then((data) => {
                console.log(data);
                setrefresh((data) => (data + 1))
               
            })
            .catch((err) => { console.log(err) })
    }
    function deletemember(_id) {
        axios.delete('http://localhost:5000/ServicePartnerData', { data: { _id: _id } })
            .then((data) => { console.log(data); setrefresh((data) => (data + 1)) })
            .catch((err) => { console.log(err) });
    }
    function searchmember() {
        axios.get(`http://localhost:5000/ServicePartnerData/${search}`)
            .then((res) => {  if (res.data.length != 0) { setsearchresult(res.data.reverse()); } else setsearchresult(null) })
            .catch((err) => { console.log(err) })
    }
    function EditformSubmit() {
        console.log(formData);
        axios.put('http://localhost:5000/ServicePartnerData', formData).then((data) => { console.log(data) }).catch((err) => { console.log(err) });
        closeModal();
        alert("Refresh page to see changes")
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-2 col-md-12"> <NavBar /></div>
                <div className="col-lg-10 col-md-12 mt-5 pt-5">
                    <h1 className="text-primary">Services Partners </h1>
                    <h4 className="mt-3 mb-3 text-muted">Search</h4>
    
 

                    <TextField size="small" variant="outlined" label="Enter name or email id..." onChange={(event) => { setsearch(event.target.value) }} ></TextField>
                   

                    <Modalcomp title="Add a partner">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <label>Name  </label>
                            <input className="float-right" {...register('Name', { required: true })} />
                            {errors.Name && <p className="text-muted ">Name is required*</p>} <br />
                            <label>Email</label>
                            <input className="float-right" {...register('Email', { required: true })} />
                            {errors.Email && <p className="text-muted ">Email is required*</p>}<br />
                            <label>Contact Number</label>
                            <input className="float-right" {...register('ContactNumber', { required: true })} />
                            {errors.ContactNumber && <p className="text-muted ">ContactNumber is required*</p>}<br />
                            <label>Store Adress</label>
                            <input className="float-right" {...register('StoreAddress', { required: true })} />
                            {errors.StoreAdress && <p className="text-muted ">StoreAdress is required*</p>}<br />
                            <label>Vat Number</label>
                            <input className="float-right" {...register('VatNumber', { required: true })} />
                            {errors.VatNumber && <p className="text-muted ">VatNumber is required*</p>}<br />
                            <label>Password</label>
                            <input className="float-right" value='Password' {...register('Password')} /><br />
                            <label>Category</label>

                            <select className="float-right" {...register("Category")}>
                                {category && category.map((data) => (<option value={data.CategoryName}>{data.CategoryName}</option>))}

                            </select>
                            {errors.Category && <p>This field is required.</p>} <br />
                            <label>Status</label>
                            <select className="float-right" {...register("Status")}>
                                <option value="Available">Available</option>
                                <option value="Not Available">Not Available</option></select>
                            {errors.Userrole && <p className="text-muted ">This field is required*</p>}
                            <br /><br />
                            <button className="btn btn-outline-primary">Add</button>
                        </form>

                    </Modalcomp>
                    {edit && <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        style={customStyles} ><br />

                        <h2 style={{color: "rgb(76, 68, 187)"}}>Edit</h2>
                        <TextField multiline rows={2} label="Name" onChange={e => setFormData({ ...formData, Name: e.target.value })} defaultValue={edit.Name}></TextField><br /><br />
                        <TextField label="Contact Number" onChange={e => setFormData({ ...formData, ContactNumber: e.target.value })} defaultValue={edit.ContactNumber}></TextField> <br /><br />
                        <TextField multiline rows={4} label="Store Address" onChange={e => setFormData({ ...formData, StoreAddress: e.target.value })} defaultValue={edit.StoreAddress}></TextField> <br /><br />
                        <TextField label="Vat Number" onChange={e => setFormData({ ...formData, VatNumber: e.target.value })} defaultValue={edit.VatNumber}></TextField> <br /><br />
                        <TextField label="Category" onChange={e => setFormData({ ...formData, Category: e.target.value })} defaultValue={edit.Category}></TextField> <br /><br />

                        <Button color="primary" variant="outlined" onClick={EditformSubmit}>Submit</Button>
                        <Button color="primary" variant="outlined" onClick={closeModal}>Close</Button>
                    </Modal>}

                    <div className="mt-5">

                        {searchresult ? <Tables Edit={(data) => {
                            setedit(data); openModal();
                            setFormData({
                                Name: data.Name, ContactNumber: data.ContactNumber, StoreAddress: data.StoreAddress,
                                VatNumber: data.VatNumber, Category: data.Category, Email: data.Email, _id: data._id
                            });
                        }}
                            Delete={(Email) => { deletemember(Email) }} rows={searchresult} columns={['No', 'Name', 'Email', 'Contact Number',
                                'Store Address', 'Vat Number', 'Category', 'Status', 'Created date (yyyy-mm-dd)', 'Actions']} />
                            : <Tables Edit={(data) => {
                                setedit(data); openModal();
                                setFormData({
                                    Name: data.Name, ContactNumber: data.ContactNumber, StoreAddress: data.StoreAddress,
                                    VatNumber: data.VatNumber, Category: data.Category, Email: data.Email, _id: data._id
                                });
                            }}
                                Delete={(Email) => { deletemember(Email) }} rows={members} columns={['No', 'Name', 'Email', 'Contact Number',
                                    'Store Address', 'Vat Number', 'Category', 'Status', 'Created date (yyyy-mm-dd)', 'Actions']} />}

                    </div>
                </div>
            </div>
        </div>
    )
}



export default Services;