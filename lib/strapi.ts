const STRAPI_URL = process.env.STRAPI_URL

if (!STRAPI_URL) {
  console.warn('STRAPI_URL is not defined');
}

export async function fetchBlogs() {
  if (!STRAPI_URL) {
    return { data: [] };
  }

  try {
    const res = await fetch(
      `${STRAPI_URL}/api/blogs?populate=cover_image&sort=publishedAt:desc`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.error("Failed to fetch blogs:", res.status, res.statusText);
      return { data: [] };
    }

    const data = await res.json();
    
    if (!data || !data.data || !Array.isArray(data.data)) {
      console.error("Invalid data structure from Strapi:", data);
      return { data: [] };
    }


    return {
      data: data.data
        .filter((post: any) => post && post.attributes && post.attributes.slug) // filter out invalid posts
        .map((post: any) => ({
          id: post.id,
          slug: post.attributes.slug,
          title: post.attributes.title || 'Untitled',
          excerpt: post.attributes.excerpt || '',
          content: post.attributes.content || '',
          date: post.attributes.publishedAt 
            ? new Date(post.attributes.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })
            : 'No date',
          cover_image: post.attributes.cover_image?.data?.attributes?.url 
            ? `${STRAPI_URL}${post.attributes.cover_image.data.attributes.url}`
            : null,
          publishedAt: post.attributes.publishedAt,
        }))
    };
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return { data: [] };
  }
}

export async function fetchBlogBySlug(slug: string) {
  if (!STRAPI_URL) {
    return null;
  }

  try {
    const res = await fetch(
      `${STRAPI_URL}/api/blogs?filters[slug][$eq]=${slug}&populate=cover_image`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.error("Failed to fetch blog:", res.status, res.statusText);
      return null;
    }

    const data = await res.json();
    
    if (!data || !data.data || !Array.isArray(data.data) || data.data.length === 0) {
      return null;
    }

    const post = data.data[0];
    
    // validate post structure
    if (!post || !post.attributes) {
      return null;
    }
    
    return {
      id: post.id,
      slug: post.attributes.slug,
      title: post.attributes.title || 'Untitled',
      excerpt: post.attributes.excerpt || '',
      content: post.attributes.content || '',
      date: post.attributes.publishedAt
        ? new Date(post.attributes.publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
        : 'No date',
      cover_image: post.attributes.cover_image?.data?.attributes?.url 
        ? `${STRAPI_URL}${post.attributes.cover_image.data.attributes.url}`
        : null,
      publishedAt: post.attributes.publishedAt,
      createdAt: post.attributes.createdAt,
    };
  } catch (error) {
    console.error("Error fetching blog by slug:", error);
    return null;
  }
}