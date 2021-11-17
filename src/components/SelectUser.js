import { useEffect } from "react";
import { getUsers, deleteUser, getTodos, deleteTodos } from "../query/query";
import { useQuery, useMutation } from "@apollo/client";

function SelectUser({ setUser, user, setIfUser }) {
  let { data, loading } = useQuery(getUsers);
  let [del_user, deletedUserData] = useMutation(deleteUser, {
    refetchQueries: [getUsers],
  });
  let [del_todos, deletedTodoData] = useMutation(deleteTodos, {
    refetchQueries: [getTodos],
  });

  useEffect(() => {
    !loading && !user.id && setUser({ id: data.users[0]?.id });
  }, [data, loading]);

  function setActiveUser(arr) {
    // console.log(e.target.value);
    setUser({ name: arr.name, id: arr.id });
  }

  function removeUser() {
    del_user({ variables: { id: user.id } });
    setUser({ id: "" });
    del_todos({ variables: { id: user.id } });
  }

  return (
    <div className="selectUserContainer">
      <div>{user.name}</div>
      <ul value={user.id}>
        {data?.users.map((arr) => (
          <li
            onClick={() => setActiveUser(arr)}
            key={arr.id}
            // value={arr.id}
          >
            {arr.name}
          </li>
        ))}
      </ul>

      <button onClick={removeUser}>Delete</button>
    </div>
  );
}

export default SelectUser;

// return (
//   <div>
//     <form>
//       <select onChange={setActiveUser} value={userId}>
//         {data?.users.map((user) => (
//           <option key={user.id} value={user.id}>
//             {user.name}
//           </option>
//         ))}
//       </select>
//     </form>
//     <button onClick={removeUser}>Delete</button>
//   </div>
// );
