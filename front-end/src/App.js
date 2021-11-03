import { Form, Button } from "react-bootstrap";
import { useRef, useState } from "react";

import "./App.css";

const titleApi = "http://127.0.0.1:4000/title-bot";

function App() {
  // const [result, setResult] = useState("");
  const [titleHistory, setTitleHistory] = useState([]);
  const inputRef = useRef(undefined);

  const clickHandler = () => {
    const queryObject = { URL: inputRef.current.value };
    // console.log(inputRef);
    returnTitle(queryObject)
      .then((res) => res.json()) //Converting string to json
      .then((res) => {
        // setResult(res); //Update state from empty string to res
        setTitleHistory((prevState) => [...prevState, res]);
        console.log(titleHistory);
      });
  };

  const returnTitle = (query) => {
    return fetch(titleApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query),
    });
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
        <div className="container">
          <a className="navbar-brand badge bg-dark" href="/#">
            Title-Bot
          </a>
        </div>
      </nav>

      <main className="container">
        <div className="row">
          <div className="col col-md-6 offset-md-3">
            <h4 className="mb-4 text-white">Retrieve the site title below!</h4>
            <Form.Control
              ref={inputRef}
              placeholder="Enter URL"
              type="text"
              className="form-control mb-2"
              id="searchUrl"
            />
            <Button
              onClick={clickHandler}
              className="btn-secondary mb-5"
              id="searchBtn"
            >
              Get Title
            </Button>
            {/* <h4 className="result text-danger" id="title"> */}
            {/* {result} */}
            {/* {titleHistory} */}
            {titleHistory.map((title, index) => (
              <div key={index} className="result text-danger mb-3" id="title">
                * {title}
              </div>
            ))}
            {/* </h4> */}
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
