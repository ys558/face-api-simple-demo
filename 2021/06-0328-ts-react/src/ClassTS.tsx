import React, { Component } from 'react'
import {omit} from 'lodash'

interface IProps {
  text: string
  age?: number
}

interface IState {
  email: string
  name: string
}

export class ClassTS extends Component <IProps> {
  state: IState = {
    name: '',
    email: ''
  }

  handleChange = ( e : React.FormEvent<HTMLInputElement> ) => {
    const { name, value } : any = e.target
    this.setState({
      [name]: value
    })
  }

  public render() : React.ReactNode {
    const { text } = this.props
    const { name } = this.state
    return <div>
      <div>{text}</div>
      <div>{name}</div>
      <input type="text" value={name} onChange={this.handleChange} />
    </div>
  }
}
