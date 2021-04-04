import React, { useState, useRef } from 'react'

interface Person {
  firstName: string
  lastName: string
}

interface Props {
  text: string
  ok?: boolean
  i?: number
  fn?: (bob: string) => string
  person: Person
  handleChange?: ( event: React.ChangeEvent<HTMLInputElement> ) => void
}

interface TextNode {
  text: string
}

export const UseStateUseRefTS: React.FC<Props> = ({ person, handleChange }) => {
  const [count, setCount] = useState < TextNode | null >({text: ''})
  const inputRef = useRef<HTMLInputElement>(null)


  return (
    <div>
      <input ref={inputRef} onChange={handleChange} />
    </div>
  )
}
