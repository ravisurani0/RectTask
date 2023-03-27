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

function DepartmentComponent({
    getAllDepartmentReducer, addNewDepartmentProps, updateDepartmentProps, RemoveDepartmentProps,
    getAllDepartmentAction, getDepartmentByIdAction, addNewDepartmentAction, updateDepartmentDetailsAction, removeDepartmentAction, }) {

    const [filteredDepartmentList, setFilteredDepartmentList] = useState(getAllDepartmentReducer);
    const [formData, setFormData] = useState(null);
    const [showError, setShowError] = useState(null);

    useEffect(() => {
        getAllDepartmentAction()
    }, [addNewDepartmentProps, updateDepartmentProps, RemoveDepartmentProps])

    useEffect(() => {
        if (getAllDepartmentReducer) {
            setFilteredDepartmentList(getAllDepartmentReducer)
        }
    }, [getAllDepartmentReducer,])

    const onInputChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
        setShowError(null)
    }

    const saveDepartment = () => {
        if (formData?.department?.length > 0 && formData?.departmentDetails?.length > 0) {
            addNewDepartmentAction({ 'department': formData.department, 'departmentDetails': formData.departmentDetails })
            setShowError(null)
            setFormData(null)
        }
        else {
            setShowError("Enter Valid Details.");
        }
    }

    const onSearchFilter = (event) => {
        setFilteredDepartmentList(getAllDepartmentReducer.filter(department => department.department.toLowerCase().includes(event.target.value) || department.departmentDetails.toLowerCase().includes(event.target.value)))
    }

    const onUpdateDepartment = () => {
        if (formData?.department?.length > 0 && formData?.departmentDetails?.length > 0) {
            
            updateDepartmentDetailsAction(formData.index, { 'department': formData.department, 'departmentDetails': formData.departmentDetails })
            setShowError(null)
            setFormData(null)
        }
        else {
            setShowError("Enter Valid Details.");
        }
    }

    const onRemoveDepartment = (id) => {

        removeDepartmentAction(id)
    }

    console.log(formData)




    return <>
        <div className='btn-group w-100 my-3' >
            <Link to={'/'} className='btn btn-primary  ' >Employee
            </Link>

            <Link to={'/department'} className='btn btn-primary  '>Department
            </Link>

        </div>
        <div className='container ' >
            <div className='d-flex justify-content-between'>

                <h2 className="content-header-title float-start mb-0">Department List</h2>
                <div className='d-flex'>
                    <input type='text' className='form-control-sm m-2' placeholder='Search' onChange={onSearchFilter} />

                    <button className='btn btn-primary btn-sm m-2' onClick={() => setFormData({

                    })}>Add Department </button>
                </div>   </div>
            {showError &&
                <div className='bg-danger-subtle p-2'>
                    {showError}</div>}
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">
                            Department
                        </th>
                        <th scope="col">
                            Details
                        </th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {formData &&
                        <tr>
                            <th>#</th>
                            <td>
                                <input type='text' className={'form-control-sm ' + (showError ? 'border-danger' : '')} name="department" value={formData?.department} onChange={onInputChange} /></td>
                            <td>
                                <input type='text' className={'form-control-sm ' + (showError ? 'border-danger' : '')} name="departmentDetails" value={formData?.departmentDetails} onChange={onInputChange} /></td>
                            <td >
                                <div className='btn-group btn-group-sm'>
                                    {formData?.index ?
                                        <button className='btn btn-primary' onClick={onUpdateDepartment}>Update </button >
                                        :
                                        <button className='btn btn-primary' onClick={saveDepartment}>Save </button >
                                    }
                                    <button className='btn btn-danger' onClick={() => {
                                        setFormData(null)
                                        setShowError(null)
                                    }}>Cancle </button >
                                </div>
                            </td>
                        </tr>
                    }
                    {filteredDepartmentList?.length ? filteredDepartmentList.map((department, index) => <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{department.department}</td>
                        <td>{department.departmentDetails}</td>

                        <td >
                            <div className='btn-group btn-group-sm'>
                                <button className='btn btn-primary' onClick={() => setFormData({ ...department, 'index': String(index) })}>Change </button >
                                <button className='btn btn-danger' onClick={() => { onRemoveDepartment(index) }

                                }>Rmove </button >
                            </div>
                        </td>
                    </tr>
                    )
                        :
                        <tr>
                            <td colSpan={4} className="text-center">No Data Found</td>
                        </tr>

                    }

                </tbody>
            </table>
        </div >
    </>

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



