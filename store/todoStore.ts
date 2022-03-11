import { ToastAndroid } from "react-native";
import create from "zustand";

const handleResponse = (response: Response, onSuccess, onFailure) => {
  if (response.ok) {
    onSuccess();
    // return response;
  } else {
    onFailure();
    // throw Error(response.statusText);
  }
};

export const todoStore = create((set) => ({
  todos: [],
  isLoading: true,
  isUpdating: false,
  addTodo: async (description: string, failCallback = () => {}) => {
    const newId = new Date().toISOString();
    set((state) => ({
      todos: [
        ...state.todos,
        { description, draft: true, completed: false, _id: newId },
      ],
    }));

    const response = await fetch(
      "https://api-nodejs-todolist.herokuapp.com/task",
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjIwZWNlN2I5OTU2OTAwMTcxNWZhYzQiLCJpYXQiOjE2NDYzMjQ5Njh9.0Sd5Q0eUOycHlGXZVqpNxogJe5fDThNLrWUmd45wJaU",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          description,
        }),
      }
    );

    const resp = await response.json();

    if (response.status === 201) {
      set((state) => ({
        todos: state.todos.map((todo) => {
          if (todo._id === newId) {
            return {
              ...todo,
              draft: false,
              _id: resp.data._id,
            };
          }
          return todo;
        }),
      }));
    } else {
      set((state) => ({
        todos: state.todos.filter((todo) => todo._id !== newId),
      }));
      failCallback(response.error);
    }
  },
  removeTodo: async (id: number) => {
    set((state) => ({
      todos: state.todos.map((todo) => {
        if (todo._id === id) {
          return {
            ...todo,
            draft: true,
          };
        } else {
          return todo;
        }
      }),
    }));

    const response = await fetch(
      `https://api-nodejs-todolist.herokuapp.com/task/${id}`,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjIwZWNlN2I5OTU2OTAwMTcxNWZhYzQiLCJpYXQiOjE2NDYzMjQ5Njh9.0Sd5Q0eUOycHlGXZVqpNxogJe5fDThNLrWUmd45wJaU",
          "Content-Type": "application/json",
        },
        method: "DELETE",
      }
    );

    if (response.status === 200) {
      set((state) => ({
        todos: state.todos.filter((todo) => todo._id !== id),
      }));
    } else {
    }
  },
  fetchTodos: async () => {
    const response = await fetch(
      "https://api-nodejs-todolist.herokuapp.com/task",
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjIwZWNlN2I5OTU2OTAwMTcxNWZhYzQiLCJpYXQiOjE2NDYzMjQ5Njh9.0Sd5Q0eUOycHlGXZVqpNxogJe5fDThNLrWUmd45wJaU",
        },
      }
    );
    console.log({ response });
    const resp = await response.json();
    console.log({ resp });
    set({ todos: resp.data, isLoading: false });
  },
}));
