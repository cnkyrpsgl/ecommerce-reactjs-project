import { Reducer, ReducersMapObject } from 'redux';

import identityReducer from '@/core/stores/identity';

const initialReducers = {
  identityState: identityReducer,
};

class ReducerRegistry {
  private emitChange: (reducer: ReducersMapObject) => void;

  private reducers: ReducersMapObject;

  public constructor(reducersMapObject: ReducersMapObject) {
    this.emitChange = (i: ReducersMapObject): ReducersMapObject => i;
    this.reducers = reducersMapObject;
  }

  public register(name: string, reducer: Reducer): void {
    const reducerNames = Object.keys(this.reducers);
    if (reducerNames.includes(name)) {
      throw new Error(
        `There is already a reducer with the given name '${name}'. Please rename your reducer before registering.`
      );
    }
    this.reducers = { ...this.reducers, [name]: reducer };
    this.emitChange(this.reducers);
  }

  public getReducers(): ReducersMapObject {
    return { ...this.reducers };
  }

  public setChangeListener(listener: (reducer: ReducersMapObject) => void): void {
    this.emitChange = listener;
  }
}

export default new ReducerRegistry(initialReducers);
