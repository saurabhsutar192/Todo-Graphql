import { useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
import { addUser, getUsers } from "../query/query";
import "../css/addUser.css";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

function AddUser({ setUserId }) {
  let [add_user, { data, loading }] = useMutation(addUser, {
    refetchQueries: [getUsers],
  });

  let [name, setName] = useState("");

  useEffect(() => {
    !loading && data && setUserId(data.addUser?.id);
  }, [data]);

  function handleSubmit(e) {
    e.preventDefault();
    name
      ? add_user({ variables: { name } }).catch((err) =>
          window.alert(err.message)
        )
      : window.alert("Add name!");
  }

  function addName(e) {
    setName(e.target.value);
  }

  return (
    <div className="addUserContainer">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Username"
          onChange={addName}
          value={name}
        />
        <button type="submit">
          <AddRoundedIcon fontSize="large" />
        </button>
      </form>
    </div>
  );
}

export default AddUser;
