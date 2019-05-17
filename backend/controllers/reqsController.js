var Req = require("../models/req");

exports.getAllReqs = (request, response) => {
  Req.find({})
    .populate({
      path: "lesson",
      populate: { path: "school teacher" },
    })
    .exec(function(error, reqs) {
      if (error) {
        response.status(500);
        response.json({
          data: null,
          error: new Error(
            "Sorry, something went wrong fetching your requisitions."
          ),
        });
      } else {
        response.json({ data: reqs, error: null });
      }
    });
};

exports.getReqById = (request, response) => {
  // TODO: check user has same school as requisition
  console.log(request.params.id);
  Req.findById(request.params.id)
    .populate({ path: "lesson", populate: { path: "teacher" } })
    .populate({ path: "school" })
    .exec(function(error, req) {
      if (error) {
        response
          .status(404)
          .json({ error: new Error("Sorry, could't find that requisition.") });
      } else {
        response.json({ data: req });
      }
    });
};

exports.postNewReq = (request, response) => {
  // TODOcheck authorised to add req
  // TODO get submitting teacher id from authorisation header

  var newReq = new Req({
    ...request.body,
    teacher: "5cd450445819b885d01f65d4",
    createdAt: Date.now(),
  });

  newReq.save(function(error, req) {
    if (error) {
      response.status(400).json({ data: null, error });
    } else {
      response.status(201).json({
        data: req,
      });
    }
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

exports.patchReq = (request, response) => {
  Req.findByIdAndUpdate(
    request.params.id,
    { ...request.body, updatedAt: Date.now() },
    { new: true },
    function(error, req) {
      if (error) {
        response.status(404).json({
          data: null,
          error: new Error("Sorry, couldn't update that requisition."),
        });
      } else {
        response.status(204).json({ data: req, error: null });
      }
    }
  );
};
