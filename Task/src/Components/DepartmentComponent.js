import React, { useEffect, useRef, useState } from 'react'
import {
    getAllDepartment,
    getDepartmentById,
    addNewDepartment,
    updateDepartmentDetails,
    removeDepartment,
} from '../Redux/Actions/Actions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import DataTable from './DataTable';
import Modal from 'react-modal';


function DepartmentComponent({
    getAllDepartmentReducer, addNewDepartmentProps, updateDepartmentProps, RemoveDepartmentProps,
    getAllDepartmentAction, addNewDepartmentAction, updateDepartmentDetailsAction, removeDepartmentAction, }) {

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '25%',
        },
    };

    const [tableData, setTableData] = useState([])
    const [modalIsOpen, setIsOpen] = React.useState(false);

    const TableColumns = [
        { Header: 'id', accessor: 'id', },
        { Header: 'Department', accessor: 'department', },
        { Header: 'Details', accessor: 'details', },
        { Header: 'Action', accessor: 'aciton', },
    ];

    const formik = useFormik({
        initialValues: {
            department: '',
            details: ''
        },
        validationSchema: Yup.object().shape({
            department: Yup.string().required("Please enter department"),
            details: Yup.string().required("Please enter department details")
        }),

        onSubmit: (values, { resetForm }) => {
            if (values.id) {
                updateDepartmentDetailsAction(values.id, values)
            }
            else {
                let maxid = 0
                getAllDepartmentReducer.forEach(record => {
                    if (maxid < record.id) {
                        maxid = record.id
                    }
                })
                addNewDepartmentAction({ 'id': maxid + 1, 'department': values.department, 'details': values.details })
            }
            setIsOpen(false);
            resetForm();
        }
    });

    useEffect(() => {
        getAllDepartmentAction()
    }, [addNewDepartmentProps, updateDepartmentProps, RemoveDepartmentProps])

    useEffect(() => {
        if (getAllDepartmentReducer) {
            setTableData(getAllDepartmentReducer.map(record => {
                return {
                    id: record.id,
                    department: record.department,
                    details: record.details,
                    aciton: <div className='btn-group'>
                        <button type="button" className="btn btn-primary btn-sm" onClick={() => onUpdateDepartment(record)}>Edit</button>
                        <button type="button" className="btn btn-danger btn-sm" onClick={() => onRemoveDepartment(record)}>Remove</button>
                    </div>
                }
            }))
        }
    }, [getAllDepartmentReducer,])


    const onSearchFilter = (event) => {
        let tempList = []
        getAllDepartmentReducer.forEach(record => {
            
            if (record.department.toLowerCase().includes(event.target.value) || record.details.toLowerCase().includes(event.target.value)) {
                tempList.push({
                    id: record.id,
                    department: record.department,
                    details: record.details,
                    aciton: <div className='btn-group'>
                        <button type="button" className="btn btn-primary btn-sm" onClick={() => onUpdateDepartment(record)}>Edit</button>
                        <button type="button" className="btn btn-danger btn-sm" onClick={() => onRemoveDepartment(record)} >Remove</button>
                    </div>
                })
            }
        })
        setTableData(tempList);
    }

    const onUpdateDepartment = (data) => {
        formik.setValues(data);
        setIsOpen(true)
    }

    const onRemoveDepartment = (id) => {
        removeDepartmentAction(id)
    }



    console.log(formik.values)


    return <div className='container' >
        <div className='card mt-5 shadow'>
            <div className='card-header'>
                <div className='btn-group w-100 ' >
                    <Link to={'/'} className='btn btn-primary  ' >Employee</Link>
                    <Link to={'/department'} className='btn btn-primary  '>Department</Link>
                </div>
            </div>
            <div className='card-body'>
                <div className='d-flex justify-content-between'>
                    <h2 className="content-header-title float-start mb-0">Department List</h2>
                    <div className='d-flex'>
                        <input type='text' className='form-control-sm m-2' placeholder='Search' onChange={onSearchFilter} />
                        <button className='btn btn-primary btn-sm m-2' onClick={() => setIsOpen(true)}>Add Department </button>
                    </div>
                </div>
                <DataTable columns={TableColumns} tableData={tableData} />
            </div >
            <div>
                <Modal
                    isOpen={modalIsOpen}
                    // onAfterOpen={afterOpenModal}
                    // onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <div className='modal-header'>
                        <h2 >Add Department</h2>
                        <button className='btn btn-danger  btn-sm' onClick={() => { setIsOpen(false) }}> X</button>
                    </div>

                    <Formik
                        initialValues={formik.initialValues}
                        enableReinitialize={true}
                        validateOnChange={false}
                        validateOnBlur={false}
                        onSubmit={values => formik.handleSubmit(values)}>

                        {props => (

                            <form onSubmit={props.handleSubmit}>
                                <div >
                                    <div >
                                        <div class="form-group ">
                                            <label className=''>Department</label>
                                            <input className=''
                                                id="department"
                                                name="department"
                                                type="text"
                                                class="form-control"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.department}
                                            />
                                            {formik.touched.department && formik.errors.department ? (
                                                <span className="text-danger">{formik.errors.department}</span>
                                            ) : null}
                                        </div>

                                        <div class="form-group ">
                                            <label className=''>Details</label>
                                            <input className=''
                                                id="details"
                                                name="details"
                                                type="text"
                                                class="form-control"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.details}
                                            />
                                            {formik.touched.details && formik.errors.details ? (
                                                <span className="text-danger">{formik.errors.details}</span>) : null}
                                        </div>

                                        <div className='d-flex btn-group mt-3'>
                                            {formik.values.details?.id ?
                                                <button className='btn btn-primary btn-sm' onClick={() => { }}>Update </button >
                                                : <button type='submit' className='btn btn-primary btn-sm' >Save </button >}
                                            <button className='btn btn-danger btn-sm' onClick={() => { setIsOpen(false) }}>Cancel</button >
                                        </div>
                                    </div>
                                </div>
                            </form>
                        )}

                    </Formik>
                </Modal>
            </div>
        </div>
    </div >
}

const mapStatetoProps = (state) => {
    return {
        getAllDepartmentReducer: state.getAllDepartmentReducer?.DepartmentList,
        addNewDepartmentProps: state.addNewDepartmentReducer?.DepartmentList,
        updateDepartmentProps: state.updateDepartmentReducer?.DepartmentList,
        RemoveDepartmentProps: state.RemoveDepartmentReducer?.DepartmentList,
    }
}
const mapDispatchtoProps = {
    getAllDepartmentAction: () => getAllDepartment(),
    getDepartmentByIdAction: (is) => getDepartmentById(is),
    addNewDepartmentAction: (details) => addNewDepartment(details),
    updateDepartmentDetailsAction: (id, details) => updateDepartmentDetails(id, details),
    removeDepartmentAction: (id) => removeDepartment(id),

}

export default connect(mapStatetoProps, mapDispatchtoProps)(DepartmentComponent)



