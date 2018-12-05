import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/employee/employee.reducer'

test('attempt retrieving a single employee', () => {
  const state = reducer(INITIAL_STATE, Actions.employeeRequest({id: 1}))

  expect(state.fetchingOne).toBe(true)
  expect(state.employee).toBe(null)
})

test('attempt retrieving a list of employee', () => {
  const state = reducer(INITIAL_STATE, Actions.employeeAllRequest({id: 1}))

  expect(state.fetchingAll).toBe(true)
  expect(state.employees).toBe(null)
})

test('attempt updating a employee', () => {
  const state = reducer(INITIAL_STATE, Actions.employeeUpdateRequest({id: 1}))

  expect(state.updating).toBe(true)
})
test('attempt to deleting a employee', () => {
  const state = reducer(INITIAL_STATE, Actions.employeeDeleteRequest({id: 1}))

  expect(state.deleting).toBe(true)
})

test('success retrieving a employee', () => {
  const state = reducer(INITIAL_STATE, Actions.employeeSuccess({id: 1}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.employee).toEqual({id: 1})
})

test('success retrieving a list of employee', () => {
  const state = reducer(INITIAL_STATE, Actions.employeeAllSuccess([{id: 1}, {id: 2}]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.employees).toEqual([{id: 1}, {id: 2}])
})

test('success updating a employee', () => {
  const state = reducer(INITIAL_STATE, Actions.employeeUpdateSuccess({id: 1}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.employee).toEqual({id: 1})
})
test('success deleting a employee', () => {
  const state = reducer(INITIAL_STATE, Actions.employeeDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.employee).toEqual(null)
})

test('failure retrieving a employee', () => {
  const state = reducer(INITIAL_STATE, Actions.employeeFailure({error: 'Not found'}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({error: 'Not found'})
  expect(state.employee).toEqual(null)
})

test('failure retrieving a list of employee', () => {
  const state = reducer(INITIAL_STATE, Actions.employeeAllFailure({error: 'Not found'}))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({error: 'Not found'})
  expect(state.employees).toEqual(null)
})

test('failure updating a employee', () => {
  const state = reducer(INITIAL_STATE, Actions.employeeUpdateFailure({error: 'Not found'}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({error: 'Not found'})
  expect(state.employee).toEqual(INITIAL_STATE.employee)
})
test('failure deleting a employee', () => {
  const state = reducer(INITIAL_STATE, Actions.employeeDeleteFailure({error: 'Not found'}))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({error: 'Not found'})
  expect(state.employee).toEqual(INITIAL_STATE.employee)
})
