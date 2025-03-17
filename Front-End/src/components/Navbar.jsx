import React from "react";
import ProfileInfo from "./Cards/ProfileInfo";
import LOGO from "../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import SearchBar from "./Input/SearchBar";

const Navbar = ({ userInfo, SearchQuery, setSearchQuery, onSearchNote, handleClearSearch }) => {
  const isToken = localStorage.getItem("token");
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSearch = () => {
    if (SearchQuery) {
      onSearchNote(SearchQuery);
    }
  };

  const onClearSearch = () => {
    handleClearSearch();
    setSearchQuery("");
  };

  return (
    <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-2 bg-white drop-shadow">
      <img src={LOGO} alt="Explorify" className="h-9" />

      {isToken && (
        <>
          <SearchBar
            value={SearchQuery}
            onChange={({ target }) => {
              setSearchQuery(target.value);
            }}
            handleSearch={handleSearch}
            onClearSearch={onClearSearch}
          />
          <ProfileInfo userInfo={userInfo} onLogout={onLogout} />{" "}
        </>
      )}
    </div>
  );
};

export default Navbar;
