import { createContext, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { axiosInstance } from "../api/axios";

const TodosContext = createContext();

export const TodosProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const response = await axiosInstance.get(`/todo/getTodo`);
      if (response.data && response.data.todos) {
        setTodos(response.data.todos);
      }
    } catch (err) {
      if (err.response) {
        const { status } = err.response;
        if (status === 500) {
          toast.error("could not get todos", { autoClose: 1000 });
        }
      }
    }
  };

  return (
    <TodosContext.Provider value={{ todos, setTodos, fetchTodos }}>
      {children}
    </TodosContext.Provider>
  );
};

TodosProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export { TodosContext };
