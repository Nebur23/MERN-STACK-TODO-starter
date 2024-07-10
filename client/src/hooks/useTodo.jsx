import { useContext } from "react";
import { TodosContext } from "../context/TodoProvider";

const useTodos = () => {
  return useContext(TodosContext);
};

export default useTodos;
