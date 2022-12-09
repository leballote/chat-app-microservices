import { Dispatch } from "@reduxjs/toolkit";
import { resetState } from "./features/appView/mainSectionDrawerSlice";
import { setMainDrawerSection } from "./features/appView/sideBarSlice";

export function setMainDrawerSectionAndReset(dispatch: Dispatch) {
  dispatch(resetState());
  dispatch(setMainDrawerSection());
}

export class AutoIncrementIndexCreator {
  lastId: number = 0;

  generateIndex() {
    return this.lastId++;
  }
  reduceIndex() {
    this.lastId--;
  }
}
