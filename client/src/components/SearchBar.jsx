import PropTypes from "prop-types";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const SearchBar = ({ value,  handleSearch, onClearSearch,setSearchQuery }) => {
  return (
    <div className='sm:flex-box w-80 px-4 bg-white rounded-md text-slate-700 font-Montserrat hidden'>
      <input
        className='w-full text-xs bg-transparent py-[11px] outline-none '
        type='search'
        placeholder='Search Todo...'
        value={value}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {value && (
        <IoMdClose
          className='text-xl text-slate-500 cursor-pointer hover:text-black mr-3'
          onClick={onClearSearch}
        />
      )}

      <FaMagnifyingGlass
        className='text-slate-400 cursor-pointer hover:text-black '
        onClick={handleSearch}
      />
    </div>
  );
};

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  onClearSearch: PropTypes.func.isRequired,
};

export default SearchBar;
