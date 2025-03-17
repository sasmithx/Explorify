import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const PasswordInput = ({ value, onChange, placeholder }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div className="flex items-center px-5 mb-3 rounded bg-cyan-600/5">
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder || "Password"}
        type={isShowPassword ? "text" : "password"}
        className="w-full py-3 mr-3 text-sm bg-transparent rounded outline-none"
      />
      {isShowPassword ? (
        <FaRegEye
          size={22}
          className="cursor-pointer text-primary"
          onClick={toggleShowPassword}
        />
      ) : (
        <FaRegEyeSlash
          size={22}
          className="cursor-pointer text-slate-400"
          onClick={toggleShowPassword}
        />
      )}
    </div>
  );
};

export default PasswordInput;
