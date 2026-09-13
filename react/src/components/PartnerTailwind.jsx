import React from 'react'

export default function PartnerTailwind() {
  const partners = [
    { name: 'Axon', img: 'assets/img/partner/1.png' },
    { name: 'Jetstar', img: 'assets/img/partner/2.png' },
    { name: 'Expedia', img: 'assets/img/partner/3.png' },
    { name: 'Qantas', img: 'assets/img/partner/4.png' },
    { name: 'Alitalia', img: 'assets/img/partner/5.png' }
  ]

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 items-center justify-center">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl py-6 px-4 flex items-center justify-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer"
            >
              <img
                src={partner.img}
                alt={partner.name}
                className="max-h-10 sm:max-h-12 w-auto object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
