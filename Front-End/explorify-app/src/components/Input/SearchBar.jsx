import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-md w-80 bg-slate-100">
      <FaMagnifyingGlass className="text-slate-400" />
      <input
        type="text"
        placeholder="Search..."
        className="flex-1 bg-transparent outline-none placeholder:text-slate-400"
        value={value}
        onChange={onChange}
      />

      {value && (
        <IoMdClose
          className="mr-3 text-xl cursor-pointer text-slate-500 hover:text-black"
          onClick={onClearSearch} // Changed from OnClearSearch to onClearSearch
        />
      )}

      <FaMagnifyingGlass
        className="cursor-pointer text-slate-400 hover:text-black" // Fixed typo: cusrsor -> cursor
        onClick={handleSearch}
      />
    </div>
  );
};

export default SearchBar;