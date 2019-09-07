import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  regionRequest: ['regionId'],
  regionAllRequest: ['options'],
  regionUpdateRequest: ['region'],
  regionDeleteRequest: ['regionId'],

  regionSuccess: ['region'],
  regionAllSuccess: ['regions'],
  regionUpdateSuccess: ['region'],
  regionDeleteSuccess: [],

  regionFailure: ['error'],
  regionAllFailure: ['error'],
  regionUpdateFailure: ['error'],
  regionDeleteFailure: ['error']
})

export const RegionTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  deleting: null,
  region: null,
  regions: null,
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
    region: null
  })

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    regions: null
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
  const { region } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    region
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { regions } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    regions
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { region } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    region
  })
}
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    region: null
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    region: null
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    regions: null
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    region: state.region
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    region: state.region
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REGION_REQUEST]: request,
  [Types.REGION_ALL_REQUEST]: allRequest,
  [Types.REGION_UPDATE_REQUEST]: updateRequest,
  [Types.REGION_DELETE_REQUEST]: deleteRequest,

  [Types.REGION_SUCCESS]: success,
  [Types.REGION_ALL_SUCCESS]: allSuccess,
  [Types.REGION_UPDATE_SUCCESS]: updateSuccess,
  [Types.REGION_DELETE_SUCCESS]: deleteSuccess,

  [Types.REGION_FAILURE]: failure,
  [Types.REGION_ALL_FAILURE]: allFailure,
  [Types.REGION_UPDATE_FAILURE]: updateFailure,
  [Types.REGION_DELETE_FAILURE]: deleteFailure
})
