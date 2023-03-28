import React, { useEffect, useRef, useState } from 'react'
import {
    getAllEmployee,
    getEmployeeById,
    addNewEmployee,
    updateEmployeeDetails,
    removeEmployee,
} from '../Redux/Actions/Actions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import DataTable from './DataTable';


function EmployeeComponent({
    getAllEmployeeProps,
    RemoveEmployeeProps,
    getAllEmployeeAction,
    removeEmployeeAction,
}) {

    const [filteredEmployeeList, setFilteredEmployeeList] = useState(null);
    const [tableData, setTableData] = useState([])

    const TableColumns = [
        { Header: "Id", accessor: 'id' },
        { Header: "First Name", accessor: 'firstName' },
        { Header: "Last Name", accessor: 'lastName' },
        { Header: "DOB", accessor: 'dob' },
        { Header: "Salary", accessor: 'salary' },
        { Header: "Department", accessor: 'department' },
        { Header: "Action", accessor: 'action' },
    ];

    useEffect(() => {
        getAllEmployeeAction()
    }, [RemoveEmployeeProps])

    useEffect(() => {
        if (getAllEmployeeProps) {

            setTableData(getAllEmployeeProps.map(record => {
                return {
                    id: record.id,
                    firstName: record.firstName,
                    lastName: record.lastName,
                    dob: record.dob,
                    salary: record.salary,
                    department: record.department,
                    action: <div className='btn-group btn-group-sm'>
                        <Link to={'/employeedetails/' + record?.id} className='btn btn-primary' >Change</Link>
                        <button className='btn btn-danger' onClick={() => { onRemoveEmployee(record?.id) }}>Rmove </button >
                    </div>
                }
            })
            )
        }
    }, [getAllEmployeeProps,])


    const onSearchFilter = (event) => {


        let tempList = []
        getAllEmployeeProps.forEach(employee => {
            if (employee.firstName.toLowerCase().includes(event.target.value)
                || employee.lastName.toLowerCase().includes(event.target.value)
                || employee.department.toLowerCase().includes(event.target.value)) {
                tempList.push({
                    id: employee.id,
                    firstName: employee.firstName,
                    lastName: employee.lastName,
                    dob: employee.dob,
                    salary: employee.salary,
                    department: employee.department,
                    action: <div className='btn-group btn-group-sm'>
                        <Link to={'/employeedetails/' + employee?.id} className='btn btn-primary' >Change</Link>
                        <button className='btn btn-danger' onClick={() => { onRemoveEmployee(employee?.id) }}>Rmove </button >
                    </div>

                })
            }
        })

        setTableData(tempList)
    }

    function onRemoveEmployee(employee) {
        removeEmployeeAction(employee);
    }

    return <div className='container' >
        <div className='card  mt-5 shadow'>
            <div className='card-header'>

                <div className='btn-group w-100 ' >
                    <Link to={'/'} className='btn btn-primary  ' >Employee</Link>

                    <Link to={'/department'} className='btn btn-primary  '>Department</Link>
                </div>
            </div>
            <div className='card-body'>
                <div className='d-flex justify-content-between'>
                    <h2 className="content-header-title float-start mb-0">Employee List</h2>
                    <div className='d-flex'>
                        <input type='text' className='form-control-sm m-2' placeholder='Search' onChange={onSearchFilter} />
                        <Link to={'/employeedetails'} className='btn btn-primary btn-sm m-2'>Add Employee </Link>
                    </div>
                </div>

                <DataTable columns={TableColumns} tableData={tableData} />
            </div>
        </div>
    </div >

}

const mapStatetoProps = (state) => {
    return {
        getAllEmployeeProps: state.getAllEmployeeReducer.EmployeeList,
        // addNewEmployeeProps: state.addNewEmployeeReducer.EmployeeList,
        // updateEmployeeProps: state.updateEmployeeReducer.EmployeeList,
        RemoveEmployeeProps: state.RemoveEmployeeReducer.EmployeeList,
    }
}
const mapDispatchtoProps = {
    getAllEmployeeAction: () => getAllEmployee(),
    getEmployeeByIdAction: (id) => getEmployeeById(id),
    addNewEmployeeAction: (details) => addNewEmployee(details),
    updateEmployeeDetailsAction: (details) => updateEmployeeDetails(details),
    removeEmployeeAction: (details) => removeEmployee(details),
}

export default connect(mapStatetoProps, mapDispatchtoProps)(EmployeeComponent)



