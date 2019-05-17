var User = require("../models/user");

exports.getAllUsers = async (request, response) => {
  try {
    const users = await User.find().populate("school");
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
