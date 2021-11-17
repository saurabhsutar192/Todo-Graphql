import { useQuery, useMutation } from "@apollo/client";
import { getTodos, deleteTodo, updateTodos } from "../query/query";
import { useEffect } from "react";
import "../css/dataList.css";

function DataList({ todo, user }) {
  let { data, loading } = useQuery(getTodos, {
    variables: { userId: user.id },
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

  // useEffect(() => {
  //   console.log(userId);
  // }, [userId]);

  return (
    <div className="dataListContainer">
      <ul>
        {!loading ? (
          data?.todos.map((todo) => (
            <li key={todo.id}>
              <span>{todo.todo}</span>
              <div>
                <button
                  onClick={() => {
                    updateTodo(todo.id);
                  }}
                >
                  update
                </button>
                <button
                  onClick={() => {
                    del_Todo(todo.id);
                  }}
                >
                  delete
                </button>
              </div>
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
