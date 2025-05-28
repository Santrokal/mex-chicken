import React from "react";

const MenuSectionDeskView = () => {
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
          className="custom_scrollbar   no-underline flex flex-1 flex-col max-h-[70vh] overflow-x-hidden overflow-y-auto "
          style={{
            overflow: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}>
          <ul
            role="list"
            className="flex flex-1  justify-between flex-col gap-y-7">
            <li>
              <ul
                role="list"
                className="-mx-14 hover:active:text-red text-black space-y-1">
                <li className="py-2 border-b border-grey500 cursor-pointer">
                  <a
                    className="text-base capitalize items-center font-AvertaStdBold no-underline hover:text-red group flex gap-x-3 rounded-md pl-1 pr-2 py-2"
                    href="#1">
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
              <ul role="list" className="-mx-14 text-black space-y-1">
                <li className="py-2 border-b border-grey500 cursor-pointer">
                  <a
                    className="text-base capitalize font-AvertaStdBold no-underline hover:text-red group flex gap-x-3 rounded-md p-2"
                    href="#2">
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
              <ul role="list" className="-mx-14 text-black space-y-1">
                <li className="py-2 border-b border-grey500 cursor-pointer">
                  <a
                    className="text-base capitalize font-AvertaStdBold no-underline hover:text-red group flex gap-x-3 rounded-md p-2"
                    href="#3">
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
              <ul role="list" className="-mx-14 text-black space-y-1">
                <li className="py-2 border-b border-grey500 cursor-pointer">
                  <a
                    className="text-base capitalize font-AvertaStdBold no-underline hover:text-red group flex gap-x-3 rounded-md p-2"
                    href="#4">
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
              <ul role="list" className="-mx-14 text-black space-y-1">
                <li className="py-2 border-b border-grey500 cursor-pointer">
                  <a
                    className="text-base capitalize font-AvertaStdBold no-underline hover:text-red group flex gap-x-3 rounded-md p-2"
                    href="#5">
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
              <ul role="list" className="-mx-14 text-black space-y-1">
                <li className="py-2 border-b border-grey500 cursor-pointer">
                  <a
                    className="text-base capitalize font-AvertaStdBold no-underline hover:text-red group flex gap-x-3 rounded-md p-2"
                    href="#6">
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
              <ul role="list" className="-mx-14 text-black space-y-1">
                <li className="py-2 border-b border-grey500 cursor-pointer">
                  <a
                    className="text-base capitalize font-AvertaStdBold no-underline hover:text-red group flex gap-x-3 rounded-md p-2"
                    href="#7">
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
              <ul role="list" className="-mx-14 text-black space-y-1">
                <li className="py-2 border-b border-grey500 cursor-pointer">
                  <a
                    className="text-base capitalize font-AvertaStdBold no-underline hover:text-red group flex gap-x-3 rounded-md p-2"
                    href="#8">
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
              <ul role="list" className="-mx-14 text-black space-y-1">
                <li className="py-2 border-b border-grey500 cursor-pointer">
                  <a
                    className="text-base capitalize font-AvertaStdBold no-underline hover:text-red group flex gap-x-3 rounded-md p-2"
                    href="#9">
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
