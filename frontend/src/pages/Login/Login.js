import React, { useState } from 'react';
import { Alert, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import { useForm } from 'react-hook-form';

import { adminLogin } from '../../store/actions/authActions';

export default function Login() {
  const {
    register,
    handleSubmit,
    // formState: { errors },
    // setError,
  } = useForm();

  // to handle redux
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let location = useLocation();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  // const [success, setSuccess] = useState('');

  // to handle redirect location
  let from = location.state?.from?.pathname || '/';

  const onSubmit = dataBody => {
    setLoading(true);
    dispatch(adminLogin(dataBody))
      .then(data => {
        // setSuccess(data);
        setError('');
        setLoading(false);
        navigate(from, { replace: true });
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  };

  console.log(error);

  const ShowErrors = () => {
    if (Array.isArray(error.errors)) {
      return (
        <>
          {error.errors.map((item, index) => (
            <p key={index}>{item.msg}</p>
          ))}
        </>
      );
    } else {
      return <>{error.msg}</>;
    }
  };

  return (
    <div>
      <div className="d-flex align-items-center auth px-0 mt-5">
        <div className="row w-100 mx-0">
          <div className="col-lg-4 mx-auto">
            <div className="card text-left py-5 px-4 px-sm-5">
              <h4 className="d-flex justify-content-center">Dashboard Retail</h4>
              <h6 className="font-weight-light d-flex justify-content-center">
                Enter your email and password below.
              </h6>
              <div className="pt-3">
                {error && (
                  <Alert variant="danger">
                    <ShowErrors />
                  </Alert>
                )}

                {/* {success && (
                  <Alert variant="success">
                    <pre>{JSON.stringify(success, null, ' ')}</pre>
                  </Alert>
                )} */}

                <Form onSubmit={handleSubmit(onSubmit)} className={loading && 'loading'}>
                  <fieldset disabled={loading}>
                    <Form.Group className=" search-field pb-3">
                      <Form.Label>EMAIL</Form.Label>
                      <Form.Control
                        type="email"
                        {...register('email', { required: true })}
                        placeholder="email"
                        size="lg"
                        className="h-auto"
                      />
                    </Form.Group>
                    <Form.Group className="search-field">
                      <Form.Label>PASSWORD</Form.Label>
                      <Form.Control
                        type="password"
                        {...register('password', { required: true, minLength: 6 })}
                        placeholder="Password"
                        size="lg"
                        className="h-auto"
                      />
                    </Form.Group>
                    <div className="mt-3 d-flex justify-content-center">
                      <button
                        type="submit"
                        className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                        disabled={loading}
                      >
                        SIGN IN
                      </button>
                    </div>
                  </fieldset>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
