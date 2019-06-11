import { connect } from "react-redux";
import LessonMiniPresentation from "components/Lessons/LessonMiniPresentation";
import { createReqAndOpenModal } from "actions/req";

const mapDispatchToProps = (dispatch, ownProps) => {
  const { lessonId } = ownProps;
  return {
    onPaperClick: () => dispatch(createReqAndOpenModal({ lesson: lessonId })),
  };
};

const mapStateToProps = (state, ownProps) => {
  const { lessonId } = ownProps;
  return {
    lesson: state.entitiesById.lessons[lessonId],
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LessonMiniPresentation);
