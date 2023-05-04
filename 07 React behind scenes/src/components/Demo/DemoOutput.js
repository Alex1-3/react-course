import { memo } from "react";
import MyParagraph from "./MyParagraph";

const DemoOutput = (props) => {
  console.log("Running");
  return <MyParagraph>{props.show ? "This is new!" : ""}</MyParagraph>;
};

export default memo(DemoOutput);
