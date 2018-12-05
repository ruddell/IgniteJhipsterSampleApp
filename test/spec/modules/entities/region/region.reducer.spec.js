import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/region/region.reducer'

test('attempt retrieving a single region', () => {
  const state = reducer(INITIAL_STATE, Actions.regionRequest({id: 1}))

  expect(state.fetchingOne).toBe(true)
  expect(state.region).toBe(null)
})

test('attempt retrieving a list of region', () => {
  const state = reducer(INITIAL_STATE, Actions.regionAllRequest({id: 1}))

  expect(state.fetchingAll).toBe(true)
  expect(state.regions).toBe(null)
})

test('attempt updating a region', () => {
  const state = reducer(INITIAL_STATE, Actions.regionUpdateRequest({id: 1}))

  expect(state.updating).toBe(true)
})
test('attempt to deleting a region', () => {
  const state = reducer(INITIAL_STATE, Actions.regionDeleteRequest({id: 1}))

  expect(state.deleting).toBe(true)
})

test('success retrieving a region', () => {
  const state = reducer(INITIAL_STATE, Actions.regionSuccess({id: 1}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.region).toEqual({id: 1})
})

test('success retrieving a list of region', () => {
  const state = reducer(INITIAL_STATE, Actions.regionAllSuccess([{id: 1}, {id: 2}]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.regions).toEqual([{id: 1}, {id: 2}])
})

test('success updating a region', () => {
  const state = reducer(INITIAL_STATE, Actions.regionUpdateSuccess({id: 1}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.region).toEqual({id: 1})
})
test('success deleting a region', () => {
  const state = reducer(INITIAL_STATE, Actions.regionDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.region).toEqual(null)
})

test('failure retrieving a region', () => {
  const state = reducer(INITIAL_STATE, Actions.regionFailure({error: 'Not found'}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({error: 'Not found'})
  expect(state.region).toEqual(null)
})

test('failure retrieving a list of region', () => {
  const state = reducer(INITIAL_STATE, Actions.regionAllFailure({error: 'Not found'}))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({error: 'Not found'})
  expect(state.regions).toEqual(null)
})

test('failure updating a region', () => {
  const state = reducer(INITIAL_STATE, Actions.regionUpdateFailure({error: 'Not found'}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({error: 'Not found'})
  expect(state.region).toEqual(INITIAL_STATE.region)
})
test('failure deleting a region', () => {
  const state = reducer(INITIAL_STATE, Actions.regionDeleteFailure({error: 'Not found'}))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({error: 'Not found'})
  expect(state.region).toEqual(INITIAL_STATE.region)
})
