import { useEffect, useReducer } from "react";
import Header from "./Header";
import MainMenu from "./MainMenu";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Questions from "./Questions";
import NextButton from "./NextButton";

const initial = {
  questions: [],

  // loading , error , ready , active , finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
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

    case "newAnswer": {
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payLoad,
        points:
          question.correctOption === action.payLoad
            ? state.points + question.points
            : state.points,
      };
    }

    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };

    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
  }
}

function App() {
  const [{ questions, status, index, answer }, dispatch] = useReducer(
    reducer,
    initial,
  );

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
        {status === "active" && (
          <>
            <Questions
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />

            <NextButton dispatch={dispatch} answer={answer} />
          </>
        )}
      </MainMenu>
    </div>
  );
}

export default App;
