import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeTodo, editeTodo } from '../features/todo/todoslice'

function Todos() {
  const todos = useSelector(state => state.todos)
  const [editingTodoId, setEditingTodoId] = useState(null)
  const [input, setInput] = useState("")

  const dispatch = useDispatch()

  const editeTodoHandler = (e, id) => {
    e.preventDefault()
    if (editingTodoId) {
      dispatch(editeTodo({ id, text: input }))
      setEditingTodoId(null)
      setInput("")
    }
  }

  const startEditing = (id, currentText) => {
    setEditingTodoId(id)
    setInput(currentText)
  }

  return (
    <>
      <div>
        {todos.map((todo) => (
          <li key={todo.id}>
            {editingTodoId === todo.id ? (
              <input 
                type='text' 
                className='w-[100px] h-[30px] bg-red-400' 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
              />
            ) : (
              todo.text
            )}

            <button
              className='py-1 px-6 bg-red-500'
              onClick={() => dispatch(removeTodo(todo.id))}>
              X
            </button>
            {editingTodoId === todo.id ? (
              <button
                className='py-1 px-6 bg-green-500'
                onClick={(e) => editeTodoHandler(e, todo.id)}>
                Save
              </button>
            ) : (
              <button
                className='py-1 px-6 bg-blue-500'
                onClick={() => startEditing(todo.id, todo.text)}>
                Edit
              </button>
            )}
          </li>
        ))}
      </div>
    </>
  )
}

export default Todos
