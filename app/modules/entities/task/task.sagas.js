import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import TaskActions from './task.reducer'

export function * getTask (api, action) {
  const { taskId } = action
  // make the call to the api
  const apiCall = call(api.getTask, taskId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(TaskActions.taskSuccess(response.data))
  } else {
    yield put(TaskActions.taskFailure(response.data))
  }
}

export function * getTasks (api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getTasks, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(TaskActions.taskAllSuccess(response.data))
  } else {
    yield put(TaskActions.taskAllFailure(response.data))
  }
}

export function * updateTask (api, action) {
  const { task } = action
  // make the call to the api
  const idIsNotNull = !!task.id
  const apiCall = call(idIsNotNull ? api.updateTask : api.createTask, task)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(TaskActions.taskUpdateSuccess(response.data))
  } else {
    yield put(TaskActions.taskUpdateFailure(response.data))
  }
}

export function * deleteTask (api, action) {
  const { taskId } = action
  // make the call to the api
  const apiCall = call(api.deleteTask, taskId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(TaskActions.taskDeleteSuccess())
  } else {
    yield put(TaskActions.taskDeleteFailure(response.data))
  }
}
