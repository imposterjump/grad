import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card w-50 p-3">
        <div className="card-body">
          <h1 className="card-title text-center pb-5">Sign In</h1>
          <form>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div class="d-flex justify-content-between">
              <p>
                <Link class="link-opacity-100" to="/forget_password">
                  Forget Password
                </Link>
              </p>
              <p>
                <Link class="link-opacity-100" to="/sign_up">
                  Create an account
                </Link>
              </p>
            </div>
            <Link type="submit" className="btn btn-primary w-100" to="/home">
              Sign In
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
