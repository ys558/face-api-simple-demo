import React, { useReducer } from 'react'

export const ReducerExample: React.FC = () => {
  interface Todos {
    text: string
    complete: boolean
  }

  // type State = Array<Todos>
  // or
  type State = Todos[]
  type Actions = { type: 'add', text: string } | { type:'remove', idx: number }
  
  const TodoReducer = ( state: State, action: Actions ) => {
    switch (action.type) {
      case 'add':
        return [...state, { text: action.text, complete: false }]
      case 'remove':
        return state.filter((_, i) => action.idx !== i)
      default:
        return state;
    } 
  }

  const [todos, dispatch] = useReducer(TodoReducer, [])

  return (
    <div>
      {JSON.stringify(todos)}
      <button onClick={ () => {
        dispatch({type: 'add', text: '....'})
      }}>+</button>
    </div>
  )
}
