import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/job/job.reducer'

test('attempt retrieving a single job', () => {
  const state = reducer(INITIAL_STATE, Actions.jobRequest({id: 1}))

  expect(state.fetchingOne).toBe(true)
  expect(state.job).toBe(null)
})

test('attempt retrieving a list of job', () => {
  const state = reducer(INITIAL_STATE, Actions.jobAllRequest({id: 1}))

  expect(state.fetchingAll).toBe(true)
  expect(state.jobs).toBe(null)
})

test('attempt updating a job', () => {
  const state = reducer(INITIAL_STATE, Actions.jobUpdateRequest({id: 1}))

  expect(state.updating).toBe(true)
})
test('attempt to deleting a job', () => {
  const state = reducer(INITIAL_STATE, Actions.jobDeleteRequest({id: 1}))

  expect(state.deleting).toBe(true)
})

test('success retrieving a job', () => {
  const state = reducer(INITIAL_STATE, Actions.jobSuccess({id: 1}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.job).toEqual({id: 1})
})

test('success retrieving a list of job', () => {
  const state = reducer(INITIAL_STATE, Actions.jobAllSuccess([{id: 1}, {id: 2}]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.jobs).toEqual([{id: 1}, {id: 2}])
})

test('success updating a job', () => {
  const state = reducer(INITIAL_STATE, Actions.jobUpdateSuccess({id: 1}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.job).toEqual({id: 1})
})
test('success deleting a job', () => {
  const state = reducer(INITIAL_STATE, Actions.jobDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.job).toEqual(null)
})

test('failure retrieving a job', () => {
  const state = reducer(INITIAL_STATE, Actions.jobFailure({error: 'Not found'}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({error: 'Not found'})
  expect(state.job).toEqual(null)
})

test('failure retrieving a list of job', () => {
  const state = reducer(INITIAL_STATE, Actions.jobAllFailure({error: 'Not found'}))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({error: 'Not found'})
  expect(state.jobs).toEqual(null)
})

test('failure updating a job', () => {
  const state = reducer(INITIAL_STATE, Actions.jobUpdateFailure({error: 'Not found'}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({error: 'Not found'})
  expect(state.job).toEqual(INITIAL_STATE.job)
})
test('failure deleting a job', () => {
  const state = reducer(INITIAL_STATE, Actions.jobDeleteFailure({error: 'Not found'}))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({error: 'Not found'})
  expect(state.job).toEqual(INITIAL_STATE.job)
})
