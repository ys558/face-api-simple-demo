import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import AA from './AA'

export const App = () => {
  return (
    <div>
      <AA data={<p>hehe</p>} />
    </div>
  )
}


// export default class App extends Component {
//   render() {
//     return (
//       <div>
//         ssssssss
//       </div>
//     )
//   }
// }


ReactDOM.render(<App />, document.getElementById('root'))
