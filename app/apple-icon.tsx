import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#2C4A3B",
        }}
      >
        <div
          style={{
            fontSize: 88,
            fontStyle: "italic",
            fontFamily: "serif",
            color: "#D8C39D",
          }}
        >
          BS
        </div>
      </div>
    ),
    { ...size }
  );
}