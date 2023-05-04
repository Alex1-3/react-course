import "./AddUser.css";
import Card from "../UI/Card";
import Button from "../UI/Button";
import { useState } from "react";
import ErrorModal from "../UI/ErrorModal";

const AddUser = function (props) {
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [errorOcured, setErrorOcured] = useState(false);
  function usernameHandler(e) {
    setUsername(e.target.value);
  }
  function ageHandler(e) {
    setAge(e.target.value);
  }
  function submitHandler(e) {
    e.preventDefault();
    if (
      username.trim().length === 0 ||
      age.trim().length === 0 ||
      +age.trim() < 1
    ) {
      setErrorOcured(true);
      return;
    }
    props.onSubmit({ name: username, age: age, id: Math.random().toString() });
    setAge("");
    setUsername("");
  }
  function closeModal() {
    setErrorOcured(false);
  }
  return (
    <div>
      {errorOcured ? (
        <ErrorModal
          onCloseModal={closeModal}
          title="An error ocured!"
          message="something went wrong!"
        />
      ) : (
        ""
      )}
      <Card className="input">
        <form onSubmit={submitHandler}>
          <label htmlFor="username">Username</label>
          <input
            value={username}
            id="username"
            onChange={usernameHandler}
            type="text"
          />
          <label htmlFor="age">Age (Years)</label>
          <input id="age" value={age} type="number" onChange={ageHandler} />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
