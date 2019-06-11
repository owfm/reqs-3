import ReqMiniPresentation from "components/Lessons/ReqMiniPresentation";
import { connect } from "react-redux";
import { openModal } from "actions/ui";
import getIsFetching from "reducers";
import emitSnackbar from "actions/snackbar";

const mapStateToProps = (state, ownProps) => {
  const req = state.entitiesById.reqs[ownProps.reqId];

  return {
    req,
    lesson: state.entitiesById.lessons[req.lesson],
    loading: getIsFetching(state, "reqs"),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openModal: params => dispatch(openModal(params)),
    emitSnackbar: message => dispatch(emitSnackbar(message)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReqMiniPresentation);
