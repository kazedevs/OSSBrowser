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

  const data = await res.json();
  
  return {
    data: data.data.map((post: any) => ({
      id: post.id,
      slug: post.attributes.slug,
      title: post.attributes.title,
      excerpt: post.attributes.excerpt,
      content: post.attributes.content,
      date: new Date(post.attributes.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      cover_image: post.attributes.cover_image?.data?.attributes?.url 
        ? `${STRAPI_URL}${post.attributes.cover_image.data.attributes.url}`
        : null,
      publishedAt: post.attributes.publishedAt,
    }))
  };
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

  const data = await res.json();
  
  // Check if blog post exists
  if (!data.data || data.data.length === 0) {
    return null;
  }

  const post = data.data[0];
  
  return {
    id: post.id,
    slug: post.attributes.slug,
    title: post.attributes.title,
    excerpt: post.attributes.excerpt,
    content: post.attributes.content,
    date: new Date(post.attributes.publishedAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    cover_image: post.attributes.cover_image?.data?.attributes?.url 
      ? `${STRAPI_URL}${post.attributes.cover_image.data.attributes.url}`
      : null,
    publishedAt: post.attributes.publishedAt,
    createdAt: post.attributes.createdAt,
  };
}