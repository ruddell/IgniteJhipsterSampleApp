import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/task/task.reducer'

test('attempt retrieving a single task', () => {
  const state = reducer(INITIAL_STATE, Actions.taskRequest({id: 1}))

  expect(state.fetchingOne).toBe(true)
  expect(state.task).toBe(null)
})

test('attempt retrieving a list of task', () => {
  const state = reducer(INITIAL_STATE, Actions.taskAllRequest({id: 1}))

  expect(state.fetchingAll).toBe(true)
  expect(state.tasks).toBe(null)
})

test('attempt updating a task', () => {
  const state = reducer(INITIAL_STATE, Actions.taskUpdateRequest({id: 1}))

  expect(state.updating).toBe(true)
})
test('attempt to deleting a task', () => {
  const state = reducer(INITIAL_STATE, Actions.taskDeleteRequest({id: 1}))

  expect(state.deleting).toBe(true)
})

test('success retrieving a task', () => {
  const state = reducer(INITIAL_STATE, Actions.taskSuccess({id: 1}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.task).toEqual({id: 1})
})

test('success retrieving a list of task', () => {
  const state = reducer(INITIAL_STATE, Actions.taskAllSuccess([{id: 1}, {id: 2}]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.tasks).toEqual([{id: 1}, {id: 2}])
})

test('success updating a task', () => {
  const state = reducer(INITIAL_STATE, Actions.taskUpdateSuccess({id: 1}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.task).toEqual({id: 1})
})
test('success deleting a task', () => {
  const state = reducer(INITIAL_STATE, Actions.taskDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.task).toEqual(null)
})

test('failure retrieving a task', () => {
  const state = reducer(INITIAL_STATE, Actions.taskFailure({error: 'Not found'}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({error: 'Not found'})
  expect(state.task).toEqual(null)
})

test('failure retrieving a list of task', () => {
  const state = reducer(INITIAL_STATE, Actions.taskAllFailure({error: 'Not found'}))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({error: 'Not found'})
  expect(state.tasks).toEqual(null)
})

test('failure updating a task', () => {
  const state = reducer(INITIAL_STATE, Actions.taskUpdateFailure({error: 'Not found'}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({error: 'Not found'})
  expect(state.task).toEqual(INITIAL_STATE.task)
})
test('failure deleting a task', () => {
  const state = reducer(INITIAL_STATE, Actions.taskDeleteFailure({error: 'Not found'}))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({error: 'Not found'})
  expect(state.task).toEqual(INITIAL_STATE.task)
})
