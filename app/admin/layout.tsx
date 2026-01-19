export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased font-sans flex flex-col min-h-screen shadow-none">
        {children}
      </body>
    </html>
  );
}
