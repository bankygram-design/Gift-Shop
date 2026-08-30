import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "BYSIMON GIFTS - Thoughtfully Curated Gifts";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FAF6EF",
          backgroundImage:
            "radial-gradient(circle at 15% 15%, rgba(176,141,87,0.25), transparent 55%), radial-gradient(circle at 85% 85%, rgba(44,74,59,0.18), transparent 55%)",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: 6,
            color: "#B08D57",
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          Curated Gifting
        </div>
        <div
          style={{
            fontSize: 96,
            fontStyle: "italic",
            color: "#211F1C",
            fontFamily: "serif",
          }}
        >
          BYSIMON GIFTS
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#3A362F",
            marginTop: 28,
          }}
        >
          Make Every Moment Special
        </div>
      </div>
    ),
    { ...size }
  );
}
