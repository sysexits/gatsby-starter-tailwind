// Navigation component for mobile
import { graphql, useStaticQuery, Link } from "gatsby";
import React, { useState  } from "react";
import "../css/menu.css"
import "../css/navbar.css"

function Navbar() {
  
  return (
    <nav id="menu" className="font-medium">
        <label htmlFor="tm" id="toggle-menu">Menu <span className="drop-icon">▾</span></label>
        <input type="checkbox" id="tm"></input>
        <ul className="main-menu clearfix">
        <li><a href="/news/2019" className="font-semibold">News</a></li>
        <li><a href="/photos/2019">Photos</a></li>
        <li><a href="/members">Members
            <span className="drop-icon">▾</span>
            <label title="Toggle Drop-down" className="drop-icon" htmlFor="sm1">▾</label>
        </a>
        <input type="checkbox" id="sm1"></input>
        <ul className="sub-menu">
            <li><a href="/members/professor">Professor</a></li>
            <li><a href="/allumni">Allumni</a></li>
            <li><a href="/interns">Interns & Visiting Students</a></li>
        </ul>
        </li>
        <li><a href="/research">Research</a></li>
        <li><a href="/publication">Publication</a></li>
        </ul>
    </nav>
  );
}

export default Navbar;
