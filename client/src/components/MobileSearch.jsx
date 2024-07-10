import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import PropTypes from "prop-types";
import Modal from "react-modal";

const MobileSearch = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
  onClearSearch,
}) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const closeModal = () => {
    setIsSearchVisible(false);
  };

  return (
    <div className='sm:hidden'>
      <Modal
        isOpen={isSearchVisible}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.5)",
          },
        }}
        contentLabel='Search Todo Modal'
        className='md:w-[50%] w-[90%] h-[50px] bg-white rounded-md mx-auto mt-14 overflow-scroll'
      >
        <div className='flex items-center bg-white h-full rounded-md text-slate-700 font-Montserrat px-4 w-full'>
          <input
            className='w-full text-sm bg-transparent py-[11px] outline-none'
            type='search'
            placeholder='Search Todo...'
            value={searchQuery}
            onChange={({ target }) => setSearchQuery(target.value)}
          />
          {searchQuery && (
            <IoMdClose
              className='text-2xl text-slate-500 cursor-pointer hover:text-black mr-3'
              onClick={() => {
                onClearSearch();
                closeModal();
              }}
            />
          )}
          <FaMagnifyingGlass
            className='text-slate-400 text-2xl cursor-pointer hover:text-black'
            onClick={() => {
              handleSearch();
              closeModal();
            }}
          />
        </div>
      </Modal>
      {!isSearchVisible && (
        <FaMagnifyingGlass
          className='text-white text-lg cursor-pointer'
          onClick={() => setIsSearchVisible(true)}
        />
      )}
    </div>
  );
};

MobileSearch.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  onClearSearch: PropTypes.func.isRequired,
};

export default MobileSearch;
