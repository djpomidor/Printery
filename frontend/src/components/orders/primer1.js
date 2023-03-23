const [ firstName, setFirstName] = useState('')
  const [ lastName, setLastName] = useState('')
  const [ username, setUsername] = useState('')
  const [ email, setEmail] = useState('')
  const [ dateJoined, setDateJoined] = useState('')
  const [ error, setError] = useState()

  useEffect(() => {
    fetch('/api/user')
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw Error(`Something went wrong: code ${response.status}`)
        }
      })
      .then(({data}) => {
        setFirstName(data.first_name)
        setLastName(data.last_name)
        setUsername(data.username)
        setEmail(data.email)
        setDateJoined(data.date_joined)
      })
      .catch(error => {
        console.log(error)
        setError('Ошибка, подробности в консоли')
      })
  }, [])

  return (
    <div className="App">
      {error?
        <p>{error}</p>
      :
        <div className="Profile">
          <h1>{firstName} {lastName}</h1>
          <h2>{username}</h2>
          <p>email: {email}</p>
          <p>Профиль создан {dateJoined}</p>
        </div>
      }
    </div>
  );