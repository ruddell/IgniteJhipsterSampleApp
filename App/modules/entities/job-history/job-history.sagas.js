import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import JobHistoryActions from './job-history.reducer'

export function * getJobHistory (api, action) {
  const { jobHistoryId } = action
  // make the call to the api
  const apiCall = call(api.getJobHistory, jobHistoryId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(JobHistoryActions.jobHistorySuccess(response.data))
  } else {
    yield put(JobHistoryActions.jobHistoryFailure(response.data))
  }
}

export function * getJobHistories (api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getJobHistories, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(JobHistoryActions.jobHistoryAllSuccess(response.data))
  } else {
    yield put(JobHistoryActions.jobHistoryAllFailure(response.data))
  }
}

export function * updateJobHistory (api, action) {
  const { jobHistory } = action
  // make the call to the api
  const idIsNotNull = !!jobHistory.id
  const apiCall = call(idIsNotNull ? api.updateJobHistory : api.createJobHistory, jobHistory)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(JobHistoryActions.jobHistoryUpdateSuccess(response.data))
  } else {
    yield put(JobHistoryActions.jobHistoryUpdateFailure(response.data))
  }
}

export function * deleteJobHistory (api, action) {
  const { jobHistoryId } = action
  // make the call to the api
  const apiCall = call(api.deleteJobHistory, jobHistoryId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(JobHistoryActions.jobHistoryDeleteSuccess())
  } else {
    yield put(JobHistoryActions.jobHistoryDeleteFailure(response.data))
  }
}
