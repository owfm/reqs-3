import styled from "styled-components";

const dayToColMap = {
  Mon: 2,
  Tue: 3,
  Wed: 4,
  Thu: 5,
  Fri: 6,
};

const periodToRowMap = {
  1: 2,
  2: 3,
  3: 4,
  4: 5,
  5: 6,
  6: 7,
};

const SessionItem = styled.div`
  grid-column-start: ${props => dayToColMap[props.day]}
  grid-row-start: ${props => periodToRowMap[props.period]}
`;

export default SessionItem;
