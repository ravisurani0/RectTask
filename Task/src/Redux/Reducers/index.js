import Constants from '../Constants'
import { combineReducers } from "redux"

export const getAllEmployeeReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.GET_ALL_EMPLOYEE_SUCESS: {
            return { ...state, EmployeeList: action.data, Loading: false }
        }
        default:
            return { ...state }
    }
}

export const getEmployeeByIdReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.GET_EMPLOYEE_BY_ID_SUCESS: {
            return { ...state, EmployeeDetails: action.data, Loading: false }
        }
        default:
            return { ...state }
    }
}

export const addNewEmployeeReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.ADD_EMPLOYEE_SUCESS: {
            return { ...state, EmployeeList: action.data, Loading: false }
        }
        default:
            return { ...state }
    }
}

export const updateEmployeeReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.UPDATE_EMPLOYEE_SUCESS: {
            return { ...state, EmployeeList: action.data, Loading: false }
        }
        default:
            return { ...state }
    }
}

export const RemoveEmployeeReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.REMOVE_EMPLOYEE_SUCESS: {

            return { ...state, EmployeeList: action.data, Loading: false }
        }
        default:
            return { ...state }
    }
}


export const getAllDepartmentReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.GET_ALL_DEPARTMENT_SUCESS: {
            return { ...state, DepartmentList: action.data || [], Loading: false }
        }
        default:
            return { ...state }
    }
}

export const addNewDepartmentReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.ADD_DEPARTMENT_SUCESS: {
            return { ...state, DepartmentList: action.data, Loading: false }
        }
        default:
            return { ...state }
    }
}

export const updateDepartmentReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.UPDATE_DEPARTMENT_SUCESS: {
            return { ...state, DepartmentList: action.data, Loading: false }
        }
        default:
            return { ...state }
    }
}

export const RemoveDepartmentReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.REMOVE_DEPARTMENT_SUCESS: {
            return { ...state, DepartmentList: action.data, Loading: false }
        }
        default:
            return { ...state }
    }
}

export const MainReducer = combineReducers({
    getAllEmployeeReducer, addNewEmployeeReducer, updateEmployeeReducer, RemoveEmployeeReducer, getEmployeeByIdReducer,
    getAllDepartmentReducer, addNewDepartmentReducer, updateDepartmentReducer, RemoveDepartmentReducer
})

