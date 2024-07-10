import { useState } from "react";
import { MdClose } from "react-icons/md";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import TagInput from "./TagInput";
import { axiosInstance } from "../api/axios";

const api_url = "/todo";

const TodoModal = ({ onClose, Todo, type, fetchTodos }) => {
  const [todoElt, setTodoElt] = useState({
    title: Todo?.title || "",
    content: Todo?.content || "",
  });
  const [tags, setTags] = useState(Todo?.tags || []);
  const handleTodoEltChange = e => {
    setTodoElt(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleAddTodo = () => {
    if (!todoElt.title) {
      return toast.error("Please Enter a Title", { autoClose: 1000 });
    }
    if (!todoElt.content) {
      return toast.error("Please Enter a Content", { autoClose: 1000 });
    }
    if (type == "edit") {
      editTodo();
    } else {
      AddNewTodo();
    }
  };

  const AddNewTodo = async () => {
    try {
      const response = await axiosInstance.post(`${api_url}/createTodo`, {
        ...todoElt,
        tags,
      });
      if (response.data && response.data.todos) {
        fetchTodos();
        onClose();
      }
    } catch (err) {
      if (err.response) {
        const { status } = err.response;
        if (status === 500) {
          toast.error("could not create todos", { autoClose: 1000 });
        }
      }
    }
  };
  const editTodo = async () => {
    try {
      const response = await axiosInstance.put(
        `${api_url}/editTodo/${Todo._id}`,
        { ...todoElt, tags },
        { withCredentials: true }
      );
      if (response.data) {
        fetchTodos();
        onClose();
      }
    } catch (err) {
      if (err.response) {
        const { status } = err.response;
        if (status === 500) {
          toast.error("could not create todos", { autoClose: 1000 });
        }
      }
    }
  };
  return (
    <div className='card w-full h-full  flex flex-col'>
      <button
        onClick={onClose}
        className='flex-box w-10 h-10 rounded-full hover:bg-slate-100 self-end'
      >
        <MdClose className='text-xl text-slate-400' />
      </button>
      <div className='flex flex-col'>
        <label className='input-label'>TITLE</label>
        <input
          type='text'
          className='text-2xl text-slate-950 outline-none'
          placeholder=' Go To  Gym At 5pm'
          value={todoElt.title}
          onChange={handleTodoEltChange}
          name='title'
        />
      </div>

      <div className='flex flex-col mt-4'>
        <label className='input-label'>CONTENT</label>
        <textarea
          className='text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded overflow-scroll'
          placeholder='Content '
          rows={7}
          value={todoElt.content}
          onChange={handleTodoEltChange}
          name='content'
        />
      </div>
      <div className='mt-3'>
        <label className='input-label'>TAGS</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      <button
        onClick={handleAddTodo}
        className='btn-primary w-1/4 font-medium mt-5 p-2'
      >
        {type === "edit" ? "Update" : "Add"}
      </button>
    </div>
  );
};

TodoModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  Todo: PropTypes.object,
  fetchTodos: PropTypes.func,
};

export default TodoModal;
