import React from "react";
import AddUser from "./components/Users/AddUser";
import UsersList from "./components/Users/UsersList";
import { useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const userState = function (user) {
    setUsers((users) => [user, ...users]);
  };
  return (
    <div>
      <AddUser onSubmit={userState} />
      <UsersList users={users} />
    </div>
  );
}

export default App;
