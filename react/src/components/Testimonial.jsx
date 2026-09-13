import React from 'react'

export default function Testimonial() {
  return (
    <section id="testimonial">
      <div className="container">
        <div className="row">
          <div className="col-lg-5">
            <div className="mb-8 text-start">
              <h5 className="text-secondary">Testimonials </h5>
              <h3 className="fs-xl-10 fs-lg-8 fs-7 fw-bold font-cursive text-capitalize">What people say about Us.</h3>
            </div>
          </div>
          <div className="col-lg-1"></div>
          <div className="col-lg-6">
            <div className="pe-7 ps-5 ps-lg-0">
              <div className="carousel slide carousel-fade position-static" id="testimonialIndicator" data-bs-ride="carousel">
                <div className="carousel-indicators">
                  <button className="active" type="button" data-bs-target="#testimonialIndicator" data-bs-slide-to="0" aria-current="true" aria-label="Testimonial 0"></button>
                  <button className="false" type="button" data-bs-target="#testimonialIndicator" data-bs-slide-to="1" aria-current="true" aria-label="Testimonial 1"></button>
                  <button className="false" type="button" data-bs-target="#testimonialIndicator" data-bs-slide-to="2" aria-current="true" aria-label="Testimonial 2"></button>
                </div>
                <div className="carousel-inner">
                  <div className="carousel-item position-relative active">
                    <div className="card shadow" style={{ borderRadius: '10px' }}>
                      <div className="position-absolute start-0 top-0 translate-middle"> <img className="rounded-circle fit-cover" src="assets/img/testimonial/author.png" height="65" width="65" alt="" /></div>
                      <div className="card-body p-4">
                        <p className="fw-medium mb-4">"On the Windows talking painted pasture yet its express parties use. Sure last upon he same as knew next. Of believed or diverted no."</p>
                        <h5 className="text-secondary">Mike taylor</h5>
                        <p className="fw-medium fs--1 mb-0">Lahore, Pakistan</p>
                      </div>
                    </div>
                    <div className="card shadow-sm position-absolute top-0 z-index--1 mb-3 w-100 h-100" style={{ borderRadius: '10px', transform: 'translate(25px, 25px)' }}> </div>
                  </div>
                  <div className="carousel-item position-relative ">
                    <div className="card shadow" style={{ borderRadius: '10px' }}>
                      <div className="position-absolute start-0 top-0 translate-middle"> <img className="rounded-circle fit-cover" src="assets/img/testimonial/author2.png" height="65" width="65" alt="" /></div>
                      <div className="card-body p-4">
                        <p className="fw-medium mb-4">"Jadoo is recognized as one of the finest travel agency in the world. When it came to planning a trip, I found them to be dependable."</p>
                        <h5 className="text-secondary">Thomas Wagon</h5>
                        <p className="fw-medium fs--1 mb-0">CEO of Red Button</p>
                      </div>
                    </div>
                    <div className="card shadow-sm position-absolute top-0 z-index--1 mb-3 w-100 h-100" style={{ borderRadius: '10px', transform: 'translate(25px, 25px)' }}> </div>
                  </div>
                  <div className="carousel-item position-relative ">
                    <div className="card shadow" style={{ borderRadius: '10px' }}>
                      <div className="position-absolute start-0 top-0 translate-middle"> <img className="rounded-circle fit-cover" src="assets/img/testimonial/author3.png" height="65" width="65" alt="" /></div>
                      <div className="card-body p-4">
                        <p className="fw-medium mb-4">"On the Windows talking painted pasture yet its express parties use. Sure last upon he same as knew next. Of believed or diverted no."</p>
                        <h5 className="text-secondary">Kelly Willium</h5>
                        <p className="fw-medium fs--1 mb-0">Khulna, Bangladesh</p>
                      </div>
                    </div>
                    <div className="card shadow-sm position-absolute top-0 z-index--1 mb-3 w-100 h-100" style={{ borderRadius: '10px', transform: 'translate(25px, 25px)' }}> </div>
                  </div>
                </div>
                <div className="carousel-navigation d-flex flex-column flex-between-center position-absolute end-0 top-lg-50 bottom-0 translate-middle-y z-index-1 me-3 me-lg-0" style={{ height: '60px', width: '20px' }}>
                  <button className="carousel-control-prev position-static" type="button" data-bs-target="#testimonialIndicator" data-bs-slide="prev"><img src="assets/img/icons/up.svg" width="16" alt="icon" /></button>
                  <button className="carousel-control-next position-static" type="button" data-bs-target="#testimonialIndicator" data-bs-slide="next"><img src="assets/img/icons/down.svg" width="16" alt="icon" /></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
