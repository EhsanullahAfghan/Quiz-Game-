import { useEffect, useReducer, useState } from "react";
import Header from "./Header";
import MainMenu from "./MainMenu";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";

const initial = {
  questions: [],

  // loading , error , ready , active , finished
  status: "loading",
};

function reducer(state, action) {
  switch (action.type) {
    case "Data_Fetching":
      return {
        ...state,
        questions: action.payLoad,
        status: "ready",
      };

    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
  }
}

function App() {
  const [{ questions, status }, dispatch] = useReducer(reducer, initial);

  const Question_Length = questions.length;
  console.log(Question_Length);

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
          <StartScreen Question_Length={Question_Length} />
        )}
      </MainMenu>
    </div>
  );
}

export default App;
