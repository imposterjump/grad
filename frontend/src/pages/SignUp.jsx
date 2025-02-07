import { Link } from "react-router-dom";
const SignUp = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card w-50 p-3">
        <div className="card-body">
          <h1 className="card-title text-center pb-5">Sign Up</h1>
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

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="exampleInputAge" className="form-label">
                  Age
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="exampleInputAge"
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="exampleInputGender" className="form-label">
                  Gender
                </label>
                <select className="form-control" id="exampleInputGender">
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputPhone" className="form-label">
                Phone Number (Egypt)
              </label>
              <input
                type="tel"
                className="form-control"
                id="exampleInputPhone"
                pattern="01[0-9]{9}"
                placeholder="e.g. 01012345678"
              />
            </div>

            <p className="text-end">
              <Link className="link-opacity-100" to="/sign_in">
                Already have an account?
              </Link>
            </p>

            <button type="submit" className="btn btn-primary w-100">
              Create account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
