import { UserClaimState } from '@/modules/login/stores/loginTypes';

export default ({ loginState }: { loginState: UserClaimState }): UserClaimState => loginState;
