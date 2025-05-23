import logo from "../../images/fav-Dark.png";
import bottomlogo from "../../images/mex-chickenwhite.png";
const FooterSection = () => {
  return (
    <footer className="bg-black ">
      <div className="container">
        <div className="py-10 md:py-7 border-b border-green400 footer-bar flex flex-col md:flex-row justify-between items-center pb-12 md:pb-6 text-color">
          <div className="mb-9 md:mb-0">
            <a href="/home">
              <img
                src={logo}
                alt="website-logo"
                className="h-14 md:h-20 lg:h-24 rounded-md"
              />
            </a>
          </div>
          <div>
            <div className="flex flex-col md:flex-row items-center space-y-5 md:space-y-0 space-x-0 md:space-x-10 router-active">
              <div>
                <a
                  className="text-base1 no-underline hover:text-red font-Avertastd"
                  href="/home">
                  About
                </a>
              </div>
              <div>
                <a
                  className="text-base1 no-underline hover:text-red font-Avertastd active"
                  href="/order">
                  Order Now
                </a>
              </div>
              <div>
                <a
                  className="text-base1 no-underline hover:text-red font-Avertastd"
                  href="/">
                  Contact
                </a>
              </div>
              <div>
                <a
                  className="text-base1 no-underline hover:text-red font-Avertastd"
                  href="/">
                  FAQ
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="flex p-2 pt-5 flex-col md:flex-row md:gap-x-6 lg:gap-x-0 xl:gap-x-12">
          <div className="flex flex-col items-center md:items-start">
            <div className="business-hour-title mb-3 md:mb-5 ">
              <h5 className="font-semibold text-white">We are available on</h5>
            </div>
            <div className="business-hours-time">
              <div className="repeater flex flex-col text-white items-center sm:items-start">
                {[
                  ["Monday", "6:00 PM to 11:00 PM"],
                  ["Tuesday", "1:00 PM to 11:00 PM"],
                  ["Wednesday", "1:00 PM to 11:00 PM"],
                  ["Thursday", "1:00 PM to 11:00 PM"],
                  ["Friday", "1:00 PM to 11:00 PM"],
                  ["Saturday", "1:00 PM to 11:00 PM"],
                  ["Sunday", "1:00 PM to 11:00 PM"],
                ].map(([day, time]) => (
                  <div
                    className="schedule flex items-center flex-wrap mb-2"
                    key={day}>
                    <span className="day text-sm md:text-white font-semibold">
                      {day} :
                    </span>
                    <span className="time text-sm md:text-white font-normal md:ml-1 mt-1 md:mt-0">
                      {time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center w-full sm:w-1/2">
            <div className="social-media pt-18 md:pt-20 flex justify-center flex-wrap gap-4 max-w-xs md:max-w-sm mx-auto p-2">
              {/* Instagram */}
              <a
                className="flex items-center no-underline justify-center border-2 border-white rounded-full hover:bg-red hover:border-red transition-all duration-100 cursor-pointer w-16 h-16"
                target="_blank"
                rel="noreferrer"
                href="#">
                <i className="fi fi-brands-instagram text-2xl text-white"></i>
              </a>

              {/* YouTube */}
              <a
                className="flex items-center justify-center border-2 border-white rounded-full hover:bg-red hover:border-red transition-all duration-100 cursor-pointer w-16 h-16"
                target="_blank"
                rel="noreferrer"
                href="#">
                <i className="bi bi-youtube text-2xl text-white"></i>
              </a>

              {/* Twitter */}
              <a
                className="flex items-center justify-center border-2 border-white rounded-full hover:bg-red hover:border-red transition-all duration-100 cursor-pointer w-16 h-16"
                target="_blank"
                rel="noreferrer"
                href="#">
                <i className="bi bi-twitter-x text-2xl text-white"></i>
              </a>

              {/* Facebook */}
              <a
                className="flex items-center no-underline justify-center border-2 border-white rounded-full hover:bg-red hover:border-red transition-all duration-100 cursor-pointer w-16 h-16"
                target="_blank"
                rel="noreferrer"
                href="#">
                <i className="fi fi-brands-facebook text-2xl text-white"></i>
              </a>
            </div>
          </div>
        </div>
        <a
          className="logo pt-5 flex justify-center cursor-pointer"
          href="/home">
          <img
            src={bottomlogo}
            alt="website-logo"
            className="h-14 md:h-20 lg:h-24 rounded-md"
          />
        </a>

        <div className="details py-10 md:py-7 border-b text-white border-green400 space-y-5 sm:space-y-0 flex flex-col sm:flex-row sm:flex-wrap justify-center ">
          <p className="text-center">Mex Chicken</p>
          <p className="text-red px-1 hidden sm:block">|</p>
          <p className="text-center">
            Address : 8, Willow Road Castleford, WF105AR
          </p>
          <p className="text-red px-1 hidden sm:block">|</p>
          <p>
            <a
              href="mailto:"
              className="text-base1 no-underline"
              target="_blank"
              rel="noreferrer">
              <span className="hover:text-red">
                Email : contact@mexchicken.com
              </span>
            </a>
          </p>
        </div>

        <div className="footer-bar-2 text-white py-7 flex flex-col md:flex-row md:justify-between justify-center items-center text-color">
          <div className="flex flex-wrap justify-center sm:justify-start">
            <p className="text-sm mr-1">©2025</p>
            <p className="text-sm">Mex Chicken</p>
            <a
              className="px-1 text-sm no-underline text-base1 hover:text-red"
              target="_blank"
              rel="noreferrer"
              href="/">
              Developed by EezzyPOS
            </a>
          </div>
          <div className="flex pt-2 sm:pt-0 space-x-3 lg:space-x-10 router-active">
            <div>
              <a
                className="text-sm no-underline text-base1 cursor-pointer"
                href="/privacy-policy">
                Privacy Policy
              </a>
            </div>
            <div>
              <a
                className="text-sm no-underline text-base1 cursor-pointer"
                href="/terms-and-conditions">
                Terms &amp; Condition
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
