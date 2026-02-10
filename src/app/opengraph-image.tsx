import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Greybird — Experience Meets Opportunity";
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
          background: "linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        {/* Bird Icon */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "30px",
          }}
        >
          <svg
            width="120"
            height="120"
            viewBox="0 0 100 100"
            fill="none"
            style={{ marginRight: "20px" }}
          >
            {/* Simplified geometric bird */}
            <circle cx="50" cy="50" r="45" fill="#64748b" />
            <path
              d="M30 55 L50 35 L70 55 L50 45 Z"
              fill="#cbd5e1"
            />
            <circle cx="45" cy="45" r="5" fill="#1e293b" />
          </svg>
          <span
            style={{
              fontSize: "72px",
              fontWeight: 800,
              color: "#f1f5f9",
              letterSpacing: "-2px",
            }}
          >
            GREYBIRD
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: "36px",
            fontWeight: 500,
            color: "#94a3b8",
            marginBottom: "40px",
          }}
        >
          Experience Meets Opportunity
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: "24px",
            color: "#64748b",
            maxWidth: "800px",
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          Connect with senior professionals for part-time projects,
          advisory sessions, and flexible work
        </div>

        {/* Domain */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            fontSize: "28px",
            fontWeight: 600,
            color: "#cbd5e1",
          }}
        >
          greybird.pro
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
