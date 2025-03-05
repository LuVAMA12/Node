import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [count, setCount] = useState(0)
  const [users, setUsers] = useState(null)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
 
  const myName ='John'

  const fetchAPI = async () => {
    try{
      setLoading(true)
      const response = await axios.get(`http://localhost:8000/api/users`)
      setUsers(response.data)
      setLoading(false)
    }catch(err){
      setError([err.status, err.code, err.message])
      console.log(error)      
      setLoading(false)
    }
  }

  console.log(users)

  useEffect(() => {
    fetchAPI()
    // Inside useEffect, it's doing after the render
  }, [count])
  //re-render App if count change

  return (
    <>
     <h1>Hello world !</h1>
     <p>Hello my name is {myName} and I am {count}</p>
     <button onClick={() => setCount(count+1)}>+1</button>
     <section className='cards'>
        {error ? <ul className='error'>{error.map(error => {
          return <li > {error} </li>
        })} </ul> :
        loading ? <p>Loading ....</p> : 
        users && users.map( (user, index) =>  {
        return(
          <div key={index} className="user-card">
            <h3>Name : {user.firstName} {user.lastName}</h3>
            <h4> Phone : {user.telephone}</h4>
            <h4> Address : {user.address}</h4>
            <ul><h4>Hobbies : </h4>
                { user.hobbies.map((hobby, index) => {
                  return (<li key={index}>{hobby}</li>)
                }
              )}
            </ul>
            
          </div>
      )})}
  </section>
    </>
  )
}

export default App
