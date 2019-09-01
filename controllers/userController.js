var User = require("../models/user");

exports.getAllUsers = async (request, response) => {
  try {
    const users = await User.find({ school: request.user.school });
    response.send({ data: users });
  } catch (err) {
    response.status(500).send({ data: null, errors: err });
  }
};

exports.getUserById = async (request, response) => {
  try {
    const user = await User.findById(request.params.id);
    response.send({ data: user });
  } catch (err) {
    response.status(404).send({ data: null, errors: err });
  }
};

exports.patchUser = (request, response) => {
  let patchObject = { ...request.body };
  patchObject.updatedAt = Date.now();

  User.findByIdAndUpdate(
    request.params.id,
    { ...request.body, updatedAt: Date.now() },
    { new: true },
    function(error, user) {
      if (error) {
        response
          .status(400)
          .json({ data: null, error: new Error("Could not update user.") });
      }
      response.json({ data: user });
    }
  );
};

exports.deleteAllExceptOllie = (request, response, next) => {
  User.deleteMany({ _id: { $ne: "5cf03e83b1de672505fe2597" } }, function(
    error
  ) {
    if (error) {
      next(error);
    }
  });
  response.status(201).end();
};
