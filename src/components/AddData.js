// import React, { useState, useEffect } from "react";
import { getTodos, addTodos } from "../query/query";
import { useMutation } from "@apollo/client";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import "../css/addData.css";

function AddData({ setTodo, todo, user }) {
  let [addTodo, addedData] = useMutation(addTodos, {
    refetchQueries: [getTodos],
  });

  function handleSubmit(e) {
    e.preventDefault();
    todo
      ? addTodo({ variables: { todo, userId: user.id } }).then(() => {
          setTodo("");
        })
      : window.alert("Enter Data!");
  }
  function addData(e) {
    setTodo(e.target.value);
  }

  // useEffect(() => {
  //   console.log(userId);
  // }, [userId]);

  return (
    <div className="addContainer">
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={addData} value={todo}></input>
        <button type="submit">
          <AddRoundedIcon fontSize="large" />
        </button>
      </form>
    </div>
  );
}

export default AddData;
