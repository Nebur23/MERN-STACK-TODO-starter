import { useState } from "react";
import Header from "../components/Header";
import TodoCard from "../components/TodoCard";
import Modal from "react-modal";
import { MdAdd } from "react-icons/md";
import TodoModal from "../components/TodoModal";

Modal.setAppElement("#root");

const Home = () => {
  const [openModal, setOpenModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });
  const handleDelete = () => {};
  const handleEdit = () => {
    setOpenModal({
      isShown: true,
      data: { title: "edit", content: "edit" },
      type: "edit",
    });
  };
  const handlePinToggle = () => {};
  const openAddModal = () => {
    setOpenModal({ isShown: true, type: "add", data: null });
  };

  const closeModal = () => {
    setOpenModal({ ...openModal, isShown: false });
  };
  return (
    <div className='min-h-screen flex flex-col'>
      <Header />
      <div className='grid-container items-start grid-cols-1 sm:grid-cols-2 md:grid-cols-3 container py-4'>
        <TodoCard
          key={"jjjjj"}
          title='Go to Gym'
          content='Go to gym next week'
          isPinned={false}
          tags={["gym", "sport"]}
          date='07/10/2024'
          onDelete={handleDelete}
          onEdit={handleEdit}
          onPinTodo={handlePinToggle}
        />
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
          />
        </Modal>

        <button
          className='w-14 h-14 flex-box bg-accent rounded-2xl right-14 bottom-10 fixed'
          onClick={openAddModal}
        >
          <MdAdd className='text-[32px] text-white' />
        </button>
      </div>
    </div>
  );
};

export default Home;
