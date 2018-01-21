import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  bankAccountRequest: ['bankAccountId'],
  bankAccountAllRequest: ['options'],
  bankAccountUpdateRequest: ['bankAccount'],
  bankAccountDeleteRequest: ['bankAccountId'],

  bankAccountSuccess: ['bankAccount'],
  bankAccountAllSuccess: ['bankAccounts'],
  bankAccountUpdateSuccess: ['bankAccount'],
  bankAccountDeleteSuccess: [],

  bankAccountFailure: ['error'],
  bankAccountAllFailure: ['error'],
  bankAccountUpdateFailure: ['error'],
  bankAccountDeleteFailure: ['error']
})

export const BankAccountTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  deleting: null,
  bankAccount: null,
  bankAccounts: null,
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
    bankAccount: null
  })

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    bankAccounts: null
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
  const { bankAccount } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    bankAccount
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { bankAccounts } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    bankAccounts
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { bankAccount } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    bankAccount
  })
}
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    bankAccount: null
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    bankAccount: null
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    bankAccounts: null
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    bankAccount: state.bankAccount
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    bankAccount: state.bankAccount
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.BANK_ACCOUNT_REQUEST]: request,
  [Types.BANK_ACCOUNT_ALL_REQUEST]: allRequest,
  [Types.BANK_ACCOUNT_UPDATE_REQUEST]: updateRequest,
  [Types.BANK_ACCOUNT_DELETE_REQUEST]: deleteRequest,

  [Types.BANK_ACCOUNT_SUCCESS]: success,
  [Types.BANK_ACCOUNT_ALL_SUCCESS]: allSuccess,
  [Types.BANK_ACCOUNT_UPDATE_SUCCESS]: updateSuccess,
  [Types.BANK_ACCOUNT_DELETE_SUCCESS]: deleteSuccess,

  [Types.BANK_ACCOUNT_FAILURE]: failure,
  [Types.BANK_ACCOUNT_ALL_FAILURE]: allFailure,
  [Types.BANK_ACCOUNT_UPDATE_FAILURE]: updateFailure,
  [Types.BANK_ACCOUNT_DELETE_FAILURE]: deleteFailure
})
