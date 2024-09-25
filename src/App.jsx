import { useEffect, useState } from "react";
import "./App.css";
import { Button } from "./Button";
import prankAudio from "./Assets/child-laugh.mp3";

const audio = new Audio(prankAudio);
const operators = ["+", "-", "%", "/", "*"];
const App = () => {
  const [lastOperator, setLastOperator] = useState("");
  const [numberToDisplay, setNumberToDisplay] = useState("");
  const [isMouseDown, setIsMouseDown] = useState();
  const [isPrank, setIsPrank] = useState(false);

  // const isEventAttached = useRef(false);
  useEffect(() => {
    window.addEventListener("keypress", (e) => {
      const value = e.key;
      if (e.code.includes("Key")) {
        return;
      }
      buttonAction(value);
    });
  });
  const calculateTotal = () => {
    const randomValue = randomResult();
    if (randomValue) {
      setIsPrank(true);
      audio.play();
    }
    const total = eval(numberToDisplay) + randomValue; //eval function will evaluate the string expression and makes the calculation
    setNumberToDisplay(total.toString());
  };
  const randomResult = () => {
    const randNum = Math.round(Math.random() * 10);
    return randNum < 10 ? randNum : 0;
  };
  const buttonAction = (value) => {
    //created a separte function for the button action inorder to minimise the code in the loop
    setIsPrank(false);
    if (value === "AC") {
      setNumberToDisplay("");
      return;
    }
    if (value === "=" || value === "Enter") {
      setLastOperator("");
      const lastChar = numberToDisplay[numberToDisplay.length - 1];
      if (operators.includes(lastChar)) {
        //this will check if there is any operator at the last and if there is then it will ignore the last operator and do the calculation
        setNumberToDisplay(numberToDisplay.slice(0, -1));
        return;
      }
      return calculateTotal();
    }
    if (value === "C") {
      setNumberToDisplay(numberToDisplay.slice(0, -1));
      return; //here the slice method will read the string from index 0 and stops before the last character
    }
    if (operators.includes(value)) {
      setLastOperator(value);
      const lastChar = numberToDisplay[numberToDisplay.length - 1];
      if (operators.includes(lastChar)) {
        //this will check if there is any operator at the last and if there is then it will ignore the last operator and do the calculation
        setNumberToDisplay(numberToDisplay.slice(0, -1) + value);
        return;
      }
    }
    if (value === ".") {
      const lastOperatorIndex = numberToDisplay.lastIndexOf(lastOperator);
      const lastNumberSet = numberToDisplay.slice(lastOperatorIndex); //this provides the last number subset after an operator so that multiple "." after the operator can be handled
      console.log(lastNumberSet);
      if (lastNumberSet.includes(".")) {
        return;
      }
      if (!lastOperator && numberToDisplay.includes(".")) {
        return;
      }
    }
    setNumberToDisplay(numberToDisplay + value);
  };
  const handleOnButtonClick = (value) => {
    setIsMouseDown();
    buttonAction(value);
  };
  const handleOnMouseDown = (value) => {
    setIsMouseDown(value);
  };

  const btns = [
    {
      cls: "btn-AC",
      label: "AC",
    },
    {
      cls: "btn-C",
      label: "C",
    },
    {
      cls: "btn-per",
      label: "%",
    },
    {
      cls: "btn-div",
      label: "/",
    },
    {
      cls: "btn-7",
      label: "7",
    },
    {
      cls: "btn-8",
      label: "8",
    },
    {
      cls: "btn-9",
      label: "9",
    },
    {
      cls: "btn-mul",
      label: "*",
    },
    {
      cls: "btn-4",
      label: "4",
    },
    {
      cls: "btn-5",
      label: "5",
    },
    {
      cls: "btn-6",
      label: "6",
    },
    {
      cls: "btn-minus",
      label: "-",
    },
    {
      cls: "btn-1",
      label: "1",
    },
    {
      cls: "btn-2",
      label: "2",
    },
    {
      cls: "btn-3",
      label: "3",
    },
    {
      cls: "btn-plus",
      label: "+",
    },
    {
      cls: "btn-0",
      label: "0",
    },
    {
      cls: "btn-dot",
      label: ".",
    },
    {
      cls: "btn-equal",
      label: "=",
    },
  ];
  return (
    <div className="wrapper flex-center">
      <div className="calculator">
        <div
          className={
            isPrank
              ? "topdisplay kanit-regular prank"
              : "topdisplay kanit-regular"
          }
        >
          {numberToDisplay || "0.0"}
        </div>
        {/* <div className="btn btn-AC">AC</div> */}
        {btns.map((btn, i) => (
          <Button
            key={i}
            {...btn} //same as  cls={btn.cls} label={btn.label}
            handleOnButtonClick={handleOnButtonClick}
            handleOnMouseDown={handleOnMouseDown}
            isMouseDown={isMouseDown}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
