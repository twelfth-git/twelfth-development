import Sidebar from '@/components/layout/Sidebar';

interface ThreeColumnLayoutProps {
  mainContent: React.ReactNode;
  rightColumnContent: React.ReactNode;
}

export default function ThreeColumnLayout({ mainContent, rightColumnContent }: ThreeColumnLayoutProps) {
  return (
    <div className='max-w-[1320px] mx-auto flex min-h-screen'>
      <header className="w-[280px]">
        <Sidebar />
      </header>
      <main className="flex-1 border-x border-lines">
        {mainContent}
      </main>
      <aside className="w-[440px]">
        {rightColumnContent}
      </aside>
    </div>
  );
}