import React from 'react'

export default function Booking() {
  return (
    <section id="booking">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="mb-4 text-start">
              <h5 className="text-secondary">Easy and Fast </h5>
              <h3 className="fs-xl-10 fs-lg-8 fs-7 fw-bold font-cursive text-capitalize">Book your next trip in 3 easy steps</h3>
            </div>
            <div className="d-flex align-items-start mb-5">
              <div className="bg-primary me-sm-4 me-3 p-3" style={{ borderRadius: '13px' }}> <img src="assets/img/steps/selection.svg" width="22" alt="steps" /></div>
              <div className="flex-1">
                <h5 className="text-secondary fw-bold fs-0">Choose Destination</h5>
                <p>Choose your favourite place. No matter <br className="d-none d-sm-block" /> where you travel inside the World.</p>
              </div>
            </div>
            <div className="d-flex align-items-start mb-5">
              <div className="bg-danger me-sm-4 me-3 p-3" style={{ borderRadius: '13px' }}> <img src="assets/img/steps/water-sport.svg" width="22" alt="steps" /></div>
              <div className="flex-1">
                <h5 className="text-secondary fw-bold fs-0">Make Payment</h5>
                <p>After find your perfect spot, make your <br className="d-none d-sm-block" /> payment and get ready to travel.</p>
              </div>
            </div>
            <div className="d-flex align-items-start mb-5">
              <div className="bg-info me-sm-4 me-3 p-3" style={{ borderRadius: '13px' }}> <img src="assets/img/steps/taxi.svg" width="22" alt="steps" /></div>
              <div className="flex-1">
                <h5 className="text-secondary fw-bold fs-0">Reach Airport on Selected Date</h5>
                <p>Lastly, you have to arrive at the airport <br className="d-none d-sm-block" /> on time and enjoy the vacation.</p>
              </div>
            </div>
          </div>
          <div className="col-lg-6 d-flex justify-content-center align-items-start">
            <div className="card position-relative shadow" style={{ maxWidth: '370px' }}>
              <div className="position-absolute z-index--1 me-10 me-xxl-0" style={{ right: '-160px', top: '-210px' }}> <img src="assets/img/steps/bg.png" style={{ maxWidth: '550px' }} alt="shape" /></div>
              <div className="card-body p-3"> <img className="mb-4 mt-2 rounded-2 w-100" src="assets/img/steps/booking-img.jpg" alt="booking" />
                <div>
                  <h5 className="fw-medium">Trip To Greece</h5>
                  <p className="fs--1 mb-3 fw-medium">14-29 June | by Robbin joseph</p>
                  <div className="icon-group mb-4"> <span className="btn icon-item"> <img src="assets/img/steps/leaf.svg" alt=""/></span><span className="btn icon-item"> <img src="assets/img/steps/map.svg" alt=""/></span><span className="btn icon-item"> <img src="assets/img/steps/send.svg" alt=""/></span>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center mt-n1"><img className="me-3" src="assets/img/steps/building.svg" width="18" alt="building" /><span className="fs--1 fw-medium">24 people going</span></div>
                    <div className="show-onhover position-relative">
                      <div className="card hideEl shadow position-absolute end-0 start-xl-50 bottom-100 translate-xl-middle-x ms-3" style={{ width: '260px', borderRadius: '18px' }}>
                        <div className="card-body py-3">
                          <div className="d-flex">
                            <div style={{ marginRight: '10px' }}> <img className="rounded-circle" src="assets/img/steps/favorite-placeholder.png" width="50" alt="favorite" /></div>
                            <div>
                              <p className="fs--1 mb-1 fw-medium">Ongoing </p>
                              <h5 className="fw-medium mb-3">Trip to rome</h5>
                              <h6 className="fs--1 fw-medium mb-2"><span>40%</span> completed</h6>
                              <div className="progress" style={{ height: '6px' }}>
                                <div className="progress-bar" role="progressbar" style={{ width: '40%' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button className="btn"> <img src="assets/img/steps/heart.svg" width="20" alt="step" /></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
