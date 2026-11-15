import { useEffect, useReducer, useState } from "react";
import Header from "./Header";
import MainMenu from "./MainMenu";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Questions from "./Questions";

const initial = {
  questions: [],

  // loading , error , ready , active , finished
  status: "loading",
  index: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "Data_Fetching":
      return {
        ...state,
        questions: action.payLoad,
        status: "ready",
      };

    case "start":
      return {
        ...state,
        status: "active",
      };

    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
  }
}

function App() {
  const [{ questions, status, index }, dispatch] = useReducer(reducer, initial);

  const Question_Length = questions.length;

  useEffect(function () {
    const abort = new AbortController();
    async function FetchQuestions() {
      try {
        const res = await fetch(`http://localhost:4000/questions`, {
          signal: abort.signal,
        });

        if (!res.ok) throw new Error("Please Check Your internet Connections");

        const data = await res.json();

        if (!data) throw new Error("Data Not Found");

        dispatch({ type: "Data_Fetching", payLoad: data });
      } catch (err) {
        dispatch({ type: "dataFailed" });
      }
    }

    FetchQuestions();

    return function () {
      abort.abort();
    };
  }, []);

  return (
    <div className="App">
      <Header />
      <MainMenu>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen Question_Length={Question_Length} dispatch={dispatch} />
        )}
        {status === "active" && <Questions question={questions[index]} />}
      </MainMenu>
    </div>
  );
}

export default App;
