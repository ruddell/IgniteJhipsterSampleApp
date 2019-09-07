import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import DepartmentActions from './department.reducer'

export function * getDepartment (api, action) {
  const { departmentId } = action
  // make the call to the api
  const apiCall = call(api.getDepartment, departmentId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(DepartmentActions.departmentSuccess(response.data))
  } else {
    yield put(DepartmentActions.departmentFailure(response.data))
  }
}

export function * getDepartments (api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getDepartments, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(DepartmentActions.departmentAllSuccess(response.data))
  } else {
    yield put(DepartmentActions.departmentAllFailure(response.data))
  }
}

export function * updateDepartment (api, action) {
  const { department } = action
  // make the call to the api
  const idIsNotNull = !!department.id
  const apiCall = call(idIsNotNull ? api.updateDepartment : api.createDepartment, department)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(DepartmentActions.departmentUpdateSuccess(response.data))
  } else {
    yield put(DepartmentActions.departmentUpdateFailure(response.data))
  }
}

export function * deleteDepartment (api, action) {
  const { departmentId } = action
  // make the call to the api
  const apiCall = call(api.deleteDepartment, departmentId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(DepartmentActions.departmentDeleteSuccess())
  } else {
    yield put(DepartmentActions.departmentDeleteFailure(response.data))
  }
}
