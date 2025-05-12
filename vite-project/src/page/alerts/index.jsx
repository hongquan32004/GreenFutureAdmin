import React from 'react';
import Header from '../../components/header';
import Sidebar from '../../components/sidebar';

function Alerts() {
  return (
    <>
      
      <main id="main" className="main">

        <div className="pagetitle">
          <h1>Alerts</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="index.html">Home</a></li>
              <li className="breadcrumb-item">Components</li>
              <li className="breadcrumb-item active">Alerts</li>
            </ol>
          </nav>
        </div>

        <section className="section">
          <div className="row">
            <div className="col-lg-6">

              {/* Default Alert */}
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Default</h5>
                  {["primary", "secondary", "success", "danger", "warning", "info", "light border-light", "dark"].map((type, i) => (
                    <div key={i} className={`alert alert-${type} alert-dismissible fade show`} role="alert">
                      A simple {type} alert—check it out!
                      <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                  ))}
                </div>
              </div>

              {/* With Icon */}
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">With Icon</h5>
                  {[
                    { type: "primary", icon: "star" },
                    { type: "secondary", icon: "collection" },
                    { type: "success", icon: "check-circle" },
                    { type: "danger", icon: "exclamation-octagon" },
                    { type: "warning", icon: "exclamation-triangle" },
                    { type: "info", icon: "info-circle" },
                    { type: "dark", icon: "folder" }
                  ].map(({ type, icon }, i) => (
                    <div key={i} className={`alert alert-${type} alert-dismissible fade show`} role="alert">
                      <i className={`bi bi-${icon} me-1`}></i>
                      A simple {type} alert with icon—check it out!
                      <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Outlined */}
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Outlined</h5>
                  {["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"].map((type, i) => (
                    <div key={i} className={`alert border-${type} alert-dismissible fade show`} role="alert">
                      A simple {type} outlined alert—check it out!
                      <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            <div className="col-lg-6">

              {/* Solid Color */}
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Default Solid Color</h5>
                  {[
                    "primary", "secondary", "success", "danger", "warning", "info", "light", "dark"
                  ].map((type, i) => (
                    <div key={i}
                      className={`alert alert-${type} bg-${type} ${type === "light" || type === "warning" || type === "info" ? "" : "text-light"} border-0 alert-dismissible fade show`}
                      role="alert">
                      A simple {type} alert with solid color—check it out!
                      <button type="button" className={`btn-close ${type === "light" || type === "warning" || type === "info" ? "" : "btn-close-white"}`} data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                  ))}
                </div>
              </div>

              {/* With Heading & Separator */}
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">With Heading & Separator</h5>
                  {["primary", "secondary"].map((type, i) => (
                    <div key={i} className={`alert alert-${type} alert-dismissible fade show`} role="alert">
                      <h4 className="alert-heading">{type.charAt(0).toUpperCase() + type.slice(1)} Heading</h4>
                      <p>Et suscipit deserunt earum itaque dignissimos recusandae dolorem qui. Molestiae rerum perferendis laborum. Occaecati illo at laboriosam rem molestiae sint.</p>
                      <hr />
                      <p className="mb-0">Temporibus quis et qui aspernatur laboriosam sit eveniet qui sunt.</p>
                      <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>
    </>
  );
}

export default Alerts;
