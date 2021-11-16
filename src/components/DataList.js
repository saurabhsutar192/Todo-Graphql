import { useQuery, useMutation } from "@apollo/client";
import { getTodos, deleteTodos, updateTodos } from "../query/query";
import { useEffect } from "react";

function DataList({ todo, userId }) {
  let { data, loading } = useQuery(getTodos, {
    variables: { userId },
  });
  let [removeTodo, deletedData] = useMutation(deleteTodos, {
    refetchQueries: [getTodos],
  });
  let [updTodo, updatedData] = useMutation(updateTodos, {
    refetchQueries: [getTodos],
  });

  function deleteTodo(id) {
    removeTodo({ variables: { id } });
  }
  function updateTodo(id) {
    updTodo({ variables: { id, todo } });
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
                  deleteTodo(todo.id);
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
