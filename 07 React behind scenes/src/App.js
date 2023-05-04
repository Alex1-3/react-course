import React, { useCallback, useState } from "react";

import "./App.css";
import DemoOutput from "./components/Demo/DemoOutput";
import Button from "./components/UI/Button/Button";

function App() {
  const [showParagraf, setShowParagraf] = useState(false);
  const showParagrafHandler = useCallback(function () {
    setShowParagraf((prev) => !prev);
  }, []);
  return (
    <div className="app">
      <h1>Hi there!</h1>
      <DemoOutput show={false} />
      <Button onClick={showParagrafHandler}>Click me!</Button>
    </div>
  );
}

export default App;
