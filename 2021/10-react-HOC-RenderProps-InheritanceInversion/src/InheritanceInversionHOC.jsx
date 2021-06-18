import React from 'react'

/* 
  Inheritance Inversion 反向继承
  作用：
  1. Render Highjacking 渲染劫持
  2. Manipulating state 控制state
*/
class AAA extends React.Component {
  constructor(props) {
    super(props)
    this.state = { num: 111 }
  }

  componentDidMount() { console.log("child component Did Mount") }
  clickComponent = () =>  console.log('clickComponent func')

  render() {
    return <div num={this.state.num}>父组件AAA：{ this.state.num }</div>
  }
}

// extends AAA 是继承前一个 AAA 的东西，即继承他本身，自己
const IIHOC = AAA => class extends AAA {
  constructor(props) {
    super(props)
    this.state = { num: 222 }
  }

  componentDidMount() {
    // 1. 反向继承后，会先打印
    console.log('IIHOC componentDidMount')
    this.clickComponent()
  }
  render(){
    return <div>
        <button onClick={this.clickComponent}>IIHoc点击见控制台，AAA组件的函数clickComponent在控制台执行了</button>
        <div><AAA /></div>
        {/* 1. super.render() 为渲染劫持，
        2. 将原来 AAA的组件里的{ this.state.num }，即显示为 111
        替换成新的这里面的状态{ this.state.num }，显示为 222 */}
        <h1>{super.render()}</h1>
      </div>
  }
}

export const InheritanceInversionHOC = IIHOC(AAA)