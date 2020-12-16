import { useReducer } from 'react'
import UseCallback from './01_UseCallback'
import UseCallback2 from './01_UseCallback2'
import UseMemo from './02_UseMemo'
import LoginPage from './03_LoginPage'
import LoginPageWithUseReducer from './03_LoginPage_useReducer'
import UseContex from './04_Login_todo_useContext_Memo'
import CustomHook from './05_custom_hook_demo1'
import UseEventListener from './05_custom_hook_demo2'
import UseRefBesidesDOM from './06_UseRef_besides_access_in_DOM'


function App() {
  return (
    <div className="App">
      {/* <UseCallback /> */}
      {/* <UseCallback2 /> */}
      {/* <UseMemo /> */}
      {/* <LoginPage /> */}
      {/* <LoginPageWithUseReducer/> */}
      {/* <UseContex /> */}
      {/* <CustomHook/> */}
      {/* <UseEventListener /> */}
      <UseRefBesidesDOM />
    </div>
  );
}

export default App;
