import React from 'react';
import { UseStateUseRefTS } from './UseStateUseRefTS';
import { RenderPropsTS } from './RenderPropsTS';
import { ClassTS } from './ClassTS';

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
    <hr/>
    <ClassTS
      text='hello world'
    ></ClassTS>
  </div>
}

export default App;
