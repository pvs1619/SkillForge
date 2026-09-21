import { ImageResponse } from "next/og";


export const alt = "SkillForge — Learn something worth building.";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#f8fafc",
          padding: "60px 80px",
          fontFamily: "sans-serif",
          border: "16px solid #e2e8f0",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "8px",
              backgroundColor: "#1e40af",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            SF
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: "28px",
                fontWeight: "bold",
                color: "#0f172a",
                letterSpacing: "-0.5px",
              }}
            >
              SkillForge
            </span>
            <span
              style={{
                fontSize: "14px",
                color: "#64748b",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              University Practical Learning Platform
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              backgroundColor: "#ecfdf5",
              color: "#065f46",
              padding: "6px 16px",
              borderRadius: "20px",
              fontSize: "16px",
              fontWeight: "600",
              border: "1px solid #a7f3d0",
            }}
          >
            PRACTICAL LEARNING • WORKSHOPS • SKILLS
          </div>
          <h1
            style={{
              fontSize: "58px",
              fontWeight: "800",
              color: "#0f172a",
              lineHeight: 1.15,
              margin: 0,
              letterSpacing: "-1px",
            }}
          >
            Learn something worth building.
          </h1>
          <p
            style={{
              fontSize: "22px",
              color: "#475569",
              margin: 0,
              maxWidth: "850px",
              lineHeight: 1.4,
            }}
          >
            Discover practical, focused university workshops designed to turn curiosity into applied software and analytical skills.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid #e2e8f0",
            paddingTop: "24px",
          }}
        >
          <div style={{ display: "flex", gap: "24px", color: "#64748b", fontSize: "16px" }}>
            <span>• Artificial Intelligence</span>
            <span>• Data & Analytics</span>
            <span>• Web Development</span>
            <span>• Cybersecurity</span>
          </div>
          <span style={{ fontSize: "16px", color: "#1e40af", fontWeight: "600" }}>
            skillforge.edu
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
