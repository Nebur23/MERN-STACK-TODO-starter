import icon from "../assets/infinite-spinner.svg";

const Loading = () => {
  return (
    <div className='flex-box h-full'>
      <img src={icon} alt='loading...' className='w-60' />
    </div>
  );
};

export default Loading;
