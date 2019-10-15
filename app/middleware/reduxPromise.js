import { createPromise } from "redux-promise-middleware";

export const reduxPromise = createPromise({
  promiseTypeSuffixes: ["LOADING", "SUCCESS", "FAILURE"]
});
