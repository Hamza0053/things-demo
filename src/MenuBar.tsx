import React, { useState, useEffect, useRef } from "react";

const menuItems = [
  "Downtown",
  "Waterfront",
  "Residential",
  "Parks",
  "Transport",
  "Landmarks",
];

const MOBILE_BREAKPOINT = 768;

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= MOBILE_BREAKPOINT);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return isMobile;
};

const MenuBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on Escape key
  // useEffect(() => {
  //   if (!isMenuOpen) return;
  //   const onKeyDown = (e: KeyboardEvent) => {
  //     if (e.key === "Escape") setIsMenuOpen(false);
  //   };
  //   window.addEventListener("keydown", onKeyDown);
  //   return () => window.removeEventListener("keydown", onKeyDown);
  // }, [isMenuOpen]);

  // Click outside to close
  // useEffect(() => {
  //   if (!isMenuOpen) return;
  //   const handleClick = (e: MouseEvent) => {
  //     if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
  //       setIsMenuOpen(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", handleClick);
  //   return () => document.removeEventListener("mousedown", handleClick);
  // }, [isMenuOpen]);

  // Hamburger icon lines
  const lineStyle = {
    width: 24,
    height: 2,
    backgroundColor: "#fff",
    margin: "6px 0",
    transition: "0.4s cubic-bezier(.4,2,.6,1)",
  } as React.CSSProperties;

  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        top: 10,
        right: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 12px 0 12px",
        background: "transparent",
        width: "100vw",
        boxSizing: "border-box",
        minHeight: 48,
        zIndex: 1000,
      }}
    >
      <input
        type="text"
        placeholder="Search locations..."
        style={{
          width: "100%",
          maxWidth: 250,
          padding: "16px 20px",
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(8px)",
          borderRadius: 12,
          border: "1px solid rgba(255, 255, 255, 0.2)",
          color: "#fff",
          fontSize: 16,
          outline: "none",
          marginRight: 32,
        }}
      />

      {/* Hamburger Menu Button */}
      {isMobile && (
        <button
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen((v) => !v);
          }}
          style={{
            display: "block",
            background: "rgba(0,0,0,0.15)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: 12,
            cursor: "pointer",
            padding: 8,
            marginRight: 12,
            zIndex: 1300,
            transition: "background 0.2s",
            position: "relative",
          }}
        >
          <div
            style={{
              ...lineStyle,
              transform: isMenuOpen ? "rotate(-45deg) translate(-5px, 6px)" : "none",
            }}
          />
          <div
            style={{
              ...lineStyle,
              opacity: isMenuOpen ? 0 : 1,
            }}
          />
          <div
            style={{
              ...lineStyle,
              transform: isMenuOpen ? "rotate(45deg) translate(-5px, -6px)" : "none",
            }}
          />
        </button>
      )}

      {/* Desktop Menu */}
      {!isMobile && (
        <div
          style={{
            display: "flex",
            gap: 32,
            marginRight: 20,
          }}
        >
          {menuItems.map((item) => (
            <span
              key={item}
              style={{
                color: "#fff",
                textShadow: "0 1px 6px rgba(0,0,0,0.7)",
                fontSize: 18,
                fontWeight: 400,
                cursor: "pointer",
                transition: "color 0.2s",
              }}
            >
              {item}
            </span>
          ))}
        </div>
      )}

      {/* Mobile Menu with smooth transition */}
      <div
        ref={menuRef}
        onClick={(e) => e.stopPropagation()}
        style={{
          pointerEvents: isMenuOpen && isMobile ? "auto" : "none",
          position: "fixed",
          top: 96,
          right: 0,
          width: 220,
          minHeight: 320,
          flexDirection: "column",
          background: "rgba(0, 0, 0, 0.92)",
          backdropFilter: "blur(12px)",
          padding: "20px 0 20px 0",
          borderRadius: "18px 0 0 18px",
          boxShadow: "0 8px 32px 0 rgba(0,0,0,0.25)",
          transform: isMenuOpen && isMobile ? "translateX(0)" : "translateX(110%)",
          transition: "transform 0.45s cubic-bezier(.4,2,.6,1), box-shadow 0.2s",
          display: isMobile ? "flex" : "none",
          zIndex: 1200,
        }}
        aria-hidden={!isMenuOpen}
      >
        {menuItems.map((item, index) => (
          <span
            key={item}
            style={{
              color: "#fff",
              textShadow: "0 1px 6px rgba(0,0,0,0.7)",
              fontSize: 20,
              fontWeight: 500,
              cursor: "pointer",
              transition: "color 0.2s, background 0.2s",
              padding: "18px 32px",
              borderBottom: index === menuItems.length - 1 ? "none" : "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: 0,
              background: "transparent",
              display: "block",
            }}
            tabIndex={isMenuOpen ? 0 : -1}
            // onClick={() => setIsMenuOpen(false)}
            // onKeyDown={e => {
            //   if (e.key === "Enter" || e.key === " ") setIsMenuOpen(false);
            // }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MenuBar; 