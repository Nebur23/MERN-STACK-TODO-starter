import { getInitialsFromEmail } from "../utils/helper";
import PropTypes from "prop-types";

const Profile = ({ email, onLogout }) => {
  return (
    <div className='flex-box gap-3'>
      <div className='w-10 h-10 flex-box rounded-full text-slate-950 font-medium bg-slate-100'>
        {getInitialsFromEmail(email)}
      </div>

      <div className=''>
        <p className='text-sm font-normal'>{email}</p>
        <button onClick={onLogout} className='text-sm text-gray underline'>
          Logout
        </button>
      </div>
    </div>
  );
};

Profile.propTypes = {
  onLogout: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
};

export default Profile;
