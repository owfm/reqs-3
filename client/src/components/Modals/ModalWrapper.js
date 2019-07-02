import React from "react";
import { connect } from "react-redux";
import { closeModal } from "actions/ui";
import { Modal } from "semantic-ui-react";
import Req from "components/Req/Req";
import Login from "components/auth/Login";
import * as types from "actions/modalTypes";

const ModalWrapper = ({ open, modalType, title, closeModal, meta }) => {
  if (!open) return null;

  switch (modalType) {
    case types.OPEN_LOGIN: {
      return (
        <Modal open={true} size="tiny" onClose={closeModal}>
          <Modal.Content>
            <Login />
          </Modal.Content>
        </Modal>
      );
    }
    case types.OPEN_REQUISITION: {
      return (
        <Modal
          closeIcon={meta.existingRequisition}
          closeOnDimmerClick={meta.existingRequisition}
          open={true}
          onClose={closeModal}
        >
          <Modal.Header>{title}</Modal.Header>
          <Modal.Content>
            <Req id={meta.id} />
          </Modal.Content>
        </Modal>
      );
    }
    default:
      return null;
  }
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal()),
  };
};

const mapStateToProps = state => {
  return { ...state.ui.modal };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalWrapper);
