import Button from "./Button";
import Card from "./Card";
import "./ErrorModal.css";

const ErrorModal = function (props) {
  return (
    <div>
      <div className="backdrop" onClick={props.onCloseModal} />
      <Card className="modal">
        <header className="header">
          <h2>{props.title}</h2>
        </header>
        <div className="content">
          <p>{props.message}</p>
        </div>
        <footer className="actions">
          <Button onClick={props.onCloseModal}>Okay</Button>
        </footer>
      </Card>
    </div>
  );
};

export default ErrorModal;
