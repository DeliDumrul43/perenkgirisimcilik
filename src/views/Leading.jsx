import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import petshopLogo from "../assets/images/leading_img.png";

gsap.registerPlugin(ScrollTrigger);

function Leading() {
  const container = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      paused: true,
      defaults: { ease: "power2.out" },
    });

    tl.from("#hero-logo", {
        opacity: 0,
        scale: 0.5,
        duration: 1.2,
      })
      .from("#hero-title", {
        opacity: 0,
        y: 40,
        duration: 1,
      }, "-=0.8")
      .from(".hero-button", {
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 0.8,
      }, "-=0.6");
      
    tl.play(); 

    ScrollTrigger.create({
      trigger: "#aboutSection",
      start: "top bottom",
      onLeaveBack: () => {
        tl.restart();
      }
    });

    const parallaxHandler = (e) => {
      const { clientX, clientY } = e;
      if (!container.current) return;
      const { offsetWidth, offsetHeight } = container.current;
      
      const xPos = (clientX / offsetWidth - 0.5) * 2;
      const yPos = (clientY / offsetHeight - 0.5) * 2;

      gsap.to("#hero-logo", {
        x: xPos * 20,
        y: yPos * 20,
        rotation: xPos * 3,
        duration: 0.8,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", parallaxHandler);

    return () => {
      window.removeEventListener("mousemove", parallaxHandler);
    };
  }, []);

  return (
    <>
      <div
        ref={container}
        className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-brand-beige p-4"
      >
        <div className="flex flex-col items-center text-center">
          <div id="hero-logo" className="p-6 bg-brand-light-turquoise/50 rounded-2xl shadow-xl mb-8">
            <img
              src={petshopLogo}
              alt="Perenk Petshop Logosu"
              className="w-full max-w-sm"
            />
          </div>
          <h1
            id="hero-title"
            className="font-serif text-6xl md:text-8xl font-bold text-brand-dark-turquoise mb-10"
          >
            Perenk Girişimcilik
          </h1>
          
        </div>
      </div>
    </>
  );
}

export default Leading;