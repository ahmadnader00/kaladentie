import React from "react";
import "../styles/footer.css";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaPhoneAlt,
} from "react-icons/fa";
import { MdPlace } from "react-icons/md";
import { CgMail } from "react-icons/cg";
import { TbWorld } from "react-icons/tb";
import { HashLink } from "react-router-hash-link";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="footer">
          <div className="footer-links">
            <h3>Contact Us</h3>
            <ul>
              <li>
                <MdPlace />
                Syria, Deir Atieh
              </li>

              <li>
                <FaPhoneAlt /> 011 783 3999
              </li>
              <li>
                <CgMail />
                facebook@uok.edu.sy
              </li>
              <li>
                <TbWorld />
                <a
                  href="http://www.uok.edu.sy/"
                  target={"_blank"}
                  rel="noreferrer"
                >
                  uok.edu.sy
                </a>
              </li>
            </ul>
          </div>
          <div className="social">
            <h3>Social links</h3>
            <ul>
              <li className="facebook">
                <a
                  href="https://www.facebook.com/kalamoonofficial"
                  target={"_blank"}
                  rel="noreferrer"
                >
                  <FaFacebookF />
                </a>
              </li>
              <li className="youtube">
                <a
                  href="https://www.youtube.com/channel/UCSsmPSWV8YyqedHDvTMnigA"
                  target={"_blank"}
                  rel="noreferrer"
                >
                  <FaYoutube />
                </a>
              </li>
              <li className="instagram">
                <a
                  href="https://www.instagram.com/university.of.kalamoon/"
                  target={"_blank"}
                  rel="noreferrer"
                >
                  <FaInstagram />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
