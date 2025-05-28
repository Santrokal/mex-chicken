import React from "react";
import BurgerMobile from "../../images/Burgermobile.jpeg";
import FriedChickenMobile from "../../images/friedchickenmobile.jpeg";
import KidsMealsMobile from "../../images/kidsmealsmobile.jpeg";
import WrapsMobile from "../../images/wrapsmobile.jpeg";
import PeriPeriChickenMobile from "../../images/periperichickenmobile.jpeg";
import PeriPeriBurgerMobile from "../../images/periperiburgermobile.jpeg";
import PeriPeriFamilyMobile from "../../images/periperifamilymealmobile.jpeg";
import FamilyBuckMobile from "../../images/familybuckermobile.jpeg";
const MenuSectionMobileView = () => {
  return (
    <>
      <div
        className="lg:hidden flex no-underline items-center gap-4 overflow-x-auto custom-scrollbar-hide py-4 px-2"
        style={{
          overflow: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}>
        {[
          {
            id: 1,
            name: "Burgers",
            img: BurgerMobile,
          },
          {
            id: 2,
            name: "Fried Chicken",
            img: FriedChickenMobile,
          },
          {
            id: 3,
            name: "Kids Meals",
            img: KidsMealsMobile,
          },
          {
            id: 4,
            name: "Wraps",
            img: WrapsMobile,
          },
          {
            id: 5,
            name: "Peri Peri Chicken",
            img: PeriPeriChickenMobile,
          },
          {
            id: 6,
            name: "Peri Peri Burgers",
            img: PeriPeriBurgerMobile,
          },
          {
            id: 7,
            name: "Peri Peri Family Meals",
            img: PeriPeriFamilyMobile,
          },
          {
            id: 8,
            name: "Family Bucket",
            img: FamilyBuckMobile,
          },
          {
            id: 9,
            name: "Extras",
            img: FamilyBuckMobile,
          },
        ].map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            data-to-scrollspy-id={item.id}
            className="flex-shrink-0 w-36 no-underline flex flex-col items-center bg-white rounded-md p-2 shadow-md">
            <div className="w-28 h-28">
              <img
                src={item.img}
                alt={item.name}
                loading="lazy"
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <p className="text-center text-sm font-medium text-base2 hover:text-red no-underline mt-2">
              {item.name}
            </p>
          </a>
        ))}
      </div>
    </>
  );
};

export default MenuSectionMobileView;
