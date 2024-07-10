import { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";
import PropTypes from "prop-types";

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = e => {
    setInputValue(e.target.value);
  };
  const addNewTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };
  const handlekeyDown = e => {
    if (e.key === "Enter") {
      addNewTag();
    }
  };
  const handleRemoveTag = tagToRemove => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  return (
    <div>
      {tags?.length > 0 && (
        <div className='flex-box gap-2 justify-start flex-wrap mt-2 '>
          {tags.map((tag, index) => (
            <span
              key={index}
              className='text-sm text-slate-900 bg-slate-100 px-3 py-1 rounded flex-box gap-2'
            >
              # {tag}
              <button onClick={() => handleRemoveTag(tag)}>
                <MdClose />
              </button>
            </span>
          ))}
        </div>
      )}
      <div className='flex-box justify-start gap-3 mt-3'>
        <input
          type='text'
          className='bg-transparent text-sm outline-none border border-slate-200 rounded px-3 py-2'
          placeholder='Add tags'
          onChange={handleInputChange}
          onKeyDown={handlekeyDown}
          value={inputValue}
        />

        <button
          className='w-8 h-8 flex-box rounded border border-accent hover:bg-accent'
          onClick={() => addNewTag()}
        >
          <MdAdd className='text-2xl text-accent hover:text-white' />
        </button>
      </div>
    </div>
  );
};

TagInput.propTypes = {
  tags: PropTypes.array.isRequired,
  setTags: PropTypes.any.isRequired,
};

export default TagInput;
