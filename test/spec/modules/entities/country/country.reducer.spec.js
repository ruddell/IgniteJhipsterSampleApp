import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/country/country.reducer'

test('attempt retrieving a single country', () => {
  const state = reducer(INITIAL_STATE, Actions.countryRequest({id: 1}))

  expect(state.fetchingOne).toBe(true)
  expect(state.country).toBe(null)
})

test('attempt retrieving a list of country', () => {
  const state = reducer(INITIAL_STATE, Actions.countryAllRequest({id: 1}))

  expect(state.fetchingAll).toBe(true)
  expect(state.countries).toBe(null)
})

test('attempt updating a country', () => {
  const state = reducer(INITIAL_STATE, Actions.countryUpdateRequest({id: 1}))

  expect(state.updating).toBe(true)
})
test('attempt to deleting a country', () => {
  const state = reducer(INITIAL_STATE, Actions.countryDeleteRequest({id: 1}))

  expect(state.deleting).toBe(true)
})

test('success retrieving a country', () => {
  const state = reducer(INITIAL_STATE, Actions.countrySuccess({id: 1}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.country).toEqual({id: 1})
})

test('success retrieving a list of country', () => {
  const state = reducer(INITIAL_STATE, Actions.countryAllSuccess([{id: 1}, {id: 2}]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.countries).toEqual([{id: 1}, {id: 2}])
})

test('success updating a country', () => {
  const state = reducer(INITIAL_STATE, Actions.countryUpdateSuccess({id: 1}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.country).toEqual({id: 1})
})
test('success deleting a country', () => {
  const state = reducer(INITIAL_STATE, Actions.countryDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.country).toEqual(null)
})

test('failure retrieving a country', () => {
  const state = reducer(INITIAL_STATE, Actions.countryFailure({error: 'Not found'}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({error: 'Not found'})
  expect(state.country).toEqual(null)
})

test('failure retrieving a list of country', () => {
  const state = reducer(INITIAL_STATE, Actions.countryAllFailure({error: 'Not found'}))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({error: 'Not found'})
  expect(state.countries).toEqual(null)
})

test('failure updating a country', () => {
  const state = reducer(INITIAL_STATE, Actions.countryUpdateFailure({error: 'Not found'}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({error: 'Not found'})
  expect(state.country).toEqual(INITIAL_STATE.country)
})
test('failure deleting a country', () => {
  const state = reducer(INITIAL_STATE, Actions.countryDeleteFailure({error: 'Not found'}))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({error: 'Not found'})
  expect(state.country).toEqual(INITIAL_STATE.country)
})
