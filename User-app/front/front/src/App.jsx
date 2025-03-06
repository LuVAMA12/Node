import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Hello from "./Hello";

function App() {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userCreated, setUserCreated] = useState(false);
  const [getError, setGetError] = useState(null);
  const [postError, setPostError] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [address, setAddress] = useState("");
  const [newHobby, setNewHobby] = useState("");
  const [hobbies, setHobbies] = useState([]);

  const fetchAPI = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8000/api/users`);
      setUsers(response.data);
    } catch (err) {
      console.log(err)
      setGetError([err.status, err.code, err.message]);
    } finally {
      setLoading(false);
    }
  };

  const handleNewHobby = (e, hobby) => {
    e.preventDefault();
    setHobbies(hobbies => [...hobbies, hobby]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const addNewUser = await axios.post(`http://localhost:8000/api/users`, {
        firstName,
        lastName,
        telephone,
        address,
        hobbies,
      });
      if(addNewUser.status === 201) {
        setUserCreated(true)
      }
      
    } catch (err) {
      console.log(err);
      setPostError([err.response.data.message]);
    } finally {
      fetchAPI();
    }
  };

  useEffect(() => {
    fetchAPI();
    // Inside useEffect, it's doing after the render
  }, []);
  //re-render App if count change

  return (
    <>
      <Hello name="John" />
      
      <section className="cards">
        {getError ? (
          <ul className="error">
            {getError.map((error) => {
              return <li> {error} </li>;
            })}{" "}
          </ul>
        ) : loading ? (
          <p>Loading ....</p>
        ) : (
          users &&
          !loading &&
          users.map((user) => {
            return (
              <div key={user.id} className="user-card">
                <h3>
                  Name : {user.firstName} {user.lastName}
                </h3>
                <h4> Phone : {user.telephone}</h4>
                <h4> Address : {user.address}</h4>
                <ul>
                  <h4>Hobbies : </h4>
                  {user.hobbies.map((hobby, index) => {
                    return <li key={index}>{hobby}</li>;
                  })}
                </ul>
              </div>
            );
          })
        )}
      </section> 
      {userCreated && <h4>New user created</h4>}    
      {postError && <h4 className="error">{postError}</h4>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="firstname"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="lastname"
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="text"
          placeholder="telephone"
          onChange={(e) => setTelephone(e.target.value)}
        />
        <input
          type="text"
          placeholder="address"
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="hobbies"
          onChange={(e) => setNewHobby(e.target.value)}
        />
        <button onClick={(e) => handleNewHobby(e, newHobby)}>+</button>
        <input type="submit" />
      </form>
    </>
  );
}

export default App;
