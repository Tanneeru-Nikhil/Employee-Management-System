import React, { useEffect, useState } from 'react'
import {listEmployees, deleteEmployee} from '../service/EmployeeService'
import { useNavigate } from 'react-router-dom'

const ListEmployeeComponent = () => {
    const [employees, setEmployees] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        getAllEmployees()
    }, [])

    function getAllEmployees(){
        listEmployees().then((emp) =>{
            setEmployees(emp.data)
        }).catch(err =>{
            console.log(err)
        })
    }

    function handleButton(){
        navigate('/add-Employee')
    }
    function handleUpdate(id){
        navigate(`/edit-Employee/${id}`)
    }

    function handleDelete(id){
        deleteEmployee(id).then((res) => {
            getAllEmployees()
        })
        .catch(err => {
            console.error(err)
        })
    }

  return (
    <>
        <div className="container">
            <h1 className='text-center'> List Of Employees </h1>
            <button className="btn btn-primary" onClick={handleButton}>Add Employee</button>
            <table className='table table-striped table-border mt-5'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email Address</th>
                        <th>Update Employee</th>
                        <th>Delete Employee</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.map((emp) => 
                            <tr key={emp.id}>
                                <td>{emp.id}</td>
                                <td>{emp.firstName}</td>
                                <td>{emp.lastName}</td>
                                <td>{emp.email}</td>
                                <td>
                                    <button className="btn btn-success" onClick={() => handleUpdate(emp.id)}>Update Employee</button>
                                </td>
                                <td>
                                    <button className='btn btn-danger' onClick={() => handleDelete(emp.id)}>Delete</button>
                                </td>
                            </tr>
                        )
                        
                    }
                </tbody>
            </table>
        </div>
        
    </>
  )
}

export default ListEmployeeComponent
