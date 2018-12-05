import { put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import { getJob, getJobs, updateJob, deleteJob } from '../../../../../app/modules/entities/job/job.sagas'
import JobActions from '../../../../../app/modules/entities/job/job.reducer'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getJob(1)
  const step = stepper(getJob(FixtureAPI, { jobId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(JobActions.jobSuccess({id: 1})))
})

test('get failure path', () => {
  const response = {ok: false}
  const step = stepper(getJob(FixtureAPI, { jobId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(JobActions.jobFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getJobs()
  const step = stepper(getJobs(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(JobActions.jobAllSuccess([{id: 1}, {id: 2}])))
})

test('getAll failure path', () => {
  const response = {ok: false}
  const step = stepper(getJobs(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(JobActions.jobAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateJob({id: 1})
  const step = stepper(updateJob(FixtureAPI, { job: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(JobActions.jobUpdateSuccess({id: 1})))
})

test('update failure path', () => {
  const response = {ok: false}
  const step = stepper(updateJob(FixtureAPI, { job: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(JobActions.jobUpdateFailure()))
})

test('delete success path', () => {
  const response = FixtureAPI.deleteJob({id: 1})
  const step = stepper(deleteJob(FixtureAPI, { jobId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(JobActions.jobDeleteSuccess({id: 1})))
})

test('delete failure path', () => {
  const response = {ok: false}
  const step = stepper(deleteJob(FixtureAPI, { jobId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(JobActions.jobDeleteFailure()))
})
