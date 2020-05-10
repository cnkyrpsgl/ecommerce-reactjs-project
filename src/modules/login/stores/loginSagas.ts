import { PayloadAction } from '@reduxjs/toolkit';
import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

import { Identity } from '@/common/types/commonTypes';
import { getRequest, postRequest } from '@/core/api';
import { sagasRegistry } from '@/core/registry';
import loginActions from '@/modules/login/stores/loginActions';
import { OtpCodeRequest, OtpLoginRequest } from '@/modules/login/stores/loginTypes';

function* doLoginOtpRequest(action: PayloadAction<OtpCodeRequest>): SagaIterator {
  const request = action.payload;
  const res = yield call(postRequest, '/api/authentications/otp/code', request);
  if (res.errorMessage) {
    yield put(loginActions.errorLogout(res.errorMessage));
  }
  yield put(loginActions.saveClaimId(res.data.claimId));
}

function* onLoginOtp(): SagaIterator {
  yield takeLatest(loginActions.requestOtpLogin.toString(), doLoginOtpRequest);
}

function* doVerifyLoginRequest(
  onSuccess: typeof loginActions.successLogin,
  onError: typeof loginActions.errorLogin,
  request: OtpLoginRequest | null
): SagaIterator {
  const userRes = yield call(postRequest, '/api/authentications/otp/login', request);
  if (userRes.errorCode || userRes.errorMessage) {
    yield put(onError(userRes.errorMessage));
    return;
  }
  const { data }: { data: Identity } = userRes;
  yield put(
    onSuccess({
      identity: data,
      loggedIn: true,
    })
  );
}

function verifyLoginRequest(action: PayloadAction<OtpLoginRequest>): SagaIterator {
  return doVerifyLoginRequest(loginActions.successLogin, loginActions.errorLogin, action.payload);
}

function* onLogin(): SagaIterator {
  yield takeLatest(loginActions.requestLogin.toString(), verifyLoginRequest);
}

function* autoLoginRequest(): SagaIterator {
  const userRes = yield call(getRequest, '/api/identities');
  if (userRes.errorCode || userRes.errorMessage) {
    yield put(loginActions.errorAutoLogin(userRes.errorMessage));
    return;
  }
  const { data }: { data: Identity } = userRes;
  yield put(
    loginActions.successAutoLogin({
      identity: data,
      loggedIn: true,
    })
  );
}

function* onAutoLogin(): SagaIterator {
  yield takeLatest(loginActions.requestAutoLogin.toString(), autoLoginRequest);
}

function* logoutRequest(): SagaIterator {
  const res = yield call(postRequest, '/api/authentications/otp/logout');
  if (res.errorMessage) {
    yield put(loginActions.errorLogout(res.errorMessage));
    return;
  }
  yield put(loginActions.successLogout());
  // history replace kullanirsak logout sonrasi login olunamiyor refresh ediyoruz.
  window.open('/login', '_top');
}

function* onLogout(): SagaIterator {
  yield takeLatest(loginActions.requestLogout.toString(), logoutRequest);
}

const loginSagas = [onLogin, onLoginOtp, onAutoLogin, onLogout];
sagasRegistry.register(loginSagas);

export default loginSagas;
