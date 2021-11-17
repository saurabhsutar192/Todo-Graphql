import AddData from "./components/AddData";
import DataList from "./components/DataList";
import AddUser from "./components/AddUser";
import SelectUser from "./components/SelectUser";
import { useState, useEffect } from "react";
import { getUsers } from "./query/query";
import { useQuery } from "@apollo/client";
import "./css/app.css";

function App() {
  let { data, loading } = useQuery(getUsers);
  let [todo, setTodo] = useState("");
  let [userId, setUserId] = useState("");
  let [ifUser, setIfUser] = useState(false);

  useEffect(() => {
    !loading && data.users.length !== 0 ? setIfUser(true) : setIfUser(false);
  }, [data]);

  return (
    <div className="App">
      {ifUser ? (
        <div>
          <AddUser setUserId={setUserId} />
          <SelectUser
            setUserId={setUserId}
            userId={userId}
            setIfUser={setIfUser}
          />
          <AddData setTodo={setTodo} todo={todo} userId={userId} />
          <DataList todo={todo} userId={userId} />
        </div>
      ) : (
        <div className="noUser">
          <h1>No Users Found!</h1>
          <AddUser setUserId={setUserId} setIfUser={setIfUser} />
        </div>
      )}
    </div>
  );
}

export default App;
