import { Dispatch } from "@reduxjs/toolkit";
import { resetState } from "./features/appView/mainSectionDrawerSlice";
import { setMainDrawerSection } from "./features/appView/sideBarSlice";

export function setMainDrawerSectionAndReset(dispatch: Dispatch) {
  dispatch(resetState());
  dispatch(setMainDrawerSection());
}
