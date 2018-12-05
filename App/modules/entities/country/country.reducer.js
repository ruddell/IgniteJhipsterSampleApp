import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  countryRequest: ['countryId'],
  countryAllRequest: ['options'],
  countryUpdateRequest: ['country'],
  countryDeleteRequest: ['countryId'],

  countrySuccess: ['country'],
  countryAllSuccess: ['countries'],
  countryUpdateSuccess: ['country'],
  countryDeleteSuccess: [],

  countryFailure: ['error'],
  countryAllFailure: ['error'],
  countryUpdateFailure: ['error'],
  countryDeleteFailure: ['error']
})

export const CountryTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  deleting: null,
  country: null,
  countries: null,
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
    country: null
  })

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    countries: null
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
  const { country } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    country
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { countries } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    countries
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { country } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    country
  })
}
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    country: null
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    country: null
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    countries: null
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    country: state.country
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    country: state.country
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.COUNTRY_REQUEST]: request,
  [Types.COUNTRY_ALL_REQUEST]: allRequest,
  [Types.COUNTRY_UPDATE_REQUEST]: updateRequest,
  [Types.COUNTRY_DELETE_REQUEST]: deleteRequest,

  [Types.COUNTRY_SUCCESS]: success,
  [Types.COUNTRY_ALL_SUCCESS]: allSuccess,
  [Types.COUNTRY_UPDATE_SUCCESS]: updateSuccess,
  [Types.COUNTRY_DELETE_SUCCESS]: deleteSuccess,

  [Types.COUNTRY_FAILURE]: failure,
  [Types.COUNTRY_ALL_FAILURE]: allFailure,
  [Types.COUNTRY_UPDATE_FAILURE]: updateFailure,
  [Types.COUNTRY_DELETE_FAILURE]: deleteFailure
})
