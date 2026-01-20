import { fetchBlogBySlug, fetchBlogs } from '@/lib/strapi';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = await fetchBlogBySlug(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await fetchBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <Link 
        href="/blog" 
        className="inline-flex items-center text-sm text-gray-500 hover:text-gray-800 mb-8 transition-colors no-underline"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Blog
      </Link>
      
      <article>
        <header className="mb-8">
          <div className="relative w-full h-64 md:h-96 mb-8 rounded-xl overflow-hidden bg-gray-100">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 800px"
            />
          </div>
          <time className="text-sm text-gray-500 block mb-3">{post.date}</time>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">{post.title}</h1>
        </header>
        
        <div 
          className="prose prose-lg prose-neutral max-w-none prose-headings:font-bold prose-a:text-blue-600 prose-img:rounded-xl"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
}

export async function generateStaticParams() {
  const blogs = await fetchBlogs();
  return blogs.data.map((post: any) => ({
    slug: post.slug,
  }));
}
