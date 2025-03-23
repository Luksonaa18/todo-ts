import { FormEvent, useRef, useState, useEffect } from "react";
import "./App.css";
import logo1 from "../src/assets/asd.png";
import Todo, { Todos, TodoProps } from "./componnents/Todo";
import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
type Theme = {
  color: string;
  background: string;
  width: string;
  height: string;
  border: string;
};

const theme: Theme = {
  color: "red",
  background: "#EEEEEE",
  width: "100px",
  height: "50px",
  border: "1px solid white",
};
const nreTheme: Theme = {
  color: "blue",
  background: "black",
  width: "100px",
  height: "50px",
  border: "1px solid black",
};

const Button = styled.button`
  color: ${(props) => props.theme.color};
  background: ${(props) => props.theme.background};
  width: ${(props) => props.theme.width};
  height: ${(props) => props.theme.height};
  cursor: pointer;
  border:${(props) => props.theme.border}
  transition: background 0.3s ease; /* Smooth transition for background color */
`;

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.background};
    transition: background-color 0.3s ease;
  }
`;

// Local storage key
const LOCAL_STORAGE_KEY = "todoApp.todos";

function App() {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked((prev) => !prev);
  };
  const loadInitialTodos = (): Array<Todos> => {
    const storedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedTodos) {
      const parsed = JSON.parse(storedTodos);
      return parsed.map((todo: any) => ({
        ...todo,
        date: new Date(todo.date),
      }));
    }

    const currentDate = new Date();
    return [
      {
        text: "Dinner",
        date: currentDate,
        isActive: false,
      },
      {
        text: "Walk with Coby",
        date: currentDate,
        isActive: false,
      },
      {
        text: "Buy Groceries",
        date: currentDate,
        isActive: false,
      },
      {
        text: "Go to repair shop",
        date: currentDate,
        isActive: false,
      },
    ];
  };

  const [todo, setTodo] = useState<Array<Todos>>(loadInitialTodos);
  const commentRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todo));
  }, [todo]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (commentRef.current && commentRef.current.value) {
      const now = new Date();

      const newTodo: Todos = {
        text: commentRef.current.value,
        date: now,
        isActive: false,
      };
      setTodo([...todo, newTodo]);
      commentRef.current.value = "";
    }
  };

  const handleDelete = (index: number) => {
    const newTodos = [...todo];
    newTodos.splice(index, 1);
    setTodo(newTodos);
  };

  return (
    <>
      <div className="all-in">
        <h1 style={{ color: "#007FDB" }}>Todo</h1>
        <div className="full">
          <div className="content-wrapper">
            <div className="header-section">
              <img id="logos" src={logo1} alt="" />
            </div>
            <div className="theres">
              <ThemeProvider theme={clicked ? theme : nreTheme}>
                <GlobalStyle />
                {clicked ? (
                  <FaMoon
                    style={{ color: "black", cursor: "pointer" }}
                    onClick={handleClick}
                  />
                ) : (
                  <FaSun
                    style={{ color: "yellow", cursor: "pointer" }}
                    onClick={handleClick}
                  />
                )}
              </ThemeProvider>
            </div>

            <div className="form-section">
              <form action="" onSubmit={handleSubmit}>
                <input
                  id="first"
                  type="text"
                  ref={commentRef}
                  placeholder="Note"
                />
                <button id="submit">+</button>
              </form>
            </div>

            <div className="todos-section">
              {todo.length > 0 ? (
                todo.map((todos, index) => (
                  <Todo
                    key={index}
                    text={todos.text}
                    date={todos.date}
                    isActive={todos.isActive}
                    onDelete={() => handleDelete(index)}
                  />
                ))
              ) : (
                <div className="empty-state">No todos yet. Add one above!</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
