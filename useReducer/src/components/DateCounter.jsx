import { useReducer, useState } from "react";

function reducer(state, action) {
  console.log(state, action);

  switch (action.type) {
    case "inc":
      return { ...state, count: state.count + 1 };

    case "dec":
      return { ...state, count: state.count - 1 };

    case "defineCount":
      return { ...state, count: action.payLoad };

    case "defineStep":
      return { ...state, count: action.payLoad };

    case "reset":
      return { count: 0, step: 1 };
  }

  // if (action.type === "inc") return state + action.payLoad;

  // if (action.type === "dec") return state - action.payLoad;

  // if (action.type === "defineCount") return action.payLoad;
}

function DateCounter() {
  // const [count, setCount] = useState(0);
  // const [step, setStep] = useState(1);

  const initialValue = { count: 0, step: 1 };

  const [state, dispatch] = useReducer(reducer, initialValue);

  const { count, step } = state;

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    // setCount((count) => count - 1);
    // setCount((count) => count - step);

    dispatch({ type: "dec", payLoad: 1 });
  };

  const inc = function () {
    // setCount((count) => count + 1);
    // setCount((count) => count + step);
    dispatch({ type: "inc", payLoad: 1 });
  };

  const defineCount = function (e) {
    // setCount(Number(e.target.value));
    dispatch({ type: "defineCount", payLoad: Number(e.target.value) });
  };

  const defineStep = function (e) {
    dispatch({ type: "defineStep", payLoad: Number(e.target.value) });
  };

  const reset = function () {
    dispatch({ type: "reset" });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

export default DateCounter;
