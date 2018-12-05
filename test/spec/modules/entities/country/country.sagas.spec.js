import { put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import { getCountry, getCountries, updateCountry, deleteCountry } from '../../../../../app/modules/entities/country/country.sagas'
import CountryActions from '../../../../../app/modules/entities/country/country.reducer'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getCountry(1)
  const step = stepper(getCountry(FixtureAPI, { countryId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CountryActions.countrySuccess({id: 1})))
})

test('get failure path', () => {
  const response = {ok: false}
  const step = stepper(getCountry(FixtureAPI, { countryId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CountryActions.countryFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getCountries()
  const step = stepper(getCountries(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CountryActions.countryAllSuccess([{id: 1}, {id: 2}])))
})

test('getAll failure path', () => {
  const response = {ok: false}
  const step = stepper(getCountries(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CountryActions.countryAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateCountry({id: 1})
  const step = stepper(updateCountry(FixtureAPI, { country: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CountryActions.countryUpdateSuccess({id: 1})))
})

test('update failure path', () => {
  const response = {ok: false}
  const step = stepper(updateCountry(FixtureAPI, { country: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CountryActions.countryUpdateFailure()))
})

test('delete success path', () => {
  const response = FixtureAPI.deleteCountry({id: 1})
  const step = stepper(deleteCountry(FixtureAPI, { countryId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CountryActions.countryDeleteSuccess({id: 1})))
})

test('delete failure path', () => {
  const response = {ok: false}
  const step = stepper(deleteCountry(FixtureAPI, { countryId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CountryActions.countryDeleteFailure()))
})
