import { useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
import { addUser, getUsers } from "../query/query";

function AddUser({ setUserId }) {
  let [add_user, { data, loading }] = useMutation(addUser, {
    refetchQueries: [getUsers],
  });

  let [name, setName] = useState("");

  useEffect(() => {
    !loading && data && setUserId(data.addUser.id);
  }, [data]);

  function handleSubmit(e) {
    e.preventDefault();
    name ? add_user({ variables: { name } }) : window.alert("Add name!");
  }

  function addName(e) {
    setName(e.target.value);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Username"
          onChange={addName}
          value={name}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddUser;
