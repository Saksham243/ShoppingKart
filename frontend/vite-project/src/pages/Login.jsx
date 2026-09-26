import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosCalls/axios';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
function Login() {

  const{user , setUser} = useAuth()
  const [form, setForm] = useState({email: "", password: "" })
  const [err, setErr] = useState("")
  const [loader, setLoader] = useState(false)
  const navigate = useNavigate()


  const handleChange = (e) => {

    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    setErr('')
    setLoader(true)
    

    try {
      const response = await axiosInstance.post('/customers/login' , form)
      setUser(response.data.user)
      navigate('/home')

    } catch (error) {
        console.log(error)
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
          <p className="mt-1 text-sm text-gray-500">Sign in to your shopping account</p>
        </div>

        <form className="space-y-4" >
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* <div className="flex items-center justify-between text-sm">
            <label className="flex cursor-pointer items-center gap-2 text-gray-600">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              Remember me
            </label>
            <a href="#" className="font-medium text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div> */}

          <button
            type="submit"
            className="w-full cursor-pointer rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.99]"
            onClick={handleSubmit}
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link
            to="/signup"
            className="cursor-pointer font-medium text-blue-600 hover:underline"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
