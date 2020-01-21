import React from "react";
import { fabric } from "fabric";
import { useEffect, useState, useRef, useCallback } from "react";

export default function FabricSketchBoard() {
  const canvasRef = useRef();

  const rect = new fabric.Rect({
    left: 100,
    top: 100,
    fill: "red",
    width: 20,
    height: 20
  });

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas = new fabric.Canvas(canvasRef.current);
    canvas.isDrawingMode = 1;
    console.log(canvas);
  }, []);
  return (
    <canvas
      ref={canvasRef}
      id="fabricCanvas"
      height={703}
      width={1250}
    ></canvas>
  );
}
