import styled from "styled-components";
import Paper from "@material-ui/core/Paper";

export const MainGrid = styled.div`
  padding: 20px;
  display: grid;
  justify-items: stretch;
  align-items: stretch;
  grid-template-rows: auto repeat(${props => props.periods.length + 1}, auto);
  grid-gap: 10px;
  grid-template-columns: auto repeat(5, 1fr);
`;

export const SessionGrid = styled.div`
  display: grid;
  grid-gap: 5px;
`;

export const HeaderWrapper = styled.div`
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const DayName = styled.div`
font-size: 20px;
height: 30px;
width: 30px;
  display: table-cell;
  text-align: center;
  vertical-align: middle;
  border-radius: 100%; /* may require vendor prefixes */
  background: ${props => (props.highlighted ? "red" : "white")};
  color: ${props => (props.highlighted ? "white" : "black")};
  font-weight: ${props => (props.highlighted ? "bold" : "normal")}
}
`;

export const HeaderDate = styled.div`
  text-align: center;
  font-weight: ${props => (props.today ? "bold" : "normal")};
`;

export const SessionPaper = styled(Paper)`
  height: 80px;
`;
