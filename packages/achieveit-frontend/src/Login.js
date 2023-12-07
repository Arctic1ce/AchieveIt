import React, { useState } from 'react';
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBCardImage, MDBRow, MDBCol, MDBIcon, MDBInput
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

function Login(props) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
       [name]: value,
    }));
  };

  const isFormValid = () => {
    return formData.email.trim() !== '' && formData.password.trim() !== '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      // Handle form validation error
      return;
    }

    props.handleSubmit(formData)
      .then((data) => {
        console.log("DATA: " + data);
        if (data) {
          console.log("SUCCESS REROUTE TO /");
          navigate('/');
        }
      });
  };

  return (
    <MDBContainer className="my-5">
      <MDBCard>
        <MDBRow className='g-0'>
          <MDBCol md='4'>
            <div className='d-flex align-items-center justify-content-center h-100'>
              <MDBCardImage
                src='logo.jpg'
                alt='your-alt-text'
                className='rounded-t-5 rounded-tr-lg-0'
                fluid
                style={{ maxWidth: '75%', maxHeight: '80%' }}
              />
            </div>
          </MDBCol>
          <MDBCol md='6'>
            <MDBCardBody className='d-flex flex-column'>
              <div className='d-flex flex-row mt-2'>
                <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }} />
                <span className="h1 fw-bold mb-0">AchieveIt</span>
              </div>
              <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>Sign into your account</h5>
              <form onSubmit={handleSubmit}>
                <MDBInput
                  wrapperClass='mb-4'
                  label='Email address'
                  id='formControlLg'
                  type='email'
                  size="lg"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <MDBInput
                  wrapperClass='mb-4'
                  label='Password'
                  id='formControlLg'
                  type='password'
                  size="lg"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <MDBBtn
                  className="mb-4 px-5"
                  color='dark'
                  size='lg'
                  disabled={!isFormValid()}
                  type="submit"
                >
                  Login
                </MDBBtn>
              </form>
              <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>Don't have an account? <a href="/Signup" style={{ color: '#393f81' }}>Register here</a></p>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
}

export default Login;
