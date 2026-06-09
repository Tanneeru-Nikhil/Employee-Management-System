import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios';
import { CreateEmpolyee, getEmployee, updateEmployee } from '../service/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';
const AddEmployee = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: ''
    })

    const [error, setError] = useState({
        firstName: '',
        lastName: '',
        email: ''
    })

    useEffect(()=>{
        if (!id) return; // only fetch when editing (id present)
        getEmployee(id)
        .then((res)=>{
            setForm({
                firstName: res.data.firstName,
                lastName: res.data.lastName,
                email: res.data.email
            })
        })
        .catch((err) =>{
            console.log(err)
        })
    }, [id])

    function handleForm(e) {
        const { name, value } = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    }

    function saveOrUpdateEmployee(e) {
        e.preventDefault();
        if(validation()) {
            console.log('Form Submitted Data:', form);
            
            if(id){
                updateEmployee(id, form)
                .then((res) =>{
                    console.log(res.data)
                    navigate('/employee')
                })
                .catch(err => {
                    console.error(err)
                })
            }
            else{
                CreateEmpolyee(form).then((data) => {
                console.log("successfully submited data : ", data)
                navigate("/employee")
            })
            .catch((err) => {
                console.log(err)
            })
            }

            setForm({
                firstName: '',
                lastName: '',
                email: ''
            })
        }

    }
    function validation() {
        const errorCopy = { ...error }
        let valid = true
        
        // firstName validation
        if (!form.firstName.trim()) {
            valid = false
            errorCopy.firstName = "firstName is Required"
        } else {
            errorCopy.firstName = ""
        }
        
        // lastName validation
        if (!form.lastName.trim()) {
            valid = false
            errorCopy.lastName = "lastName is Required"
        } else {
            errorCopy.lastName = ""
        }
        
        // email validation
        if (!form.email.trim()) {
            valid = false
            errorCopy.email = "email is Required"
        } else {
            errorCopy.email = ""
        }
        
        setError(errorCopy)
        return valid
    }

    function pageFormate(){
        if(id){
            return <h2 className="mb-0">Update Employee</h2>
        }else{
            return <h2 className="mb-0">Add Employee</h2>
        }
    }
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow border-0">
                        <div className="card-header bg-dark text-white text-center py-3">
                            {
                                pageFormate()
                            }
                        </div>
                        <div className="card-body p-4">
                            <form onSubmit={saveOrUpdateEmployee}>
                                {/* First Name Input */}
                                <div className="form-group mb-3">
                                    <label className="form-label fw-medium">First Name</label>
                                    <input
                                        type="text"
                                        placeholder="Enter First Name"
                                        name="firstName"
                                        value={form.firstName}
                                        className={`form-control ${error.firstName ? 'is-invalid' : ''}`}
                                        onChange={handleForm}
                                    />
                                    {error.firstName && <div className='invalid-feedback'>{error.firstName}</div>}
                                </div>

                                {/* Last Name Input */}
                                <div className="form-group mb-3">
                                    <label className="form-label fw-medium">Last Name</label>
                                    <input
                                        type="text"
                                        placeholder="Enter Last Name"
                                        name="lastName"
                                        value={form.lastName}
                                        className={`form-control ${error.lastName ? 'is-invalid' : ''}`}
                                        onChange={handleForm}

                                    />
                                    {error.lastName && <div className='invalid-feedback'>{error.lastName}</div>}
                                </div>

                                {/* Email Input */}
                                <div className="form-group mb-4">
                                    <label className="form-label fw-medium">Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="Enter Email Address"
                                        name="email"
                                        value={form.email}
                                        className={`form-control ${error.email ? 'is-invalid' : ''}`}
                                        onChange={handleForm}

                                    />
                                    {error.email && <div className='invalid-feedback'>{error.email}</div>}
                                </div>

                                {/* Action Buttons */}
                                <div className="d-grid gap-2">
                                    <button type="submit" className="btn btn-success py-2 fw-bold">
                                        Save Employee
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddEmployee
