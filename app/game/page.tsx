'use client';
import { useDotPosition } from '@/context/DotPositionContext';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Game() {
  const { dotPosition } = useDotPosition();
  const [bubble, setBubble] = useState(null);

  // Function to generate a random position for the bubble
  const generateRandomPosition = () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * (window.innerHeight / 2), // Limit y-coordinate to the upper half of the screen
  });

  // Function to create a new bubble
  const createBubble = () => {
    setBubble({
      id: Math.random(), // unique ID for each bubble
      position: generateRandomPosition(),
      size: 60, // initial size of the bubble
      popped: false, // track if the bubble is popped
    });
  };

  // Effect to create the first bubble when the component mounts
  useEffect(() => {
    createBubble(); // Create the first bubble when the component mounts
  }, []);

  // Effect to handle bubble interaction with the cursor
  useEffect(() => {
    if (!bubble || bubble.popped) return;

    const distance = Math.sqrt(
      Math.pow(dotPosition.x - bubble.position.x, 2) +
      Math.pow(dotPosition.y - bubble.position.y, 2)
    );

    if (distance < bubble.size / 2) {
      // Increase the size of the bubble if the cursor is hovering over it
      setBubble(prevBubble => {
        const newSize = prevBubble.size + 5;

        if (newSize > 100) {
          // Pop the bubble if it gets too big
          return { ...prevBubble, popped: true };
        }

        return { ...prevBubble, size: newSize };
      });
    }
  }, [dotPosition, bubble]);

  // Effect to create a new bubble after the current one is popped
  useEffect(() => {
    if (bubble && bubble.popped) {
      const timeoutId = setTimeout(() => {
        createBubble();
      }, 250); // Delay before the next bubble appears

      return () => clearTimeout(timeoutId); // Cleanup timeout if the component unmounts or re-renders
    }
  }, [bubble]);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '69vh', overflow: 'hidden' }}>
      <AnimatePresence>
        {bubble && !bubble.popped && (
          <motion.div
            key={bubble.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5, transition: { duration: 0.3 } }}
            style={{
              position: 'absolute',
              top: `${bubble.position.y - 30}px`,
              left: `${bubble.position.x - 30}px`,
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              backgroundColor: 'blue',
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        )}
      </AnimatePresence>

      {/* Custom cursor */}
      <div
        style={{
          position: 'absolute',
          top: `${dotPosition.y}px`,
          left: `${dotPosition.x}px`,
          width: '10px',
          height: '10px',
          backgroundColor: 'red',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none'
        }}
      />

    </div>
  );
}
