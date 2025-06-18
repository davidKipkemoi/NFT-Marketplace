import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Uncommented and now used
import { useAuth } from '../context/AuthContext'; // Import useAuth

function LoginPage() {
  const [email, setEmail] = useState(''); // State for email input
  const [password, setPassword] = useState(''); // State for password input
  const [error, setError] = useState(null); // State for errors
  const [loading, setLoading] = useState(false); // State for loading
  const { supabase } = useAuth(); // Get supabase client from useAuth context
  const navigate = useNavigate(); // Initialized useNavigate

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission

    setError(null); // Clear previous errors
    setLoading(true); // Set loading state

    // Basic input validation
    if (!email || !password) {
        setError('Please enter both email and password.');
        setLoading(false);
        return;
    }

    try {
      // Use Supabase client to sign in
      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) {
        console.error('Login error:', loginError.message);
        // Display specific Supabase login errors (e.g., Invalid login credentials)
        setError(loginError.message || 'Login failed.');
      } else if (data && data.session) {
        console.log('Login successful!', data);
        // Redirect user to dashboard after successful login
        navigate('/dashboard');
      } else {
         // Handle cases where there's no error but no session data (shouldn't happen with signInWithPassword on success)
         setError('Login failed: Unexpected response.');
         console.error('Login failed: Unexpected data response', data);
      }

    } catch (err) {
      console.error('Unexpected login error:', err);
      // Handle unexpected errors
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false); // Unset loading state
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Login to Your Account</h2>

        {/* Login Form */}
        <form onSubmit={handleLogin}> {/* Add onSubmit handler */}
           <div className="mb-4">
              <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="login-email">Email</label>
              <input 
                 className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-white bg-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                 id="login-email"
                 type="email"
                 placeholder="email@example.com"
                 value={email} // Bind value to state
                 onChange={(e) => setEmail(e.target.value)} // Add onChange handler
                 required // Make email required
              />
           </div>
           <div className="mb-6">
              <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="login-password">Password</label>
              <input 
                 className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-white bg-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                 id="login-password"
                 type="password"
                 placeholder="********"
                 value={password} // Bind value to state
                 onChange={(e) => setPassword(e.target.value)} // Add onChange handler
                 required // Make password required
              />
           </div>
           {/* Display error message */}
           {error && (
               <div className="text-red-500 text-sm mb-4">
                   {error}
               </div>
           )}
           <div className="flex items-center justify-between">
              <button 
                 className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                 type="submit"
                 disabled={loading} // Disable button when loading
              >
                 {loading ? 'Signing In...' : 'Sign In'} {/* Change button text based on loading state */}
              </button>
           </div>
        </form>

        {/* Link to Registration Page */}
        <p className="text-center text-gray-400 text-sm mt-4">
            Don't have an account? <a href="/auth/register" className="text-blue-500 hover:text-blue-600">Sign Up</a>
        </p>

      </div>
    </div>
  );
}

export default LoginPage; 