import { useState, useEffect } from "react";
import { Users, Loader2, UserPlus } from "lucide-react";
import UserCard from "./UserCard";

export default function App() {
  const [users, setUsers] = useState([]);
  const [noOfUsers, setNoOfUsers] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (noOfUsers > 0 && loading) {
      fetch(`https://randomuser.me/api/?results=${noOfUsers}`)
        .then((res) => res.json())
        .then((data) => {
          setUsers(data.results);
          setLoading(false);
          setNoOfUsers("");
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          setNoOfUsers("");
        });
    }
  }, [loading]);

  const userElements = users.map((user) => {
    return (
      <UserCard
        key={user.id.value}
        image={user.picture.large}
        email={user.email}
        name={user.name.first + " " + user.name.last}
        userName={user.login.username}
        phone={user.cell}
        location={
          user.location.city +
          ", " +
          user.location.state +
          ", " +
          user.location.country
        }
        birthday={new Date(user.dob.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "2-digit",
        })}
      />
    );
  });
  function handleGetUsers() {
    if (noOfUsers !== "0" && parseInt(noOfUsers) > 0) {
      setUsers([]);
      setLoading(true);
    }
  }

  console.log(typeof noOfUsers);

  return (
    <>
      <header>
        <h1>
          <Users className="usersIcon" size={40} />
          Random User Generator
        </h1>
        <p>Generate random user profiles with just one click!</p>
        <div className="input-action">
          <input
            type="number"
            value={noOfUsers}
            onChange={(e) => {
              setNoOfUsers(e.currentTarget.value.trim());
            }}
            name=""
            id=""
            min={1}
            placeholder="Enter number of users you want to search..."
          />
          <button onClick={handleGetUsers}>
            <UserPlus />
            Generate Users
          </button>
        </div>
      </header>
      <section className="users-Container">
        {users.length < 1 && !loading && (
          <div className="no-users">
            <p>No user to display. Search for Users</p>
          </div>
        )}

        {loading && (
          <div className="spinner-container">
            <Loader2 className="spinner" size={40} />
          </div>
        )}
        {users.length > 0 && userElements}
      </section>
    </>
  );
}
