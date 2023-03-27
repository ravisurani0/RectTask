import React, { useEffect, useRef, useState } from 'react'
import {
    getAllDepartment,
    getEmployeeById,
    addNewEmployee,
    updateEmployeeDetails,
    removeEmployee,
} from '../Redux/Actions/Actions'
import { connect } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom';

function EmployeeDetailsComponent({
    getAllDepartmentReducer,
    addNewEmployeeProps, getEmployeeDetailsProps,
    updateEmployeeProps,

    getAllDepartmentAction,
    getEmployeeByIdAction,
    addNewEmployeeAction,
    updateEmployeeDetailsAction
}) {
    let { id } = useParams();

    const [formData, setFormData] = useState(null);
    const [showError, setShowError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            getEmployeeByIdAction(id)
        }
        getAllDepartmentAction()
    }, [])


    useEffect(() => {
        if (getEmployeeDetailsProps) {
            setFormData(getEmployeeDetailsProps)
        }
    }, [getEmployeeDetailsProps])

    const onInputChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
        setShowError(null)
    }


    const onFormSave = () => {
        let isError = false;
        let errorList = {};

        if (!formData?.firstName) {
            errorList = { ...errorList, 'firstName': 'Enter First Name.' };
            isError = true;
        }
        if (!formData?.lastName) {
            errorList = { ...errorList, 'lastName': 'Enter Last Name.' };
            isError = true;
        }
        if (!formData?.dob) {
            errorList = { ...errorList, 'dob': 'Enter Date of Birth.' };
            isError = true;
        }
        if (!formData?.salary) {
            errorList = { ...errorList, 'salary': 'Enter Salary.' };
            isError = true;
        }
        if (!formData?.department) {
            errorList = { ...errorList, 'department': 'Select Department.' };
            isError = true;
        }
        if (!isError) {
            if (id) {
                updateEmployeeDetailsAction(id, formData)
            } else {
                addNewEmployeeAction(formData)
            }
            setFormData(null)

            navigate("/");
        }
        else {
            setShowError(errorList);

        }
    }

    console.log(formData)
    return <div className='container' >
        <div className='btn-group w-100 my-3' >
            <Link to={'/'} className='btn btn-primary  ' >Employee
            </Link>

            <Link to={'/department'} className='btn btn-primary  '>Department
            </Link>

        </div>

        <div className='d-flex justify-content-between'>

            <h2 className="content-header-title float-start mb-0">Employee Details</h2>
            <div className='d-flex'>
                {id ?
                    <button className='btn btn-primary btn-sm m-2 ' onClick={onFormSave}> Update</button>
                    :
                    <button className='btn btn-primary btn-sm m-2 ' onClick={onFormSave}> Save</button>}
                <Link to={'/'} className='btn btn-danger btn-sm  m-2 '>Back</Link>
            </div>   </div>


        <div>

            <div className='d-flex'>
                <div class="form-group w-50 m-2">
                    <label for="exampleFormControlInput1">First Name </label>
                    <input type="text" class={"form-control " + (showError?.firstName && "border-danger")} name='firstName' value={formData?.firstName} placeholder="First Name " onChange={onInputChange} />
                    {showError?.firstName &&
                        <span className='text-danger'> {showError?.firstName}</span>
                    }
                </div>
                <div class="form-group  w-50 m-2">
                    <label for="exampleFormControlInput1">Last Name </label>
                    <input type="text" class={"form-control " + (showError?.lastName && "border-danger")} name='lastName' value={formData?.lastName} placeholder="Last Name " onChange={onInputChange} />
                    {showError?.lastName &&
                        <span className='text-danger'> {showError?.lastName}</span>
                    }
                </div></div>

            <div class="form-group m-2">
                <label for="exampleFormControlInput1">Date of Birth  </label>
                <input type="date" class={"form-control " + (showError?.dob && "border-danger")} name='dob' value={formData?.dob} placeholder="Date of Birth " onChange={onInputChange} />
                {showError?.dob &&
                    <span className='text-danger'> {showError?.dob}</span>
                }
            </div>

            <div className='d-flex'>
                <div class="form-group w-50 m-2">
                    <label for="exampleFormControlInput1">Salary </label>
                    <input type="Number" class={"form-control " + (showError?.salary && "border-danger")} name='salary' value={formData?.salary} placeholder="Salary" onChange={onInputChange} />
                    {showError?.salary &&
                        <span className='text-danger'> {showError?.salary}</span>
                    }
                </div>
                <div class="form-group  w-50 m-2">
                    <label for="exampleFormControlInput1">Department </label>
                    <select class={"form-select " + (showError?.department && "border-danger")} name='department' onChange={onInputChange} >
                        <option disabled>Select </option>
                        {getAllDepartmentReducer?.map((department) => {
                            return <option selected={formData?.department == department.department ? 'selected' : ''} value={department.department} > {department.department}</option>
                        })
                        }
                    </select>
                    {showError?.department &&
                        <span className='text-danger'> {showError?.department}</span>
                    }
                </div></div>
        </div>
    </div >

}

const mapStatetoProps = (state) => {
    return {
        getAllDepartmentReducer: state.getAllDepartmentReducer?.DepartmentList,

        getAllEmployeeProps: state.getAllEmployeeReducer.EmployeeList,

        getEmployeeDetailsProps: state.getEmployeeByIdReducer?.EmployeeDetails
        // addNewEmployeeProps: state.addNewEmployeeReducer.EmployeeList,
        // updateEmployeeProps: state.updateEmployeeReducer.EmployeeList,
        // RemoveEmployeeProps: state.RemoveEmployeeReducer.EmployeeList,
    }
}
const mapDispatchtoProps = {
    getAllDepartmentAction: () => getAllDepartment(),

    getEmployeeByIdAction: (id) => getEmployeeById(id),
    addNewEmployeeAction: (details) => addNewEmployee(details),
    updateEmployeeDetailsAction: (id, details) => updateEmployeeDetails(id, details),
}

export default connect(mapStatetoProps, mapDispatchtoProps)(EmployeeDetailsComponent)



