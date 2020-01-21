import React from "react";
import { useState, useEffect, useRef } from "react";
import { fabric } from "fabric";

export default function GoalPost(props) {
  const canvasRef = useRef();
  const [throwDescription, setThrowDescription] = useState({
    accurate: false,
    cords: { goalx: 0, goaly: 0 }
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
    const { goalx, goaly } = cords;
    const radius = 5;
    const object = new fabric.Circle({
      left: goalx - radius - 2,
      top: goaly - radius - 2,
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
    const { goalx, goaly } = cords;

    const object = new fabric.Path("M 0 0 L 7 7 M 0 7 L 7 0");
    object.set({
      left: goalx - 5,
      top: goaly - 5,
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
      console.log(`x: ${options.e.layerX} y: ${options.e.layerY}`);
      console.log(canvas.getObjects());

      if (canvas.getObjects().length > 2) {
        canvas.remove(canvas.getObjects()[2]);
      }

      if (!throwDescription.accurate) {
        canvas.add(
          addGoalIndicator({ goalx: options.e.layerX, goaly: options.e.layerY })
        );
        setThrowDescription({
          accurate: true,
          cords: { goalx: options.e.layerX, goaly: options.e.layerY }
        });
      } else {
        canvas.add(
          addMissIndicator({ goalx: options.e.layerX, goaly: options.e.layerY })
        );
        setThrowDescription({
          accurate: false,
          cords: { goalx: options.e.layerX, goaly: options.e.layerY }
        });
      }
    });
    return () => {
      props.goal(throwDescription.accurate);
      canvas.off("mouse:down");
    };
  }, [throwDescription.accurate]);

  useEffect(() => {
    props.goal(throwDescription);
  }, [throwDescription.accurate]);

  return (
    <div style={{ width: "250px", height: "150px" }}>
      <canvas ref={canvasRef} width="250px" height="150px"></canvas>
    </div>
  );
}
