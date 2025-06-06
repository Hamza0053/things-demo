import React, { useState, useEffect } from "react";
import MenuBar from "./MenuBar";

// Set these to your image's actual pixel dimensions!
// const IMAGE_URL = "https://i.postimg.cc/fLfTSsBf/update-map.png";
// const IMAGE_URL = "https://i.postimg.cc/fLfTSsBf/update-map.png";
const IMAGE_URL = '/newgridthing.png'
const IMAGE_WIDTH = 3000;
const IMAGE_HEIGHT = 2000;

// Responsive dimensions based on screen size
const getResponsiveDimensions = () => {
  const isMobile = window.innerWidth <= 768;
  if (isMobile) {
    return {
      width: Math.min(window.innerWidth * 7, IMAGE_WIDTH),
      height: Math.min(window.innerHeight * 2, IMAGE_HEIGHT)
    };
  }
  return {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT
  };
};

const LargeImageScroller: React.FC = () => {
  // Detect mobile device
  const isMobile = window.innerWidth <= 768;
  const [offset, setOffset] = useState(
    isMobile ? { x: -1100, y: -300 } : { x: -500, y: -750 }
  );
  const [dragging, setDragging] = useState(false);
  const [start, setStart] = useState<{ x: number; y: number } | null>(null);
  const [scale, setScale] = useState(1);
  const [dimensions, setDimensions] = useState(getResponsiveDimensions());

  // Update dimensions on window resize
  useEffect(() => {
    const handleResize = () => {
      setDimensions(getResponsiveDimensions());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Helper to clamp offset so the image can't be dragged out of view
  const clampOffset = (x: number, y: number) => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const imgW = dimensions.width * scale;
    const imgH = dimensions.height * scale;
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

  // Touch event handlers
  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setDragging(true);
      setStart({
        x: e.touches[0].clientX - offset.x,
        y: e.touches[0].clientY - offset.y,
      });
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!dragging || !start || e.touches.length !== 1) return;
    const newOffset = {
      x: e.touches[0].clientX - start.x,
      y: e.touches[0].clientY - start.y,
    };
    setOffset(clampOffset(newOffset.x, newOffset.y));
  };

  const onTouchEnd = () => setDragging(false);

  // Handle pinch zoom
  const onTouchStartPinch = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const initialDistance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );
      setStart({ x: initialDistance, y: 0 });
    }
  };

  const onTouchMovePinch = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && start) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const currentDistance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );
      const newScale = Math.max(0.5, Math.min(2, scale * (currentDistance / start.x)));
      setScale(newScale);
      setStart({ x: currentDistance, y: 0 });
    }
  };

  // Only allow panning
  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const newOffset = {
      x: offset.x - e.deltaX,
      y: offset.y - e.deltaY,
    };
    setOffset(clampOffset(newOffset.x, newOffset.y));
  };

  // Add viewport meta tag for proper mobile scaling
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

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
          touchAction: "none", // Prevent default touch actions
        }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onWheel={onWheel}
        onTouchStart={(e) => {
          onTouchStart(e);
          onTouchStartPinch(e);
        }}
        onTouchMove={(e) => {
          onTouchMove(e);
          onTouchMovePinch(e);
        }}
        onTouchEnd={onTouchEnd}
      >
        <img
          src={IMAGE_URL}
          alt="Large Map"
          style={{
            position: "absolute",
            left: offset.x,
            top: offset.y,
            width: dimensions.width * scale,
            height: dimensions.height * scale,
            userSelect: "none",
            pointerEvents: "none",
            backgroundColor: "#4c61b7",
            transform: `scale(${scale})`,
            transformOrigin: "0 0",
            objectFit: "contain",
          }}
          draggable={false}
        />
      </div>
      <MenuBar />
    </>
  );
};

export default LargeImageScroller;
