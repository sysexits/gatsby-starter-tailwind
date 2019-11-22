import { graphql, useStaticQuery, Link } from "gatsby";
import React, { useState, useRef  } from "react";
import "../css/logo.css"
import "../css/menu.css"
import BrowserNav from "./browserNav";
import MobileNav from "./mobileNav";


function Header() {
  return (
    <header className="bg-black">
      <BrowserNav />
      <MobileNav />
    </header>
  );
}

export default Header;
