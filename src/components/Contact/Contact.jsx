/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Home/Navbar";
import Loader from "../../components/Home/Loader";
import FooterImage from "../../components/Home/FooterImage";
import FooterSection from "../../components/Home/FooterSection";
import aboutImg from "../../images/rectangle-48.png";
import contactImg1 from "../../images/contactImg1.png";
import contactImg2 from "../../images/contactImg2.png";
import TextureImg1 from "../../images/Texture-White1.png";

const Contact = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Navbar />
          <section
            className="secondary-banner h-auto bg-cover bg-no-repeat bg-center py-20"
            style={{ backgroundImage: `url(${aboutImg})` }}>
            <div className="container mx-auto">
              <div className="flex flex-col justify-center items-center text-center max-w-sm mx-auto">
                <div className="page-title mb-2">
                  <h1 className="text-white font-AvertaStdEB capitalize text-6xl leading-[3rem]">
                    Contact
                  </h1>
                </div>
                <nav
                  className="breadcrumb flex items-center justify-center"
                  aria-label="Breadcrumb">
                  <ol className="flex items-center space-x-2">
                    <li>
                      <a
                        className="text-base1 text-gray-50 no-underline hover:text-red font-AvertaStdBold capitalize"
                        href="/home">
                        Home
                      </a>
                    </li>
                    <li className="flex items-center space-x-2">
                      <svg
                        width="8"
                        height="8"
                        viewBox="0 0 8 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true">
                        <path
                          d="M6.22234 3.68784L2.66224 0.127804C2.5799 0.045398 2.46999 0 2.35278 0C2.23558 0 2.12566 0.045398 2.04332 0.127804L1.78115 0.389916C1.61055 0.560711 1.61055 0.838302 1.78115 1.00884L4.77065 3.99834L1.77783 6.99116C1.69549 7.07357 1.65002 7.18342 1.65002 7.30056C1.65002 7.41783 1.69549 7.52768 1.77783 7.61015L2.04 7.8722C2.12241 7.9546 2.23226 8 2.34947 8C2.46667 8 2.57659 7.9546 2.65893 7.8722L6.22234 4.30891C6.30488 4.22624 6.35021 4.11587 6.34995 3.99854C6.35021 3.88075 6.30488 3.77044 6.22234 3.68784Z"
                          fill="#FEFEFE"
                        />
                      </svg>
                      <a
                        className="no-underline text-red font-AvertaStdBold capitalize"
                        href="/contact"
                        aria-current="page">
                        Contact
                      </a>
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </section>
          <div
            className="relative bg-cover bg-no-repeat bg-center"
            style={{ backgroundImage: `url(${TextureImg1})` }}>
            <section className="contact relative bg-cover bg-no-repeat bg-center pb-5 lg:pb-0">
              <div className="">
                <img
                  className="w-full h-32"
                  src={TextureImg1}
                  alt="Texture Overlay"
                  loading="lazy"
                />
              </div>
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {/* Address */}
                  <div className="flex items-center bg-[#d51818] px-5 py-6 rounded-md">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-full bg-white flex justify-center items-center">
                        <i className="fi fi-rs-postal-address text-red-600 text-xl"></i>
                      </div>
                      <div className="flex flex-col gap-1">
                        <h5 className="text-white font-bold text-lg">
                          Address
                        </h5>
                        <address className="text-white not-italic text-sm">
                          8, Willow Road Castleford, WF105AR
                        </address>
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-center bg-[#d51818] px-5 py-6 rounded-md">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-full bg-white flex justify-center items-center">
                        <i className="fi fi-rs-envelope text-red-600 text-xl"></i>
                      </div>
                      <div className="flex flex-col gap-1">
                        <h5 className="text-white font-bold text-lg">Email</h5>
                        <a
                          href="mailto:contact@mexchicken.com"
                          className="text-white no-underline text-sm break-all">
                          contact@mexchicken.com
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div className="flex items-center bg-[#d51818] px-5 py-6 rounded-md">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-full bg-white flex justify-center items-center">
                        <i className="fi fi-rs-phone-call text-red-600 text-xl"></i>
                      </div>
                      <div className="flex flex-col gap-1">
                        <h5 className="text-white font-bold text-lg">
                          Phone Number
                        </h5>
                        <a
                          href="tel:01977361077"
                          className="text-white no-underline text-sm">
                          01977361077
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" relative grid lg:grid-cols-2 mt-10 gap-10 items-center container mx-auto">
                {/* Images */}
                <div className="relative w-full max-w-md mx-auto">
                  <img
                    src={contactImg1}
                    alt="Peri Peri Chicken Dish"
                    className="rounded-md w-full h-auto object-cover"
                    loading="lazy"
                  />
                  <div className="absolute bottom-10 -right-10 w-48 border-4 border-white rounded-md">
                    <img
                      src={contactImg2}
                      alt="Additional Dish"
                      className="w-full h-full object-cover rounded-md"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Text Content */}
                <div className="max-w-lg">
                  <p className="text-red text-2xl  mb-2 font-MeriendaOne">
                    Words with us
                  </p>
                  <h2 className="text-4xl font-AvertaStdEB mb-4 leading-snug">
                    Delicious, Freshly made <br /> Peri Peri chicken
                  </h2>
                  <p className="text-green300 text-sm ">
                    We value your feedback and are here to assist you with any
                    queries or concerns. Whether you have a suggestion, need
                    help placing an order or want to provide feedback on your
                    recent experience. Please don’t hesitate to reach us using
                    the contact information above. We value your input and are
                    always looking for ways to improve our services.
                  </p>
                </div>
              </div>
            </section>
          </div>
          <div className="map-contact text-center">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2942.012632334953!2d-1.3505793!3d53.71847270000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487969f00761ef0b%3A0x3a38aac0341226ec!2s8%20Willow%20Rd%2C%20Castleford%20WF10%205AR%2C%20UK!5e1!3m2!1sen!2sin!4v1747919973212!5m2!1sen!2sin"
              width="100%"
              height="500"
              loading="lazy"></iframe>
          </div>
          <FooterImage />
          <FooterSection />
        </div>
      )}
    </>
  );
};

export default Contact;
