import React from 'react';
// We might import useAuth and useNavigate later

function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Login to Your Account</h2>

        {/* Login Form */}
        <form> {/* Add onSubmit handler later */}
           <div className="mb-4">
              <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="login-email">Email</label>
              <input className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-white bg-gray-900 leading-tight focus:outline-none focus:shadow-outline" id="login-email" type="email" placeholder="email@example.com" />
           </div>
           <div className="mb-6">
              <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="login-password">Password</label>
              <input className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-white bg-gray-900 leading-tight focus:outline-none focus:shadow-outline" id="login-password" type="password" placeholder="********" />
           </div>
           <div className="flex items-center justify-between">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" type="submit">Sign In</button>
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