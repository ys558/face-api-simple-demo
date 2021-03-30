import React from 'react';
import { UseStateUseRefTS } from './UseStateUseRefTS';
import { RenderPropsTS } from './RenderPropsTS';

const App: React.FC = () => {
  return <div>
    <UseStateUseRefTS
      text='hello' 
      person={{firstName: '', lastName: ''}}
      handleChange={e => console.log(e.target.value)}
    />
    <RenderPropsTS>
      { (count, setCount) => (
        <div>
          {count}
          <button onClick={() => setCount( count + 1 )}>+</button>
        </div>)}
    </RenderPropsTS>
  </div>
}

export default App;
