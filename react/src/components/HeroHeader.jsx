import React from 'react'

export default function HeroHeader() {
  return (
    <section style={{ paddingTop: '7rem' }}>
      <div className="bg-holder" style={{ backgroundImage: 'url(assets/img/hero/hero-bg.svg)' }}>
      </div>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-5 col-lg-6 order-0 order-md-1 text-end"><img className="pt-7 pt-md-0 hero-img" src="assets/img/hero/hero-img.png" alt="hero-header" /></div>
          <div className="col-md-7 col-lg-6 text-md-start text-center py-6">
            <h4 className="fw-bold text-danger mb-3">Best Destinations around the world</h4>
            <h1 className="hero-title">Travel, enjoy and live a new and full life</h1>
            <p className="mb-4 fw-medium">Built Wicket longer admire do barton vanity itself do in it.<br className="d-none d-xl-block" />Preferred to sportsmen it engrossed listening. Park gate<br className="d-none d-xl-block" />sell they west hard for the.</p>
            <div className="text-center text-md-start"> <a className="btn btn-primary btn-lg me-md-4 mb-3 mb-md-0 border-0 primary-btn-shadow" href="#!" role="button">Find out more</a>
              <div className="w-100 d-block d-md-none"></div><a href="#!" role="button" data-bs-toggle="modal" data-bs-target="#popupVideo"><span className="btn btn-danger round-btn-lg rounded-circle me-3 danger-btn-shadow"> <img src="assets/img/hero/play.svg" width="15" alt="paly"/></span></a><span className="fw-medium">Play Demo</span>
              <div className="modal fade" id="popupVideo" tabIndex={-1} aria-labelledby="popupVideo" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                  <div className="modal-content">
                    <iframe className="rounded" style={{ width: '100%', maxHeight: '500px' }} height="500" src="https://www.youtube.com/embed/_lhdhL4UDIo" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
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
