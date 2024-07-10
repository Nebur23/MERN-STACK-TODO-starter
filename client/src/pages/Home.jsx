import { useEffect, useState } from "react";
import Header from "../components/Header";
import TodoCard from "../components/TodoCard";
import Modal from "react-modal";
import { MdAdd } from "react-icons/md";
import TodoModal from "../components/TodoModal";
import useTodos from "../hooks/useTodo";
import Loading from "../components/Loading";
import { axiosInstance } from "../api/axios";

Modal.setAppElement("#root");

const api_url = "/todo";

const Home = () => {
  const [openModal, setOpenModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });
  const [loading, setLoading] = useState(true);
  const { todos, fetchTodos, setTodos } = useTodos();
  useEffect(() => {
    const fetchData = async () => {
      await fetchTodos();
      setLoading(false);
    };
    fetchData();
  }, []);
  const handleDelete = async id => {
    try {
      await axiosInstance.delete(`${api_url}/deleteTodo/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };
  const handleEdit = updatedTodo => {
    setOpenModal({
      isShown: true,
      data: updatedTodo,
      type: "edit",
    });
  };
  const handlePinToggle = async (id, isPinned) => {
    try {
      await axiosInstance.put(`${api_url}/editPin/${id}`, {
        isPinned: !isPinned,
      });
      fetchTodos(); // Refresh todos after pin update
    } catch (error) {
      console.error("Error updating pin status:", error);
    }
  };

  const openAddModal = () => {
    setOpenModal({ isShown: true, type: "add", data: null });
  };

  const closeModal = () => {
    setOpenModal({ ...openModal, isShown: false });
  };
  return (
    <div className='min-h-screen flex flex-col'>
      <Header />
      {loading ? (
        <Loading />
      ) : (
        <>
          {todos.length > 0 ? (
            <div className='grid-container items-start grid-cols-1 sm:grid-cols-2 md:grid-cols-3 container py-4'>
              {todos.map(todo => (
                <TodoCard
                  key={todo._id}
                  title={todo.title}
                  content={todo.content}
                  date={todo.createdAt}
                  tags={todo.tags}
                  isPinned={todo.isPinned}
                  onDelete={() => handleDelete(todo._id)}
                  onEdit={() => handleEdit(todo)}
                  onPinTodo={() => handlePinToggle(todo._id, todo.isPinned)}
                />
              ))}
            </div>
          ) : (
            <div className="flex-box h-[70vh] text-3xl">
              <p>No todos Found</p>
            </div>
          )}

          <Modal
            isOpen={openModal.isShown}
            onRequestClose={closeModal}
            style={{
              overlay: {
                backgroundColor: "rgba(0,0,0,0.2)",
              },
            }}
            contentLabel='Edit Todo Modal'
            className='md:w-[50%] w-[90%] max-h-3/4 bg-white rounded-md mx-auto mt-14 overflow-scroll'
          >
            <TodoModal
              type={openModal.type}
              Todo={openModal.data}
              onClose={closeModal}
              fetchTodos={fetchTodos}
            />
          </Modal>

          <button
            className='w-14 h-14 flex-box bg-accent rounded-2xl right-14 bottom-10 fixed'
            onClick={openAddModal}
          >
            <MdAdd className='text-[32px] text-white' />
          </button>
        </>
      )}
    </div>
  );
};

export default Home;
