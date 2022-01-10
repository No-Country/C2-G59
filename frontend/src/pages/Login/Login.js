import React from 'react';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    // <div>
    //   <Form>
    //     <Form.Group>
    //       <Form.Label>Log In to Dashboard Kit</Form.Label>
    //     </Form.Group>
    //     <Form.Label>Enter your email and password below</Form.Label>
    //     <Form.Group className="mb-3" controlId="formBasicEmail">
    //       <Form.Label>EMAIL</Form.Label>
    //       <Form.Control type="email" placeholder="Enter email" />
    //     </Form.Group>

    //     <Form.Group className="mb-3" controlId="formBasicPassword">
    //       <Form.Label>PASSWORD</Form.Label>
    //       <Form.Control type="password" placeholder="Password" />
    //     </Form.Group>        
    //     <Button variant="secondary" type="submit">
    //       <Link to="/">Log In</Link>
    //     </Button>
    //   </Form>
    // </div>
    <div>
    <div className="d-flex align-items-center auth px-0">
      <div className="row w-100 mx-0">
        <div className="col-lg-4 mx-auto">
          <div className="card text-left py-5 px-4 px-sm-5">
            <h4>Dashboard Retail</h4>
            <h6 className="font-weight-light">Enter your email and password below.</h6>
            <Form className="pt-3">
              <Form.Group className=" search-field">
              <Form.Label>EMAIL</Form.Label>
                <Form.Control type="email" placeholder="Username" size="lg" className="h-auto" />
              </Form.Group>
              <Form.Group className="search-field">
              <Form.Label>PASSWORD</Form.Label>
                <Form.Control type="password" placeholder="Password" size="lg" className="h-auto" />
              </Form.Group>
              <div className="mt-3 d-flex justify-content-center">
                <Link className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" to="/">SIGN IN</Link>
              </div>
              <div className=" d-flex justify-content-center align-items-center mt-4">
                {/* <div className="form-check">
                  <label className="form-check-label text-muted">
                    <input type="checkbox" className="form-check-input"/>
                    <i className="input-helper"></i>
                    Keep me signed in
                  </label>
                </div> */}
                <a href="!#" onClick={event => event.preventDefault()} className="auth-link text-muted">Forgot password?</a>
              </div>
              {/* <div className="mb-2">
                <button type="button" className="btn btn-block btn-facebook auth-form-btn">
                  <i className="mdi mdi-facebook mr-2"></i>Connect using facebook
                </button>
              </div>
              <div className="text-center mt-4 font-weight-light">
                Don't have an account? <Link to="/user-pages/register" className="text-primary">Create</Link>
              </div> */}
            </Form>
          </div>
        </div>
      </div>
    </div>  
  </div>
  );
}
