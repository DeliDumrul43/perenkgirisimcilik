import React from "react";

function Loading() {
  return (
    // The main container centers the animation and sets the background color.
    <div className="h-screen w-full flex items-center justify-center bg-brand-beige">
      <style>
        {`
          .draw-path {
            stroke-dasharray: 1000; /* A large number, longer than any path */
            stroke-dashoffset: 1000;
            animation: draw-icon 2.5s ease-in-out forwards;
          }

          @keyframes draw-icon {
            to {
              stroke-dashoffset: 0;
            }
          }
        `}
      </style>
      
      {/* This SVG contains both the heart and the paw.
        The animation delay is staggered to draw the heart first, then the paw.
      */}
      <svg
        className="m-auto w-28 h-28" // Sized for clarity
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g 
          fill="none" 
          stroke="#275c57" // Your brand-dark-turquoise color
          strokeWidth="5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          {/* The Heart Path */}
          <path
            className="draw-path"
            d="M 50,30
               C 30,10, 10,20, 10,40
               C 10,70, 50,90, 50,90
               C 50,90, 90,70, 90,40
               C 90,20, 70,10, 50,30 Z"
            style={{ animationDelay: '0s' }}
          />
          
          {/* Main Pad */}
          <path
            className="draw-path"
            d="M50,66 C 45,66, 42,62, 42,58 C 42,54, 45,52, 50,52 C 55,52, 58,54, 58,58 C 58,62, 55,66, 50,66 Z"
            style={{ animationDelay: '0.8s' }}
          />
          {/* Toes */}
          <circle className="draw-path" cx="40" cy="48" r="4" style={{ animationDelay: '1.2s' }} />
          <circle className="draw-path" cx="50" cy="45" r="4" style={{ animationDelay: '1.4s' }} />
          <circle className="draw-path" cx="60" cy="48" r="4" style={{ animationDelay: '1.6s' }} />
        </g>
      </svg>
    </div>
  );
}

export default Loading;