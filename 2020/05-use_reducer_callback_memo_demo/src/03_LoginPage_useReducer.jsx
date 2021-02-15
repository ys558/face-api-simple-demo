import React, {useState, useReducer} from 'react'

const Login = ({ username, password }) => new Promise((resolve, reject ) => {
  setTimeout(() => {
    if (username === 'aa' && password ==='bb') {
      resolve()
    }else{
      reject()
    }
  }, 1000)
})

const loginReducer = (state, action) => {
  switch(action.type) {
    case 'field': {
      return {...state,
        [action.field] : action.value
      }
    }
    case 'login': {
      return { ...state,
        isLoading: true, 
        error: ''
      }
    }
    case 'success': {
      return { ...state, 
        isLoggedIn: true
      }
    }
    case 'error': {
      return { ...state, 
        error: 'Incorrect username or password!', 
        isLoading: false,
        username: '',
        password: ''
      }
    }
    case 'logout': {
      return { ...state, 
        isLoggedIn: false,
        username: '',
        password: ''
      }
    }
    default:
      break
  }
  return state
}

const initialState = {
  username: '',
  password: '',
  isLoading: false,
  error: '',
  isLoggedIn: false,
}

const LoginPageWithUseReducer = () => {
  // 可将其与src\LoginPage.jsx文件进行对比：
  const [state, dispatch] = useReducer(loginReducer, initialState)
  const { username, password, isLoading, error, isLoggedIn } = state

  const onSubmit = async e => {
    e.preventDefault()
    dispatch({ type: 'login' })
    try {
      await Login({ username, password })
      dispatch({ type: 'success' })
    }catch (error) {
      dispatch({ type: 'error' })
    }
  }

  return (
    <div className="App">
      <div className="login-container">
        {isLoggedIn ? 
        <>
          <h1>Hello {username}</h1>
          <button onClick={()=> dispatch({ type: 'logout' })}>log out</button>
        </>
        :
        <form onSubmit={onSubmit} className="form">
          { error && <p className='error'>{error}</p>}
          <p>pls login</p>
          <input type="text" placeholder="username"
            username={username}
            onChange={e => dispatch({ 
              type: 'field', 
              field: 'username', 
              value:e.currentTarget.value 
            })}
          />
          <input type="password" placeholder="password" autoComplete="new-password"
            value={password}
            onChange={e => dispatch({ 
              type: 'field', 
              field: 'password', 
              value:e.currentTarget.value 
            })}
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

export default LoginPageWithUseReducer
