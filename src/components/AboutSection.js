const About = () => {
  return (
    <section
      className="two-column relative bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: 'url("/images/Group.jpg")' }}>
      <div className="w-full ">
        <img className="w-full" src="/images/Texture-dark.png" alt="Overlay" />
      </div>
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="grid grid-cols-2 gap-5 pb-5 sm:w-auto two-column-image lg:pb-0 justify-center lg:justify-start order-1 lg:order-none">
            <div className="flex flex-col">
              <div className="rounded-sm2 pb-5 mt-16">
                <img
                  className="h-40 w-full md:h-72 object-cover rounded-sm2"
                  src="/images/image1.png"
                  alt="Image1"
                />
              </div>
              <div className="rounded-sm2 pb-5">
                <img
                  className="h-40 w-full md:h-72 object-cover rounded-sm2"
                  src="/images/image2.png"
                  alt="Image2"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="rounded-sm2 pb-5">
                <img
                  className="h-40 w-full md:h-80 object-cover rounded-sm2"
                  src="/images/image1.png"
                  alt="Image3"
                />
              </div>
              <div className="rounded-sm2 pb-5">
                <img
                  className="h-60 w-full md:h-96 object-cover rounded-sm2"
                  src="/images/image1.png"
                  alt="Image4"
                />
              </div>
            </div>
          </div>
          <div className="order-2 lg:order-none">
            <div className="mb-3">
              <div className="text-base text-red font-['Merienda'] capitalize font-normal">
                About Roasto & More
              </div>
            </div>
            <div className="mb-3">
              <h2 className="text-white font-MazzardhBold text-6xl">
                Unique and Authentic Choices
              </h2>
            </div>
            <div>
              <p className="text-white leading-relaxed">
                Welcome to Roasto & More, your haven for mouthwatering comfort
                food and Unique and Authentic Choices in Kempston. Indulge in
                our Classic Original Chicken Shawarma, plus burgers and wraps
                bursting with fresh flavors. Our warm setting and friendly
                service enhance every bite, ensuring a memorable dining
                experience. Prepared with care and passion, each dish reflects
                our dedication to quality and innovation. Visit us today and
                explore the tastes that make Roasto & More truly special!
              </p>
            </div>
            <div className="mt-8 md:mt-12 flex items-center">
              <a
                className="cta text-base text-white bg-red font-semibold capitalize px-7 py-3 rounded-sm2 text-center transition-all duration-100"
                href="/#">
                About us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
