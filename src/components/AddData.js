// import React, { useState, useEffect } from "react";
import { getTodos, addTodos } from "../query/query";
import { useMutation } from "@apollo/client";

function AddData({ setTodo, todo, userId }) {
  let [addTodo, addedData] = useMutation(addTodos, {
    refetchQueries: [getTodos],
  });

  function handleSubmit(e) {
    e.preventDefault();
    todo
      ? addTodo({ variables: { todo, userId } })
      : window.alert("Enter Data!");
  }
  function addData(e) {
    setTodo(e.target.value);
  }

  // useEffect(() => {
  //   console.log(userId);
  // }, [userId]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={addData} value={todo}></input>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddData;
