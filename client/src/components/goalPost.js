import React from "react";
import { useState, useEffect, useRef } from "react";
import { fabric } from "fabric";

export default function GoalPost(props) {
  const canvasRef = useRef();
  const [throwDescription, setThrowDescription] = useState({
    accurate: false,
    cords: { x: 0, y: 0 }
  });
  const innerRect = new fabric.Rect({
    left: 46,
    top: 50,
    fill: "grey",
    width: 150,
    height: 100,

    selectable: false,
    hoverCursor: "arrow"
  });

  const outerRect = new fabric.Rect({
    left: 42,
    top: 46,
    fill: "black",
    width: 158,
    height: 104,

    selectable: false,
    hoverCursor: "arrow"
  });

  const addGoalIndicator = cords => {
    const { x, y } = cords;
    const radius = 5;
    const object = new fabric.Circle({
      left: x - radius - 2,
      top: y - radius - 2,
      radius: radius,
      stroke: "white",
      strokeWidth: 2,
      fill: "rgba(0,0,0,0)",
      selectable: false,
      hoverCursor: "arrow"
    });
    return object;
  };

  const addMissIndicator = cords => {
    const { x, y } = cords;

    const object = new fabric.Path("M 0 0 L 7 7 M 0 7 L 7 0");
    object.set({
      left: x - 5,
      top: y - 5,
      stroke: "red",
      strokeWidth: 2,
      selectable: false,
      hoverCursor: "arrow"
    });
    return object;
  };

  // const addIndicator = (canvas)=>{
  //   canvas.add(goalIndicator)
  // }

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const canvas = new fabric.Canvas(canvasRef.current);
    canvas.backgroundColor = "green";
    canvas.add(outerRect);
    canvas.add(innerRect);
    canvasRef.current = canvas;
  }, []);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas = canvasRef.current;
    canvas.on("mouse:down", function(options) {
      console.log(`x: ${options.e.layerX / 50} y: ${options.e.layerY / 50}`);
      console.log(canvas.getObjects());

      if (canvas.getObjects().length > 2) {
        canvas.remove(canvas.getObjects()[2]);
      }

      if (!throwDescription.accurate) {
        canvas.add(
          addGoalIndicator({ x: options.e.layerX, y: options.e.layerY })
        );
        setThrowDescription({
          accurate: true,
          cords: { x: options.e.layerX / 50, y: options.e.layerY / 50 }
        });
      } else {
        canvas.add(
          addMissIndicator({ x: options.e.layerX, y: options.e.layerY })
        );
        setThrowDescription({
          accurate: false,
          cords: { x: options.e.layerX / 50, y: options.e.layerY / 50 }
        });
      }
    });
    return () => {
      props.test(throwDescription.accurate);
      canvas.off("mouse:down");
    };
  }, [throwDescription.accurate]);

  useEffect(() => {
    props.test(throwDescription);
  }, [throwDescription.accurate]);

  return (
    <div style={{ width: "250px", height: "150px" }}>
      <canvas ref={canvasRef} width="250px" height="150px"></canvas>
    </div>
  );
}
