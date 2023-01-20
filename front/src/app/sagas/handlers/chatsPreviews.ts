import { call, put } from "redux-saga/effects";
import {
  setValue as setChatsPreviews,
  setLoading,
  setError,
} from "../../features/appData/chatsPreviewsSlice";
import { requestGetChatsPreviews } from "../requests/chatsPreviews";
import indexArrayByField from "../../../utils/indexArrayByField";
import { handleSagaStatefulError } from "./utils";

export function* handleChatsPreviews(): any {
  try {
    yield put(setError(null));
    yield put(setLoading(true));
    const response = yield call(requestGetChatsPreviews);
    const { data } = response;
    const {
      viewer: { chats },
    } = data;
    const chats_ = indexArrayByField(chats, "id");
    yield put(setChatsPreviews(chats_));
  } catch (error) {
    yield* handleSagaStatefulError(error, setError, setLoading);
  }
}
