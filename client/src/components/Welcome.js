import React from "react";
import { connect } from "react-redux";
import { openModal } from "actions/ui";
import styled from "styled-components";
import { Header } from "semantic-ui-react";
import history from "history/history";

const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Welcome = ({ auth, openModal }) => {
  if (auth.user) history.push("dashboard");

  return (
    <WelcomeContainer>
      <Header size="huge">Welcome</Header>
    </WelcomeContainer>
  );
};

const mapStateToProps = ({ auth }) => {
  return {
    auth,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openModal: args => dispatch(openModal(args)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Welcome);
