import FixtureAPI from '../../App/Services/FixtureApi'
import { put } from 'redux-saga/effects'
import { getBankAccount, getBankAccounts, updateBankAccount, deleteBankAccount } from '../../App/Sagas/BankAccountSagas'
import BankAccountActions from '../../App/Redux/BankAccountRedux'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getBankAccount(1)
  const step = stepper(getBankAccount(FixtureAPI, {id: 1}))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(BankAccountActions.bankAccountSuccess({id: 1})))
})

test('get failure path', () => {
  const response = {ok: false}
  const step = stepper(getBankAccount(FixtureAPI, {id: 1}))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(BankAccountActions.bankAccountFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getBankAccounts()
  const step = stepper(getBankAccounts(FixtureAPI, {page: 0, sort: 'id,asc', size: 20}))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(BankAccountActions.bankAccountAllSuccess([{id: 1}, {id: 2}])))
})

test('getAll failure path', () => {
  const response = {ok: false}
  const step = stepper(getBankAccounts(FixtureAPI, {page: 0, sort: 'id,asc', size: 20}))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(BankAccountActions.bankAccountAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateBankAccount({id: 1})
  const step = stepper(updateBankAccount(FixtureAPI, {id: 1}))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(BankAccountActions.bankAccountUpdateSuccess({id: 1})))
})

test('update failure path', () => {
  const response = {ok: false}
  const step = stepper(updateBankAccount(FixtureAPI, {id: 1}))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(BankAccountActions.bankAccountUpdateFailure()))
})

test('delete success path', () => {
  const response = FixtureAPI.deleteBankAccount({id: 1})
  const step = stepper(deleteBankAccount(FixtureAPI, {id: 1}))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(BankAccountActions.bankAccountDeleteSuccess({id: 1})))
})

test('delete failure path', () => {
  const response = {ok: false}
  const step = stepper(deleteBankAccount(FixtureAPI, {id: 1}))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(BankAccountActions.bankAccountDeleteFailure()))
})
