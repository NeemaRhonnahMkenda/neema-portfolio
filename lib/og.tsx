import { ImageResponse } from "next/og";
import { profile, skills } from "@/content/profile";
import { SITE_URL } from "@/lib/site";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_ALT = `${profile.name}, ${profile.role} in ${profile.location}`;

/** The preview card shown when the site is shared on LinkedIn, WhatsApp, X, Slack, etc. */
export function renderOgImage() {
  const tags = skills.flatMap((g) => g.items).slice(0, 4);
  const host = SITE_URL.replace(/^https?:\/\//, "");
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#f7f5f0",
          color: "#1b1d22",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 999,
              background: "#123f8c",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            NM
          </div>
          <div style={{ fontSize: 26, color: "#123f8c", letterSpacing: 4, textTransform: "uppercase" }}>
            {`${profile.role} · ${profile.location}`}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, fontWeight: 700, lineHeight: 1.02, letterSpacing: -2 }}>{profile.name}</div>
          <div style={{ fontSize: 34, color: "#5d6270", marginTop: 24, maxWidth: 960, lineHeight: 1.35 }}>{profile.intro}</div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", gap: 12 }}>
            {tags.map((t) => (
              <div
                key={t}
                style={{ display: "flex", fontSize: 22, padding: "8px 18px", borderRadius: 999, border: "2px solid #e3e0d8", background: "#fff" }}
              >
                {t}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#5d6270", whiteSpace: "nowrap" }}>{host}</div>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}

/** "NM" monogram used for the favicon and the home-screen icon. */
export function renderIcon(size: number) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#123f8c",
          color: "#ffffff",
          borderRadius: size * 0.22,
          fontSize: size * 0.42,
          fontWeight: 700,
          fontFamily: "sans-serif",
          letterSpacing: -size * 0.01,
        }}
      >
        NM
      </div>
    ),
    { width: size, height: size },
  );
}
