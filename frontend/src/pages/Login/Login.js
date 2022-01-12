import React from 'react';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Login() {
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
              <Form className="pt-3">
                <Form.Group className=" search-field">
                  <Form.Label>EMAIL</Form.Label>
                  <Form.Control type="email" placeholder="Username" size="lg" className="h-auto" />
                </Form.Group>
                <Form.Group className="search-field">
                  <Form.Label>PASSWORD</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    size="lg"
                    className="h-auto"
                  />
                </Form.Group>
                <div className="mt-3 d-flex justify-content-center">
                  <Link
                    className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                    to="/"
                  >
                    SIGN IN
                  </Link>
                </div>
                <div className=" d-flex justify-content-center align-items-center mt-4">
                  <a
                    href="!#"
                    onClick={event => event.preventDefault()}
                    className="auth-link text-muted"
                  >
                    Forgot password?
                  </a>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
