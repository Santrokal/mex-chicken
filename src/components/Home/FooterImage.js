/* eslint-disable jsx-a11y/img-redundant-alt */
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import crispyChicken from "../../images/Crispychicken1.png";
import deliciousdesert from "../../images/delicious-dessert-table2.png";
import MaskGroup from "../../images/Maskgroup3.png";
import Salad from "../../images/Salad5.png";
import Fries from "../../images/fries6.png";
import Burger from "../../images/Burger5.png";

const imageUrls = [
  deliciousdesert,
  MaskGroup,
  Salad,
  Burger,
  Fries,
  crispyChicken,
];

const settings = {
  dots: false,
  infinite: true,
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: true,
  pauseOnHover: true,
  autoplaySpeed: 3000,
  swipeToSlide: true,
  rtl: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
  afterChange: function (index) {},
};

const FooterImage = () => {
  const duplicatedImages = [...imageUrls];

  return (
    <div className="bg-cgreen-500  overflow-hidden">
      <Slider {...settings}>
        {duplicatedImages.map((url, index) => (
          <div key={index} className="image-slide">
            <img
              src={url}
              alt={`Image ${index + 1}`}
              loading="lazy"
              className="slick-image h-40 w-full object-cover"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default FooterImage;
