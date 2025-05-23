import React, { useState, useEffect } from "react";
import Navbar from "../components/Home/Navbar";
import Loader from "../components/Home/Loader";
import FooterImage from "../components/Home/FooterImage";
import FooterSection from "../components/Home/FooterSection";
import aboutImg from "../images/aboutusback.png";
import texturewhite from "../images/Texture-White1.png";
import texturewhite1 from "../images/Texture-White.png";
import image1 from "../images/aboutimg3.png";
import image2 from "../images/aboutimg2.png";
import image3 from "../images/aboutimg1.png";
import image4 from "../images/about4.png";
import image5 from "../images/about5.png";
import image6 from "../images/about6.png";
import image7 from "../images/about7.png";
import image8 from "../images/Diet.png";
import image9 from "../images/Room service.png";
import image10 from "../images/Delivery man.png";
import image11 from "../images/Friedchicken.png";
import image12 from "../images/Fasttime.png";
import image13 from "../images/Chef.png";
import image14 from "../images/Weddingdinner.png";

const AboutUs = () => {
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
            style={{
              backgroundImage: `url(${aboutImg})`,
            }}>
            <div className="container">
              <div className="flex flex-col justify-center items-center text-center max-w-sm mx-auto">
                <div className="page-title mb-2">
                  <h1 className="text-white font-AvertaStdEB capitalize text-6xl leading-[3rem] h-16">
                    About Us
                  </h1>
                </div>
                <div className="breadcrumb flex items-center justify-center">
                  <nav className="flex" aria-label="Breadcrumb">
                    <ol role="list" className="flex items-center space-x-2">
                      <li>
                        <div className="flex items-center space-x-2">
                          <a
                            className="text-base1 no-underline text-cgray-50 hover:text-red font-Avertastd capitalize"
                            href="/home">
                            Home
                          </a>
                        </div>
                      </li>

                      <li>
                        <div className="flex items-center space-x-2">
                          <svg
                            width="8"
                            height="8"
                            viewBox="0 0 8 8"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M6.22234 3.68784L2.66224 0.127804C2.5799 0.045398 2.46999 0 2.35278 0C2.23558 0 2.12566 0.045398 2.04332 0.127804L1.78115 0.389916C1.61055 0.560711 1.61055 0.838302 1.78115 1.00884L4.77065 3.99834L1.77783 6.99116C1.69549 7.07357 1.65002 7.18342 1.65002 7.30056C1.65002 7.41783 1.69549 7.52768 1.77783 7.61015L2.04 7.8722C2.12241 7.9546 2.23226 8 2.34947 8C2.46667 8 2.57659 7.9546 2.65893 7.8722L6.22234 4.30891C6.30488 4.22624 6.35021 4.11587 6.34995 3.99854C6.35021 3.88075 6.30488 3.77044 6.22234 3.68784Z"
                              fill="#FEFEFE"
                            />
                          </svg>
                          <a
                            aria-current="page"
                            className="text-base no-underline text-red font-Avertastd capitalize active"
                            href="/about">
                            About Us
                          </a>
                        </div>
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </section>
          <section
            className="two-column relative bg-cover bg-no-repeat bg-center"
            style={{ backgroundImage: `url(${texturewhite1})` }}>
            <div className="w-full h-32">
              <img className="w-full" src={texturewhite} alt="Overlay" />
            </div>
            <div className="container">
              <div className="grid lg:grid-cols-2 pb-4 gap-4 items-center">
                {/* Left Side - Two Stacked Images */}
                <div className="flex flex-row gap-4 justify-center lg:order-none">
                  <div className="rounded-sm2">
                    <img
                      className="h-96 w-auto object-cover rounded-sm2"
                      src={image1}
                      alt="Image1"
                    />
                  </div>
                  <div className="rounded-sm2">
                    <img
                      className="h-auto w-80 object-cover rounded-sm2"
                      src={image2}
                      alt="Image2"
                    />
                  </div>
                </div>
                <div className="order-2 mt-2">
                  <div className="mb-2">
                    <div className="text-red text-4xl font-MeriendaOne ">
                      Mission
                    </div>
                  </div>
                  <div className="mb-3">
                    <h2 className="text-base2 font-AvertaStdBold text-6xl">
                      Your Destination For Foods
                    </h2>
                  </div>
                  <p className="text-green300 font-AvertaStdRegular leading-relaxed mb-5">
                    We are a restaurant committed to providing you with the most
                    delicious, flavourful chicken dishes that have been tenderly
                    and professionally cooked. Our adventure started with a
                    straightforward idea, to establish a haven for enthusiasts
                    of chicken, where each taste reveals a tale of expert
                    preparation and consistent quality.
                  </p>
                  <div className="rounded-sm2">
                    <img
                      className="h-auto w-auto object-cover rounded-sm2" // Wide horizontal
                      src={image3}
                      alt="Image3"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-32">
              <img className="w-full" src={texturewhite} alt="Overlay" />
            </div>
          </section>
          <section className=" relative bg-grey400">
            <div className="  container">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="  order-1 lg:order-none mt-24 mb-28">
                  <div className="sub-title mb-3">
                    <div className="text-red text-2xl font-MeriendaOne ">
                      Why People Choose Us
                    </div>
                  </div>
                  <div className="title mb-3">
                    <h2 className="text-base2 text-6xl font-AvertaStdBold ">
                      Convenience at Your Fingertips.
                    </h2>
                  </div>
                  <div className=" text-green300 description">
                    <p>
                      At Mex Chicken, We take great pride in our dedication to
                      creating dishes that are an expression of tastes, textures
                      and the delight that comes from eating wonderful food.
                      Join us at the delectable journey of chicken perfection
                    </p>
                  </div>
                  <div className="two-column-pointers pt-4">
                    <div className="grid gap-6 md:gap-10">
                      <div className="flex gap-4 md:gap-5">
                        <div className="icon">
                          <img
                            className="my-0 mx-auto h-14 rounded-md dark-invert"
                            src={image8}
                            alt="Features Icon"
                          />
                        </div>
                        <div className="flex flex-col gap-1 ">
                          <h5 className="text-base2 font-AvertaStdBold capitalize">
                            100% Healthy Food{" "}
                          </h5>
                          <p className="text-green300  font-AvertastdRegular">
                            Carefully selected best ingredients, We're fresher,
                            healthy and modern Kitchen.{" "}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-4 md:gap-5">
                        <div className="icon">
                          <img
                            className="my-0 mx-auto h-14 rounded-md dark-invert"
                            src={image9}
                            alt="Features Icon"
                          />
                        </div>
                        <div className="flex flex-col gap-1 ">
                          <h5 className="text-base2 font-AvertaStdBold capitalize">
                            Excellent Services
                          </h5>
                          <p className="text-green300 font-AvertastdRegular">
                            Professionals with a strong commitment to beating
                            your expectations serve as our team.
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-4 md:gap-5">
                        <div className="icon">
                          <img
                            className="my-0 mx-auto h-14 rounded-md dark-invert"
                            src={image10}
                            alt="Features Icon"
                          />
                        </div>
                        <div className="flex flex-col gap-1 ">
                          <h5 className="text-base2 font-AvertaStdBold capitalize">
                            Online Delivery{" "}
                          </h5>
                          <p className="text-green300 font-AvertastdRegular">
                            Our team serve food to dinein on time is dedicated
                            to timely food preparation and credible.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="order-2 lg:order-none pb-4 lg:pb-0">
                  <div className="grid grid-cols-2  sm:w-auto h-full">
                    <div className="flex flex-col">
                      <div className="rounded-sm2 pb-4">
                        <img
                          className="h-60 w-64  object-cover rounded-sm2"
                          src={image5}
                          alt="Mission Image"
                        />
                      </div>
                      <div className="rounded-sm2  ">
                        <img
                          className="h-96 w-auto object-cover rounded-sm2"
                          src={image4}
                          alt="Mission Image"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="rounded-sm2  mt-12 pb-4">
                        <img
                          className="h-64 w-auto  object-cover rounded-sm2"
                          src={image6}
                          alt="Mission Image"
                        />
                      </div>
                      <div className="rounded-sm2 pb-5">
                        <img
                          className="h-64 w-auto   object-cover rounded-sm2"
                          src={image7}
                          alt="Mission Image"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section class="bg-white">
            <div class="container mx-auto">
              <div class="features-content mt-24 mb-24 grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 items-center">
                <div class="features-card-item  px-3 lg:px-5 py-3 lg:py-5 flex flex-col items-center justify-center text-center max-w-xs mx-auto">
                  <div class="features-icon h-14 mb-7">
                    <img
                      class="my-0 mx-auto h-14 rounded-md dark-invert"
                      src={image11}
                      alt="Features Icon"
                    />
                  </div>
                  <h4 class="capitalize text-base2 font-AvertaStdBold mb-2">
                    Best Quality
                  </h4>
                  <p class="h-20 text-grey300 font-AvertaStdRegular">
                    Delicious dishes that don’t compromise on health, made from
                    fresh, quality ingredients.
                  </p>
                </div>
                <div class="features-card-item px-3 lg:px-5 py-3 lg:py-5 flex flex-col items-center justify-center text-center max-w-xs mx-auto">
                  <div class="features-icon h-14 mb-7">
                    <img
                      class="my-0 mx-auto h-14 rounded-md dark-invert"
                      src={image12}
                      alt="Features Icon"
                    />
                  </div>
                  <h4 class="capitalize text-base2 font-AvertaStdBold mb-2">
                    On Time{" "}
                  </h4>
                  <p class="h-20 text-grey300 font-AvertaStdRegular">
                    Expert chefs crafting exquisite dishes, blending tradition
                    and innovation seamlessly.
                  </p>
                </div>
                <div class="features-card-item px-3 lg:px-5 py-3 lg:py-5 flex flex-col items-center justify-center text-center max-w-xs mx-auto">
                  <div class="features-icon h-14 mb-7">
                    <img
                      class="my-0 mx-auto h-14 rounded-md dark-invert"
                      src={image13}
                      alt="Features Icon"
                    />
                  </div>
                  <h4 class="capitalize text-base2 font-AvertaStdBold mb-2">
                    Master Chefs
                  </h4>
                  <p class="h-20 text-grey300 font-AvertaStdRegular">
                    Spotless kitchen ensuring hygiene and safety, delivering
                    meals prepared in pristine conditions.
                  </p>
                </div>
                <div class="features-card-item px-3 lg:px-5 py-3 lg:py-5 flex flex-col items-center justify-center text-center max-w-xs mx-auto">
                  <div class="features-icon h-14 mb-7">
                    <img
                      class="my-0 mx-auto h-14 rounded-md dark-invert"
                      src={image14}
                      alt="Features Icon"
                    />
                  </div>
                  <h4 class="capitalize text-base2 font-AvertaStdBold mb-2">
                    Taste Food
                  </h4>
                  <p class="h-20 text-grey300 font-AvertaStdRegular">
                    Delicious dishes that don’t compromise on health, made from
                    fresh, quality ingredients.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <FooterImage />
          <FooterSection />
        </div>
      )}
    </>
  );
};
export default AboutUs;
