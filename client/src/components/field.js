import React from "react";
import { useState, useEffect, useRef } from "react";
import { fabric } from "fabric";

export default function Field(props) {
  const canvasRef = useRef();
  const [shotCords, setShotCords] = useState({
    shotx: 0,
    shoty: 0
  });
  const addShotIndicator = cords => {
    const { shotx, shoty } = cords;
    const radius = 5;
    const object = new fabric.Circle({
      left: shotx - radius - 2,
      top: shoty - radius - 2,
      radius: radius,
      stroke: "white",
      strokeWidth: 2,
      fill: "rgba(255,255,255,0.5)",
      selectable: false,
      hoverCursor: "arrow"
    });
    return object;
  };

  const sixMetersField = new fabric.Path(
    "M 30 0 Q 30 75 105 75 L 145 75 Q 220 75 220 0",
    {
      stroke: "red",
      fill: "rgba(0,0,0,0)",
      selectable: false,
      hoverCursor: "arrow"
    }
  );

  // nineMetersLine path "M 0 40 Q 0 115 105 115 L 145 115 Q 250 115 250 40"
  const nineMetersLine = new fabric.Path(
    "M 0 40 Q 10 100 125 115 Q 240 100 250 40",
    {
      strokeDashArray: [10, 10],
      stroke: "white",
      fill: "rgba(0,0,0,0)",
      selectable: false,
      hoverCursor: "arrow"
    }
  );

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const canvas = new fabric.Canvas(canvasRef.current);
    canvas.backgroundColor = "grey";
    canvas.add(sixMetersField);
    canvas.add(nineMetersLine);

    canvasRef.current = canvas;
  }, []);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas = canvasRef.current;
    canvas.on("mouse:down", function(options) {
      if (canvas.getObjects().length > 2) {
        canvas.remove(canvas.getObjects()[2]);
      }
      canvas.add(
        addShotIndicator({ shotx: options.e.layerX, shoty: options.e.layerY })
      );
      console.log(`x: ${options.e.layerX} y: ${options.e.layerY}`);
      setShotCords({ shotx: options.e.layerX, shoty: options.e.layerY });
    });
    return () => {
      canvas.off("mouse:down");
    };
  }, [shotCords]);

  useEffect(() => {
    props.shot(shotCords);
  }, [shotCords]);

  return (
    <div style={{ width: "250px", height: "250px" }}>
      <canvas ref={canvasRef} width="250px" height="250px"></canvas>
    </div>
  );
}
