import React from 'react'

export default function Destination() {
  return (
    <section className="pt-5" id="destination">
      <div className="container">
        <div className="position-absolute start-100 bottom-0 translate-middle-x d-none d-xl-block ms-xl-n4"><img src="assets/img/dest/shape.svg" alt="destination" /></div>
        <div className="mb-7 text-center">
          <h5 className="text-secondary">Top Selling </h5>
          <h3 className="fs-xl-10 fs-lg-8 fs-7 fw-bold font-cursive text-capitalize">Top Destinations</h3>
        </div>
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card overflow-hidden shadow"> <img className="card-img-top" src="assets/img/dest/dest1.jpg" alt="Rome, Italty" />
              <div className="card-body py-4 px-3">
                <div className="d-flex flex-column flex-lg-row justify-content-between mb-3">
                  <h4 className="text-secondary fw-medium"><a className="link-900 text-decoration-none stretched-link" href="#!">Rome, Italty</a></h4><span className="fs-1 fw-medium">$5,42k</span>
                </div>
                <div className="d-flex align-items-center"> <img src="assets/img/dest/navigation.svg" style={{ marginRight: '14px' }} width="20" alt="navigation" /><span className="fs-0 fw-medium">10 Days Trip</span></div>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card overflow-hidden shadow"> <img className="card-img-top" src="assets/img/dest/dest2.jpg" alt="London, UK" />
              <div className="card-body py-4 px-3">
                <div className="d-flex flex-column flex-lg-row justify-content-between mb-3">
                  <h4 className="text-secondary fw-medium"><a className="link-900 text-decoration-none stretched-link" href="#!">London, UK</a></h4><span className="fs-1 fw-medium">$4.2k</span>
                </div>
                <div className="d-flex align-items-center"> <img src="assets/img/dest/navigation.svg" style={{ marginRight: '14px' }} width="20" alt="navigation" /><span className="fs-0 fw-medium">12 Days Trip</span></div>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card overflow-hidden shadow"> <img className="card-img-top" src="assets/img/dest/dest3.jpg" alt="Full Europe" />
              <div className="card-body py-4 px-3">
                <div className="d-flex flex-column flex-lg-row justify-content-between mb-3">
                  <h4 className="text-secondary fw-medium"><a className="link-900 text-decoration-none stretched-link" href="#!">Full Europe</a></h4><span className="fs-1 fw-medium">$15k</span>
                </div>
                <div className="d-flex align-items-center"> <img src="assets/img/dest/navigation.svg" style={{ marginRight: '14px' }} width="20" alt="navigation" /><span className="fs-0 fw-medium">28 Days Trip</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
