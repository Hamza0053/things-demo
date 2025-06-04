import React from "react";

const menuItems = [
  "Downtown",
  "Waterfront",
  "Residential",
  "Parks",
  "Transport",
  "Landmarks",
];

const MenuBar: React.FC = () => (
  <div
    style={{
        position: "fixed",
        left: 0,
        top: 10,
        right: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "16px 0 0 12px",
      background: "transparent",
      width: "100vw",
      boxSizing: "border-box",
      minHeight: 48,
    }}
  >
    <input
      type="text"
      placeholder="Search locations..."
      style={{
        width: 250,
        paddingLeft: 20,
        paddingRight: 16,
        paddingTop: 16,
        paddingBottom: 16,
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(8px)",
        borderRadius: 12,
        border: "1px solid rgba(255, 255, 255, 0.2)",
        color: "#fff",
        fontSize: 16,
        outline: "none",
        marginRight: 32,
        "&::placeholder": {
          color: "rgba(255, 255, 255, 0.6)"
        },
        ":focus": {
          outline: "none",
          boxShadow: "0 0 0 2px rgba(255, 255, 255, 0.3)"
        }
      }}
    />


    <div style={{ display: "flex", gap: 32 , marginRight:20 }}>
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
  </div>
);

export default MenuBar; 