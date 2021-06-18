import React, { Component } from 'react'
import { RenderPropsDemo } from './RenderProps'
import { InheritanceInversionHOC } from './InheritanceInversionHOC'

export default class RenderProps extends Component {
  render() {
    return (
      <div>
        {/* 1. Render Props */}
        <RenderPropsDemo/>
        <hr />
        {/* 2. 反向继承： */}
        <InheritanceInversionHOC />
      </div>
    )
  }
}


