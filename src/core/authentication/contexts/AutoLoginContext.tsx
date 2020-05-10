import React from 'react';

import { AutoLoginInfo } from '@/common/types/commonTypes';

export default React.createContext<AutoLoginInfo>({ inProcess: false, isFailed: false });
