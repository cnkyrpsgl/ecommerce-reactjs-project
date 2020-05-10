import { Saga } from 'redux-saga';

const initialSagas: Saga[][] = [];

class SagasRegistry {
  private emitChange: (sagas: Saga[]) => void;

  private sagas: Saga[][];

  public constructor() {
    this.emitChange = (i: Saga[]): Saga[] => i;
    this.sagas = initialSagas;
  }

  public register(sagas: Saga[]): void {
    this.sagas = [...this.sagas, sagas];
    this.emitChange(sagas);
  }

  public setChangeListener(listener: (sagas: Saga[]) => void): void {
    this.emitChange = listener;
    this.sagas.forEach((saga): void => this.emitChange(saga));
  }
}

const sagasRegistry = new SagasRegistry();
export default sagasRegistry;
