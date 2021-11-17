import { useEffect } from "react";
import { getUsers, deleteUser, getTodos, deleteTodos } from "../query/query";
import { useQuery, useMutation } from "@apollo/client";

function SelectUser({ setUserId, userId, setIfUser }) {
  let { data, loading } = useQuery(getUsers);
  let [del_user, deletedUserData] = useMutation(deleteUser, {
    refetchQueries: [getUsers],
  });
  let [del_todos, deletedTodoData] = useMutation(deleteTodos, {
    refetchQueries: [getTodos],
  });

  useEffect(() => {
    !loading && !userId && setUserId(data.users[0]?.id);
  }, [data, loading]);

  function setActiveUser(e) {
    // console.log(e.target.value);
    setUserId(e.target.value);
  }

  function removeUser() {
    del_user({ variables: { id: userId } });
    setUserId("");
    del_todos({ variables: { id: userId } });
  }

  return (
    <div>
      <ul value={userId}>
        {data?.users.map((user) => (
          <li onClick={setActiveUser} key={user.id} value={user.id}>
            {user.name}
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
