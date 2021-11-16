import { useEffect, useState } from "react";
import { getUsers } from "../query/query";
import { useQuery } from "@apollo/client";

function SelectUser({ setUserId, userId }) {
  let { data, loading } = useQuery(getUsers);

  useEffect(() => {
    !loading && !userId && setUserId(data.users[0].id);
  }, [data]);

  function setActiveUser(e) {
    setUserId(e.target.value);
  }

  return (
    <form style={{ margin: "20px 0" }}>
      <label>Select User: </label>
      <select onChange={setActiveUser} value={userId}>
        {data?.users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
    </form>
  );
}

export default SelectUser;
