import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../actions/authActions';
import PasswordInput from '../../components/input/PasswordInput';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosinstance';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!password) {
      setError('Please enter the password');
      return;
    }

    setError('');

    try {
      const response = await axiosInstance.post('/login', {
        email: email,
        password: password,
      });

      if (response.data && response.data.accessToken) {
        localStorage.setItem('token', response.data.accessToken);
        dispatch(login({ email }));
        navigate('/dashboard');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
      <div className="relative h-screen overflow-hidden bg-cyan-50">
        <div className="login-ui-box right-10 -top-40" />
        <div className="login-ui-box bg-cyan-200 -bottom-40 right-1/2 " />

        <div className="container flex items-center justify-center h-screen px-20 mx-auto">
          <div className="w-2/4 h-[90vh] flex items-end bg-login-bg-img bg-cover bg-center rounded-lg p-10 z-50">
            <div>
              <h4 className="text-5xl font-semibold text-white leading-[58px]">
                Capture Your <br /> Journeys
              </h4>
              <p className="text-[15px] text-white leading-6 pr-7 mt-4">
                Record your travel experiences and memories in your personal
                travel journal.
              </p>
            </div>
          </div>

          <div className="w-2/4 h-[75vh] bg-white rounded-r-lg relative p-16 shadow-lg shadow-cyan-200/20">
            <form onSubmit={handleLogin}>
              <h4 className="text-2xl font-semibold mb-7">Login</h4>

              <input
                  type="text"
                  placeholder="Email"
                  className="input-box"
                  value={email}
                  onChange={({ target }) => {
                    setEmail(target.value);
                  }}
              />

              <PasswordInput
                  value={password}
                  onChange={({ target }) => {
                    setPassword(target.value);
                  }}
              />

              {error && <p className="pb-1 text-xs text-red-500">{error}</p>}

              <button
                  type="submit"
                  className="btn-primary"
                  onClick={() => setError('')}
              >
                LOGIN
              </button>

              <p className="my-4 text-xs text-center text-slate-500">Or</p>

              <button
                  type="button"
                  className="btn-primary btn-light"
                  onClick={() => {
                    navigate('/signup');
                  }}
              >
                CREATE ACCOUNT
              </button>
            </form>
          </div>
        </div>
      </div>
  );
};

export default Login;