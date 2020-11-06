import { all } from "redux-saga/effects";

import pageSagas from "./page/saga";

export default function* rootSaga(getState) {
  yield all([pageSagas()]);
}
