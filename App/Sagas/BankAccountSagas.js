import { call, put } from 'redux-saga/effects'
import BankAccountActions from '../Redux/BankAccountRedux'
import { callApi } from './CallApiSaga'

export function * getBankAccount (api, action) {
  const { bankAccountId } = action
  // make the call to the api
  const apiCall = call(api.getBankAccount, bankAccountId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(BankAccountActions.bankAccountSuccess(response.data))
  } else {
    yield put(BankAccountActions.bankAccountFailure(response.data))
  }
}

export function * getBankAccounts (api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getBankAccounts, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(BankAccountActions.bankAccountAllSuccess(response.data))
  } else {
    yield put(BankAccountActions.bankAccountAllFailure(response.data))
  }
}

export function * updateBankAccount (api, action) {
  const { bankAccount } = action
  // make the call to the api
  const apiCall = call(api.updateBankAccount, bankAccount)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(BankAccountActions.bankAccountUpdateSuccess(response.data))
  } else {
    yield put(BankAccountActions.bankAccountUpdateFailure(response.data))
  }
}

export function * deleteBankAccount (api, action) {
  const { bankAccountId } = action
  // make the call to the api
  const apiCall = call(api.deleteBankAccount, bankAccountId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(BankAccountActions.bankAccountDeleteSuccess())
  } else {
    yield put(BankAccountActions.bankAccountDeleteFailure(response.data))
  }
}
