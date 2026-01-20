import Link from "next/link";
import Image from "next/image";
import { fetchBlogs } from "@/lib/strapi";

export const metadata = {
  title: "Blog | OSSBrowser",
  description: "Deep dives, product updates, and analysis on building OSSBrowser.",
};

export default async function BlogPage() {
  const data = await fetchBlogs();
  const blogs = data.data;

  return (
    <div className="max-w-6xl mx-auto py-24 px-4">
      <div className="text-center max-w-2xl mx-auto mb-20">
        <h1 className="text-5xl font-bold mb-6 text-gray-900">Blog</h1>
        <p className="text-lg text-gray-600">
          Deep dives, product updates, and analysis on building OSSBrowser.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
        {blogs.map((post: any) => {
          const imageUrl = post.cover_image?.url
            ? `${process.env.STRAPI_URL}${post.cover_image.url}`
            : null;

          return (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block group cursor-pointer"
            >
              <article className="flex flex-col">
                <div className="relative w-full aspect-4/3 mb-4 rounded-lg overflow-hidden bg-gray-100">
                  {imageUrl && (
                    <Image
                      src={imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  )}
                </div>

                <div className="flex flex-col">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
              </article>
            </Link>
          );
        })}
      </div>
    </div>
  );
}