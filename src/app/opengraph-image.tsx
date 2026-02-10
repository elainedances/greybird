import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Greybird — Experience Meets Opportunity";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  // Fetch logo from production URL
  const logoResponse = await fetch("https://greybird.pro/logo.png");
  const logoData = await logoResponse.arrayBuffer();

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
        {/* Logo + Brand Name */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "30px",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoData as unknown as string}
            width={140}
            height={140}
            alt="Greybird Logo"
            style={{ marginRight: "24px" }}
          />
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
