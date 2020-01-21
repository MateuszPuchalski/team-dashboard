import React from "react";
import { useEffect, useState, useRef, useCallback } from "react";
import { fabric } from "fabric";

export default function SketchBoard(props) {
  // const [mousePosition, setMousePosition] = useState({});
  // const [isPainting, setIsPainting] = useState(false);
  // const canvasRef = useRef();

  // const startPaint = useCallback(event => {
  //   const coordinates = getCoordinates(event);
  //   if (coordinates) {
  //     setIsPainting(true);
  //     setMousePosition(coordinates);
  //   }
  // }, []);

  // const getCoordinates = event => {
  //   if (!canvasRef.current) {
  //     return;
  //   }
  //   const canvas = canvasRef.current;
  //   var rect = canvas.getBoundingClientRect();

  //   return {
  //     x: event.clientX - rect.left,
  //     y: event.clientY - rect.top
  //   };
  // };

  // useEffect(() => {
  //   if (!canvasRef.current) {
  //     return;
  //   }
  //   const canvas = canvasRef.current;
  //   canvas.addEventListener("mousedown", startPaint);
  //   return () => {
  //     canvas.removeEventListener("mousedown", startPaint);
  //   };
  // }, [startPaint]);

  // const paint = useCallback(
  //   event => {
  //     if (isPainting) {
  //       const newMousePosition = getCoordinates(event);
  //       if (mousePosition && newMousePosition) {
  //         drawLine(mousePosition, newMousePosition);
  //         setMousePosition(newMousePosition);
  //       }
  //     }
  //   },
  //   [isPainting, mousePosition]
  // );

  // const drawLine = (originalMousePosition, newMousePosition) => {
  //   if (!canvasRef.current) {
  //     return;
  //   }
  //   const canvas = canvasRef.current;
  //   const context = canvas.getContext("2d");
  //   if (context) {
  //     context.strokeStyle = "red";
  //     context.lineJoin = "round";
  //     context.lineWidth = 5;

  //     context.beginPath();
  //     context.moveTo(originalMousePosition.x, originalMousePosition.y);
  //     context.lineTo(newMousePosition.x, newMousePosition.y);
  //     context.closePath();

  //     context.stroke();
  //   }
  // };

  // useEffect(() => {
  //   if (!canvasRef.current) {
  //     return;
  //   }
  //   const canvas = canvasRef.current;
  //   canvas.addEventListener("mousemove", paint);
  //   return () => {
  //     canvas.removeEventListener("mousemove", paint);
  //   };
  // }, [paint]);

  // const exitPaint = useCallback(() => {
  //   setIsPainting(false);
  // }, []);

  // useEffect(() => {
  //   if (!canvasRef.current) {
  //     return;
  //   }
  //   const canvas = canvasRef.current;
  //   canvas.addEventListener("mouseup", exitPaint);
  //   canvas.addEventListener("mouseleave", exitPaint);
  //   return () => {
  //     canvas.removeEventListener("mouseup", exitPaint);
  //     canvas.removeEventListener("mouseleave", exitPaint);
  //   };
  // }, [exitPaint]);

  // const clear = () => {
  //   if (!canvasRef.current) {
  //     return;
  //   }
  //   const canvas = canvasRef.current;
  //   const context = canvas.getContext("2d");
  //   context.clearRect(0, 0, canvas.width, canvas.height);
  // };
  const canvasRef = useRef();

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const canvas = new fabric.Canvas(canvasRef.current);
    canvas.isDrawingMode = 1;

    document.getElementsByClassName("canvas-container")[0].style.position =
      "absolute";
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        id="fabricCanvas"
        height={704}
        width={1250}
      ></canvas>
    </>
  );
}
