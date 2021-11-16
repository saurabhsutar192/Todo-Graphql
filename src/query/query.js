import { gql } from "@apollo/client";

export const getTodos = gql`
  query ($userId: String) {
    todos(userId: $userId) {
      id
      todo
    }
  }
`;

export const addTodos = gql`
  mutation ($todo: String!, $userId: String!) {
    addTodo(todo: $todo, userId: $userId) {
      todo
    }
  }
`;
export const deleteTodos = gql`
  mutation ($id: ID!) {
    deleteTodo(id: $id) {
      todo
    }
  }
`;
export const updateTodos = gql`
  mutation ($id: ID!, $todo: String!) {
    updateTodo(id: $id, todo: $todo) {
      todo
    }
  }
`;

export const getUsers = gql`
  {
    users {
      id
      name
    }
  }
`;

export const addUser = gql`
  mutation ($name: String!) {
    addUser(name: $name) {
      id
      name
    }
  }
`;
