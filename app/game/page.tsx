'use client';
import { useDotPosition } from '@/context/DotPositionContext';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Game() {
  const { dotPosition, action } = useDotPosition();
  const [bubble, setBubble] = useState(null);
  const [popAction, setPopAction] = useState(null);

  const actions = ["Mouth open", "Left blink", "Right blink", "Hover", "Mouth puckered"];

  const generateRandomPosition = () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * (window.innerHeight / 2),
  });

  const createBubble = () => {
    const randomAction = actions[Math.floor(Math.random() * actions.length)];
    setPopAction(randomAction);
    setBubble({
      id: Math.random(), // unique ID for each bubble
      position: generateRandomPosition(),
      size: 80,
      popped: false,
    });
  };

  useEffect(() => {
    createBubble();
  }, []);

  useEffect(() => {
    if (!bubble || bubble.popped) return;

    const distance = Math.sqrt(
      Math.pow(dotPosition.x - bubble.position.x, 2) +
      Math.pow(dotPosition.y - bubble.position.y, 2)
    );

    const isCursorOverBubble = distance < bubble.size / 2;

    const shouldPop = isCursorOverBubble && (
      (popAction === "Hover" && action === "") ||
      (popAction === "Mouth open" && action === "Mouth is open") ||
      (popAction === "Left blink" && action === "Left eye blink") ||
      (popAction === "Right blink" && action === "Right eye blink") ||
      (popAction === "Mouth puckered" && action === "Mouth puckered")
    );

    if (shouldPop) {
      setBubble(prevBubble => ({ ...prevBubble, popped: true }));
    }
  }, [dotPosition, action, bubble, popAction]);

  // Effect to create a new bubble after the current one is popped
  useEffect(() => {
    if (bubble && bubble.popped) {
      const timeoutId = setTimeout(() => {
        createBubble();
      }, 500);

      return () => clearTimeout(timeoutId);
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
              top: `${bubble.position.y - 40}px`,
              left: `${bubble.position.x - 40}px`,
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              backgroundColor: 'blue',
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '14px',
              textAlign: 'center',
              padding: '5px'
            }}
          >
            {popAction}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom cursor */}
      <div
        style={{
          position: 'absolute',
          top: `${dotPosition.y}px`,
          left: `${dotPosition.x}px`,
          width: '15px',
          height: '15px',
          backgroundColor: 'grey',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)', // Center the custom cursor
          pointerEvents: 'none'
        }}
      />
    </div>
  );
}
