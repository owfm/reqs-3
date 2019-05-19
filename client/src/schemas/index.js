// NORMALIZR SCHEMAS

import { schema } from "normalizr";

export const user = new schema.Entity(
  "users",
  {
    school: school,
  },
  { idAttribute: "_id" }
);

export const school = new schema.Entity(
  "schools",
  {
    admin: user,
    staff: [user],
  },
  {
    idAttribute: "_id",
  }
);

export const lesson = new schema.Entity(
  "lessons",
  {
    teacher: user,
    school: school,
  },
  {
    idAttribute: "_id",
  }
);

export const reqs = new schema.Entity(
  "reqs",
  {
    teacher: user,
    lesson: lesson,
  },
  {
    idAttribute: "_id",
  }
);
