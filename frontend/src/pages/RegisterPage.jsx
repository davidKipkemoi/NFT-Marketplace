import React, { useState } from 'react'; // Import useState
import axios from 'axios'; // Import axios
// We might import useAuth and useNavigate later

// Set default base URL for axios to point to the backend
// Use the environment variable VITE_BACKEND_URL
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'; // Default to 5000 if not set

function RegisterPage() {
  const [email, setEmail] = useState(''); // State for email input
  const [password, setPassword] = useState(''); // State for password input
  const [error, setError] = useState(null); // State for errors
  const [loading, setLoading] = useState(false); // State for loading
  // const navigate = useNavigate(); // Uncomment if using react-router-dom for navigation

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent default form submission

    setError(null); // Clear previous errors
    setLoading(true); // Set loading state

    try {
      // Make API call to backend register endpoint
      const response = await axios.post('/api/auth/register', {
        email,
        password,
      });

      // Assuming backend returns success status (e.g., 201)
      if (response.status === 201) {
        console.log('Registration successful!', response.data);
        // TODO: Redirect user to login page or dashboard
        // navigate('/auth/login'); // Example using navigate
        alert('Registration successful! Please log in.'); // Simple alert for now
      } else {
         // Handle unexpected response statuses
         setError(response.data.message || 'Registration failed with an unexpected status.');
         console.error('Registration failed:', response.data);
      }

    } catch (err) {
      console.error('Registration error:', err);
      // Handle errors from the API call (e.g., network issues, backend errors)
      // Check if the error is an Axios error and has a response from the backend
      if (err.response && err.response.data) {
          setError(err.response.data.message || 'An error occurred during registration.');
      } else {
          setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false); // Unset loading state
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Create New Account</h2>

        {/* Register Form */}
        <form onSubmit={handleRegister}> {/* Add onSubmit handler */}
           <div className="mb-4">
              <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="register-email">Email</label>
              <input 
                 className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-white bg-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                 id="register-email"
                 type="email"
                 placeholder="email@example.com"
                 value={email} // Bind value to state
                 onChange={(e) => setEmail(e.target.value)} // Add onChange handler
                 required // Make email required
              />
           </div>
           <div className="mb-6">
              <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="register-password">Password</label>
              <input 
                 className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-white bg-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                 id="register-password"
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
                 className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                 type="submit"
                 disabled={loading} // Disable button when loading
              >
                 {loading ? 'Signing Up...' : 'Sign Up'} {/* Change button text based on loading state */}
              </button>
           </div>
        </form>

         {/* Link to Login Page */}
         <p className="text-center text-gray-400 text-sm mt-4">
             Already have an account? <a href="/auth/login" className="text-blue-500 hover:text-blue-600">Sign In</a>
         </p>

      </div>
    </div>
  );
}

export default RegisterPage;