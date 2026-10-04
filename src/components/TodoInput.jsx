import { useState } from 'react';
import Button from './Button';
import styles from './TodoInput.module.css';

const TodoInput = props => {
  const [enteredValue, setEnteredValue] = useState('');
  const [isValid, setIsValid] = useState(true);

  const todoInputChangeHandler = event => {
    const value = event.target.value;

    if (value.trim().length > 0) {
      setIsValid(true);
    }

    setEnteredValue(value);
  };

  const formSubmitHandler = event => {
    event.preventDefault();

    if (enteredValue.trim().length === 0) {
      setIsValid(false);
      return;
    }

    props.onAddTodo(enteredValue);
    setEnteredValue('');
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <div
        className={`${styles['form-control']} ${
          !isValid ? styles.invalid : ''
        }`}
      >
        <label htmlFor="todo-input">Checklist Task</label>
        <input
          id="todo-input"
          type="text"
          value={enteredValue}
          onChange={todoInputChangeHandler}
        />
      </div>

      <Button type="submit">Add Task</Button>
    </form>
  );
};

export default TodoInput;
