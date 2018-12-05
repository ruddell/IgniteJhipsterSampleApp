import { put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import { getTask, getTasks, updateTask, deleteTask } from '../../../../../app/modules/entities/task/task.sagas'
import TaskActions from '../../../../../app/modules/entities/task/task.reducer'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getTask(1)
  const step = stepper(getTask(FixtureAPI, { taskId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(TaskActions.taskSuccess({id: 1})))
})

test('get failure path', () => {
  const response = {ok: false}
  const step = stepper(getTask(FixtureAPI, { taskId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(TaskActions.taskFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getTasks()
  const step = stepper(getTasks(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(TaskActions.taskAllSuccess([{id: 1}, {id: 2}])))
})

test('getAll failure path', () => {
  const response = {ok: false}
  const step = stepper(getTasks(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(TaskActions.taskAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateTask({id: 1})
  const step = stepper(updateTask(FixtureAPI, { task: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(TaskActions.taskUpdateSuccess({id: 1})))
})

test('update failure path', () => {
  const response = {ok: false}
  const step = stepper(updateTask(FixtureAPI, { task: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(TaskActions.taskUpdateFailure()))
})

test('delete success path', () => {
  const response = FixtureAPI.deleteTask({id: 1})
  const step = stepper(deleteTask(FixtureAPI, { taskId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(TaskActions.taskDeleteSuccess({id: 1})))
})

test('delete failure path', () => {
  const response = {ok: false}
  const step = stepper(deleteTask(FixtureAPI, { taskId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(TaskActions.taskDeleteFailure()))
})
