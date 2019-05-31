import { connect } from "react-redux";
import CreateSchool from "./CreateSchool";
import { createSchool } from "actions/schools";
import emitSnackbar from "actions/snackbar";

const mapDispatchToProps = dispatch => {
  return {
    createSchool: school => dispatch(createSchool(school)),
    emitSnackbar: message => dispatch(emitSnackbar(message)),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CreateSchool);
