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

function EmployeeComponent({
    getAllEmployeeProps,
    addNewEmployeeProps,
    updateEmployeeProps,
    RemoveEmployeeProps,

    getAllEmployeeAction,
    getEmployeeByIdAction,
    addNewEmployeeAction,
    updateEmployeeDetailsAction,
    removeEmployeeAction,
}) {

    const [filteredEmployeeList, setFilteredEmployeeList] = useState(null);
    const [formData, setFormData] = useState(null);
    const [showError, setShowError] = useState(null);

    useEffect(() => {
        getAllEmployeeAction()
    }, [RemoveEmployeeProps])

    useEffect(() => {
        if (getAllEmployeeProps) {
            setFilteredEmployeeList(getAllEmployeeProps)
        }
    }, [getAllEmployeeProps,])


    const onSearchFilter = (event) => {

        setFilteredEmployeeList(
            getAllEmployeeProps.filter(employee => employee.firstName.toLowerCase().includes(event.target.value)
                || employee.lastName.toLowerCase().includes(event.target.value)
                || employee.department.toLowerCase().includes(event.target.value))
        )
    }



    function onRemoveEmployee(employee) {

        removeEmployeeAction(employee);
    }

    console.log(filteredEmployeeList)




    return <div className='container' >
        <div className='btn-group w-100 my-3' >
            <Link to={'/'} className='btn btn-primary  ' >Employee
            </Link>

            <Link to={'/department'} className='btn btn-primary  '>Department
            </Link>

        </div>

        <div className='d-flex justify-content-between'>

            <h2 className="content-header-title float-start mb-0">Employee List</h2>
            <div className='d-flex'>
                <input type='text' className='form-control-sm m-2' placeholder='Search' onChange={onSearchFilter} />
                <Link to={'/employeedetails'} className='btn btn-primary btn-sm m-2'>Add Employee </Link>
            </div>   </div>
        {showError &&
            <div className='bg-danger-subtle p-2'>
                {showError}</div>}
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">EmployeeFirstName</th>
                    <th scope="col">EmployeeLastName</th>
                    <th scope="col">EmployeeDOB</th>
                    <th scope="col">EmployeeSalary</th>
                    <th scope="col">Department</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>

                {filteredEmployeeList?.length ? filteredEmployeeList.map((employee, index) => <tr key={index}>

                    <td>{index + 1}</td>
                    <td>{employee?.firstName}</td>
                    <td>{employee?.lastName}</td>
                    <td>{employee?.dob}</td>
                    <td>{employee?.salary}</td>
                    <td>{employee?.department}</td>

                    <td >
                        <div className='btn-group btn-group-sm'>

                            <Link to={'/employeedetails/' + index} className='btn btn-primary' >Change</Link>
                            <button className='btn btn-danger' onClick={() => { onRemoveEmployee(index) }}>Rmove </button >
                        </div>
                    </td>
                </tr>
                )
                    :
                    <tr>
                        <td colSpan={7} className="text-center">No Data Found</td>
                    </tr>

                }

            </tbody>
        </table>
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



