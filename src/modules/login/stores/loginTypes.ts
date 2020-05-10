import { AutoLoginInfo, OperationState } from '@/common/types/commonTypes';

export interface OtpLoginRequest {
  phoneNumberClaimId?: string;
  phoneNumberClaimToken: string;
}
export interface OtpCodeRequest {
  phoneNumber: string;
}
export interface UserClaimState extends LoginState {
  claimId?: string;
}
export interface LoginState extends OperationState {
  autoLoginInfo: AutoLoginInfo;
}
