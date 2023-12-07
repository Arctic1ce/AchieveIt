import React, { useState } from 'react';
import { Card, CardBody, Input, Button } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

function Signup(props) {
  const navigate = useNavigate();
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

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
    setFormErrors({
      ...formErrors,
      [name]: value ? '' : `Please enter your ${name.toLowerCase()}`,
    });
  };

  const isFormValid = () => {
    return (
      formData.firstName.trim() !== '' &&
      formData.lastName.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.password.trim() !== ''
    );
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

      props.handleSubmit(formData)
      .then((data) => {
        console.log("DATA: " + data);
        if (data) {
          console.log("SUCCESS REROUTE TO /");
          navigate('/');
        }
      });
    }
  };

  const backgroundImage = "url('signup.jpg')";

  return (
    <div
      className="h-full flex items-center justify-center"
      style={{
        backgroundImage,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
      <Card className="p-8 bg-primary-50/90">
        <CardBody className="flex flex-row border p-10 border-secondary">
          <form onSubmit={handleSubmit}>
            <div className="mt-2">
              <span className="h1 fw-bold mb-0 font-bold text-3xl">
                Register
              </span>
            </div>
            <p
              className="flex my-1 pb-3 font-semibold text-medium"
              style={{ letterSpacing: '1px' }}>
              Create a new account
            </p>
            <div className="flex flex-row space-x-2">
              <div className="">
                <Input
                  radius="full"
                  autoFocus
                  type="text"
                  label="First Name"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange('firstName', e.target.value)
                  }
                  isInvalid={!!formErrors.firstName}
                  errorMessage={formErrors.firstName}
                  isRequired
                />
              </div>

              <div className="">
                <Input
                  radius="full"
                  type="text"
                  label="Last Name"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={(e) =>
                    handleInputChange('lastName', e.target.value)
                  }
                  isInvalid={!!formErrors.lastName}
                  errorMessage={formErrors.lastName}
                  isRequired
                />
              </div>
            </div>

            <div className="pt-2 mt-3">
              <Input
                radius="full"
                type="email"
                label="Email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                isInvalid={!!formErrors.email}
                errorMessage={formErrors.email}
                isRequired
              />
            </div>

            <div className="py-2 mt-3">
              <Input
                radius="full"
                type="password"
                label="Password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                isInvalid={!!formErrors.password}
                errorMessage={formErrors.password}
                isRequired
              />
            </div>

            <div className="flex justify-end mt-3">
              <Button
                className="mb-4 px-5 bg-primary-800"
                color="primary"
                size="lg"
                isDisabled={!isFormValid()}
                type="submit"
                onClick={handleSubmit}>
                Sign Up
              </Button>
            </div>

            <p className="forgot-password text-center mt-3">
              Already registered?{' '}
              <a href="/Login" color="primary">
                Sign in
              </a>
            </p>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

export default Signup;
