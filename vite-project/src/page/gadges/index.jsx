import React from 'react';
import { 
  BiStar,                // Giữ nguyên - icon ngôi sao ★
  BiCollection,          // Giữ nguyên - icon bộ sưu tập
  BiCheckCircle,         // Giữ nguyên - icon check trong vòng tròn ✓
  BiErrorAlt,            // Giữ nguyên - icon cảnh báo tam giác ⚠ (thay cho BiExclamationOctagon)
  BiError,               // Thêm icon cảnh báo khác ▲          // Icon bát giác có dấu X (nếu cần hình bát giác)
  BiInfoCircle,          // Giữ nguyên - icon thông tin (i)
  BiFolder               // Giữ nguyên - icon thư mục
} from 'react-icons/bi';

const BadgesComponent = () => {
  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>Badges</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="index.html">Home</a></li>
            <li className="breadcrumb-item">Components</li>
            <li className="breadcrumb-item active">Badges</li>
          </ol>
        </nav>
      </div>

      <section className="section">
        <div className="row">
          <div className="col-lg-6">
            {/* Default Badges */}
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Default Badges</h5>
                <span className="badge bg-primary">Primary</span>
                <span className="badge bg-secondary">Secondary</span>
                <span className="badge bg-success">Success</span>
                <span className="badge bg-danger">Danger</span>
                <span className="badge bg-warning text-dark">Warning</span>
                <span className="badge bg-info text-dark">Info</span>
                <span className="badge bg-light text-dark">Light</span>
                <span className="badge bg-dark">Dark</span>
              </div>
            </div>

            {/* Pill Badges */}
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Pill Badges</h5>
                <span className="badge rounded-pill bg-primary">Primary</span>
                <span className="badge rounded-pill bg-secondary">Secondary</span>
                <span className="badge rounded-pill bg-success">Success</span>
                <span className="badge rounded-pill bg-danger">Danger</span>
                <span className="badge rounded-pill bg-warning text-dark">Warning</span>
                <span className="badge rounded-pill bg-info text-dark">Info</span>
                <span className="badge rounded-pill bg-light text-dark">Light</span>
                <span className="badge rounded-pill bg-dark">Dark</span>
              </div>
            </div>

            {/* Icon Badges */}
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Icon Badges</h5>
                <span className="badge bg-primary"><BiStar className="me-1" /> Primary</span>
                <span className="badge bg-secondary"><BiCollection className="me-1" /> Secondary</span>
                <span className="badge bg-success"><BiCheckCircle className="me-1" /> Success</span>
                <span className="badge bg-danger"><BiErrorAlt className="me-1" /> Danger</span>
                <span className="badge bg-warning text-dark"><BiError className="me-1" /> Warning</span>
                <span className="badge bg-info text-dark"><BiInfoCircle className="me-1" /> Info</span>
                <span className="badge bg-light text-dark"><BiStar className="me-1" /> Light</span>
                <span className="badge bg-dark"><BiFolder className="me-1" /> Dark</span>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            {/* Border Badges */}
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Border Badges</h5>
                <span className="badge border-primary border-1 text-primary">Primary</span>
                <span className="badge border-secondary border-1 text-secondary">Secondary</span>
                <span className="badge border-success border-1 text-success">Success</span>
                <span className="badge border-danger border-1 text-danger">Danger</span>
                <span className="badge border-warning border-1 text-warning">Warning</span>
                <span className="badge border-info border-1 text-info">Info</span>
                <span className="badge border-light border-1 text-black-50">Light</span>
                <span className="badge border-dark border-1 text-dark">Dark</span>
              </div>
            </div>

            {/* Button Badges */}
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Button Badges</h5>
                <button type="button" className="btn btn-primary mb-2">
                  Primary <span className="badge bg-white text-primary">4</span>
                </button>
                <button type="button" className="btn btn-secondary mb-2">
                  Secondary <span className="badge bg-white text-secondary">4</span>
                </button>
                <button type="button" className="btn btn-success mb-2">
                  Success <span className="badge bg-white text-success">4</span>
                </button>
                <button type="button" className="btn btn-danger mb-2">
                  Danger <span className="badge bg-white text-danger">4</span>
                </button>
                <button type="button" className="btn btn-warning mb-2">
                  Warning <span className="badge bg-white text-warning">4</span>
                </button>
                <button type="button" className="btn btn-info mb-2">
                  Info <span className="badge bg-white text-info">4</span>
                </button>
                <button type="button" className="btn btn-light mb-2">
                  Light <span className="badge bg-secondary text-light">4</span>
                </button>
                <button type="button" className="btn btn-dark mb-2">
                  Dark <span className="badge bg-white text-dark">4</span>
                </button>
              </div>
            </div>

            {/* Heading Badges */}
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Heading Badges</h5>
                <h1>Example h1 heading <span className="badge bg-primary">Primary</span></h1>
                <h2>Example h2 heading <span className="badge bg-secondary">Secondary</span></h2>
                <h3>Example h3 heading <span className="badge bg-success">Success</span></h3>
                <h4>Example h4 heading <span className="badge bg-danger">Danger</span></h4>
                <h5>Example h5 heading <span className="badge bg-warning">Warning</span></h5>
                <h6>Example h6 heading <span className="badge bg-info">Info</span></h6>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default BadgesComponent;