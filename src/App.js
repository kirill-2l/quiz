import React, { useState, useEffect } from "react";
import { Formik, Form, useField, FastField, Field } from "formik";
import {
  Container,
  Grid,
  Button,
  Radio,
  RadioGroup,
  FormLabel,
  FormControl,
  FormControlLabel,
} from "@material-ui/core";

import { ArrowBack, ArrowForward } from "@material-ui/icons";

import DB from "./db.json";
import "./App.scss";
function App() {
  const [pageNum, setPageNum] = useState(1);
  const [disableBackward, setDisableBackward] = useState(false);
  const [disableForward, setDisableForward] = useState(false);
  const pageSize = 5;

  useEffect(() => {
    pageNum * pageSize > DB.length
      ? setDisableForward(true)
      : setDisableForward(false);
    pageNum <= 1 ? setDisableBackward(true) : setDisableBackward(false);
  }, [pageNum]);

  const handleForward = () => {
    if (pageNum * pageSize < DB.length) {
      setPageNum(pageNum + 1);
    }
  };

  const handleBackward = () =>
    pageNum > 1 ? setPageNum(pageNum - 1) : pageNum;

  const RadioField = ({ label, ...props }) => {
    const [field] = useField(props);
    return <FormControlLabel label={label} {...field} control={<Radio />} />;
  };
  return (
    <div className="App">
      <Container>
        <Formik
          initialValues={{}}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ values, errors, isSubmitting }) => (
            <Form>
              {DB.slice((pageNum - 1) * pageSize, pageNum * pageSize).map(
                (item) => (
                  <FormControl component="fieldset" key={item.id} fullWidth>
                    <FormLabel component="legend">{`${item.question} — ${item.id}`}</FormLabel>
                    <RadioField
                      name={`answer-${item.id}`}
                      type="radio"
                      value="1"
                      label="1"
                      required
                    />
                    <RadioField
                      name={`answer-${item.id}`}
                      type="radio"
                      value="2"
                      label="2"
                    />
                    <RadioField
                      name={`answer-${item.id}`}
                      type="radio"
                      value="3"
                      label="3"
                    />
                  </FormControl>
                )
              )}
              <Grid style={{ marginTop: "30px" }}>
                <Button
                  type="button"
                  size="large"
                  startIcon={<ArrowBack />}
                  variant="outlined"
                  onClick={handleBackward}
                  style={{ marginRight: "40px" }}
                  disabled={disableBackward}
                >
                  Back
                </Button>
                <Button
                  type="button"
                  size="large"
                  endIcon={<ArrowForward />}
                  variant="outlined"
                  onClick={handleForward}
                  disabled={disableForward}
                >
                  Forward
                </Button>
                <Field type="submit" as={Button}>
                  Submit
                </Field>
              </Grid>
              <pre>{JSON.stringify(values)}</pre>
            </Form>
          )}
        </Formik>
      </Container>
    </div>
  );
}
export default App;
