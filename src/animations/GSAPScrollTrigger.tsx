"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Scroll() {
  const main = useRef(null);

  useGSAP(
    () => {
      const boxes = gsap.utils.toArray<HTMLElement>(".box");
      boxes.forEach((box) => {
        gsap.from(box, {
          x: -400,
          opacity: 0,
          delay: 2,
          scrollTrigger: {
            trigger: box, //the box that will trigger the animation
            start: "bottom bottom", //start the animation when the box is at the bottom of the viewport
            end: "top 60%", //end the animation when the top of box is at 60% of the viewport
            scrub: true, //links the animation to scrollbar
            markers: true, //for debugging
          },
        });
      });
    },
    { scope: main }
  );

  return (
    <div>
      <section className="section flex-center column">
        <h2>Basic ScrollTrigger with React</h2>
        <p>Scroll down to see the magic happen!!</p>
      </section>
      <div className="section flex-center column" ref={main}>
        <div className="box gradient-blue">box</div>
        <div className="box gradient-blue">box</div>
        <div className="box gradient-blue">box</div>
      </div>
      {/* <section className="section"></section> */}
    </div>
  );
}
