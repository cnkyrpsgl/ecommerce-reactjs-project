import { createAction } from '@reduxjs/toolkit';

import { IdentityInfo } from '@/common/types/commonTypes';
import { OtpCodeRequest, OtpLoginRequest } from '@/modules/login/stores/loginTypes';

const loginActions = {
  requestAutoLogin: createAction<void>('AUTO_LOGIN_REQUEST'),
  successAutoLogin: createAction<IdentityInfo>('AUTO_LOGIN_SUCCESS'),
  errorAutoLogin: createAction<string>('AUTO_LOGIN_ERROR'),
  requestLogin: createAction<OtpLoginRequest>('LOGIN_REQUEST'),
  requestOtpLogin: createAction<OtpCodeRequest>('LOGIN_OTP_REQUEST'),
  saveClaimId: createAction<string>('SAVE_CLAIM_ID'),
  successLogin: createAction<IdentityInfo>('LOGIN_SUCCESS'),
  errorLogin: createAction<string>('LOGIN_ERROR'),
  requestLogout: createAction<void>('LOGOUT_REQUEST'),
  successLogout: createAction<void>('LOGOUT_SUCCESS'),
  errorLogout: createAction<string>('LOGOUT_ERROR'),
};

export default loginActions;
