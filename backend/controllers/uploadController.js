const fs = require("fs");
const csv = require("fast-csv");

const Lesson = require("../models/lesson");

// TODO: get user_id and school from authentication header and assign id to lessons

exports.timetable = async (request, response) => {
  const fileRows = [];

  // if (!request.file.path) {
  //   response
  //     .status(400)
  //     .send({ data: null, err: new Error("No file supplied.") });
  // }

  // open uploaded file
  csv
    .fromPath(request.file.path)
    .on("data", function(data) {
      fileRows.push(data); // push each row
    })
    .on("end", function() {
      fs.unlinkSync(request.file.path); // remove temp file
      let lessons = getLessonsFromCsv(fileRows);

      lessons = lessons.map(lesson => {
        return {
          ...lesson,
          teacher: teacherId,
          school: schoolId,
        };
      });

      lessons.forEach(async function(item) {
        let lesson = new Lesson(item);
        try {
          await lesson.save();
        } catch (err) {
          throw new Error();
        }
      });

      Lesson.find(function(err, lessons) {
        if (err) {
          response.status(500).send("fail");
        }
        response.status(200).send(JSON.stringify(lessons));
      });
    });
};

const schoolId = "5cd432b946c7d97c6f5c9e45";
const teacherId = "5cd450445819b885d01f65d4";

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
