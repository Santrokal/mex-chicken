import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const imageUrls = [
  "images/crispyChicken1.png",
  "images/delicious-dessert-table2.png",
  "images/Maskgroup3.png",
  "images/Salad5.png",
  "images/Burger5.png",
  "images/fries6.png",
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
  afterChange: function (index) {
    console.log(`Slider Changed to: ${index + 1}`);
  },
};

const FooterImage = () => {
  const duplicatedImages = [...imageUrls];

  return (
    <div className="bg-cgreen-500 overflow-hidden">
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
