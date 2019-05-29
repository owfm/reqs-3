const fs = require("fs");
const csv = require("fast-csv");

const Lesson = require("../models/lesson");

// TODO: get user_id and school from authentication header and assign id to lessons

exports.timetable = async (request, response) => {
  const fileRows = [];

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

const schoolId = "5ce68bac80e1fe39a5f44256";
const teacherId = "5ce68beb80e1fe39a5f44257";

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
