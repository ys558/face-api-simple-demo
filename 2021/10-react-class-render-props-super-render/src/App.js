import React, { Component } from 'react'

export default class RenderProps extends Component {
  render() {
    return (
      <div>
        <RenderPropsDemo/>
        <SuperRenderDemo />
      </div>
    )
  }
}

// render props 例子：
class RenderPropsDemo extends Component {
  render(){
    return <ToggleRenderProps render={({on, toggle, str}) => <>
      <div>
        { on && <h1>Hey zidea</h1> }
        { on && <h2>{str}</h2> }
        <button onClick={toggle}>隐藏/显示</button>
        </div>
      </>
    }/>
  }
}
class ToggleRenderProps extends Component {
  state = { on:false }
  toggle = () => this.setState({ on:!this.state.on })

  render() {
    const { render } = this.props;
    return <div>
      {render({
        str: 'hehe',
        on: this.state.on,
        toggle: this.toggle,
      })}
  </div>
  }
}

// super.render 反向继承例子
class AAA extends React.Component {
  constructor(props) {
    super(props)
    this.state = { num: 2019 }
  }

  componentDidMount() {
    console.log("child component Did Mount")
  }
  clickComponent() { console.log("Component click")
  }

  render() {
    return <div>{ this.state.num }</div>
  }
}

// 这里的AAA作为形参可以随意取名：
let iihoc = AAA => class extends AAA {
  constructor(props) {
    super(props)
    this.state = { num: 2020 }
  }

  componentDidMount() {
    console.log('iihoc componentDidMount')
    this.clickComponent()
  }
render(){
  return <div>
        <div onClick={this.clickComponent}>iiHoc 点击</div>
       <div><AAA />//用的是父组件的state；</div>
       <div>{super.render()}//反向继承，用的是子组件的state；</div>
    </div>
  }
}
const SuperRenderDemo = iihoc(AAA)