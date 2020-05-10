import React from 'react';

import { IdentityInfo } from '@/common/types/commonTypes';

export default React.createContext<IdentityInfo>({ identity: undefined, loggedIn: false });
