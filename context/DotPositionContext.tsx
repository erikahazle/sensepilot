import React, { createContext, useState, useContext, useEffect, useRef } from 'react';

// Create the context
const DotPositionContext = createContext(null);

// Create the provider component
export const DotPositionProvider = ({ children }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // State to hold the position of the red dot
  const [dotPosition, setDotPosition] = useState({ x: 600, y: 600 });
  const [action, setAction] = useState("");

  const smoothKernel = [0.1, 0.25, 0.3, 0.25, 0.1];
  const smoothingBufferX = useRef([]);
  const smoothingBufferY = useRef([]);

  const prevPosition = useRef({ x: 600, y: 600 });

  const applySmoothing = (data, kernel) => {
    const smoothN = kernel.length;
    const weightedSum = data
      .slice(-smoothN)
      .reduce((sum, value, index) => sum + value * kernel[index], 0);
    return weightedSum;
  };

  const calculateVelocity = (smoothX, smoothY) => {
    const velX = smoothX - prevPosition.current.x;
    const velY = smoothY - prevPosition.current.y;

    prevPosition.current = { x: smoothX, y: smoothY };

    // Apply velocity scaling (similar to asymmetry_scale in Python)
    const speedUp = 20;
    const speedDown = 20;
    const speedLeft = 20;
    const speedRight = 20;

    const scaledVelX = velX > 0 ? velX * speedRight : velX * speedLeft;
    const scaledVelY = velY > 0 ? velY * speedDown : velY * speedUp;

    return { x: scaledVelX, y: scaledVelY };
  };

  const updateDotPosition = (newX, newY) => {
    // Update the smoothing buffers
    smoothingBufferX.current.push(newX);
    smoothingBufferY.current.push(newY);

    // Ensure the buffers don't exceed the smoothing kernel length
    if (smoothingBufferX.current.length > smoothKernel.length) smoothingBufferX.current.shift();
    if (smoothingBufferY.current.length > smoothKernel.length) smoothingBufferY.current.shift();

    // Apply smoothing if we have enough data points
    if (smoothingBufferX.current.length >= smoothKernel.length) {
      const smoothedX = applySmoothing(smoothingBufferX.current, smoothKernel);
      const smoothedY = applySmoothing(smoothingBufferY.current, smoothKernel);

      const velocity = calculateVelocity(smoothedX, smoothedY);

      // Update dot position based on velocity
      setDotPosition((prev) => ({
        x: Math.min(Math.max(prev.x + velocity.x, 0), window.innerWidth),
        y: Math.min(Math.max(prev.y + velocity.y, 0), window.innerHeight)
      }));
    }
  };

  useEffect(() => {
    async function setupFaceLandmarker() {
      try {
        const vision = await import('../public/mediapipe/vision_bundle.mjs');
        const { FaceLandmarker, FilesetResolver } = vision;
        const filesetResolver = await FilesetResolver.forVisionTasks("/mediapipe/wasm");

        const faceLandmarker = await FaceLandmarker.createFromOptions(filesetResolver, {
          baseOptions: {
            modelAssetPath: `/mediapipe/face_landmarker_v2_with_blendshapes.task`,
            delegate: "GPU"
          },
          outputFaceBlendshapes: true,
          outputFacialTransformationMatrixes: false,
          runningMode: "VIDEO",
          numFaces: 1
        });

        if (videoRef.current) {
          const video = videoRef.current;

          const predictWebcam = () => {
            if (video.readyState === video.HAVE_ENOUGH_DATA) {
              const faceLandmarkerResult = faceLandmarker.detectForVideo(video, performance.now());
              if (faceLandmarkerResult && faceLandmarkerResult.faceLandmarks) {
                const blendshapes = faceLandmarkerResult.faceBlendshapes[0]?.categories;

                // Action detection
                if (blendshapes) {
                  const jawOpen = blendshapes.find(shape => shape.categoryName === 'jawOpen');
                  const eyeBlinkLeft = blendshapes.find(shape => shape.categoryName === 'eyeBlinkLeft');
                  const eyeBlinkRight = blendshapes.find(shape => shape.categoryName === 'eyeBlinkRight');
                  const mouthPucker = blendshapes.find(shape => shape.categoryName === 'mouthPucker');
                  if (jawOpen?.score > 0.2) {
                    setAction('Mouth is open');
                  } else if (eyeBlinkLeft?.score > 0.3) {
                    setAction('Left eye blink');
                  } else if (eyeBlinkRight?.score > 0.3) {
                    setAction('Right eye blink');
                  } else if (mouthPucker?.score > 0.8) {
                    setAction('Mouth puckered');
                  } else {
                    setAction('');
                  }
                }

                // Check if the landmark 8 exists
                if (faceLandmarkerResult.faceLandmarks[0] && faceLandmarkerResult.faceLandmarks[0][8]) {
                  const landmark = faceLandmarkerResult.faceLandmarks[0][8];
                  
                  // Reverse the xPixel value to mirror horizontally
                  const xPixel = window.innerWidth - (landmark.x * window.innerWidth);
                  const yPixel = landmark.y * window.innerHeight;

                  updateDotPosition(xPixel, yPixel);
                } else {
                  console.error('Landmark 8 not found.');
                }
              }
            }
            requestAnimationFrame(predictWebcam);
          };

          const enableCam = async () => {
            try {
              const stream = await navigator.mediaDevices.getUserMedia({ video: true });
              video.srcObject = stream;

              video.style.display = 'none';
              video.addEventListener("loadeddata", () => {
                console.log("Starting webcam predictions...");
                requestAnimationFrame(predictWebcam);
              });
            } catch (err) {
              console.error("Error accessing webcam:", err);
              alert("Unable to access the webcam. Please allow access to continue.");
            }
          };

          enableCam();
        }

      } catch (err) {
        console.error("Error setting up FaceLandmarker:", err);
      }
    }

    setupFaceLandmarker();
  }, []);
  
  return (
    <DotPositionContext.Provider value={{ dotPosition, action }}>
      <video ref={videoRef} autoPlay playsInline style={{ display: 'none' }}></video>
      {children}
    </DotPositionContext.Provider>
  );
};

// Custom hook to use the DotPositionContext
export const useDotPosition = () => {
  return useContext(DotPositionContext);
};
