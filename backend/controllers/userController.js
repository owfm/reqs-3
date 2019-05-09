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

exports.patchUser = async (request, response) => {
  let patchObject = { ...request.body };
  patchObject.updatedAt = Date.now();
  try {
    const user = await User.findByIdAndUpdate(request.params.id, patchObject);
    response.send({ data: user });
  } catch (err) {
    response.status(400).send({ data: null, errors: err });
  }
};
