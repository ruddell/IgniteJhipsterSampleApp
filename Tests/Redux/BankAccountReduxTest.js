import Actions, { reducer, INITIAL_STATE } from '../../App/Redux/BankAccountRedux'

test('attempt retrieving a single bankAccount', () => {
  const state = reducer(INITIAL_STATE, Actions.bankAccountRequest({id: 1}))

  expect(state.fetchingOne).toBe(true)
  expect(state.bankAccount).toBe(null)
})

test('attempt retrieving a list of bankAccount', () => {
  const state = reducer(INITIAL_STATE, Actions.bankAccountAllRequest({id: 1}))

  expect(state.fetchingAll).toBe(true)
  expect(state.bankAccounts).toBe(null)
})

test('attempt updating a bankAccount', () => {
  const state = reducer(INITIAL_STATE, Actions.bankAccountUpdateRequest({id: 1}))

  expect(state.updating).toBe(true)
})
test('attempt to deleting a bankAccount', () => {
  const state = reducer(INITIAL_STATE, Actions.bankAccountDeleteRequest({id: 1}))

  expect(state.deleting).toBe(true)
})

test('success retrieving a bankAccount', () => {
  const state = reducer(INITIAL_STATE, Actions.bankAccountSuccess({id: 1}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.bankAccount).toEqual({id: 1})
})

test('success retrieving a list of bankAccount', () => {
  const state = reducer(INITIAL_STATE, Actions.bankAccountAllSuccess([{id: 1}, {id: 2}]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.bankAccounts).toEqual([{id: 1}, {id: 2}])
})

test('success updating a bankAccount', () => {
  const state = reducer(INITIAL_STATE, Actions.bankAccountUpdateSuccess({id: 1}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.bankAccount).toEqual({id: 1})
})
test('success deleting a bankAccount', () => {
  const state = reducer(INITIAL_STATE, Actions.bankAccountDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.bankAccount).toEqual(null)
})

test('failure retrieving a bankAccount', () => {
  const state = reducer(INITIAL_STATE, Actions.bankAccountFailure({error: 'Not found'}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({error: 'Not found'})
  expect(state.bankAccount).toEqual(null)
})

test('failure retrieving a list of bankAccount', () => {
  const state = reducer(INITIAL_STATE, Actions.bankAccountAllFailure({error: 'Not found'}))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({error: 'Not found'})
  expect(state.bankAccounts).toEqual(null)
})

test('failure updating a bankAccount', () => {
  const state = reducer(INITIAL_STATE, Actions.bankAccountUpdateFailure({error: 'Not found'}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({error: 'Not found'})
  expect(state.bankAccount).toEqual(INITIAL_STATE.bankAccount)
})
test('failure deleting a bankAccount', () => {
  const state = reducer(INITIAL_STATE, Actions.bankAccountDeleteFailure({error: 'Not found'}))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({error: 'Not found'})
  expect(state.bankAccount).toEqual(INITIAL_STATE.bankAccount)
})
