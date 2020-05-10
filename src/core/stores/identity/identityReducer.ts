import { createReducer } from '@reduxjs/toolkit';

import { IdentityInfo } from '@/common/types/commonTypes';
import loginActions from '@/modules/login/stores/loginActions';

const initialIdentity = {
  identity: undefined,
  loggedIn: false,
  roles: ['GUEST'],
};

export interface IdentityState {
  identityInfo: IdentityInfo;
  intentionalLogin: boolean;
}

const initialState: IdentityState = {
  identityInfo: initialIdentity,
  intentionalLogin: false,
};

const identityReducer = createReducer(initialState, {
  [loginActions.successAutoLogin.toString()]: (state, action): void => {
    state.identityInfo = action.payload;
    state.intentionalLogin = false;
  },
  [loginActions.successLogin.toString()]: (state, action): void => {
    state.identityInfo = action.payload;
    state.intentionalLogin = true;
  },
  [loginActions.successLogout.toString()]: (state): void => {
    state.identityInfo = initialIdentity;
    state.intentionalLogin = false;
  },
});

export default identityReducer;
