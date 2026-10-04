import { useEffect, useReducer } from 'react';
import { createPortal } from 'react-dom';
import TodoInput from './components/TodoInput';
import './App.css';

const initialState = {
  todoItems: [
    { id: 't1', text: 'Finish homework' },
    { id: 't2', text: 'Go on a hike' }
  ],
  activeTodo: null
};

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todoItems: [
          {
            id: Math.random().toString(),
            text: action.text
          },
          ...state.todoItems
        ]
      };

    case 'START_DELETE':
      return {
        ...state,
        activeTodo: action.id
      };

    case 'COMPLETE_DELETE':
      return {
        ...state,
        todoItems: state.todoItems.filter(
          todo => todo.id !== action.id
        ),
        activeTodo: null
      };

    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const addTodoHandler = enteredText => {
    dispatch({
      type: 'ADD_TODO',
      text: enteredText
    });
  };

  const deleteItemHandler = todoId => {
    dispatch({
      type: 'START_DELETE',
      id: todoId
    });
  };

  useEffect(() => {
    if (!state.activeTodo) {
      return;
    }

    const timer = setTimeout(() => {
      dispatch({
        type: 'COMPLETE_DELETE',
        id: state.activeTodo
      });
    }, 200);

    return () => clearTimeout(timer);
  }, [state.activeTodo]);

  useEffect(() => {
    localStorage.setItem(
      'todo-items',
      JSON.stringify(state.todoItems)
    );
  }, [state.todoItems]);

  return (
    <>
      <main id="app-container">
        <section id="todo-form">
          <TodoInput onAddTodo={addTodoHandler} />
        </section>

        <section id="todos">
          <ul className="todo-list">
            {state.todoItems.map(todo => (
              <li
                key={todo.id}
                className={`todo-item ${
                  state.activeTodo === todo.id
                    ? 'todo-item--active'
                    : ''
                }`}
                onClick={() => deleteItemHandler(todo.id)}
              >
                {todo.text}
              </li>
            ))}
          </ul>
        </section>
      </main>

      {createPortal(
        <div className="todo-badge">
          {state.todoItems.length} task
          {state.todoItems.length !== 1 ? 's' : ''} remaining
        </div>,
        document.getElementById('portal-root')
      )}
    </>
  );
};

export default App;
