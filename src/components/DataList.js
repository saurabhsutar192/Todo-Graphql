import { useQuery, useMutation } from "@apollo/client";
import { getTodos, deleteTodo, updateTodos } from "../query/query";
// import { useEffect } from "react";
import "../css/dataList.css";
// import gsap from "gsap";
import ClipLoader from "react-spinners/ClipLoader";

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
  //   !loading && gsap.from(".todos", 0.5, { scale: 0, stagger: 0.05 });
  // }, [loading]);

  return (
    <div className="dataListContainer">
      <ul>
        {!loading ? (
          data?.todos.map((todo) => (
            <li className="todos" key={todo.id}>
              <div>{todo.todo}</div>
              <section>
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
              </section>
            </li>
          ))
        ) : (
          <li>
            <ClipLoader color={"#1c4000"} />
          </li>
        )}
      </ul>
    </div>
  );
}

export default DataList;
