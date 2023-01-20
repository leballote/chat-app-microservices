import { call, put } from "redux-saga/effects";
import {
  setValue as setContactsPreviewsValue,
  setLoading,
  setError,
} from "../../features/appData/contactsPreviewsSlice";
import { requestGetContactsPreviews } from "../requests/contactsPreviews";
import { handleSagaStatefulError } from "./utils";

export function* handleContactsPreviews(): any {
  try {
    yield put(setLoading(true));
    const response = yield call(requestGetContactsPreviews);
    const { data } = response;
    const {
      viewer: { friends: contacts },
    } = data;
    yield put(setContactsPreviewsValue(contacts));
  } catch (error) {
    yield* handleSagaStatefulError(error, setError, setLoading);
  }
}
