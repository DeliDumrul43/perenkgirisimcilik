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

    tl.from("#cat-illustration", {
        x: -200, // Slide in from the left
        opacity: 0,
        duration: 1.5,
      })
      .from("#pet-carrier-illustration", {
        x: 200, // Slide in from the right
        opacity: 0,
        duration: 1.5,
      }, "<") // "<" starts this animation at the same time as the previous one
      // Then animate the central content
      .from("#hero-logo", {
        opacity: 0,
        scale: 0.5,
        duration: 1.2,
      }, "-=1")
      .from("#hero-title", {
        opacity: 0,
        y: 40,
        duration: 1,
      }, "-=0.8")
      .from("#hero-button", {
        opacity: 0,
        y: 30,
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

      <div 
        id="cat-illustration"
        className="absolute bottom-0 right-0 w-1/4 max-w-xs h-auto text-brand-light-turquoise opacity-70 z-0"
      >
        <svg viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" transform="matrix(-1, 0, 0, 1, 0, 0)">
          <g>
            <path fillRule="evenodd" clipRule="evenodd" d="M1 7L4.80061 1.43926C5.56059 0.527292 6.68638 0 7.8735 0H8V4L12 5L15 10L14.1875 11.2188C13.4456 12.3316 12.1967 13 10.8593 13H9L7 16H5L1 7ZM10 9C10.5523 9 11 8.55229 11 8C11 7.44772 10.5523 7 10 7C9.44771 7 9 7.44772 9 8C9 8.55229 9.44771 9 10 9Z"/>
            <path d="M10 0.465878V2.43845L12 2.93845V0H11.8735C11.2125 0 10.5704 0.163501 10 0.465878Z"/>
          </g>
        </svg>
      </div>

      {/* A large, friendly dog face SVG positioned on the left */}
      <div 
        id="pet-carrier-illustration"
        className="absolute bottom-0 left-0 w-1/3 max-w-sm h-auto text-brand-light-turquoise opacity-70 z-0"
      >
        <svg viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M16 4V7C16 9.20914 14.2091 11 12 11H10V15H0V13L0.931622 10.8706C1.25226 10.9549 1.59036 11 1.94124 11C3.74931 11 5.32536 9.76947 5.76388 8.01538L3.82359 7.53031C3.60766 8.39406 2.83158 9.00001 1.94124 9.00001C1.87789 9.00001 1.81539 8.99702 1.75385 8.99119C1.02587 8.92223 0.432187 8.45551 0.160283 7.83121C0.0791432 7.64491 0.0266588 7.44457 0.00781272 7.23658C-0.0112323 7.02639 0.00407892 6.80838 0.0588889 6.58914C0.0588882 6.58914 0.0588896 6.58913 0.0588889 6.58914L0.698705 4.02986C1.14387 2.24919 2.7438 1 4.57928 1H10L12 4H16ZM9 6C9.55229 6 10 5.55228 10 5C10 4.44772 9.55229 4 9 4C8.44771 4 8 4.44772 8 5C8 5.55228 8.44771 6 9 6Z"/>
        </svg>
      </div>

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