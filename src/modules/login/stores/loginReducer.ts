import { createReducer } from '@reduxjs/toolkit';

import { OperationStatus } from '@/common/types/commonTypes';
import { reducerRegistry } from '@/core/registry';
import loginActions from '@/modules/login/stores/loginActions';
import { UserClaimState } from '@/modules/login/stores/loginTypes';

const initialState: UserClaimState = {
  autoLoginInfo: {
    inProcess: false,
    isFailed: false,
  },
  claimId: undefined,
  loading: false,
};

const loginReducer = createReducer(initialState, {
  [loginActions.requestAutoLogin.toString()]: (state): void => {
    state.autoLoginInfo.inProcess = true;
  },
  [loginActions.successAutoLogin.toString()]: (state): void => {
    state.autoLoginInfo.inProcess = false;
  },
  [loginActions.errorAutoLogin.toString()]: (state): void => {
    state.autoLoginInfo.inProcess = false;
    state.autoLoginInfo.isFailed = true;
  },
  [loginActions.successLogin.toString()]: (state): void => {
    state.status = OperationStatus.COMPLETED;
  },
  [loginActions.errorLogin.toString()]: (state, action): void => {
    state.error = action.payload;
    state.status = OperationStatus.NONE;
  },
  [loginActions.requestLogin.toString()]: (state): void => {
    state.status = OperationStatus.IN_PROGRESS;
  },
});

reducerRegistry.register('loginState', loginReducer);

export default loginReducer;
