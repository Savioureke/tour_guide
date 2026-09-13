import React from 'react'

export default function Cta() {
  return (
    <section className="pt-6">
      <div className="container">
        <div className="py-8 px-5 position-relative text-center" style={{ backgroundColor: 'rgba(223, 215, 249, 0.199)', borderRadius: '129px 20px 20px 20px' }}>
          <div className="position-absolute start-100 top-0 translate-middle ms-md-n3 ms-n4 mt-3"> <img src="assets/img/cta/send.png" style={{ maxWidth: '70px' }} alt="send icon" /></div>
          <div className="position-absolute end-0 top-0 z-index--1"> <img src="assets/img/cta/shape-bg2.png" width="264" alt="cta shape" /></div>
          <div className="position-absolute start-0 bottom-0 ms-3 z-index--1 d-none d-sm-block"> <img src="assets/img/cta/shape-bg1.png" style={{ maxWidth: '340px' }} alt="cta shape" /></div>
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10">
              <h2 className="text-secondary lh-1-7 mb-7">Subscribe to get information, latest news and other interesting offers about Cobham</h2>
              <form className="row g-3 align-items-center w-lg-75 mx-auto">
                <div className="col-sm">
                  <div className="input-group-icon">
                    <input className="form-control form-little-squirrel-control" type="email" placeholder="Enter email " aria-label="email" /><img className="input-box-icon" src="assets/img/cta/mail.svg" width="17" alt="mail" />
                  </div>
                </div>
                <div className="col-sm-auto">
                  <button className="btn btn-danger orange-gradient-btn fs--1">Subscribe</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
