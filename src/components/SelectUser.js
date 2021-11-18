import { useEffect, useState } from "react";
import { getUsers, deleteUser, getTodos, deleteTodos } from "../query/query";
import { useQuery, useMutation } from "@apollo/client";
import "../css/selectUser.css";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import gsap from "gsap";

function SelectUser({ setUser, user }) {
  let [userTween, setUserTween] = useState();
  let { data, loading } = useQuery(getUsers);
  let [del_user, deletedUserData] = useMutation(deleteUser, {
    refetchQueries: [getUsers],
  });
  let [del_todos, deletedTodoData] = useMutation(deleteTodos, {
    refetchQueries: [getTodos],
  });

  // let userTween = gsap.to(".users", {
  //   opacity: 1,
  //   xPercent: 0,
  //   stagger: 0.1,
  //   paused: true,
  //   ease: "circ.out",
  // });

  useEffect(() => {
    gsap.set(".users", { xPercent: -200, opacity: 0 });
    setUserTween(
      gsap.to(".users", {
        opacity: 1,
        xPercent: 0,
        stagger: 0.1,
        paused: true,
        ease: "circ.out",
      })
    );
    !loading &&
      !user.id &&
      setUser({ name: data.users[0].name, id: data.users[0].id });
  }, [data, loading, setUser, user.id]);

  function setActiveUser(arr) {
    setUser({ name: arr.name, id: arr.id });
  }

  function removeUser(arr) {
    del_user({ variables: { id: arr.id } }).then(() => setUser({ id: "" }));

    del_todos({ variables: { id: arr.id } });
  }

  function showUsers() {
    userTween.progress() * 100 > 0 ? userTween.reverse() : userTween.play();
  }

  return (
    <div className="selectUserContainer">
      <ul value={user.id}>
        {data?.users.map((arr) => (
          <li
            className="users"
            onClick={() => setActiveUser(arr)}
            key={arr.id}
            // value={arr.id}
          >
            <div> {arr.name}</div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeUser(arr);
              }}
            >
              <CloseRoundedIcon />
            </button>
          </li>
        ))}
      </ul>
      <section>
        <div onClick={showUsers} className="menuIcon">
          <MenuRoundedIcon fontSize="large" />
        </div>
        {/* <div className="user">{user.name}</div> */}
      </section>
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
