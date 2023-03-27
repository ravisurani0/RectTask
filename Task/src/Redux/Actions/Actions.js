import Constants from "../Constants"

const getAllEmployee = () => {
    return (Dispatch) => {

        Dispatch({ type: Constants.GET_ALL_EMPLOYEE_SUCESS, data: JSON.parse(localStorage.getItem('Employee')) })
    }
}

const getEmployeeById = (id) => {
    return (Dispatch) => {
        let EmployeeList = JSON.parse(localStorage.getItem('Employee'))

        return Dispatch({ type: Constants.GET_EMPLOYEE_BY_ID_SUCESS, data: EmployeeList[id] })
    }
}

const addNewEmployee = (details) => {
    return (Dispatch) => {
        let EmployeeList = JSON.parse(localStorage.getItem('Employee'))
        if (EmployeeList) {
            EmployeeList.push(details)
        }
        else {
            EmployeeList = [details]
        }
        localStorage.setItem('Employee', JSON.stringify(EmployeeList))
        return Dispatch({ type: Constants.ADD_EMPLOYEE_SUCESS, data: details })
    }
}

const updateEmployeeDetails = (id, details) => {
    return (Dispatch) => {
        let EmployeeList = JSON.parse(localStorage.getItem('Employee'))

        EmployeeList[id] = details
        localStorage.setItem('Employee', JSON.stringify(EmployeeList))
        return Dispatch({ type: Constants.UPDATE_EMPLOYEE_SUCESS, data: { details } });
    }
}

const removeEmployee = (id) => {
    return (Dispatch) => {
        let EmployeeList = JSON.parse(localStorage.getItem('Employee'))
        EmployeeList.splice(id, 1);
        localStorage.setItem('Employee', JSON.stringify(EmployeeList))
        return Dispatch({ type: Constants.REMOVE_EMPLOYEE_SUCESS, data: EmployeeList })
    }
}

const getAllDepartment = () => {
    return (Dispatch) => {
        Dispatch({ type: Constants.GET_ALL_DEPARTMENT_SUCESS, data: JSON.parse(localStorage.getItem('Department')) })
    }
}

const getDepartmentById = (details) => {
    return (Dispatch) => {
        let DepartmentList = JSON.parse(localStorage.getItem('Department'))
        DepartmentList.splice(DepartmentList.findIndex(department => department.department = details.department), 1)
        localStorage.setItem('Department', JSON.stringify(DepartmentList))

        return Dispatch({ type: Constants.GET_DEPARTMENT_BY_ID_SUCESS, data: DepartmentList })
    }
}

const addNewDepartment = (details) => {
    return (Dispatch) => {

        let DepartmentList = JSON.parse(localStorage.getItem('Department'))
        if (DepartmentList) {
            DepartmentList.push(details)
        }
        else {
            DepartmentList = [details]
        }
        localStorage.setItem('Department', JSON.stringify(DepartmentList))
        return Dispatch({ type: Constants.ADD_DEPARTMENT_SUCESS, data: DepartmentList })
    }
}

const updateDepartmentDetails = (id, details) => {
    return (Dispatch) => {
        let DepartmentList = JSON.parse(localStorage.getItem('Department'))

        DepartmentList[id] = details

        localStorage.setItem('Department', JSON.stringify(DepartmentList))
        return Dispatch({ type: Constants.UPDATE_DEPARTMENT_SUCESS, data: DepartmentList });
    }
}

const removeDepartment = (id) => {
    return (Dispatch) => {
        let DepartmentList = JSON.parse(localStorage.getItem('Department'))
        DepartmentList.splice(id, 1)
        localStorage.setItem('Department', JSON.stringify(DepartmentList))

        return Dispatch({ type: Constants.REMOVE_DEPARTMENT_SUCESS, data: DepartmentList })
    }
}



export {

    getAllEmployee,
    getEmployeeById,
    addNewEmployee,
    updateEmployeeDetails,
    removeEmployee,

    getAllDepartment,
    getDepartmentById,
    addNewDepartment,
    updateDepartmentDetails,
    removeDepartment,

}