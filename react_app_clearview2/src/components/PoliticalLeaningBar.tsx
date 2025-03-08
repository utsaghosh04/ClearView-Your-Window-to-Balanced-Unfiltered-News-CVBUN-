import React, { useEffect, useRef } from "react";

interface ColorData {
  [key: string]: number;
}

interface ColorBarProps {
  data: ColorData;
}

const ColorBar: React.FC<ColorBarProps> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    let start = 0;

    for (const color in data) {
      gradient.addColorStop(start, color);
      start += data[color];
      if (start > 1) {
        gradient.addColorStop(1, color);  
      }
      else {
        gradient.addColorStop(start, color);
      }
    }

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, [data]);

  return (
    <div className="flex flex-col items-center">
      <canvas ref={canvasRef} className="w-full h-6" />
      {/* Labels under the bar */}
      <div className="flex w-full text-xs justify-between mt-2">
        <div style={{color: "#003366"}} className="font-medium text-left w-1/5">Far Left: {(data["#003366"] * 100).toFixed(2)}%</div>
        <div style={{color: "#0074D9"}} className="font-medium text-center w-1/5">Lean Left: {(data["#0074D9"] * 100).toFixed(2)}%</div>
        <div style={{color: "#A0AEC0"}} className="font-medium text-center w-1/5">Center: {(data["#A0AEC0"] * 100).toFixed(2)}%</div>
        <div style={{color: "#FF6B6B"}} className="font-medium text-center w-1/5">Lean Right: {(data["#FF6B6B"] * 100).toFixed(2)}%</div>
        <div style={{color: "#8B0000"}} className="font-medium text-right w-1/5">Far Right: {(data["#8B0000"] * 100).toFixed(2)}%</div>
      </div>
    </div>
  );
};

export default ColorBar;
