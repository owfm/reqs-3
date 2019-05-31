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

exports.deleteAllSchools = (request, response, next) => {
  School.deleteMany({}, error => {
    if (error) {
      next(error);
    }
    response.status(204).end();
  });
};

exports.patchSchool = (request, response, next) => {
  // TODO HANDLE ADDING USERS TO 'STAFF' ARRAY ON USER CREATION
  School.findByIdAndUpdate(
    request.params.id,
    { ...request.body, updatedAt: Date.now() },
    { new: true },
    function(error, school) {
      if (error) {
        next(new Error("Couldn't update school."));
      }
      response.status(201).json({ data: school, error: null });
    }
  );
};
