import React from "react";
import "../../index.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/auth";
import { message } from "antd";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const onFinish = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ username, password });
      if (response) {
        console.log("Đăng nhập thành công");
        message.success("Đăng nhập thành công");
        navigate("/");
      } else {
        console.log("Đăng nhập thất bại");
        message.error("Đăng nhập thất bại!!!");
      }
    } catch (error) {
      console.error(error);
      message.error("Đăng nhập thất bại!!!");
    }
  };
  return (
    <div className="container">
      <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
              <div className="d-flex justify-content-center py-4">
                <a
                  href="index.html"
                  className="logo d-flex align-items-center w-auto"
                >
                  {/* <img src="/public/img/logo.png" alt="" /> */}
                  <span className="d-none d-lg-block">GreenFuture</span>
                </a>
              </div>

              <div className="card mb-3">
                <div className="card-body">
                  <div className="pt-4 pb-2">
                    <h5 className="card-title text-center pb-0 fs-4">
                      Login to Your Account
                    </h5>
                    <p className="text-center small">
                      Enter your username & password to login
                    </p>
                  </div>

                  <form className="row g-3 needs-validation" noValidate>
                    <div className="col-12">
                      <label htmlFor="yourUsername" className="form-label">
                        Username
                      </label>
                      <div className="input-group has-validation">
                        <span
                          className="input-group-text"
                          id="inputGroupPrepend"
                        >
                          @
                        </span>
                        <input
                          type="text"
                          name="username"
                          className="form-control"
                          id="yourUsername"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                        <div className="invalid-feedback">
                          Please enter your username.
                        </div>
                      </div>
                    </div>

                    <div className="col-12">
                      <label htmlFor="yourPassword" className="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        id="yourPassword"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <div className="invalid-feedback">
                        Please enter your password!
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="remember"
                          value="true"
                          id="rememberMe"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="rememberMe"
                        >
                          Remember me
                        </label>
                      </div>
                    </div>
                    <div className="col-12">
                      <button
                        className="btn btn-primary w-100"
                        type="submit"
                        onClick={onFinish}
                      >
                        Login
                      </button>
                    </div>
                    <div className="col-12">
                      <p className="small mb-0">
                        Don't have account?{" "}
                        <a href="pages-register.html">Create an account</a>
                      </p>
                    </div>
                  </form>
                </div>
              </div>

              {/* <div className="credits">
                <!-- All the links in the footer should remain intact. -->
                <!-- You can delete the links only if you purchased the pro version. -->
                <!-- Licensing information: https://bootstrapmade.com/license/ -->
                <!-- Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/nice-admin-bootstrap-admin-html-template/ -->
                Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
