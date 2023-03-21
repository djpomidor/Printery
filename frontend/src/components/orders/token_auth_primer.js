import { useState, useEffect } from 'react';
import './App.css';

 function App() {
  const [token, setToken] = useState()
  const [loading, setLoading] = useState()
  const [formUsername, setFormUsername] = useState()
  const [formPassword, setFormPassword] = useState()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')

   const [error, setError] = useState()

   useEffect(() => {
    if (token) {
    fetch(
        '/api/user',
        {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Authorization': `Token ${token}`,
        },
      }
    )
       .then(response => {
         if (response.ok) {
           return response.json()
            setFirstName(data.first_name)
            setLastName(data.last_name)       
            setUsername(data.username)
            setEmail(data.email)
            setDateJoined(data.date_joined)
            setError(null)
         }
      })
      .catch(error => {
        console.log(error)
        setError('Ошибка, подробности в консоли')
      })
    }
  }, [token])

  const submitHandler = e => {
    e.preventDefault();
    setLoading(true);
    fetch(
      '/api/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
          username: formUsername,
          password: formPassword,
        })
      }
    )
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw Error(`Something went wrong: code ${response.status}`)
        }
      })
      .then(({key}) => {
        setToken(key)
        setError(null)
       })
       .catch(error => {
         console.log(error)
         setError('Ошибка, подробности в консоли')
       })

      .finally(setLoading(false))
    }

   return (
     <div className="App">
      {error? <p>{error}</p> : null}
      {!token?
        loading? "Загрузка..." :
        <form className="loginForm" onSubmit={submitHandler}>
          <input type="text" name="username" value={formUsername} onChange={e => setFormUsername(e.target.value)} placeholder="Username"/>
          <input type="password" name="password" value={formPassword} onChange={e => setFormPassword(e.target.value)} placeholder="Password"/>
          <input type="submit" name="submit" value="Войти"/>
        </form>
       :
        !error?
         <div className="Profile">
           <h1>{firstName} {lastName}</h1>
           <h2>{username}</h2>
           <p>email: {email}</p>
           <p>Профиль создан {dateJoined}</p>
         </div>
        :
        null
       }
     </div>
   );
 }