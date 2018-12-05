// a library to wrap and simplify api calls
import apisauce from 'apisauce'

import AppConfig from '../../config/app-config'

// our "constructor"
const create = (baseURL = AppConfig.apiUrl) => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 10000
  })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const setAuthToken = (userAuth) => api.setHeader('Authorization', 'Bearer ' + userAuth)
  const removeAuthToken = () => api.deleteHeader('Authorization')
  const login = (userAuth) => api.post('api/authenticate', userAuth)
  const register = (user) => api.post('api/register', user)
  const forgotPassword = (data) => api.post('api/account/reset-password/init', data, {headers: {'Content-Type': 'text/plain', 'Accept': 'application/json, text/plain, */*'}})

  const getAccount = () => api.get('api/account')
  const updateAccount = (account) => api.post('api/account', account)
  const changePassword = (currentPassword, newPassword) => api.post('api/account/change-password', {currentPassword, newPassword}, {headers: {'Content-Type': 'application/json', 'Accept': 'application/json, text/plain, */*'}})

  const getUser = (userId) => api.get('api/users/' + userId)
  const getUsers = (options) => api.get('api/users', options)
  const createUser = (user) => api.post('api/users', user)
  const updateUser = (user) => api.put('api/users', user)
  const deleteUser = (userId) => api.delete('api/users/' + userId)

  const getRegion = (regionId) => api.get('api/regions/' + regionId)
  const getRegions = (options) => api.get('api/regions', options)
  const createRegion = (region) => api.post('api/regions', region)
  const updateRegion = (region) => api.put('api/regions', region)
  const deleteRegion = (regionId) => api.delete('api/regions/' + regionId)

  const getCountry = (countryId) => api.get('api/countries/' + countryId)
  const getCountries = (options) => api.get('api/countries', options)
  const createCountry = (country) => api.post('api/countries', country)
  const updateCountry = (country) => api.put('api/countries', country)
  const deleteCountry = (countryId) => api.delete('api/countries/' + countryId)

  const getLocation = (locationId) => api.get('api/locations/' + locationId)
  const getLocations = (options) => api.get('api/locations', options)
  const createLocation = (location) => api.post('api/locations', location)
  const updateLocation = (location) => api.put('api/locations', location)
  const deleteLocation = (locationId) => api.delete('api/locations/' + locationId)

  const getDepartment = (departmentId) => api.get('api/departments/' + departmentId)
  const getDepartments = (options) => api.get('api/departments', options)
  const createDepartment = (department) => api.post('api/departments', department)
  const updateDepartment = (department) => api.put('api/departments', department)
  const deleteDepartment = (departmentId) => api.delete('api/departments/' + departmentId)

  const getTask = (taskId) => api.get('api/tasks/' + taskId)
  const getTasks = (options) => api.get('api/tasks', options)
  const createTask = (task) => api.post('api/tasks', task)
  const updateTask = (task) => api.put('api/tasks', task)
  const deleteTask = (taskId) => api.delete('api/tasks/' + taskId)

  const getEmployee = (employeeId) => api.get('api/employees/' + employeeId)
  const getEmployees = (options) => api.get('api/employees', options)
  const createEmployee = (employee) => api.post('api/employees', employee)
  const updateEmployee = (employee) => api.put('api/employees', employee)
  const deleteEmployee = (employeeId) => api.delete('api/employees/' + employeeId)

  const getJob = (jobId) => api.get('api/jobs/' + jobId)
  const getJobs = (options) => api.get('api/jobs', options)
  const createJob = (job) => api.post('api/jobs', job)
  const updateJob = (job) => api.put('api/jobs', job)
  const deleteJob = (jobId) => api.delete('api/jobs/' + jobId)

  const getJobHistory = (jobHistoryId) => api.get('api/job-histories/' + jobHistoryId)
  const getJobHistories = (options) => api.get('api/job-histories', options)
  const createJobHistory = (jobHistory) => api.post('api/job-histories', jobHistory)
  const updateJobHistory = (jobHistory) => api.put('api/job-histories', jobHistory)
  const deleteJobHistory = (jobHistoryId) => api.delete('api/job-histories/' + jobHistoryId)
  // ignite-jhipster-api-method-needle

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    createUser,
    updateUser,
    getUsers,
    getUser,
    deleteUser,

    createRegion,
    updateRegion,
    getRegions,
    getRegion,
    deleteRegion,

    createCountry,
    updateCountry,
    getCountries,
    getCountry,
    deleteCountry,

    createLocation,
    updateLocation,
    getLocations,
    getLocation,
    deleteLocation,

    createDepartment,
    updateDepartment,
    getDepartments,
    getDepartment,
    deleteDepartment,

    createTask,
    updateTask,
    getTasks,
    getTask,
    deleteTask,

    createEmployee,
    updateEmployee,
    getEmployees,
    getEmployee,
    deleteEmployee,

    createJob,
    updateJob,
    getJobs,
    getJob,
    deleteJob,

    createJobHistory,
    updateJobHistory,
    getJobHistories,
    getJobHistory,
    deleteJobHistory,
    // ignite-jhipster-api-export-needle
    setAuthToken,
    removeAuthToken,
    login,
    register,
    forgotPassword,
    getAccount,
    updateAccount,
    changePassword
  }
}

// let's return back our create method as the default.
export default {
  create
}
