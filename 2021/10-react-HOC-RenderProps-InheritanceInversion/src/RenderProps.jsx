import React, { Component } from 'react'

// render props：
export class RenderPropsDemo extends Component {
  render(){
    // 1. render 作为组件 <ToggleRenderProps/> 的属性
    // 3. 反向在render的回调函数里解构出子组件的属性出来用
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
    // 2. 在子组件设置render里面的属性：
    const { render } = this.props;
    return <>
      {render({
        str: 'hehe',
        on: this.state.on,
        toggle: this.toggle,
      })}
    </>
  }
}

