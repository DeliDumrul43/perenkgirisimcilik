import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import petshopLogo from "../assets/images/leading_img.png";

gsap.registerPlugin(ScrollTrigger);

function Leading({ id }) {
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
      }, "<")
      .from("#pet-carrier-illustration", {
        x: 200, 
        opacity: 0,
        duration: 1.5,
      }, "<")
      .from("#fish-illustration", {
        x: -200, 
        opacity: 0,
        duration: 1.5,
      }, "<")
      .from("#bird-illustration", {
        x: 200, 
        opacity: 0,
        duration: 1.5,
      }, "<")
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
      id={id} 
      ref={container}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-brand-beige p-4"
     >

      <div
        id="bird-illustration"
        className="absolute top-0 left-0 w-1/3 max-w-xs h-auto text-brand-light-turquoise opacity-70 z-0"
      >
        <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M191.179 273.824C240.235 297.511 305.516 282.723 327.848 235.07C343.653 201.345 294.142 174.478 268.869 180.597C249.795 185.215 238.443 210.424 226.139 201.065C216.677 165.605 199.9 119.51 135.192 107.37C114.091 103.412 83.5311 110.64 102.336 135.815C116.496 154.766 137.36 163.983 158.442 173.765C164.792 176.714 169.78 183.842 176.581 185.72C178.199 186.166 181.717 185.007 181.525 186.671C181.105 190.238 113.899 155.977 108.125 179.498C103.955 196.484 152.426 206.208 162.693 208.177C163.338 208.3 167.696 208.583 167.631 209.126C167.291 212.044 128.996 205.366 122.548 219.126C113.925 237.519 146.169 239.099 156.097 238.053C164.394 237.176 172.809 236.947 180.889 235.438C181.156 235.389 194.153 233.997 169.23 238.769C147.16 242.995 90.4779 253.756 88.9641 262.487C87.4503 271.218 95.0462 273.682 99.275 281.556C103.504 289.429 106.52 291.001 110.939 295.051C115.357 299.1 142.753 259.14 172.051 268.915M323.418 199.974C348.126 209.727 352.589 199.404 329.977 213.31M291.997 210.007C291.781 209.411 291.563 208.813 291.345 208.215" stroke="currentColor" strokeOpacity="0.9" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      </div>

      <div
        id="fish-illustration"
        className="absolute top-8 right-0 w-1/4 max-w-[200px] h-auto text-brand-light-turquoise opacity-70 z-0"
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="matrix(-1, 0, 0, 1, 0, 0)">
          <g stroke="currentColor" strokeLinecap="round" strokeWidth="2">
            <path d="M2 15C3.83333 12.3333 8.8 7 14 7C14.9226 7 15.7539 7.10492 16.5 7.28685M2 9C3.83333 11.6667 8.8 17 14 17C14.9226 17 15.7539 16.8951 16.5 16.7132M16.5 16.7132C19.9595 15.8697 22 12 22 12C22 12 19.9595 8.13032 16.5 7.28685M16.5 16.7132C15.5 15.1667 14.1 11.1163 16.5 7.28685M12 10.5C11.5 11 10.8 12.3 12 13.5"></path>
            <path d="M18 11H18.001"></path>
          </g>
        </svg>
      </div>

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