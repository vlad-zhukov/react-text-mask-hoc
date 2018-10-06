import React from "react";
import { Formik, FastField } from "formik";
import { TextMask, InputAdapter } from "react-text-mask-hoc";
import "./App.css";

const phoneMask = [
  "(",
  /[1-9]/,
  /\d/,
  /\d/,
  ")",
  " ",
  /\d/,
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
  /\d/,
  /\d/
];

const initialValues = { foo: "", bar: "" };

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">with-formik</header>
        <Formik initialValues={initialValues}>
          {({ values, touched, handleChange, handleBlur }) => {
            console.log(values, touched);
            return (
              <form className="form-horizontal">
                <div className="form-group">
                  <label className="col-sm-4 control-label" htmlFor="1">
                    {"Using <FastField />"}
                  </label>
                  <div className="col-sm-3">
                    <FastField
                      name="foo"
                      render={({ field }) => (
                        <TextMask
                          Component={InputAdapter}
                          mask={phoneMask}
                          guide={false}
                          className="form-control"
                          id="1"
                          {...field}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-sm-4 control-label" htmlFor="1">
                    {"Using Formik render prop' props"}
                  </label>
                  <div className="col-sm-3">
                    <TextMask
                      Component={InputAdapter}
                      value={values.bar}
                      mask={phoneMask}
                      guide={false}
                      onChange={handleChange("bar")}
                      onBlur={handleBlur("bar")}
                      className="form-control"
                      id="1"
                    />
                  </div>
                </div>
              </form>
            );
          }}
        </Formik>
      </div>
    );
  }
}
