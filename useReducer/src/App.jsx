import { useEffect, useReducer, useState } from "react";
import Header from "./Header";
import MainMenu from "./MainMenu";

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
  const [state, dispatch] = useReducer(reducer, initial);

  console.log(state);

  useEffect(function () {
    async function FetchQuestions() {
      try {
        const res = await fetch(`http://localhost:4000/questions`);

        if (!res.ok) throw new Error("Please Check Your internet Connections");

        const data = await res.json();

        if (!data) throw new Error("Data Not Found");

        dispatch({ type: "Data_Fetching", payLoad: data });
      } catch (err) {
        dispatch({ type: "dataFailed" });
      }
    }

    FetchQuestions();
  }, []);

  return (
    <div className="App">
      <Header />
      <MainMenu>
        <p>1/15</p>
        <p>Question</p>
      </MainMenu>
    </div>
  );
}

export default App;
