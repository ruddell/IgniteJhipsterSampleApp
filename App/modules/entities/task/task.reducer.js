import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  taskRequest: ['taskId'],
  taskAllRequest: ['options'],
  taskUpdateRequest: ['task'],
  taskDeleteRequest: ['taskId'],

  taskSuccess: ['task'],
  taskAllSuccess: ['tasks'],
  taskUpdateSuccess: ['task'],
  taskDeleteSuccess: [],

  taskFailure: ['error'],
  taskAllFailure: ['error'],
  taskUpdateFailure: ['error'],
  taskDeleteFailure: ['error']
})

export const TaskTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  deleting: null,
  task: null,
  tasks: null,
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
    task: null
  })

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    tasks: null
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
  const { task } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    task
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { tasks } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    tasks
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { task } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    task
  })
}
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    task: null
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    task: null
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    tasks: null
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    task: state.task
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    task: state.task
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TASK_REQUEST]: request,
  [Types.TASK_ALL_REQUEST]: allRequest,
  [Types.TASK_UPDATE_REQUEST]: updateRequest,
  [Types.TASK_DELETE_REQUEST]: deleteRequest,

  [Types.TASK_SUCCESS]: success,
  [Types.TASK_ALL_SUCCESS]: allSuccess,
  [Types.TASK_UPDATE_SUCCESS]: updateSuccess,
  [Types.TASK_DELETE_SUCCESS]: deleteSuccess,

  [Types.TASK_FAILURE]: failure,
  [Types.TASK_ALL_FAILURE]: allFailure,
  [Types.TASK_UPDATE_FAILURE]: updateFailure,
  [Types.TASK_DELETE_FAILURE]: deleteFailure
})
