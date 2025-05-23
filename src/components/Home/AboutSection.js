import texturewhite from "../../images/Texture-White1.png";
import image1 from "../../images/image1.png";
import image2 from "../../images/image2.png";
import image3 from "../../images/image3.png";
import image4 from "../../images/image4.png";

const About = () => {
  return (
    <section
      className="two-column relative bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${texturewhite})` }}>
      <div className="w-full h-32 ">
        <img className="w-full" src={texturewhite} alt="Overlay" />
      </div>
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="grid grid-cols-2 gap-5 pb-5 sm:w-auto two-column-image lg:pb-0 justify-center lg:justify-start order-1 lg:order-none">
            <div className="flex flex-col">
              <div className="rounded-sm2 pb-5 mt-16">
                <img
                  className="h-40 w-full md:h-72 object-cover rounded-sm2"
                  src={image1}
                  alt="Image1"
                />
              </div>
              <div className="rounded-sm2 pb-5">
                <img
                  className="h-40 w-full md:h-72 object-cover rounded-sm2"
                  src={image2}
                  alt="Image2"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="rounded-sm2 pb-5">
                <img
                  className="h-40 w-full md:h-80 object-cover rounded-sm2"
                  src={image3}
                  alt="Image3"
                />
              </div>
              <div className="rounded-sm2 pb-5">
                <img
                  className="h-60 w-full md:h-96 object-cover rounded-sm2"
                  src={image4}
                  alt="Image4"
                />
              </div>
            </div>
          </div>
          <div className="order-2 lg:order-none">
            <div className="mb-3">
              <div className=" text-red text-4xl font-AvertaStdBlack capitalize font-normal">
                About Roasto & More
              </div>
            </div>
            <div className="mb-3">
              <h2 className="text-base2 font-MazzardhBold text-6xl">
                Unique and Authentic Choices
              </h2>
            </div>
            <div>
              <p className="text-base2 font-AvertaStdRegular leading-relaxed">
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
                className=" no-underline text-base text-white bg-red font-semibold capitalize px-7 py-3 rounded-sm2 text-center transition-all duration-100"
                href="/home">
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
