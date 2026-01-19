interface ReadmeContentProps {
  html: string | null;
}

export default function ReadmeContent({ html }: ReadmeContentProps) {
  if (!html) {
    return (
      <div className="py-20 text-center border border-dashed border-border-subtle rounded-2xl">
        <p className="text-slate-400 font-medium italic">This project doesn't have a README available.</p>
      </div>
    );
  }

  return (
    <article className="border border-border-subtle rounded-xl p-8 md:p-12">
      <div 
        className="prose prose-slate max-w-none 
        prose-headings:font-bold prose-headings:tracking-tight
        prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
        prose-pre:bg-slate-900 prose-pre:rounded-lg
        prose-img:rounded-lg prose-code:text-blue-600 prose-code:bg-blue-50 prose-code:rounded px-0"
        dangerouslySetInnerHTML={{ __html: html }} 
      />
    </article>
  );
}
