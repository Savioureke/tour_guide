import React from 'react'

export default function DestinationTailwind() {
  const destinations = [
    {
      img: 'assets/img/dest/dest1.jpg',
      title: 'Rome, Italy',
      price: '$5,42k',
      duration: '10 Days Trip'
    },
    {
      img: 'assets/img/dest/dest2.jpg',
      title: 'London, UK',
      price: '$4.2k',
      duration: '12 Days Trip'
    },
    {
      img: 'assets/img/dest/dest3.jpg',
      title: 'Full Europe',
      price: '$15k',
      duration: '28 Days Trip'
    }
  ]

  return (
    <section className="relative pt-16 md:pt-24 pb-16" id="destination">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Decorative Spiral Spring on Right */}
        <div className="absolute right-0 bottom-12 hidden xl:block translate-x-12 pointer-events-none -z-10">
          <img
            src="assets/img/dest/shape.svg"
            alt="destination decoration"
            className="w-24 h-auto"
          />
        </div>

        {/* Section Heading */}
        <div className="text-center mb-12 md:mb-16">
          <h5 className="text-secondary font-semibold text-sm sm:text-base uppercase tracking-widest mb-3">
            Top Selling
          </h5>
          <h3 className="font-volkhov font-bold text-dark-navy text-3xl sm:text-4xl md:text-5xl capitalize">
            Top Destinations
          </h3>
        </div>

        {/* Destination Cards Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 max-w-md md:max-w-none mx-auto">
          {destinations.map((dest, index) => (
            <div
              key={index}
              className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col"
            >
              {/* Image Container with zoom on hover */}
              <div className="relative overflow-hidden h-72 sm:h-80 md:h-96 w-full">
                <img
                  src={dest.img}
                  alt={dest.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Card Details */}
              <div className="p-6 sm:p-7 flex flex-col justify-between flex-grow">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-secondary font-medium text-lg sm:text-xl">
                    <a href="#!" className="hover:text-primary transition-colors">
                      {dest.title}
                    </a>
                  </h4>
                  <span className="text-secondary font-medium text-lg sm:text-xl">
                    {dest.price}
                  </span>
                </div>

                <div className="flex items-center text-secondary font-medium text-sm sm:text-base">
                  <img
                    src="assets/img/dest/navigation.svg"
                    alt="Navigation"
                    className="w-4 h-4 sm:w-5 sm:h-5 mr-3"
                  />
                  <span>{dest.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
