import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import JobActions from './job.reducer'

export function * getJob (api, action) {
  const { jobId } = action
  // make the call to the api
  const apiCall = call(api.getJob, jobId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(JobActions.jobSuccess(response.data))
  } else {
    yield put(JobActions.jobFailure(response.data))
  }
}

export function * getJobs (api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getJobs, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(JobActions.jobAllSuccess(response.data))
  } else {
    yield put(JobActions.jobAllFailure(response.data))
  }
}

export function * updateJob (api, action) {
  const { job } = action
  // make the call to the api
  const idIsNotNull = !!job.id
  const apiCall = call(idIsNotNull ? api.updateJob : api.createJob, job)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(JobActions.jobUpdateSuccess(response.data))
  } else {
    yield put(JobActions.jobUpdateFailure(response.data))
  }
}

export function * deleteJob (api, action) {
  const { jobId } = action
  // make the call to the api
  const apiCall = call(api.deleteJob, jobId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(JobActions.jobDeleteSuccess())
  } else {
    yield put(JobActions.jobDeleteFailure(response.data))
  }
}
