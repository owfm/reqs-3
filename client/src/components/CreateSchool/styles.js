import styled from "styled-components";

export const FormContainer = styled.div`
  background: white;
  border: 2px solid black
  border-radius: 15px;
  padding: 4rem;
  margin: 0 15%;
  font-size: 16px;
  display: grid;
  grid-gap: 60px;
  grid-template-columns: 200px 1fr;
`;

export const Label = styled.label`
  align-self: center;

  grid-column: 1 / 2;
`;

export const FormInput = styled.div`
  align-self: center;
  grid-column: 2/2;
`;

export const Header = styled.h1`
  grid-column: 1 / span 2;
`;

export const CurrentTermDatesContainer = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: repeat(${props => props.columns}, 1fr);
  grid-gap: 16px;
  margin-top: ;
`;

export const FullWidth = styled.div`
  grid-column: first / end;
`;

export const TermRowItem = styled.div``;
