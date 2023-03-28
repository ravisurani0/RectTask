import Constants from "../Constants"

const getAllEmployee = () => {
    return (Dispatch) => {

        Dispatch({ type: Constants.GET_ALL_EMPLOYEE_SUCESS, data: JSON.parse(localStorage.getItem('Employee')) })
    }
}

const getEmployeeById = (id) => {
    return (Dispatch) => {
        let EmployeeList = JSON.parse(localStorage.getItem('Employee'));

        return Dispatch({ type: Constants.GET_EMPLOYEE_BY_ID_SUCESS, data: EmployeeList.find(recored => recored.id == id) });
    }
}

const addNewEmployee = (details) => {
    return (Dispatch) => {
        let EmployeeList = JSON.parse(localStorage.getItem('Employee'))
        if (EmployeeList) {
            details.id = EmployeeList.length + 1;
            EmployeeList.push(details)
        }
        else {
            details.id = 1
            EmployeeList = [details]
        }
        localStorage.setItem('Employee', JSON.stringify(EmployeeList))
        return Dispatch({ type: Constants.ADD_EMPLOYEE_SUCESS, data: details })
    }
}

const updateEmployeeDetails = (id, details) => {
    return (Dispatch) => {
        let EmployeeList = JSON.parse(localStorage.getItem('Employee'))
        EmployeeList[EmployeeList.findIndex(record => record.id == id)] = details;
        localStorage.setItem('Employee', JSON.stringify(EmployeeList))
        return Dispatch({ type: Constants.UPDATE_EMPLOYEE_SUCESS, data: { details } });
    }
}

const removeEmployee = (id) => {
    return (Dispatch) => {
        let EmployeeList = JSON.parse(localStorage.getItem('Employee'))

        EmployeeList.splice(EmployeeList.findIndex(record => record.id == id), 1);

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
        DepartmentList[DepartmentList.findIndex(record => record.id == id)] = details
        localStorage.setItem('Department', JSON.stringify(DepartmentList))
        return Dispatch({ type: Constants.UPDATE_DEPARTMENT_SUCESS, data: DepartmentList });
    }
}

const removeDepartment = (id) => {
    return (Dispatch) => {
        let DepartmentList = JSON.parse(localStorage.getItem('Department'))
        DepartmentList.splice(DepartmentList.findIndex(record => record.id == id.id), 1)
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
