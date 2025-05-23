import Hamburder from "../../images/burger1.png";
import Drumstick from "../../images/food-service2.png";
import Pizza from "../../images/pizza3.png";
import Hotdog from "../../images/fried-chicken4.png";

const Loader = () => {
  const loadingText = "LOADING . . .";

  return (
    <div className="icon-loader-container">
      <div className="icon-grid">
        <div className="icon bounce delay1">
          <img src={Hamburder} alt="Hamburger" />
        </div>
        <div className="icon bounce delay2">
          <img src={Drumstick} alt="Drumstick" />
        </div>
        <div className="icon bounce delay3">
          <img src={Pizza} alt="Pizza" />
        </div>
        <div className="icon bounce delay4">
          <img src={Hotdog} alt="Hotdog" />
        </div>
      </div>

      <div className="loading-text">
        {loadingText.split("").map((char, index) => (
          <span
            key={index}
            style={{ animationDelay: `${index * 0.15}s` }}
            className="loading-letter">
            {char}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Loader;
