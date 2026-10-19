import { ImageResponse } from "next/og";

export const alt = "Elmasry Tech — Software development company in Egypt";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Latin-only artwork: the OG renderer has no Arabic shaping, so the brand
// card is shared by both locales (titles/descriptions are still localized).
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          // the site's own look (dark, orange accent) — it was a light card with another logo
          background: "#0a0a0b",
          backgroundImage:
            "linear-gradient(rgba(237,234,227,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(237,234,227,0.05) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          color: "#edeae3",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ display: "flex", alignItems: "center", fontSize: 40, fontWeight: 700, color: "#ff5b1f", letterSpacing: -1 }}>
            {"<"}
            <div style={{ width: 12, height: 12, borderRadius: 12, background: "#ff5b1f", margin: "0 6px" }} />
            {">"}
          </div>
          <div style={{ display: "flex", fontSize: 36, fontWeight: 700, letterSpacing: -1 }}>
            elmasry<span style={{ color: "#ff5b1f" }}>/</span>tech
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 78, fontWeight: 700, letterSpacing: -3, lineHeight: 1.02, maxWidth: 950 }}>
            We build the software your business runs on.
          </div>
          <div style={{ display: "flex", gap: 14, marginTop: 36, fontSize: 26, color: "#a8a49b" }}>
            {["Websites", "iOS & Android", "ERP & POS", "AI & Automation"].map((s) => (
              <div key={s} style={{ border: "1px solid rgba(237,234,227,0.2)", borderRadius: 999, padding: "8px 20px", display: "flex" }}>
                {s}
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#a8a49b" }}>
          <div style={{ display: "flex" }}>Software development company · Cairo, Egypt</div>
          <div style={{ display: "flex", color: "#ff5b1f" }}>Arabic · English</div>
        </div>
      </div>
    ),
    size
  );
}
