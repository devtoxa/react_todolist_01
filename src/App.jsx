
import './App.css'
import { useState } from 'react';
function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, state: "checked", title: 'REACT 공부하기', date: '2026-11-06', },
    { id: 2, state: "", title: '빨래 널기', date: '2026-11-06', },
    { id: 3, state: "", title: '노래 연습하기', date: '2026-11-06', },
  ])
  const [searchText, setSearchText] = useState('')
  const [newTodoText, setNewTodoText] = useState('')
  const [newId, setNewId] = useState(4);
  const toggleCheck = (id) => {
    setTodoList(
      todoList.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            state: todo.state === 'checked' ? '' : 'checked',
          };
        }
        return todo;
      })
    );
  }
  const handleNewTodo = (e) => {
    e.preventDefault();
    const newTodo = {
      id: newId,
      state: '',
      title: newTodoText,
      date: new Date().toISOString().slice(0, 10),
    };
    setTodoList([...todoList, newTodo])
    setNewId(newId + 1)
    setNewTodoText('')
  }
  const handleDelete = (id) => {
    setTodoList(
      todoList.filter((todo) => todo.id !== id)
    )
  }
  const filteredTodoList = todoList.filter((todo) => todo.title.includes(searchText))
  return (
    <div className="App">
      <h1>새로운 Todo 작성하기</h1>
      <form className="Form">
        <input type="text" value={newTodoText} name="newTodoText" placeholder="새로운 Todo" onChange={(e) => (setNewTodoText(e.target.value))} />
        <button type="submit" onClick={handleNewTodo}>추가</button>
      </form>
      <hr></hr>
      <h1>Todo List</h1>
      <input type="search" name="searchText" value={searchText} onChange={(e) => (setSearchText(e.target.value))} placeholder="검색어를 입력하세요" />
      <table className="TodoList">
        <thead>

        </thead>
        <tbody>
          {
            filteredTodoList.map((todo, i) => {
              return (
                <tr key={i}>
                  <td>
                    <input type="checkbox" id={`state-${todo.id}`} checked={todo.state} onChange={() => { toggleCheck(todo.id) }} />
                  </td>
                  <td >
                    <label htmlFor={`state-${todo.id}`}>
                      {todo.title}
                    </label>
                  </td>
                  <td >
                    <label htmlFor={`state-${todo.id}`}>
                      {todo.date}
                    </label>
                  </td>
                  <td >
                    <button onClick={() => handleDelete(todo.id)}>삭제</button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div >
  )
}

export default App