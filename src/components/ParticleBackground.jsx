import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

// --- You can customize these ---
const NUM_PARTICLES = 25; // How many paws to render
const PARTICLE_SVG = "M65.2,56.2c-5.9,4.2-11.8,5-18.4,2.3c-10.4-4.2-17.4-15.1-17.4-26.6c0-7.3,3-14.1,8-18.8"; // A simple paw path
// -----------------------------

function ParticleBackground() {

  useGSAP(() => {
    // Animate each particle with a random delay and duration
    gsap.to(".particle-paw", {
      x: () => gsap.utils.random(-200, 200), // Move horizontally
      y: () => gsap.utils.random(-200, 200), // Move vertically
      rotation: () => gsap.utils.random(-180, 180),
      opacity: () => gsap.utils.random(0.1, 0.5),
      scale: () => gsap.utils.random(0.5, 1.5),
      duration: () => gsap.utils.random(10, 20), // Each particle takes a different time
      ease: "power1.inOut",
      repeat: -1, // Loop forever
      yoyo: true, // Smoothly animate back and forth
      stagger: 0.1, // Stagger the start time of each animation
    });
  }, []); // Run only once on mount

  return (
    <div className="particle-container">
      {[...Array(NUM_PARTICLES)].map((_, index) => {
        // Scatter particles randomly across the screen initially
        const style = {
          left: `${gsap.utils.random(5, 95)}%`,
          top: `${gsap.utils.random(5, 95)}%`,
          transform: `scale(${gsap.utils.random(0.5, 1.2)}) rotate(${gsap.utils.random(0, 360)}deg)`,
        };

        return (
          <svg
            key={index}
            className="particle-paw"
            viewBox="0 0 100 100" // Adjusted viewBox for the paw
            xmlns="http://www.w3.org/2000/svg"
            style={style}
          >
            <path d={PARTICLE_SVG} />
          </svg>
        );
      })}
    </div>
  );
}

export default ParticleBackground;