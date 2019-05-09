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

exports.postNewSchool = (request, response) => {
  var newSchool = new School();
  const keys = Object.keys(request.body);
  keys.map(key => (newSchool[key] = request.body[key]));

  newSchool.createdAt = Date.now();

  newSchool.save(function(err, school) {
    if (err) {
      response.status(400);
      response.send(JSON.stringify({ data: err }));
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

exports.patchSchool = (request, response) => {
  let patchObject = { ...request.body };
  patchObject.updatedAt = Date.now();

  School.findByIdAndUpdate(request.params.id, patchObject, function(err, req) {
    if (err) {
      console.log(err);
    } else {
      response.send(JSON.stringify({ data: req }));
    }
  });
};
