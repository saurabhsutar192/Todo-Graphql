import { useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
import { addUser, getUsers } from "../query/query";
import "../css/addUser.css";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
// import gsap from "gsap";

function AddUser({ setUser }) {
  let [add_user, { data, loading }] = useMutation(addUser, {
    refetchQueries: [getUsers],
  });

  let [name, setName] = useState("");
  // useEffect(() => {
  //   gsap.from(".addUser", {
  //     scaleX: 0,
  //     xPercent: -200,
  //     opacity: 0,
  //     ease: "circ.out",
  //   });
  // }, []);

  useEffect(() => {
    !loading &&
      data &&
      setUser({ name: data.addUser?.name, id: data.addUser?.id });
  }, [data, loading, setUser]);

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
          className="addUser"
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
