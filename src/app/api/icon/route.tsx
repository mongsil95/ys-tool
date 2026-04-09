import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const size = parseInt(req.nextUrl.searchParams.get("size") ?? "192");

  return new ImageResponse(
    (
      <div
        style={{
          background: "#0d0d0d",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            color: "#22d3ee",
            fontSize: Math.floor(size * 0.42),
            fontWeight: 700,
            fontFamily: "Arial",
          }}
        >
          YS
        </span>
      </div>
    ),
    { width: size, height: size }
  );
}
