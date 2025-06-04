import React, { useState } from "react";
import MenuBar from "./MenuBar";

// Set these to your image's actual pixel dimensions!
// const IMAGE_URL = "https://i.postimg.cc/fLfTSsBf/update-map.png";
// const IMAGE_URL = "https://i.postimg.cc/fLfTSsBf/update-map.png";
const IMAGE_URL = 'https://i.postimg.cc/jqBC1bV4/new.png'
const IMAGE_WIDTH = 3000;
const IMAGE_HEIGHT = 2000;

const LargeImageScroller: React.FC = () => {
  const [offset, setOffset] = useState({ x: -500, y: -750 });
  const [dragging, setDragging] = useState(false);
  const [start, setStart] = useState<{ x: number; y: number } | null>(null);

  // Helper to clamp offset so the image can't be dragged out of view
  const clampOffset = (x: number, y: number) => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const imgW = IMAGE_WIDTH;
    const imgH = IMAGE_HEIGHT;
    // Clamp so at least part of the image always covers the viewport
    const minX = Math.min(0, vw - imgW);
    const maxX = 0;
    const minY = Math.min(0, vh - imgH);
    const maxY = 0;
    return {
      x: Math.max(minX, Math.min(maxX, x)),
      y: Math.max(minY, Math.min(maxY, y)),
    };
  };

  const onMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    setStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging || !start) return;
    const newOffset = {
      x: e.clientX - start.x,
      y: e.clientY - start.y,
    };
    setOffset(clampOffset(newOffset.x, newOffset.y));
  };

  const onMouseUp = () => setDragging(false);

  // Only allow panning
  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const newOffset = {
      x: offset.x - e.deltaX,
      y: offset.y - e.deltaY,
    };
    setOffset(clampOffset(newOffset.x, newOffset.y));
  };

  return (
    <>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          position: "relative",
          cursor: dragging ? "grabbing" : "grab",
          background: "#222",
        }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onWheel={onWheel}
      >
        <img
          src={IMAGE_URL}
          alt="Large Map"
          style={{
            position: "absolute",
            left: offset.x,
            top: offset.y,
            width: IMAGE_WIDTH,
            height: IMAGE_HEIGHT,
            userSelect: "none",
            pointerEvents: "none",
            backgroundColor: "#4c61b7",
          }}
          draggable={false}
        />
      </div>
      <MenuBar />
    </>
  );
};

export default LargeImageScroller;
