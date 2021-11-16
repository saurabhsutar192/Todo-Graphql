import AddData from "./components/AddData";
import DataList from "./components/DataList";
import AddUser from "./components/AddUser";
import SelectUser from "./components/SelectUser";
import { useState } from "react";

function App() {
  let [todo, setTodo] = useState("");
  let [userId, setUserId] = useState("");
  return (
    <div className="App">
      <AddUser setUserId={setUserId} />
      <SelectUser setUserId={setUserId} userId={userId} />
      <AddData setTodo={setTodo} todo={todo} userId={userId} />
      <DataList todo={todo} userId={userId} />
    </div>
  );
}

export default App;
