import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeTodo, editeTodo } from '../features/todo/todoslice'

function Todos() {
  const todos = useSelector(state => state.todos)
  const [editingTodoId, setEditingTodoId] = useState(null)
  const [input, setInput] = useState("")

  const dispatch = useDispatch()
  const inputRef = useRef(null)

  const editeTodoHandler = (e, id) => {
    e.preventDefault()
    if (editingTodoId ) {
      dispatch(editeTodo({ id, text: input }))
      setEditingTodoId(null)
      setInput("")
    }
  }
  useEffect(() => {
    if (editingTodoId !== null && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingTodoId]);

  const startEditing = (id, currentText) => {
    setEditingTodoId(id)
    setInput(currentText)
  }

  return (
    <>
      <div className='font-semibold text-lg capitalize'>Todos</div>
      <ul className='list-none'>
        {todos.map((todo) => (
          <li
            className={`mx-[10px] sm:mx-[40px] mt-4 flex justify-between
            items-center ${editingTodoId === todo.id ? "bg-gray-800 border border-indigo-500 outline-indigo-900 " : "bg-gray-800 "} px-4 py-2 rounded`}
            key={todo.id}>
            {editingTodoId === todo.id ? (
              <input
                type='text'
                ref={inputRef}
                className={`w-full mr-2 bg-transparent border-none outline-none text-gray-100 py-0 px-0 leading-8 `}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            ) : (
              <div className='text-white'>
                {todo.text}
              </div>
            )}
            <div className='flex justify-center gap-1'>
              <button
                className={`text-white bg-red-500 border-0 py-1 px-4  focus:outline-none hover:bg-red-600 rounded text-md`}
                onClick={() => dispatch(removeTodo(todo.id))}>
                delete
              </button>
              {editingTodoId === todo.id ? (
                <button
                  className={`text-white bg-green-500 border-0 py-1 px-4  focus:outline-none hover:bg-green-600 rounded text-md`}
                  onClick={(e) => editeTodoHandler(e, todo.id)}>
                  Save
                </button>
              ) : (
                <button
                  className={`text-white bg-blue-500 border-0 py-1 px-4  focus:outline-none hover:bg-blue-600 rounded text-md`}
                  onClick={() => startEditing(todo.id, todo.text)}>
                  Edit
                </button>
              )}
            </div>

          </li>
        ))}
      </ul>
    </>
  )
}

export default Todos
