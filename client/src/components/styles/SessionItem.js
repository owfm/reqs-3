import styled from "styled-components";

const dayToColMap = {
  Mon: 2,
  Tue: 3,
  Wed: 4,
  Thu: 5,
  Fri: 6,
};

const dayIndextoColMap = {
  1: 2,
  2: 3,
  3: 4,
  4: 5,
  5: 6,
};

const periodToRowMap = {
  1: 2,
  2: 3,
  3: 4,
  4: 5,
  5: 6,
  6: 7,
};

// Holiday item is got from date-fns 'getDay' function which returns index, with Sunday = 0
export const HolidayItem = styled.div`
  grid-column-start: ${props => dayIndextoColMap[props.day]};
  grid-row-start: 1;
  grid-row-end: 5;
`;

export const SessionItem = styled.div`
min-height: 60px;
align-items: stretch;

  grid-column-start: ${props => dayToColMap[props.day]}
  grid-row-start: ${props => periodToRowMap[props.period]}
`;
