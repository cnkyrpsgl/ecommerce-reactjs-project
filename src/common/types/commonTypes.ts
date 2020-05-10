export interface AutoLoginInfo {
  inProcess: boolean;
  isFailed: boolean;
}

export interface Identity {
  userId: number;
  firstName: string;
  lastName: string;
}

export interface IdentityInfo {
  identity?: Identity;
  loggedIn: boolean;
}

export enum OperationStatus {
  NONE,
  IN_PROGRESS,
  COMPLETED,
}

export interface OperationState {
  status?: OperationStatus;
  loading?: boolean;
  error?: string;
}
