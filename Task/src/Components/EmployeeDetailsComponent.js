import React, { useEffect, useRef, useState } from 'react'
import { getAllDepartment, getEmployeeById, addNewEmployee, updateEmployeeDetails, } from '../Redux/Actions/Actions'
import { connect } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Formik, useFormik } from "formik";
import * as Yup from "yup";


function EmployeeDetailsComponent({
    getAllDepartmentReducer,
    getEmployeeDetailsProps,

    getAllDepartmentAction,
    getEmployeeByIdAction,
    addNewEmployeeAction,
    updateEmployeeDetailsAction
}) {

    let { id } = useParams();

    const navigate = useNavigate();


    useEffect(() => {
        if (id) {
            getEmployeeByIdAction(id)
        }
        getAllDepartmentAction()
    }, [])


    useEffect(() => {
        if (getEmployeeDetailsProps) {
            formik.setValues(getEmployeeDetailsProps);
        }
    }, [getEmployeeDetailsProps])



    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            dob: '',
            salary: '',
            department: '',
        },
        validationSchema: Yup.object().shape({
            firstName: Yup.string().required("Please enter First Name."),
            lastName: Yup.string().required("Please enter Last Name."),
            dob: Yup.date().required("Please enter Date Of Birth.").max(new Date().toLocaleDateString()),
            salary: Yup.number().required("Please enter Salary.").min(0, "Must be more than 5"),
            department: Yup.string().required("Please enter Department."),
        }),

        onSubmit: (values, { resetForm }) => {
            if (values.id) {
                updateEmployeeDetailsAction(values.id, values)
            }
            else {
                addNewEmployeeAction(values)
            }
            resetForm();
            navigate("/");
        }
    });

    console.log(formik.values)


    return <div className='container' >

        <div className='card  mt-5 shadow'>
            <div className='card-header'>

                <div className='btn-group w-100 ' >
                    <Link to={'/'} className='btn btn-primary  ' >Employee
                    </Link>

                    <Link to={'/department'} className='btn btn-primary  '>Department
                    </Link>

                </div>
            </div>
            <div className='card-body'>


                <Formik
                    initialValues={formik.initialValues}
                    enableReinitialize={true}
                    validateOnChange={false}
                    validateOnBlur={false}
                    onSubmit={values => formik.handleSubmit(values)}>

                    {props => (

                        <form onSubmit={props.handleSubmit}>
                            <div className='d-flex justify-content-between'>
                                <h2 className="content-header-title float-start mb-0">Employee Details</h2>
                                <div className='d-flex'>

                                    <button type='submit' className='btn btn-primary btn-sm m-2 '> {id ? "Update" : "Save"}</button>

                                    <Link to={'/'} className='btn btn-danger btn-sm  m-2 '>Back</Link>
                                </div>
                            </div>

                            <div>
                                <div className='d-flex'>
                                    <div class="form-group w-50 m-2">
                                        <label for="exampleFormControlInput1">First Name </label>

                                        <input className='form-control'
                                            id="firstName"
                                            name="firstName"
                                            type="text"
                                            class="form-control"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.firstName}
                                        />
                                        {formik.touched.firstName && formik.errors.firstName ? (
                                            <span className="text-danger">{formik.errors.firstName}</span>
                                        ) : null}

                                    </div>
                                    <div class="form-group  w-50 m-2">
                                        <label for="exampleFormControlInput1">Last Name </label>
                                        <input className='form-control'
                                            id="lastName"
                                            name="lastName"
                                            type="text"
                                            class="form-control"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.lastName}
                                        />
                                        {formik.touched.lastName && formik.errors.lastName ? (
                                            <span className="text-danger">{formik.errors.lastName}</span>
                                        ) : null}
                                    </div>
                                </div>

                                <div class="form-group m-2">
                                    <label for="exampleFormControlInput1">Date of Birth </label>
                                    <input className='form-control'
                                        id="dob"
                                        name="dob"
                                        type="date"
                                        class="form-control"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.dob}
                                    />
                                    {formik.touched.dob && formik.errors.dob ? (
                                        <span className="text-danger">{formik.errors.dob}</span>
                                    ) : null}
                                </div>

                                <div className='d-flex'>
                                    <div class="form-group w-50 m-2">
                                        <label for="exampleFormControlInput1">Salary</label>
                                        <input className='form-control'
                                            id="salary"
                                            name="salary"
                                            type="number"
                                            min={0}
                                            class="form-control"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.salary}
                                        />
                                        {formik.touched.salary && formik.errors.salary ? (
                                            <span className="text-danger">{formik.errors.salary}</span>
                                        ) : null}
                                    </div>
                                    <div class="form-group  w-50 m-2">
                                        <label for="exampleFormControlInput1">Department </label>
                                        <select
                                            class="form-select "
                                            name='department'
                                            onChange={formik.handleChange}
                                        >
                                            <option disabled selected='selected'>Select </option>
                                            {getAllDepartmentReducer?.map
                                                ((department) => {
                                                    return <option value={department.department} selected={formik?.values?.department == department.department ? 'selected' : ''}>
                                                        {department.department}
                                                    </option>
                                                })
                                            }
                                        </select>

                                        {formik.touched.department && formik.errors.department ? (
                                            <span className="text-danger">{formik.errors.department}</span>
                                        ) : null}

                                    </div>
                                </div>
                            </div>
                        </form>
                    )}
                </Formik>
            </div >
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



