"use client";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(useGSAP);

export default function Home() {
  const container = useRef(null);
  const tl = useRef<GSAPAnimation>();
  const toggleTimeline = () => {
    tl.current?.reversed(!tl.current.reversed());
  };

  useGSAP(
    () => {
      const boxes: GSAPAnimation[] = gsap.utils.toArray(".box");
      tl.current = gsap
        .timeline()
        .to(boxes[0], { x: 120, rotation: 360 })
        .to(boxes[1], { x: -120, rotation: -360 }, "<")
        .to(boxes[2], { y: -20 })
        .reverse();
    },
    { scope: container }
  );

  // use
  return (
    <main className="flex min-h-screen items-center justify-center">
      <section className="boxes-container p-2" ref={container}>
        <h2>Use the button to toggle a timeline</h2>
        <div>
          <button
            onClick={toggleTimeline}
            className="bg-blue-500 text-white p-2 rounded-md"
          >
            toggle timeline
          </button>
        </div>
        <div className="box gradient-blue">Box 1</div>
        <div className="box gradient-purple">Box 2</div>
        <div className="box gradient-red">Box 3</div>
      </section>
    </main>
  );
}
