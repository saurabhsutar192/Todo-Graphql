import { useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
import { addUser, getUsers } from "../query/query";
import "../css/addUser.css";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

function AddUser({ setUser }) {
  let [add_user, { data, loading }] = useMutation(addUser, {
    refetchQueries: [getUsers],
  });

  let [name, setName] = useState("");

  useEffect(() => {
    !loading &&
      data &&
      setUser({ name: data.addUser?.name, id: data.addUser?.id });
  }, [data, loading]);

  function handleSubmit(e) {
    e.preventDefault();
    name
      ? add_user({ variables: { name } })
          .then(() => {
            setName("");
          })
          .catch((err) => window.alert(err.message))
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
          placeholder="Add User"
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
