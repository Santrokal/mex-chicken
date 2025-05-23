import percentageImg from "../../images/percentageoffer.png";
const Home = () => {
  return (
    <div className="sticky top-[0px] lg:top-[px] left-0 right-0 z-20 flex ">
      <div className="py-2 w-[40%] bg-[#252525] text-white font-AvertaStd-Black text-sm md:text-lg lg:text-[22px] flex items-center left-96 justify-center px-2 md:px-6 lg:px-16 ">
        <span>Roasto Special Offer for You</span>
      </div>
      <div className="py-2 w-[60%] bg-red text-white font-AvertaStd-Black text-sm md:text-lg lg:text-[22px] flex items-center px-2 md:px-6 lg:px-16">
        <img
          src={percentageImg}
          alt="percentage-offer"
          className="w-6 h-6 mr-2 "
        />
        <span>
          Get a FREE Tiramisu with Every Order Over
          <span className="text-[#FFD900] font-AvertaStd-Black ml-2">£15</span>
        </span>
      </div>
    </div>
  );
};

export default Home;
