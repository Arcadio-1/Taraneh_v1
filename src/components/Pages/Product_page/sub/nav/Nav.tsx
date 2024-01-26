import React, { useEffect } from "react";
import { Events, Link, scrollSpy } from "react-scroll";

interface Props {
  reviews_ref: React.RefObject<HTMLDivElement>;
}

const Nav = ({ reviews_ref }: Props) => {
  // useEffect(() => {
  //   // Registering the 'begin' event and logging it to the console when triggered.
  //   Events.scrollEvent.register("begin", (to, element) => {
  //     console.log("begin", to, element);
  //   });

  //   // Registering the 'end' event and logging it to the console when triggered.
  //   Events.scrollEvent.register("end", (to, element) => {
  //     console.log("end", to, element);
  //   });

  //   // Updating scrollSpy when the component mounts.
  //   scrollSpy.update();

  //   // Returning a cleanup function to remove the registered events when the component unmounts.
  //   return () => {
  //     Events.scrollEvent.remove("begin");
  //     Events.scrollEvent.remove("end");
  //   };
  // }, []);

  const handleScroll = () => {
    if (reviews_ref.current) {
      reviews_ref.current.scrollIntoView();
    }
  };
  return (
    <div className="sticky top-0 z-20 px-5 py-4 bg-white">
      <ul className="flex gap-6 border-b py-5">
        <li className="text-xl cursor-pointer">
          <Link
            activeClass="border-b-4 border-g1_5"
            className="pb-2 px-4"
            to="Introduction"
            spy={true}
            smooth={true}
            offset={-50}
            duration={500}
          >
            معرفی
          </Link>
        </li>
        <li className="text-xl cursor-pointer">
          <Link
            activeClass="border-b-4 border-g1_5"
            className="pb-2 px-4"
            to="Specifications"
            spy={true}
            smooth={true}
            offset={-50}
            duration={500}
          >
            مشخصات
          </Link>
        </li>
        <li className="text-xl cursor-pointer">
          <Link
            activeClass="border-b-4 border-g1_5"
            className="pb-2 px-4"
            to="Reviews"
            spy={true}
            smooth={true}
            offset={-50}
            duration={500}
          >
            دیدگاه
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Nav;
