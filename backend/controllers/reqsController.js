var Req = require("../models/req");

exports.getAllReqs = (request, response) => {
  Req.find({}).exec(function(err, reqs) {
    if (err) {
      response.status(500);
      response.send(
        JSON.stringify({
          data: null,
          errors: err
        })
      );
    } else {
      response.send(JSON.stringify({ data: reqs }));
    }
  });
};

exports.getReqById = (request, response) => {
  Req.findById(request.params.id, function(err, req) {
    if (err) {
      if (err.kind == "ObjectId") {
        response.status(404).end();
      }
    } else {
      response.send(JSON.stringify(req));
    }
  });
};

exports.postNewReq = (request, response) => {
  var newReq = new Req();
  const keys = Object.keys(request.body);
  keys.map(key => (newReq[key] = request.body[key]));

  newReq.createdAt = Date.now();

  newReq.save(function(err, req) {
    if (err) {
      response.status(400);
      response.send(JSON.stringify({ data: err }));
    } else {
      response.send({
        data: req
      });
    }
  });
};

exports.deleteSingleReq = (request, response) => {
  Req.deleteOne({ _id: request.params.id }, function(err) {
    if (err) {
      if (err.kind == "ObjectId") {
        response.status(404);
        response.send(
          JSON.stringify({
            data: null,
            errors: err
          })
        );
      }
    } else {
      response.send(JSON.stringify({ data: null }));
    }
  });
};

exports.patchReq = (request, response) => {
  let patchObject = { ...request.body };
  patchObject.updatedAt = Date.now();

  Req.findByIdAndUpdate(request.params.id, patchObject, function(err, req) {
    if (err) {
      console.log(err);
    } else {
      response.send(JSON.stringify({ data: req }));
    }
  });
};
