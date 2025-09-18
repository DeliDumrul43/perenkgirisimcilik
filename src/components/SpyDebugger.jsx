import React, { useEffect } from 'react';
import { Events } from 'react-scroll';

function SpyDebugger() {
  useEffect(() => {
    // This logs the active section name to the developer console
    Events.scrollEvent.register('begin', (to, element) => {
      console.log('Scrolling to:', to);
    });

    return () => {
      Events.scrollEvent.remove('begin');
    };
  }, []);

  return null; // This component does not render anything
}

export default SpyDebugger;