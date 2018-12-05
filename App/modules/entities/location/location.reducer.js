import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  locationRequest: ['locationId'],
  locationAllRequest: ['options'],
  locationUpdateRequest: ['location'],
  locationDeleteRequest: ['locationId'],

  locationSuccess: ['location'],
  locationAllSuccess: ['locations'],
  locationUpdateSuccess: ['location'],
  locationDeleteSuccess: [],

  locationFailure: ['error'],
  locationAllFailure: ['error'],
  locationUpdateFailure: ['error'],
  locationDeleteFailure: ['error']
})

export const LocationTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  deleting: null,
  location: null,
  locations: null,
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
    location: null
  })

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    locations: null
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
  const { location } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    location
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { locations } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    locations
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { location } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    location
  })
}
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    location: null
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    location: null
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    locations: null
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    location: state.location
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    location: state.location
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOCATION_REQUEST]: request,
  [Types.LOCATION_ALL_REQUEST]: allRequest,
  [Types.LOCATION_UPDATE_REQUEST]: updateRequest,
  [Types.LOCATION_DELETE_REQUEST]: deleteRequest,

  [Types.LOCATION_SUCCESS]: success,
  [Types.LOCATION_ALL_SUCCESS]: allSuccess,
  [Types.LOCATION_UPDATE_SUCCESS]: updateSuccess,
  [Types.LOCATION_DELETE_SUCCESS]: deleteSuccess,

  [Types.LOCATION_FAILURE]: failure,
  [Types.LOCATION_ALL_FAILURE]: allFailure,
  [Types.LOCATION_UPDATE_FAILURE]: updateFailure,
  [Types.LOCATION_DELETE_FAILURE]: deleteFailure
})
