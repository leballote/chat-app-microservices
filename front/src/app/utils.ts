import { createAction, Dispatch, Slice } from "@reduxjs/toolkit";
import { resetState } from "./features/appView/mainSectionDrawerSlice";
import { setMainDrawerSection } from "./features/appView/sideBarSlice";

export function setMainDrawerSectionAndReset(dispatch: Dispatch) {
  dispatch(resetState());
  dispatch(setMainDrawerSection());
}

export class AutoIncrementIndexCreator {
  lastId = 0;

  generateIndex() {
    return this.lastId++;
  }
  reduceIndex() {
    this.lastId--;
  }
}

export function createNamespacedAction<T>(slice: Slice, actionName: string) {
  return createAction<T>(`${slice.name}/${actionName}`);
}

export function createNamespacedActionCreator(slice: Slice) {
  return function <T>(actionName: string) {
    return createNamespacedAction<T>(slice, actionName);
  };
}
