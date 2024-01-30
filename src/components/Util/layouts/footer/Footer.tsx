import React from "react";
import ScrollToTopBtn from "./components/ScrollToTopBtn";
import Info from "./components/Info";
import Advantages from "./components/Advantages";
import SocialMedia from "./components/SocialMedia";
import RssEmail from "./components/RssEmail";
import Badges from "./components/Badges";

const Footer = () => {
  return (
    <div className="mt-5 flex flex-col gap-20 px-8 py-8 shadow-[0px_1px_5px_rgba(0,0,0,0.20)]">
      <div className="flex flex-col-reverse items-start justify-end gap-4  sm:flex-row sm:items-center sm:justify-between sm:gap-0">
        <Info />
        <ScrollToTopBtn />
      </div>
      <Advantages />
      <div className="flex flex-wrap items-center justify-evenly gap-12">
        <SocialMedia />
        <RssEmail />
        <Badges />
      </div>
    </div>
  );
};

export default Footer;
