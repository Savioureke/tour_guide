import React from 'react'

export default function Footer() {
  return (
    <>
      <section className="pb-0 pb-lg-4">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-7 col-12 mb-4 mb-md-6 mb-lg-0 order-0"> <img className="mb-4" src="assets/img/logo2.svg" width="150" alt="jadoo" />
              <p className="fs--1 text-secondary mb-0 fw-medium">Book your trip in minute, get full Control for much longer.</p>
            </div>
            <div className="col-lg-2 col-md-4 mb-4 mb-lg-0 order-lg-1 order-md-2">
              <h4 className="footer-heading-color fw-bold font-sans-serif mb-3 mb-lg-4">Company</h4>
              <ul className="list-unstyled mb-0">
                <li className="mb-2"><a className="link-900 fs-1 fw-medium text-decoration-none" href="#!">About</a></li>
                <li className="mb-2"><a className="link-900 fs-1 fw-medium text-decoration-none" href="#!">Careers</a></li>
                <li className="mb-2"><a className="link-900 fs-1 fw-medium text-decoration-none" href="#!">Mobile</a></li>
              </ul>
            </div>
            <div className="col-lg-2 col-md-4 mb-4 mb-lg-0 order-lg-2 order-md-3">
              <h4 className="footer-heading-color fw-bold font-sans-serif mb-3 mb-lg-4">Contact</h4>
              <ul className="list-unstyled mb-0">
                <li className="mb-2"><a className="link-900 fs-1 fw-medium text-decoration-none" href="#!">Help/FAQ</a></li>
                <li className="mb-2"><a className="link-900 fs-1 fw-medium text-decoration-none" href="#!">Press</a></li>
                <li className="mb-2"><a className="link-900 fs-1 fw-medium text-decoration-none" href="#!">Affiliate</a></li>
              </ul>
            </div>
            <div className="col-lg-2 col-md-4 mb-4 mb-lg-0 order-lg-3 order-md-4">
              <h4 className="footer-heading-color fw-bold font-sans-serif mb-3 mb-lg-4">More</h4>
              <ul className="list-unstyled mb-0">
                <li className="mb-2"><a className="link-900 fs-1 fw-medium text-decoration-none" href="#!">Airlinefees</a></li>
                <li className="mb-2"><a className="link-900 fs-1 fw-medium text-decoration-none" href="#!">Airline</a></li>
                <li className="mb-2"><a className="link-900 fs-1 fw-medium text-decoration-none" href="#!">Low fare tips</a></li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-5 col-12 mb-4 mb-md-6 mb-lg-0 order-lg-4 order-md-1">
              <div className="icon-group mb-4"> <a className="text-decoration-none icon-item shadow-social" id="facebook" href="#!"><i className="fab fa-facebook-f"> </i></a><a className="text-decoration-none icon-item shadow-social" id="instagram" href="#!"><i className="fab fa-instagram"> </i></a><a className="text-decoration-none icon-item shadow-social" id="twitter" href="#!"><i className="fab fa-twitter"> </i></a></div>
              <h4 className="fw-medium font-sans-serif text-secondary mb-3">Discover our app</h4>
              <div className="d-flex align-items-center"> <a href="#!"> <img className="me-2" src="assets/img/play-store.png" alt="play store" /></a><a href="#!"> <img src="assets/img/apple-store.png" alt="apple store" /></a></div>
            </div>
          </div>
        </div>
      </section>
      <div className="py-5 text-center">
        <p className="mb-0 text-secondary fs--1 fw-medium">All rights reserved@jadoo.co </p>
      </div>
    </>
  )
}
