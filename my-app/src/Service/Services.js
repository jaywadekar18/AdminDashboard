import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import Modalcomp from '../Modal/Modal'
import axios from "axios"
import Tables from '../Tables/ServicesTable'
import NavBar from '../Navbar/Navbar'
import Modal from 'react-modal';
import { FormControlLabel, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button'
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

function Services() {
    const [edit, setedit] = useState()
    let [category, setcategory] = useState([]);

    const [refresh, setrefresh] = useState(1)

    const [modalIsOpen, setmodalIsOpen] = useState(false);
    const { register, handleSubmit, formState: { errors }, } = useForm();

    function openModal() {
        setmodalIsOpen(true);
    }
    function closeModal() {
        setmodalIsOpen(false);

    }
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
        ServiceName: "",
        ImageURL: "",
        Keywords: "",
        Status: "",
        _id: ""

    });


    useEffect(() => {
        Getcategory();
    }, [refresh])

    function Getcategory() {
        axios.get('http://localhost:5000/ServiceData')
            .then((data) => { setcategory(data.data.reverse()); console.log(data.data) })
            .catch((err) => { console.log(err) })
    }

    const onSubmit = (data, e) => {
        e.target.reset();
        console.log(data)

        axios.post('http://localhost:5000/ServiceData', data)
            .then((data) => {
                console.log(data);
                setrefresh((data) => (data + 1))

            })
            .catch((err) => { console.log(err) })

    }
    function EditformSubmit() {
        console.log(formData);
        axios.put('http://localhost:5000/ServiceData', formData).then((data) => { console.log(data) }).catch((err) => { console.log(err) });
        closeModal();
        alert("Refresh page to see changes")
    }
    function deletemember(_id) {
        console.log(_id)
        axios.delete('http://localhost:5000/ServiceData', { data: { _id: _id } })
            .then((data) => { console.log(data); setrefresh((data) => (data + 1)) })
            .catch((err) => { console.log(err) });
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div class="col-lg-2 col-md-12"> <NavBar /></div>
                <div class="col-lg-10 col-md-12 mt-5 pt-5">

                    <h1 className="text-primary">Service</h1>

                    <Modalcomp title="Add a Service">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <label>Service Name</label>
                            <br />
                            <input {...register('ServiceName', { required: true })} />
                            {errors.ServiceName && <p className="text-muted ">Service Name is required.</p>}
                            <br />
                            <label>Image URL</label>
                            <br />
                            <input {...register('ImageURL', { required: true })} />
                            {errors.ImageURL && <p className="text-muted ">Image URL is required.</p>}
                            <br />
                            <label>Status</label><br />
                            <select {...register("Status")}>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                            {errors.Status && <p className="text-muted ">Status is required.</p>}
                            <br />
                            <label>Keywords</label>
                            <br />
                            <input {...register('Keywords', {})} />
                            <br /><br />
                            <button className="btn btn-outline-primary">Add</button>
                        </form>

                    </Modalcomp>

                    {edit && <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        style={customStyles} ><br />

                        <h2 style={{color: "rgb(76, 68, 187)"}}>Edit</h2>
                        <TextField label="ServiceName" onChange={e => setFormData({ ...formData, ServiceName: e.target.value })} defaultValue={edit.ServiceName}></TextField>
                        <br /><br/>
                        <label>Status -- </label>
                        <Select labelId="demo-simple-select-label" id="demo-simple-select"  onChange={e => setFormData({ ...formData, Status: e.target.value })} defaultValue={edit.Status}>
                            <MenuItem value="Active">Active</MenuItem>
                            <MenuItem value="Inactive">Inactive</MenuItem>
                        </Select><br/><br/>
                        <TextField label="Image URL" onChange={e => setFormData({ ...formData, ImageURL: e.target.value })} defaultValue={edit.ImageURL}></TextField> <br /><br />
                        <TextField label="Keywords" onChange={e => setFormData({ ...formData, Keywords: e.target.value })} defaultValue={edit.Keywords}></TextField> <br /><br />
                        <Button color="primary" variant="outlined" onClick={EditformSubmit}>Submit</Button>
                        <Button color="primary" variant="outlined" onClick={closeModal}>Close</Button>
                        
                    </Modal>}

                    <div className="mt-5 ">
                        {category && <Tables Edit={(data) => { setedit(data); setmodalIsOpen(true); setFormData({ ServiceName:data.ServiceName, Status: data.Status, ImageURL: data.ImageURL, Keywords: data.Keywords, _id: data._id }) }} Delete={(_id) => { deletemember(_id); console.log(_id) }} rows={category} columns={['No', 'Service Name', 'Image URL', 'Status', 'Keywords', 'Created Date (yyyy-mm-dd)', 'Actions']} />}
                    </div>
                </div>
            </div>

        </div>
    )
}



export default Services;