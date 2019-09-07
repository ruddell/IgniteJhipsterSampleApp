import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  departmentRequest: ['departmentId'],
  departmentAllRequest: ['options'],
  departmentUpdateRequest: ['department'],
  departmentDeleteRequest: ['departmentId'],

  departmentSuccess: ['department'],
  departmentAllSuccess: ['departments'],
  departmentUpdateSuccess: ['department'],
  departmentDeleteSuccess: [],

  departmentFailure: ['error'],
  departmentAllFailure: ['error'],
  departmentUpdateFailure: ['error'],
  departmentDeleteFailure: ['error']
})

export const DepartmentTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  deleting: null,
  department: null,
  departments: null,
  errorOne: null,
  errorAll: null,
  errorUpdating: null,
  errorDeleting: null
})

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) =>
  state.merge({
    fetchingOne: true,
    department: null
  })

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    departments: null
  })

// request to update from an api
export const updateRequest = (state) =>
  state.merge({
    updating: true
  })
// request to delete from an api
export const deleteRequest = (state) =>
  state.merge({
    deleting: true
  })

// successful api lookup for single entity
export const success = (state, action) => {
  const { department } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    department
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { departments } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    departments
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { department } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    department
  })
}
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    department: null
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    department: null
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    departments: null
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    department: state.department
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    department: state.department
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DEPARTMENT_REQUEST]: request,
  [Types.DEPARTMENT_ALL_REQUEST]: allRequest,
  [Types.DEPARTMENT_UPDATE_REQUEST]: updateRequest,
  [Types.DEPARTMENT_DELETE_REQUEST]: deleteRequest,

  [Types.DEPARTMENT_SUCCESS]: success,
  [Types.DEPARTMENT_ALL_SUCCESS]: allSuccess,
  [Types.DEPARTMENT_UPDATE_SUCCESS]: updateSuccess,
  [Types.DEPARTMENT_DELETE_SUCCESS]: deleteSuccess,

  [Types.DEPARTMENT_FAILURE]: failure,
  [Types.DEPARTMENT_ALL_FAILURE]: allFailure,
  [Types.DEPARTMENT_UPDATE_FAILURE]: updateFailure,
  [Types.DEPARTMENT_DELETE_FAILURE]: deleteFailure
})
