export default function sitemap() {
  const baseUrl = "https://kokorin.cz";
  const lastModified = new Date();

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/booking`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ubytovani/kokorinsko`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/glamping/kokorinsko`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kempy/kokorinsko`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
