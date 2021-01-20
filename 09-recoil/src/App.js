import { LeftBox } from './components';
import { RightBox } from './components';

function App() {
  return  <div style={{display: "flex", flexDirection: "row"}}>
    <LeftBox />
    <RightBox />
  </div>
}

export default App;
