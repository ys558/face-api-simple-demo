import React, { Component, FC, ReactNode } from 'react'

interface AAprops {
  data: (data: HTMLParamElement ) => JSX.Element | null
}

export const AA: FC<AAprops> = ({ data }) => {
  return <div>
      {data}
      <BB bb='bb-props'/>
    </div>
}

interface BBprops {
  bb: string
}

class BB extends Component<BBprops> {
  public render(): ReactNode {
    const {bb} = this.props
    return <div>{bb}</div>
  }
}

export default AA
