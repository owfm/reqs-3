var Lesson = require("../models/lesson");

exports.getAllLessons = (request, response) => {
  Lesson.find({ school: request.user.school })
    .populate({ path: "teacher" })
    // .populate({ path: "school" })
    .exec(function(error, lessons) {
      if (error) {
        response.status(500);
        response.json({
          data: null,
          error: new Error("Sorry, something wen't wrong fetching lessons."),
        });
      } else {
        response.json({ data: lessons, error: null });
      }
    });
};
exports.getSingleLesson = (request, response) => {
  Lesson.find({ _id: request.params.id })
    .populate("teacher")
    .populate("school")
    .exec(function(error, lesson) {
      if (error) {
        response.status(404).json({
          data: null,
          error: new Error("Couldn't find that user."),
        });
      }
      response.status(200).json({ data: lesson, error: null });
    });
};

exports.deleteSingleLesson = (request, response) => {
  Lesson.deleteOne({ _id: request.params.id }, function(error) {
    if (error) {
      response.json({
        error: new Error("Sorry, something wen't wrong deleting that lesson."),
        data: null,
      });
    }
    response.status(204).end();
  });
};

exports.deleteAllLessons = (request, response) => {
  //TODO CHECK ONLY DELETE SINGLE SCHOOL
  Lesson.deleteMany({}, function(error) {
    if (error) {
      response.status(406).end();
    }
  });
  response.status(204).end();
};
