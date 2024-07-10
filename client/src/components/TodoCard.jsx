import PropTypes from "prop-types";
import { MdOutlinePushPin } from "react-icons/md";
import { MdCreate, MdDelete } from "react-icons/md";
import moment from "moment";

const TodoCard = ({
  title,
  content,
  tags,
  date,
  isPinned,
  onEdit,
  onDelete,
  onPinTodo,
}) => {
  return (
    <div className='card h-[160px]'>
      <div className='flex-box justify-between'>
        <div>
          <h6 className='text-sm font-medium'>{title}</h6>
          <span className='text-xs text-slate-500'>
            {moment(date).format("Do MMM YYYY")}
          </span>
        </div>
        <MdOutlinePushPin
          className={`${isPinned && "text-accent"} icon-btn cursor-pointer`}
          onClick={onPinTodo}
        />
      </div>

      <p className='my-3 text-xs text-slate-700'> {content.slice(0, 60)} </p>
      <div className='flex-box justify-between'>
        <div className='text-xs text-slate-500'>
          {tags.map(tag => `#${tag}`)}
        </div>
        <div className='flex-box gap-2 cursor-pointer'>
          <MdCreate className='icon-btn' onClick={onEdit} />
          <MdDelete
            className='icon-btn hover:text-red-700'
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
};

TodoCard.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
  date: PropTypes.string.isRequired,
  isPinned: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onPinTodo: PropTypes.func.isRequired,
};

export default TodoCard;
