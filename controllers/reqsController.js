var Req = require("../models/req");

exports.getAllReqs = (request, response, next) => {
  let school = null;
  try {
    school = request.user.school;
  } catch (error) {
    response.status(400).json({
      data: null,
      errors:
        "Something's wrong here; we can't find your school. Please speak to your admin person.",
    });
  }

  // todo: filter by timeframe, need to decide how to handle pagination

  Req.find({ school: school })
    .populate("teacher")
    .populate({
      path: "lesson",
      populate: { path: "teacher" },
    })
    .exec(function(error, reqs) {
      if (error) {
        next(new Error("Something wen't wrong finding these reqs, sorry."));
      } else {
        response.json({ data: reqs, error: null });
      }
    });
};

exports.getReqById = (request, response) => {
  // TODO: check user has same school as requisition
  Req.findById(request.params.id)
    .populate({ path: "lesson", populate: { path: "teacher" } })
    .populate({ path: "school" })
    .exec(function(error, req) {
      if (error) {
        response
          .status(404)
          .json({ error: new Error("Sorry, couldn't find that requisition.") });
      } else {
        response.json({ data: req });
      }
    });
};

exports.postNewReq = (request, response, next) => {
  // TODO check authorised to add req
  // TODO get submitting teacher id from authorisation header
  let school = null;
  try {
    school = request.user.school;
  } catch (error) {
    response.status(400).json({
      data: null,
      errors:
        "Something's wrong here; we can't find your school. Please speak to your admin person.",
    });
  }

  // TODO validate req body.

  var newReq = new Req({
    ...request.body,
    teacher: request.user._id,
    school,
    createdAt: Date.now(),
  });

  newReq.save(function(error) {
    if (error) {
      response.status(400).json({ data: null, error });
    }
    newReq
      .populate({ path: "lesson", populate: { path: "teacher" } })
      .populate({ path: "school" }, function(error, req) {
        if (error) {
          response.status(400).json({ data: null, error });
        }
        response.json({ error: null, data: req });
      });
  });
};

exports.deleteSingleReq = (request, response) => {
  Req.deleteOne({ _id: request.params.id }, function(error) {
    if (error) {
      response.status(400).json({ data: null, error });
    } else {
      response.status(204).json({ data: null, error: null });
    }
  });
};

exports.deleteAllReqs = (request, response) => {
  Req.deleteMany({}, function(error) {
    if (error) {
      response.status(400).json({ data: null, error });
    } else {
      response.status(204).json({ data: null, error: null });
    }
  });
};

exports.patchReq = (request, response) => {
  Req.findByIdAndUpdate(
    request.params.id,
    { ...request.body, updatedAt: Date.now() },
    { new: true }
  )
    .populate({ path: "lesson", populate: { path: "teacher" } })
    .populate({ path: "school" })
    .exec(function(error, req) {
      if (error) {
        response.status(404).json({
          data: null,
          error: new Error("Sorry, couldn't update that requisition."),
        });
      } else {
        response.status(200).send(JSON.stringify({ data: req, error: null }));
      }
    });
};
