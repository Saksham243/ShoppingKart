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
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* Left brand panel */}
      <div className="hidden flex-col justify-between bg-primary px-12 py-14 text-white lg:flex">
        <Link to="/" className="font-display text-2xl">ShopKart</Link>
        <p className="font-display text-3xl font-medium leading-snug">
          Everything you're looking for, in one stall.
        </p>
        <span className="text-xs text-white/60">© {new Date().getFullYear()} ShopKart</span>
      </div>

      {/* Right form panel */}
      <div className="flex items-center justify-center bg-canvas px-6 py-16">
        <div className="w-full max-w-sm">
          <h2 className="font-display text-3xl font-medium text-ink">Sign in</h2>
          <p className="mt-2 text-sm text-ink-soft">Pick up right where you left off.</p>

          <form className="mt-8 space-y-5">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-md border border-line bg-surface px-3.5 py-2.5 text-sm text-ink outline-none transition focus:border-primary focus:ring-2 focus:ring-primary-soft"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-ink">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                className="w-full rounded-md border border-line bg-surface px-3.5 py-2.5 text-sm text-ink outline-none transition focus:border-primary focus:ring-2 focus:ring-primary-soft"
              />
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark active:scale-[0.99]"
              onClick={handleSubmit}
            >
              Sign in
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-ink-soft">
            Don't have an account?{' '}
            <Link to="/signup" className="cursor-pointer font-semibold text-primary hover:text-primary-dark">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;