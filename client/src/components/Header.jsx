import { useState } from "react";
import Logo from "./Logo";
import Profile from "./Profile";
import SearchBar from "./SearchBar";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = () => {}
  const onClearSearch = () => {}
  const onLogout = () => {}

  return (
    <div className='bg-lightBlack text-white'>
      <div className='container flex-box justify-between py-5'>
        <Logo />
        <SearchBar
          value={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          onClearSearch={onClearSearch}
        />
        <Profile email={"John Doe"} onLogout={onLogout} />
      </div>
    </div>
  );
};

export default Header;
