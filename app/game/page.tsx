'use client';
import { useEffect, useRef, useState } from 'react';

export default function Game() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [dotPosition, setDotPosition] = useState({ x: 0, y: 0 });

  // Smoothing kernel similar to the one provided
// New kernel with increased smoothness (Gaussian-like distribution)
  const smoothKernel = [0.014, 0.031, 0.067, 0.124, 0.179, 0.200, 0.179, 0.124, 0.067, 0.031, 0.014];
  const smoothingBufferX = useRef([]);
  const smoothingBufferY = useRef([]);

  const applySmoothing = (data, kernel) => {
    const smoothN = kernel.length;
    const weightedSum = data
      .slice(-smoothN)
      .reduce((sum, value, index) => sum + value * kernel[index], 0);
    return weightedSum;
  };

  useEffect(() => {
    async function setupFaceLandmarker() {
      try {
        const vision = await import('../../public/mediapipe/vision_bundle.mjs');
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
                let xPixel = 0.0
                let yPixel = 0.0
                xPixel = faceLandmarkerResult.faceLandmarks[0][8].x * window.innerWidth
                yPixel = faceLandmarkerResult.faceLandmarks[0][8].y * window.innerHeight

                const pixelFloat32Array = new Float32Array([xPixel, yPixel]);
                console.log(pixelFloat32Array)
                
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
    <>
      <video ref={videoRef} autoPlay playsInline style={{ display: 'none' }}></video>
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
          pointerEvents: 'none'  // Ensures the dot does not interfere with other interactions
        }} 
      />
    </>
  );
}
