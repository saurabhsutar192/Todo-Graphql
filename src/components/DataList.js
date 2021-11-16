import { useQuery, useMutation } from "@apollo/client";
import { getTodos, deleteTodo, updateTodos } from "../query/query";
// import { useEffect } from "react";

function DataList({ todo, userId }) {
  let { data, loading } = useQuery(getTodos, {
    variables: { userId },
  });
  let [removeTodo, deletedData] = useMutation(deleteTodo, {
    refetchQueries: [getTodos],
  });
  let [updTodo, updatedData] = useMutation(updateTodos, {
    refetchQueries: [getTodos],
  });

  function del_Todo(id) {
    removeTodo({ variables: { id } });
  }
  function updateTodo(id) {
    todo ? updTodo({ variables: { id, todo } }) : window.alert("Enter Data!");
  }

  return (
    <div>
      <ul>
        {!loading ? (
          data?.todos.map((todo) => (
            <li key={todo.id}>
              <span style={{ marginRight: "30px" }}>{todo.todo}</span>
              <button
                onClick={() => {
                  updateTodo(todo.id);
                }}
              >
                Update
              </button>
              <button
                onClick={() => {
                  del_Todo(todo.id);
                }}
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <li>..Loading</li>
        )}
      </ul>
    </div>
  );
}

export default DataList;
