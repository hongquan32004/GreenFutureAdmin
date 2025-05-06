import React from "react";

const FormLayouts = () => {
  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>Form Layouts</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/">Home</a></li>
            <li className="breadcrumb-item">Forms</li>
            <li className="breadcrumb-item active">Layouts</li>
          </ol>
        </nav>
      </div>

      <section className="section">
        <div className="row">
          <div className="col-lg-6">

            

            {/* Multi Columns Form */}
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Multi Columns Form</h5>
                <form className="row g-3">
                  <div className="col-md-12">
                    <label className="form-label">Your Name</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Address</label>
                    <input type="text" className="form-control" placeholder="1234 Main St" />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Address 2</label>
                    <input type="text" className="form-control" placeholder="Apartment, studio, or floor" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">City</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">State</label>
                    <select className="form-select">
                      <option defaultValue>Choose...</option>
                      <option>...</option>
                    </select>
                  </div>
                  <div className="col-md-2">
                    <label className="form-label">Zip</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-12">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" />
                      <label className="form-check-label">Check me out</label>
                    </div>
                  </div>
                  <div className="text-center button-spacing">
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <button type="reset" className="btn btn-secondary">Reset</button>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
};

export default FormLayouts;
