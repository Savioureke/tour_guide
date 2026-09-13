import React from 'react'

export default function NavbarJadoo() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top py-5 d-block" data-navbar-on-scroll="data-navbar-on-scroll">
      <div className="container"><a className="navbar-brand" href="index.html"><img src="assets/img/logo.svg" height="34" alt="logo" /></a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"> </span></button>
        <div className="collapse navbar-collapse border-top border-lg-0 mt-4 mt-lg-0" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto pt-2 pt-lg-0 font-base align-items-lg-center align-items-start">
            <li className="nav-item px-3 px-xl-4"><a className="nav-link fw-medium" aria-current="page" href="#service">Service</a></li>
            <li className="nav-item px-3 px-xl-4"><a className="nav-link fw-medium" aria-current="page" href="#destination">Destination</a></li>
            <li className="nav-item px-3 px-xl-4"><a className="nav-link fw-medium" aria-current="page" href="#booking">Booking</a></li>
            <li className="nav-item px-3 px-xl-4"><a className="nav-link fw-medium" aria-current="page" href="#testimonial">Testimonial</a></li>
            <li className="nav-item px-3 px-xl-4"><a className="nav-link fw-medium" aria-current="page" href="#!">Login</a></li>
            <li className="nav-item px-3 px-xl-4"><a className="btn btn-outline-dark order-1 order-lg-0 fw-medium" href="#!">Sign Up</a></li>
            <li className="nav-item dropdown px-3 px-lg-0"> <a className="d-inline-block ps-0 py-2 pe-3 text-decoration-none dropdown-toggle fw-medium" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">EN</a>
              <ul className="dropdown-menu dropdown-menu-end border-0 shadow-lg" style={{ borderRadius: '0.3rem' }} aria-labelledby="navbarDropdown">
                <li><a className="dropdown-item" href="#!">EN</a></li>
                <li><a className="dropdown-item" href="#!">BN</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
