const fs = require("fs");
const csv = require("fast-csv");
const includes = require("lodash.includes");
var isEmail = require("validator/lib/isEmail");

const Lesson = require("../models/lesson");
const User = require("../models/user");
const School = require("../models/school");

exports.createusers = async (request, response, next) => {
  var schoolId = null;
  try {
    schoolId = request.user.school;
  } catch (error) {
    response.status(400).json({
      data: null,
      errors:
        "Something's wrong here; we can't find your school. Please speak to your admin.",
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
        newUsers = getUsersFromCsvRows(fileRows);
      } catch (error) {
        next(error);
        return;
      }

      const users = newUsers.map(user => {
        return {
          ...user,
          school: schoolId,
          // admin: false, // don't need this, set to 'false' by default
          password: "password",
        };
      });

      try {
        const insertedUsers = await User.create(users);
        const newIds = insertedUsers.map(obj => obj._id);

        await School.findOne({ _id: schoolId })
          .populate("staff")
          .exec(function(error, school) {
            if (error) {
              next(error);
            }
            newIds.push([...school.staff]);
          });

        await School.findByIdAndUpdate(
          schoolId,
          { staff: Array.from(new Set(newIds)) },
          function(error, school) {
            if (error) {
              next(error);
            }
          }
        );

        response.status(200).json({ data: insertedUsers, errors });
      } catch (error) {
        next(error);
      }
    });
};

exports.timetable = async (request, response, next) => {
  const fileRows = await getFileRowsFromCsv(request.file.path);
  const lessons = await getLessonsFromCsv(fileRows, request.user.school);

  Lesson.collection.insertMany(lessons, { ordered: false }, function(
    errors,
    result
  ) {
    if (errors) {
      next(errors);
    }
    // console.log(result.ops);
    // console.log(Object.keys(result.result));
    response.status(201).json({ data: result.ops, errors: null });
  });
};

const getIdFromStaffCode = (users, staffCode) => {
  // takes list of user objects, returns the Id of the member with staffCode, else null
  const user = users.filter(u => u.staffCode == staffCode);
  if (user.length == 1) {
    return user[0]._id;
  } else {
    return null;
  }
};

const getLessonsFromCsv = async (fileRows, school) => {
  const users = await User.find({ school: school }).exec();

  lessons = [];

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  fileRows.forEach((row, rowIndex) => {
    // skip first row
    if (rowIndex == 0) return;

    // skip registration periods
    if (row[0].slice(5).isNaN || row[0].includes("reg")) return;

    row.forEach((cell, cellIndex) => {
      // skip first column
      if (cellIndex == 0 || !cell) return;
      try {
        const teacher = getIdFromStaffCode(users, fileRows[0][cellIndex]);
        const classgroup = cell.split(" ")[0].trim();
        const week = parseInt(cell.charAt(0));

        const day = row[0].slice(1, 4).trim();
        if (days.indexOf(day) == -1) {
          return;
        }

        const period = parseInt(row[0].slice(5));
        if (period.isNaN) {
          return;
        }

        const room = cell.split(" ")[1].trim();
        lessons.push({
          teacher,
          school,
          classgroup,
          week,
          day,
          period,
          room,
        });
      } catch (error) {
        console.log(error);
        return;
      }
    });
  });
  return lessons;
};

const getUsersFromCsvRows = fileRows => {
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

const getFileRowsFromCsv = path => {
  let fileRows = [];
  csv
    .fromPath(path)
    .on("data", function(data) {
      fileRows.push(data); // push each row
    })
    .on("end", async function() {
      fs.unlinkSync(path); // remove temp file
    });
  return fileRows;
};
