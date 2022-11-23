import { Dispatch } from "@reduxjs/toolkit";
import { resetState } from "./features/mainSectionDrawerSlice";
import { setMainDrawerSection } from "./features/sideBarSlice";

export function setMainDrawerSectionAndReset(dispatch: Dispatch) {
  dispatch(resetState());
  dispatch(setMainDrawerSection());
}
