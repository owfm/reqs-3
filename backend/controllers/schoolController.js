var School = require("../models/school");

exports.getAllSchools = (request, response) => {
  School.find({}, function(err, school) {
    if (err) {
      if (err.kind == "ObjectId") {
        response.status(404).end();
      }
    } else {
      response.send(JSON.stringify(school));
    }
  });
};

exports.getSchoolById = (request, response) => {
  School.findById(request.params.id, function(err, school) {
    if (err) {
      if (err.kind == "ObjectId") {
        response.status(404).end();
      }
    } else {
      response.send(JSON.stringify(school));
    }
  });
};

exports.postNewSchool = (request, response, next) => {
  var newSchool = new School({ ...request.body, createdAt: Date.now() });
  newSchool.save(function(err, school) {
    if (err) {
      next(err);
    } else {
      response.send({
        data: school,
      });
    }
  });
};

exports.deleteSingleSchool = (request, response) => {
  School.deleteOne({ _id: request.params.id }, function(err) {
    if (err) {
      if (err.kind == "ObjectId") {
        response.status(404);
        response.send(
          JSON.stringify({
            data: null,
            errors: err,
          })
        );
      }
    } else {
      response.send(JSON.stringify({ data: null }));
    }
  });
};

exports.patchSchool = (request, response, next) => {
  School.findByIdAndUpdate(
    request.params.id,
    { ...request.body, updatedAt: Date.now() },
    { new: true },
    function(err, req) {
      if (err) {
        next(err);
      } else {
        response.send(JSON.stringify({ data: req }));
      }
    }
  );
};
