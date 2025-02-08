"use client";
import React, { useEffect, useRef, useState } from "react";
import "./menu.css";
import Link from "next/link";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
const menuLinks = [
  {
    path: "/",
    label: "Home",
  },
  {
    path: "/about",
    label: "About",
  },
  {
    path: "/lab",
    label: "Lab",
  },

  {
    path: "/work",
    label: "Work",
  },
  {
    path: "/contact",
    label: "Contact",
  },
];
function Menu() {
  const container = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const tl = useRef<GSAPTimeline | null>(null);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useGSAP(
    () => {
      gsap.set(".menu-link-item-holder", {
        y: 75,
      });
      tl.current = gsap
        .timeline({ paused: true })
        .to(".menu-overlay", {
          duration: 1.25,
          clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0 100%)",
          ease: "power4.inOut",
        })
        .to(".menu-link-item-holder", {
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power4.inOut",
          delay: -0.75,
        });
    },
    { scope: container }
  );

  useEffect(() => {
    if (isMenuOpen) {
      tl.current?.play();
    } else {
      tl.current?.reverse();
    }
  }, [isMenuOpen]);
  return (
    <div className="menu-container" ref={container}>
      <div className="menu-bar">
        <div className="menu-log">
          <Link href="/">Animated Menu</Link>
        </div>
        <div className="menu-open" onClick={toggleMenu}>
          <p> Menu</p>
        </div>
      </div>
      <div className="menu-overlay">
        <div className="menu-overlay-bar">
          <div className="menu-logo" onClick={toggleMenu}>
            <Link href="/">Animated Menu</Link>
          </div>
          {/* <div className="menu-close " onClick={toggleMenu}>
            <p>Close</p>
          </div> */}
        </div>
        <div className="menu-close-icon" onClick={toggleMenu}>
          <p>&#x2715;</p>
        </div>
        <div className="menu-copy">
          <div className="menu-links">
            {menuLinks.map((link, index) => (
              <div className="menu-link-item" key={index}>
                <div className="menu-link-item-holder" onClick={toggleMenu}>
                  <Link href={link.path} className="menu">
                    {link.label}
                  </Link>
                </div>
              </div>
            ))}
          </div>
          {/* <div className="menu-info">
            <div className="menu-info-col">
              <Link href="#">X &#8599;</Link>
              <Link href="#">Instagram &#8599;</Link>
              <Link href="#">LinkedIn &#8599;</Link>
              <Link href="#">Behance &#8599;</Link>
              <Link href="#">Dribble &#8599;</Link>
            </div>
            <div className="menu-info-col">
              <p>info@menuanimation.com</p>
              <p>123 456 789</p>
            </div>
          </div> */}
        </div>
        {/* <div className="menu-preview">
          <p>View Showreel</p>
        </div> */}
      </div>
    </div>
  );
}

export default Menu;
