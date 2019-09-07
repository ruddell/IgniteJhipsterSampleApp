import { takeLatest, all } from 'redux-saga/effects'
import API from '../services/api'
import FixtureAPI from '../services/fixture-api'
import DebugConfig from '../../config/debug-config'

/* ------------- Types ------------- */

import { StartupTypes } from '../reducers/startup.reducer'
import { LoginTypes } from '../../modules/login/login.reducer'
import { AccountTypes } from '../../shared/reducers/account.reducer'
import { RegisterTypes } from '../../modules/account/register/register.reducer'
import { ForgotPasswordTypes } from '../../modules/account/password-reset/forgot-password.reducer'
import { ChangePasswordTypes } from '../../modules/account/password/change-password.reducer'
import { UserTypes } from '../../shared/reducers/user.reducer'
import { RegionTypes } from '../../modules/entities/region/region.reducer'
import { CountryTypes } from '../../modules/entities/country/country.reducer'
import { LocationTypes } from '../../modules/entities/location/location.reducer'
import { DepartmentTypes } from '../../modules/entities/department/department.reducer'
import { TaskTypes } from '../../modules/entities/task/task.reducer'
import { EmployeeTypes } from '../../modules/entities/employee/employee.reducer'
import { JobTypes } from '../../modules/entities/job/job.reducer'
import { JobHistoryTypes } from '../../modules/entities/job-history/job-history.reducer'
// ignite-jhipster-saga-redux-import-needle

/* ------------- Sagas ------------- */

import { startup } from './startup.saga'
import { login, logout, loginLoad } from '../../modules/login/login.sagas'
import { register } from '../../modules/account/register/register.sagas'
import { forgotPassword } from '../../modules/account/password-reset/forgot-password.sagas'
import { changePassword } from '../../modules/account/password/change-password.sagas'
import { getAccount, updateAccount } from '../../shared/sagas/account.sagas'
import { getUser, getUsers, updateUser, deleteUser } from '../../shared/sagas/user.sagas'
import { getRegion, getRegions, updateRegion, deleteRegion } from '../../modules/entities/region/region.sagas'
import { getCountry, getCountries, updateCountry, deleteCountry } from '../../modules/entities/country/country.sagas'
import { getLocation, getLocations, updateLocation, deleteLocation } from '../../modules/entities/location/location.sagas'
import { getDepartment, getDepartments, updateDepartment, deleteDepartment } from '../../modules/entities/department/department.sagas'
import { getTask, getTasks, updateTask, deleteTask } from '../../modules/entities/task/task.sagas'
import { getEmployee, getEmployees, updateEmployee, deleteEmployee } from '../../modules/entities/employee/employee.sagas'
import { getJob, getJobs, updateJob, deleteJob } from '../../modules/entities/job/job.sagas'
import { getJobHistory, getJobHistories, updateJobHistory, deleteJobHistory } from '../../modules/entities/job-history/job-history.sagas'
// ignite-jhipster-saga-method-import-needle

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // JHipster accounts
    takeLatest(LoginTypes.LOGIN_LOAD, loginLoad, api),
    takeLatest(LoginTypes.LOGIN_REQUEST, login, api),
    takeLatest(LoginTypes.LOGOUT_REQUEST, logout, api),
    takeLatest(RegisterTypes.REGISTER_REQUEST, register, api),
    takeLatest(ForgotPasswordTypes.FORGOT_PASSWORD_REQUEST, forgotPassword, api),
    takeLatest(ChangePasswordTypes.CHANGE_PASSWORD_REQUEST, changePassword, api),

    takeLatest(RegionTypes.REGION_REQUEST, getRegion, api),
    takeLatest(RegionTypes.REGION_ALL_REQUEST, getRegions, api),
    takeLatest(RegionTypes.REGION_UPDATE_REQUEST, updateRegion, api),
    takeLatest(RegionTypes.REGION_DELETE_REQUEST, deleteRegion, api),

    takeLatest(CountryTypes.COUNTRY_REQUEST, getCountry, api),
    takeLatest(CountryTypes.COUNTRY_ALL_REQUEST, getCountries, api),
    takeLatest(CountryTypes.COUNTRY_UPDATE_REQUEST, updateCountry, api),
    takeLatest(CountryTypes.COUNTRY_DELETE_REQUEST, deleteCountry, api),

    takeLatest(LocationTypes.LOCATION_REQUEST, getLocation, api),
    takeLatest(LocationTypes.LOCATION_ALL_REQUEST, getLocations, api),
    takeLatest(LocationTypes.LOCATION_UPDATE_REQUEST, updateLocation, api),
    takeLatest(LocationTypes.LOCATION_DELETE_REQUEST, deleteLocation, api),

    takeLatest(DepartmentTypes.DEPARTMENT_REQUEST, getDepartment, api),
    takeLatest(DepartmentTypes.DEPARTMENT_ALL_REQUEST, getDepartments, api),
    takeLatest(DepartmentTypes.DEPARTMENT_UPDATE_REQUEST, updateDepartment, api),
    takeLatest(DepartmentTypes.DEPARTMENT_DELETE_REQUEST, deleteDepartment, api),

    takeLatest(TaskTypes.TASK_REQUEST, getTask, api),
    takeLatest(TaskTypes.TASK_ALL_REQUEST, getTasks, api),
    takeLatest(TaskTypes.TASK_UPDATE_REQUEST, updateTask, api),
    takeLatest(TaskTypes.TASK_DELETE_REQUEST, deleteTask, api),

    takeLatest(EmployeeTypes.EMPLOYEE_REQUEST, getEmployee, api),
    takeLatest(EmployeeTypes.EMPLOYEE_ALL_REQUEST, getEmployees, api),
    takeLatest(EmployeeTypes.EMPLOYEE_UPDATE_REQUEST, updateEmployee, api),
    takeLatest(EmployeeTypes.EMPLOYEE_DELETE_REQUEST, deleteEmployee, api),

    takeLatest(JobTypes.JOB_REQUEST, getJob, api),
    takeLatest(JobTypes.JOB_ALL_REQUEST, getJobs, api),
    takeLatest(JobTypes.JOB_UPDATE_REQUEST, updateJob, api),
    takeLatest(JobTypes.JOB_DELETE_REQUEST, deleteJob, api),

    takeLatest(JobHistoryTypes.JOB_HISTORY_REQUEST, getJobHistory, api),
    takeLatest(JobHistoryTypes.JOB_HISTORY_ALL_REQUEST, getJobHistories, api),
    takeLatest(JobHistoryTypes.JOB_HISTORY_UPDATE_REQUEST, updateJobHistory, api),
    takeLatest(JobHistoryTypes.JOB_HISTORY_DELETE_REQUEST, deleteJobHistory, api),
    // ignite-jhipster-saga-redux-connect-needle

    takeLatest(UserTypes.USER_REQUEST, getUser, api),
    takeLatest(UserTypes.USER_ALL_REQUEST, getUsers, api),
    takeLatest(UserTypes.USER_UPDATE_REQUEST, updateUser, api),
    takeLatest(UserTypes.USER_DELETE_REQUEST, deleteUser, api),

    takeLatest(AccountTypes.ACCOUNT_REQUEST, getAccount, api),
    takeLatest(AccountTypes.ACCOUNT_UPDATE_REQUEST, updateAccount, api)
  ])
}
