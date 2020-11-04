import { Subject } from "../../../web_modules/rxjs.js";

const subjects = {};

export const subject = (name) => {
  if (subjects[name]) {
    return subjects[name];
  }

  subjects[name] = new Subject();

  return subjects[name];
};
