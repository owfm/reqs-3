const fs = require("fs");
const csv = require("fast-csv");
const includes = require("lodash.includes");
var isEmail = require("validator/lib/isEmail");

const Lesson = require("../models/lesson");
const User = require("../models/user");

const schoolId = "5ce68bac80e1fe39a5f44256";
const teacherId = "5ce68beb80e1fe39a5f44257";

const getUsersFromCsv = fileRows => {
  const users = fileRows
    .map(row => {
      if (row[0] == "full name*") return null;
      const fullName = row[0];
      const email = row[1];
      if (!fullName || !email) {
        console.error("throwing error about email or full name");
        throw new Error(
          "Please check your uploaded files, it looks like some names or emails are missing!"
        );
      }
      if (!isEmail(email)) {
        console.error("throwing error about email badly formatted");

        throw new Error(
          "Please check your emails, some appear appear to be badly formatted!"
        );
      }
      if (!includes(["teacher", "technician"], row[2].toLowerCase()))
        throw new Error(
          "Please check that all users have either 'Teacher' or 'Technician' roles assigned."
        );

      return {
        fullName: row[0],
        email: row[1],
        role: row[2].toLowerCase() == "teacher" ? "Teacher" : "Technician",
        staffCode: row[3],
      };
    })
    .filter(element => element != null);
  return users;
};

exports.createusers = async (request, response, next) => {
  // get school from requestId
  let school = null;
  try {
    school = request.user;
  } catch (error) {
    response.status(400).json({
      data: null,
      errors:
        "Something's wrong here; we can't find your school. Please speak to your admin person.",
    });
  }

  const fileRows = [];
  const errors = [];
  csv
    .fromPath(request.file.path)
    .on("data", function(data) {
      fileRows.push(data);
    })
    .on("end", async function() {
      fs.unlinkSync(request.file.path); // remove temp file
      let newUsers = [];
      try {
        newUsers = getUsersFromCsv(fileRows);
      } catch (error) {
        next(error);
        return;
      }

      const users = newUsers.map(user => {
        return {
          ...user,
          school,
          // admin: false, // don't need this, set to 'false' by default
          password: "password",
        };
      });

      let insertedUsers;
      try {
        insertedUsers = await User.create(users);
      } catch (error) {
        errors.push(error);
      }
      response.status(200).json({ data: insertedUsers, errors });
    });
};

exports.timetable = async (request, response) => {
  const fileRows = [];

  // todo: get school id from submitting users jwt token

  csv
    .fromPath(request.file.path)
    .on("data", function(data) {
      fileRows.push(data); // push each row
    })
    .on("end", async function() {
      fs.unlinkSync(request.file.path); // remove temp file
      let lessons = getLessonsFromCsv(fileRows);

      lessons = lessons.map(lesson => {
        return {
          ...lesson,
          teacher: teacherId,
          school: schoolId,
        };
      });
      try {
        await Lesson.insertMany(lessons);
      } catch (error) {
        next(error);
      }

      // TODO CHECK IF LESSON ALREADY EXISTS, CHECK FOR DUPLICATES

      Lesson.find(function(error, lessons) {
        if (error) {
          next(error);
        }
        response.status(200).json(lessons);
      });
    });
};

const getLessonsFromCsv = fileRows => {
  return fileRows
    .map(row => {
      try {
        const week = parseInt(row[0].charAt(0));
        const day = row[0].slice(1, 4);
        const period = parseInt(row[0].slice(5));
        const classgroup = row[1].split(" ")[0];
        const room = row[1].split(" ")[1];
        if ([week, day, period, classgroup, room].includes(null || "")) {
          return null;
        }
        return { week, day, period, classgroup, room };
      } catch (err) {
        return null;
      }
    })
    .filter(lesson => lesson !== null);
};
