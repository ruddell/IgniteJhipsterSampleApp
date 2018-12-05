import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/department/department.reducer'

test('attempt retrieving a single department', () => {
  const state = reducer(INITIAL_STATE, Actions.departmentRequest({id: 1}))

  expect(state.fetchingOne).toBe(true)
  expect(state.department).toBe(null)
})

test('attempt retrieving a list of department', () => {
  const state = reducer(INITIAL_STATE, Actions.departmentAllRequest({id: 1}))

  expect(state.fetchingAll).toBe(true)
  expect(state.departments).toBe(null)
})

test('attempt updating a department', () => {
  const state = reducer(INITIAL_STATE, Actions.departmentUpdateRequest({id: 1}))

  expect(state.updating).toBe(true)
})
test('attempt to deleting a department', () => {
  const state = reducer(INITIAL_STATE, Actions.departmentDeleteRequest({id: 1}))

  expect(state.deleting).toBe(true)
})

test('success retrieving a department', () => {
  const state = reducer(INITIAL_STATE, Actions.departmentSuccess({id: 1}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.department).toEqual({id: 1})
})

test('success retrieving a list of department', () => {
  const state = reducer(INITIAL_STATE, Actions.departmentAllSuccess([{id: 1}, {id: 2}]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.departments).toEqual([{id: 1}, {id: 2}])
})

test('success updating a department', () => {
  const state = reducer(INITIAL_STATE, Actions.departmentUpdateSuccess({id: 1}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.department).toEqual({id: 1})
})
test('success deleting a department', () => {
  const state = reducer(INITIAL_STATE, Actions.departmentDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.department).toEqual(null)
})

test('failure retrieving a department', () => {
  const state = reducer(INITIAL_STATE, Actions.departmentFailure({error: 'Not found'}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({error: 'Not found'})
  expect(state.department).toEqual(null)
})

test('failure retrieving a list of department', () => {
  const state = reducer(INITIAL_STATE, Actions.departmentAllFailure({error: 'Not found'}))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({error: 'Not found'})
  expect(state.departments).toEqual(null)
})

test('failure updating a department', () => {
  const state = reducer(INITIAL_STATE, Actions.departmentUpdateFailure({error: 'Not found'}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({error: 'Not found'})
  expect(state.department).toEqual(INITIAL_STATE.department)
})
test('failure deleting a department', () => {
  const state = reducer(INITIAL_STATE, Actions.departmentDeleteFailure({error: 'Not found'}))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({error: 'Not found'})
  expect(state.department).toEqual(INITIAL_STATE.department)
})
