import { put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import { getDepartment, getDepartments, updateDepartment, deleteDepartment } from '../../../../../app/modules/entities/department/department.sagas'
import DepartmentActions from '../../../../../app/modules/entities/department/department.reducer'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getDepartment(1)
  const step = stepper(getDepartment(FixtureAPI, { departmentId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(DepartmentActions.departmentSuccess({id: 1})))
})

test('get failure path', () => {
  const response = {ok: false}
  const step = stepper(getDepartment(FixtureAPI, { departmentId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(DepartmentActions.departmentFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getDepartments()
  const step = stepper(getDepartments(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(DepartmentActions.departmentAllSuccess([{id: 1}, {id: 2}])))
})

test('getAll failure path', () => {
  const response = {ok: false}
  const step = stepper(getDepartments(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(DepartmentActions.departmentAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateDepartment({id: 1})
  const step = stepper(updateDepartment(FixtureAPI, { department: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(DepartmentActions.departmentUpdateSuccess({id: 1})))
})

test('update failure path', () => {
  const response = {ok: false}
  const step = stepper(updateDepartment(FixtureAPI, { department: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(DepartmentActions.departmentUpdateFailure()))
})

test('delete success path', () => {
  const response = FixtureAPI.deleteDepartment({id: 1})
  const step = stepper(deleteDepartment(FixtureAPI, { departmentId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(DepartmentActions.departmentDeleteSuccess({id: 1})))
})

test('delete failure path', () => {
  const response = {ok: false}
  const step = stepper(deleteDepartment(FixtureAPI, { departmentId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(DepartmentActions.departmentDeleteFailure()))
})
