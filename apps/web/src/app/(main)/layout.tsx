import Navbar from '@/components/navbar';
import { PropsWithChildren } from 'react';

function MainLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
export default MainLayout;
