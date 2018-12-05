import { put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import { getRegion, getRegions, updateRegion, deleteRegion } from '../../../../../app/modules/entities/region/region.sagas'
import RegionActions from '../../../../../app/modules/entities/region/region.reducer'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getRegion(1)
  const step = stepper(getRegion(FixtureAPI, { regionId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(RegionActions.regionSuccess({id: 1})))
})

test('get failure path', () => {
  const response = {ok: false}
  const step = stepper(getRegion(FixtureAPI, { regionId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(RegionActions.regionFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getRegions()
  const step = stepper(getRegions(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(RegionActions.regionAllSuccess([{id: 1}, {id: 2}])))
})

test('getAll failure path', () => {
  const response = {ok: false}
  const step = stepper(getRegions(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(RegionActions.regionAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateRegion({id: 1})
  const step = stepper(updateRegion(FixtureAPI, { region: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(RegionActions.regionUpdateSuccess({id: 1})))
})

test('update failure path', () => {
  const response = {ok: false}
  const step = stepper(updateRegion(FixtureAPI, { region: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(RegionActions.regionUpdateFailure()))
})

test('delete success path', () => {
  const response = FixtureAPI.deleteRegion({id: 1})
  const step = stepper(deleteRegion(FixtureAPI, { regionId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(RegionActions.regionDeleteSuccess({id: 1})))
})

test('delete failure path', () => {
  const response = {ok: false}
  const step = stepper(deleteRegion(FixtureAPI, { regionId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(RegionActions.regionDeleteFailure()))
})
