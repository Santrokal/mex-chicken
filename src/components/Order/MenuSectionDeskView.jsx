import React, { useState } from "react";

const MenuSectionDeskView = () => {
  const [activeItem, setActiveItem] = useState(null);

  const handleItemClick = (id) => {
    setActiveItem(id);
  };
  return (
    <>
      <div
        className="hidden lg:block p-5 shadow-custom rounded-sm2 bg-white sticky top-30 h-100 custom-shadow"
        style={{
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        }}>
        <div className="flex justify-between items-center mb-3">
          <div className="menu-item-title">
            <h5 className="text-black capitalize font-Avertastd">Menu Items</h5>
          </div>
        </div>
        <nav
          className="custom_scrollbar   no-underline flex flex-1 flex-col max-h-[70vh] overflow-x-auto overflow-y-auto "
          style={{
            overflow: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}>
          <ul
            role="list"
            className="flex flex-1  justify-between flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-16 text-base2">
                <li className="border-b border-grey500 cursor-pointer">
                  <a
                    className={`text-base2 capitalize items-center font-AvertaStdBold no-underline group flex gap-x-3 rounded-md pl-1 pr-2 py-2 ${
                      activeItem === "1" ? "text-red" : "hover:text-red"
                    }`}
                    href="#1"
                    onClick={() => handleItemClick("1")}>
                    <div
                      data-to-scrollspy-id="1"
                      className="active-scroll-spy"
                      style={{ textAlign: "left" }}>
                      Burgers
                    </div>
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <ul role="list" className="-mx-16 text-base2">
                <li className="border-b border-grey500 cursor-pointer">
                  <a
                    className={`text-base2 capitalize items-center font-AvertaStdBold no-underline group flex gap-x-3 rounded-md pl-1 pr-2 py-2 ${
                      activeItem === "2" ? "text-red" : "hover:text-red"
                    }`}
                    href="#2"
                    onClick={() => handleItemClick("2")}>
                    <div
                      data-to-scrollspy-id="2"
                      className="active-scroll-spy"
                      style={{ textAlign: "left" }}>
                      Fried Chicken
                    </div>
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <ul role="list" className="-mx-16 text-base2 ">
                <li className="border-b border-grey500 cursor-pointer">
                  <a
                    className={`text-base2 capitalize items-center font-AvertaStdBold no-underline group flex gap-x-3 rounded-md pl-1 pr-2 py-2 ${
                      activeItem === "3" ? "text-red" : "hover:text-red"
                    }`}
                    href="#3"
                    onClick={() => handleItemClick("3")}>
                    <div
                      data-to-scrollspy-id="3"
                      className="active-scroll-spy"
                      style={{ textAlign: "left" }}>
                      Kids Meals
                    </div>
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <ul role="list" className="-mx-16 text-base2 ">
                <li className="border-b border-grey500 cursor-pointer">
                  <a
                    className={`text-base2 capitalize items-center font-AvertaStdBold no-underline group flex gap-x-3 rounded-md pl-1 pr-2 py-2 ${
                      activeItem === "4" ? "text-red" : "hover:text-red"
                    }`}
                    href="#4"
                    onClick={() => handleItemClick("4")}>
                    <div
                      data-to-scrollspy-id="4"
                      className="active-scroll-spy"
                      style={{ textAlign: "left" }}>
                      Wraps
                    </div>
                  </a>
                </li>
              </ul>
            </li>

            <li>
              <ul role="list" className="-mx-16 text-base2 ">
                <li className="py-2 border-b border-grey500 cursor-pointer">
                  <a
                    className={`text-base2 capitalize items-center font-AvertaStdBold no-underline group flex gap-x-3 rounded-md pl-1 pr-2 py-2 ${
                      activeItem === "5" ? "text-red" : "hover:text-red"
                    }`}
                    href="#5"
                    onClick={() => handleItemClick("5")}>
                    <div
                      data-to-scrollspy-id="5"
                      className="active-scroll-spy"
                      style={{ textAlign: "left" }}>
                      Peri Peri Chicken
                    </div>
                  </a>
                </li>
              </ul>
            </li>

            <li>
              <ul role="list" className="-mx-16 text-base2 ">
                <li className=" border-b border-grey500 cursor-pointer">
                  <a
                    className={`text-base2 capitalize items-center font-AvertaStdBold no-underline group flex gap-x-3 rounded-md pl-1 pr-2 py-2 ${
                      activeItem === "6" ? "text-red" : "hover:text-red"
                    }`}
                    href="#6"
                    onClick={() => handleItemClick("6")}>
                    <div
                      data-to-scrollspy-id="6"
                      className="active-scroll-spy"
                      style={{ textAlign: "left" }}>
                      Peri Peri Burgers
                    </div>
                  </a>
                </li>
              </ul>
            </li>

            <li>
              <ul role="list" className="-mx-16 text-base2 ">
                <li className=" border-b border-grey500 cursor-pointer">
                  <a
                    className={`text-base2 capitalize items-center font-AvertaStdBold no-underline group flex gap-x-3 rounded-md pl-1 pr-2 py-2 ${
                      activeItem === "7" ? "text-red" : "hover:text-red"
                    }`}
                    href="#7"
                    onClick={() => handleItemClick("7")}>
                    <div
                      data-to-scrollspy-id="7"
                      className="active-scroll-spy"
                      style={{ textAlign: "left" }}>
                      Peri Peri Family Meals
                    </div>
                  </a>
                </li>
              </ul>
            </li>

            <li>
              <ul role="list" className="-mx-16 text-base2 ">
                <li className="border-b border-grey500 cursor-pointer">
                  <a
                    className={`text-base2 capitalize items-center font-AvertaStdBold no-underline group flex gap-x-3 rounded-md pl-1 pr-2 py-2 ${
                      activeItem === "8" ? "text-red" : "hover:text-red"
                    }`}
                    href="#8"
                    onClick={() => handleItemClick("8")}>
                    <div
                      data-to-scrollspy-id="8"
                      className="active-scroll-spy"
                      style={{ textAlign: "left" }}>
                      Family Bucket
                    </div>
                  </a>
                </li>
              </ul>
            </li>

            <li>
              <ul role="list" className="-mx-16 text-base2 ">
                <li className=" border-b border-grey500 cursor-pointer">
                  <a
                    className={`text-base2 capitalize items-center font-AvertaStdBold no-underline group flex gap-x-3 rounded-md pl-1 pr-2 py-2 ${
                      activeItem === "9" ? "text-red" : "hover:text-red"
                    }`}
                    href="#9"
                    onClick={() => handleItemClick("9")}>
                    <div
                      data-to-scrollspy-id="9"
                      className="active-scroll-spy"
                      style={{ textAlign: "left" }}>
                      Extras
                    </div>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default MenuSectionDeskView;
