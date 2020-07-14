import React from "react"
import {useEffect} from 'react';
import {Link} from "gatsby";
import Navbar from "./navbar";
import "./header.scss";
import logoWhite from "./images/logo-white-txt-lg.png"
import logoBlack from "./images/logo-black-txt-lg.png"

const Header = () => {
    useEffect(() => {
        window.onscroll = function() {myFunction()};

        function myFunction() {
          if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            document.getElementById("header").className = "header-fix";
          } else {
            document.getElementById("header").className = "";
          }
        }
    });
    return(
        <header id="header">
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 header-inner">
                        <div className="logo logo-lg float-left">
                            <Link to="/">
                                <img className="logo-white-text" src={logoWhite} alt="Tekdi logo" />
                                <img className="logo-black-text" src={logoBlack} alt="Tekdi logo" />
                            </Link>
                        </div>
                        <div className="logo logo-sm float-left">
                            <Link to="/">
                                <img className="logo-white-text" src={logoWhite} alt="Tekdi logo" />
                                <img className="logo-black-text" src={logoBlack} alt="Tekdi logo" />
                            </Link>
                        </div>
                        <Navbar />
                    </div>
                </div>
            </div>
        </header>
    );
}
export default Header;