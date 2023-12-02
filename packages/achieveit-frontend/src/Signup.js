import React, { useState } from 'react';

function Signup(props) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setFormErrors({
      ...formErrors,
      [name]: value ? '' : `Please enter your ${name.toLowerCase()}`,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for empty fields
    const errors = {};
    for (const key in formData) {
      if (!formData[key]) {
        errors[key] = `Please enter your ${key.toLowerCase()}`;
      }
    }

    // Update formErrors state
    setFormErrors(errors);

    // If there are no errors, proceed with form submission
    if (Object.keys(errors).length === 0) {
      // Perform form submission logic here
      console.log('Form submitted:', formData);
      props.handleSubmit(formData);
    }

  };

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
      <div className="card" style={{ width: '400px' }}>
        <form className="card-body">
          <h3 className="text-center mb-4">Sign Up</h3>

          <div className="mb-3">
            <label className="form-label">First name</label>
            <input
              type="text"
              className={`form-control ${formErrors.firstName ? 'is-invalid' : ''}`}
              placeholder="First name"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
            {formErrors.firstName && <div className="invalid-feedback">{formErrors.firstName}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Last name</label>
            <input
              type="text"
              className={`form-control ${formErrors.lastName ? 'is-invalid' : ''}`}
              placeholder="Last name"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
            {formErrors.lastName && <div className="invalid-feedback">{formErrors.lastName}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className={`form-control ${formErrors.password ? 'is-invalid' : ''}`}
              placeholder="Enter password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            {formErrors.password && <div className="invalid-feedback">{formErrors.password}</div>}
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary" onClick={handleSubmit} >
              Sign Up
            </button>
          </div>

          <p className="forgot-password text-center mt-3">
            Already registered? <a href="/Login">Sign in</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;