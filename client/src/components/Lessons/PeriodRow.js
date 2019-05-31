import React from "react";
import styled from "styled-components";

const PeriodLabel = styled.div`
  grid-column-start: 1;
  grid-row-start: ${props => parseInt(props.period) + 1};
`;

const PeriodRow = () => {
  const periods = ["1", "2", "3", "4", "5", "6"];

  const periodRow = periods.map(period => (
    <PeriodLabel key={period} period={period}>
      {period}
    </PeriodLabel>
  ));

  return periodRow;
};

export default PeriodRow;
