const STRAPI_URL = process.env.STRAPI_URL!;

export async function fetchBlogs() {
  const res = await fetch(
    `${STRAPI_URL}/api/blogs?populate=cover_image&sort=publishedAt:desc`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }

  return res.json();
}

export async function fetchBlogBySlug(slug: string) {
  const res = await fetch(
    `${STRAPI_URL}/api/blogs?filters[slug][$eq]=${slug}&populate=cover_image`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch blog");
  }

  return res.json();
}