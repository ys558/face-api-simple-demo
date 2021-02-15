import React, {useState} from 'react'


const Login = ({ username, password }) => new Promise((resolve, reject ) => {
  setTimeout(() => {
    if (username === 'aa' && password ==='bb') {
      resolve()
    }else{
      reject()
    }
  }, 1000)
})

const LoginPage = () => {
  // 不用useReducer改造，结构松散：
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const onSubmit = async e => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    try {
      await Login({ username, password })
      
      setIsLoggedIn(true)
      setUsername('')
      setPassword('')
      setError('')
    }catch (error) {
      setError('Incorrect username or password!')
    }
    setIsLoading(false)
  }

  return (
    <div className="App">
      <div className="login-container">
        {isLoggedIn ? 
        <>
          <h1>Hello {username}</h1>
          <button onClick={()=> setIsLoggedIn(false)}>log out</button>
        </>
        :
        <form onSubmit={onSubmit} className="form">
          { error && <p className='error'>{error}</p>}
          <p>pls login</p>
          <input type="text" placeholder="username"
            username={username}
            onChange={e =>setUsername(e.currentTarget.value)}
          />
          <input type="password" placeholder="password" autoComplete="new-password"
            value={password}
            onChange={e => setPassword(e.currentTarget.value)}
          />
          <button className='submit' type='submit'
            disabled={isLoading}>
              {isLoading ? 'Loggin in ...' : 'Log In'}
            </button>
        </form>}
      </div>
    </div>
  )
}

export default LoginPage
