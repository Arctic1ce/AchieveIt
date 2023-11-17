import React from 'react';

function Signup() {
  return (
    <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
      <div className="card" style={{ width: '400px' }}>
        <form className="card-body">
          <h3 className="text-center mb-4">Sign Up</h3>

          <div className="mb-3">
            <label className="form-label">First name</label>
            <input
              type="text"
              className="form-control"
              placeholder="First name"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Last name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Last name"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
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
