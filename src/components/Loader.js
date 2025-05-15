const Loader = () => {
  const loadingText = "LOADING . . .";

  return (
    <div className="icon-loader-container">
      <div className="icon-grid">
        <div className="icon bounce delay1">
          <img src="/images/burger1.png" alt="Hamburger" />
        </div>
        <div className="icon bounce delay2">
          <img src="/images/food-service2.png" alt="Drumstick" />
        </div>
        <div className="icon bounce delay3">
          <img src="/images/pizza3.png" alt="Pizza" />
        </div>
        <div className="icon bounce delay4">
          <img src="/images/fried-chicken4.png" alt="Hotdog" />
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
