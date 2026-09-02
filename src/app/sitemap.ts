import type { MetadataRoute } from "next";

const SITIO =
  process.env.NEXT_PUBLIC_SITIO_URL ?? "https://la5taavenida.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const ahora = new Date();
  return [
    { url: SITIO, lastModified: ahora, changeFrequency: "monthly", priority: 1 },
    {
      url: `${SITIO}/menu`,
      lastModified: ahora,
      // El menu cambia mas seguido que el resto del sitio.
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}
