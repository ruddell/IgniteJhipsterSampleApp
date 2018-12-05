import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/location/location.reducer'

test('attempt retrieving a single location', () => {
  const state = reducer(INITIAL_STATE, Actions.locationRequest({id: 1}))

  expect(state.fetchingOne).toBe(true)
  expect(state.location).toBe(null)
})

test('attempt retrieving a list of location', () => {
  const state = reducer(INITIAL_STATE, Actions.locationAllRequest({id: 1}))

  expect(state.fetchingAll).toBe(true)
  expect(state.locations).toBe(null)
})

test('attempt updating a location', () => {
  const state = reducer(INITIAL_STATE, Actions.locationUpdateRequest({id: 1}))

  expect(state.updating).toBe(true)
})
test('attempt to deleting a location', () => {
  const state = reducer(INITIAL_STATE, Actions.locationDeleteRequest({id: 1}))

  expect(state.deleting).toBe(true)
})

test('success retrieving a location', () => {
  const state = reducer(INITIAL_STATE, Actions.locationSuccess({id: 1}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.location).toEqual({id: 1})
})

test('success retrieving a list of location', () => {
  const state = reducer(INITIAL_STATE, Actions.locationAllSuccess([{id: 1}, {id: 2}]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.locations).toEqual([{id: 1}, {id: 2}])
})

test('success updating a location', () => {
  const state = reducer(INITIAL_STATE, Actions.locationUpdateSuccess({id: 1}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.location).toEqual({id: 1})
})
test('success deleting a location', () => {
  const state = reducer(INITIAL_STATE, Actions.locationDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.location).toEqual(null)
})

test('failure retrieving a location', () => {
  const state = reducer(INITIAL_STATE, Actions.locationFailure({error: 'Not found'}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({error: 'Not found'})
  expect(state.location).toEqual(null)
})

test('failure retrieving a list of location', () => {
  const state = reducer(INITIAL_STATE, Actions.locationAllFailure({error: 'Not found'}))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({error: 'Not found'})
  expect(state.locations).toEqual(null)
})

test('failure updating a location', () => {
  const state = reducer(INITIAL_STATE, Actions.locationUpdateFailure({error: 'Not found'}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({error: 'Not found'})
  expect(state.location).toEqual(INITIAL_STATE.location)
})
test('failure deleting a location', () => {
  const state = reducer(INITIAL_STATE, Actions.locationDeleteFailure({error: 'Not found'}))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({error: 'Not found'})
  expect(state.location).toEqual(INITIAL_STATE.location)
})
