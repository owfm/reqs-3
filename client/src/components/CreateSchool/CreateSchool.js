import React, { useState } from "react";
import { Button, Form, Icon } from "semantic-ui-react";
import history from "history/history";
import ChooseTermDates from "./ChooseTermDates";
import ChooseSchoolName from "./ChooseSchoolName";
import ChooseTimetableWeeks from "./ChooseTimetableWeeks";
import ChooseWeekBeginningForTerms from "./ChooseWeekBeginningForTerms";
import moment from "moment";

import * as styles from "./styles";

const CreateSchool = ({ auth, emitSnackbar, createSchool }) => {
  const [page, setPage] = useState(2);
  const [termDates, setTermDates] = useState(defaultTermDates);
  const [timetableWeekTermStart, setTimetableWeekTermStart] = useState(
    defaultTimetableWeekTermStart
  );
  const [school, setSchool] = useState({
    name: "Nottingham High School",
    timetableWeeks: 2,
  });

  console.log(termDates);

  const handleChange = e => {
    setSchool({ [e.target.name]: e.target.value });
  };

  const handleWeekChange = (e, { value }) => {
    setSchool({ ...school, timetableWeeks: value });
  };

  const resetTermDates = () => {
    setTermDates({});
  };

  const validateSettings = () => {
    if (!school.name) return false;
    if (![1, 2].includes(school.timetableWeeks)) return false;
    if (termDates.length < 6) return false;
    return true;
  };

  const save = async () => {
    const new_school = {
      name: school.name,
      preferences: {
        timetableWeeks: school.timetableWeeks,
        termDates,
        timetableWeekTermStart,
      },
    };
    try {
      await createSchool(new_school);
      history.push("lessons");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Form>
        <styles.FormContainer>
          {page === 1 && (
            <>
              <ChooseSchoolName school={school} onChange={handleChange} />
              <ChooseTermDates
                termDates={termDates}
                setTermDates={setTermDates}
                reset={resetTermDates}
              />
              <ChooseTimetableWeeks
                school={school}
                onChange={handleWeekChange}
              />
              <Button
                disabled={!validateSettings()}
                onClick={() => setPage(2)}
                floated="right"
                icon
                labelPosition="right"
              >
                Next
                <Icon name="right arrow" />
              </Button>
            </>
          )}
          {page === 2 && (
            <>
              <ChooseWeekBeginningForTerms
                termDates={termDates}
                onChange={setTimetableWeekTermStart}
                timetableWeekTermStart={timetableWeekTermStart}
              />
              <Button
                onClick={() => setPage(1)}
                floated="right"
                icon
                labelPosition="right"
              >
                Prev
                <Icon name="left arrow" />
              </Button>
              <Button
                onClick={() => save()}
                type="submit"
                disabled={!validateSettings()}
              >
                {validateSettings()
                  ? "Save Changes!"
                  : "We still need some info..."}
              </Button>
            </>
          )}
        </styles.FormContainer>
      </Form>
      {/* <DisplayTermDates dates={termDates} /> */}
    </>
  );
};

export default CreateSchool;

const defaultTermDates = {
  "Winter Half-Term 1": [
    moment("2018-09-03T12:00:00"),
    moment("2018-10-19T12:00:00"),
  ],
  "Winter Half-Term 2": [
    moment("2018-10-29T12:00:00"),
    moment("2018-12-20T12:00:00"),
  ],
  "Spring Half-Term 1": [
    moment("2019-01-07T12:00:00"),
    moment("2019-02-15T12:00:00"),
  ],
  "Spring Half-Term 2": [
    moment("2019-02-25T12:00:00"),
    moment("2019-04-05T12:00:00"),
  ],
  "Summer Half-Term 1": [
    moment("2019-04-23T12:00:00"),
    moment("2019-05-24T12:00:00"),
  ],
  "Summer Half-Term 2": [
    moment("2019-06-03T12:00:00"),
    moment("2019-07-19T12:00:00"),
  ],
};

const defaultTimetableWeekTermStart = {
  "Winter Half-Term 1": 1,
  "Winter Half-Term 2": 2,
  "Spring Half-Term 1": 2,
  "Spring Half-Term 2": 2,
  "Summer Half-Term 1": 2,
  "Summer Half-Term 2": 1,
};
