import styled from "styled-components";

export const FormContainer = styled.div`
  margin: 0 30% 0 30%;
  font-size: 16px;
  display: grid;
  grid-gap: 16px;
  grid-template-columns: 200px 1fr;
`;

export const Label = styled.label`
  grid-column: 1 / 2;
`;
