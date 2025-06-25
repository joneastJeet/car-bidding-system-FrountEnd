import React, { useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { userName, password });
      const token = res.data?.access_token;
      if (token) login(token);
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <>
      <div>
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600">
            <form
              onSubmit={handleLogin}
              className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm space-y-6"
            >
              <h2 className="text-3xl font-semibold text-center text-gray-800">Login</h2>
              
              {errorMsg && (
                <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm">
                  {errorMsg}
                </div>
              )}
          
              <div>
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </div>
          
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
          
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition duration-300"
              >
                Login
              </button>
          
              <div className="text-center">
                <p className="text-sm text-gray-500">
                  Don't have an account?{" "}
                  <a href="/signup" className="text-blue-600 hover:underline">
                    Sign up
                  </a>
                </p>
              </div>
            </form>
          </div>
      </div>
      
    </>
        
  
  );
};

export default LoginPage;
