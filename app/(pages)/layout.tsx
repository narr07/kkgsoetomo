import PageTransition from '@/components/PageTransition';

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main>
        <PageTransition>
          {children}
        </PageTransition>
      </main>
    </>
  );
}
