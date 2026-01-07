import { useState } from 'react'
import axios from 'axios';

function App() {

  const [formData, setformData] = useState({
    email: '',
    password: ''
  })

  const [formErrors, setFormErrors] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  }

  const handleError = () => {
    const validationErrors = {};

    if (!formData.email.trim()) {
      validationErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = 'Email is invalid';
    }

    if (!formData.password.trim()) {
      validationErrors.password = 'Password is required';
    }

    setFormErrors(validationErrors);
    return Object.keys(validationErrors).length;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorCount = handleError();
    if (errorCount !== 0) {
      return;
    }

    try {
      const req = {
        email: formData.email,
        password: formData.password
      }

      const response = await axios.post('http://localhost:8000/loginApp/login', req);
      if (response.data.status === 200) {
        alert(response.data.message);

      }
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
      <h1 style={{ textAlign: 'center', color: 'blue' }}>Login App</h1>

      <div style={{ maxWidth: '400px', padding: '30px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }}>
        <form onSubmit={handleSubmit} noValidate>
          <div style={{ marginBottom: '15px' }}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
            <span style={{ color: 'red', fontSize: '12px' }}>
              {formErrors.email}
            </span>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
            <span style={{ color: 'red', fontSize: '12px' }}>
              {formErrors.password}
            </span>
          </div>

          <div style={{ textAlign: 'center' }}>
            <button
              type="submit"
              style={{
                // width: '50%',
                padding: '10px',
                backgroundColor: 'grey',
                color: 'white',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Login
            </button>
          </div>

        </form>
      </div>

    </div>
  )
}

export default App;
