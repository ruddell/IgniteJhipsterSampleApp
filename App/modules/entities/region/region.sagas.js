import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import RegionActions from './region.reducer'

export function * getRegion (api, action) {
  const { regionId } = action
  // make the call to the api
  const apiCall = call(api.getRegion, regionId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(RegionActions.regionSuccess(response.data))
  } else {
    yield put(RegionActions.regionFailure(response.data))
  }
}

export function * getRegions (api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getRegions, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(RegionActions.regionAllSuccess(response.data))
  } else {
    yield put(RegionActions.regionAllFailure(response.data))
  }
}

export function * updateRegion (api, action) {
  const { region } = action
  // make the call to the api
  const idIsNotNull = !!region.id
  const apiCall = call(idIsNotNull ? api.updateRegion : api.createRegion, region)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(RegionActions.regionUpdateSuccess(response.data))
  } else {
    yield put(RegionActions.regionUpdateFailure(response.data))
  }
}

export function * deleteRegion (api, action) {
  const { regionId } = action
  // make the call to the api
  const apiCall = call(api.deleteRegion, regionId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(RegionActions.regionDeleteSuccess())
  } else {
    yield put(RegionActions.regionDeleteFailure(response.data))
  }
}
