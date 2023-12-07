import React, { useState } from 'react';
import { Card, CardBody, Input, Button } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

function Login(props) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
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

  const backgroundImage = "url('login.jpg')";

  return (
    <div
      className="h-full flex items-center justify-center "
      style={{
        backgroundImage,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
      <Card className="flex p-2 bg-primary-50/90">
        <CardBody className="flex flex-row ">
          <div className="flex items-center justify-center">
            <div className="flex flex-col p-10 border border-secondary ">
              <div className="mt-2">
                <span className="h1 fw-bold mb-0 font-bold text-3xl">
                  Sign In
                </span>
              </div>
              <p
                className="flex my-1 pb-3 font-semibold text-medium"
                style={{ letterSpacing: '1px' }}>
                Sign into your account
              </p>
              <div className="">
                <form onSubmit={handleSubmit}>
                  <Input
                    className="mb-3"
                    label="Email address"
                    placeholder="achieveit@gmail.com"
                    id="formControlLg"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    isRequired
                  />
                  <Input
                    className="mb-3"
                    label="Password"
                    id="formControlLg"
                    type="password"
                    placeholder="password"
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange('password', e.target.value)
                    }
                    isRequired
                  />
                  <div className="flex justify-end">
                    <Button
                      className="mb-4 px-5 bg-primary-800"
                      color="primary"
                      size="lg"
                      isDisabled={!isFormValid()}
                      type="submit"
                      onClick={handleSubmit}>
                      Login
                    </Button>
                  </div>
                </form>
              </div>
              <p className="mb-5 text-secondary">
                Don't have an account?
                <a href="/Signup" style={{ color: '#393f81' }}>
                  Register here
                </a>
              </p>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default Login;
