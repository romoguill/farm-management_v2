import Image from 'next/image';
import { PropsWithChildren } from 'react';

function AuthLayout({ children }: PropsWithChildren) {
  return (
    <main className='relative flex h-screen w-full flex-col items-center justify-center'>
      <Image
        src='/bg-auth.jpg'
        alt='background field'
        height={800}
        width={800}
        className='absolute inset-0 -z-10 h-screen w-full object-cover backdrop-blur-md'
      />
      <div className='absolute inset-0 -z-10 backdrop-blur' />
      <div className='rounded-xl bg-gradient-to-b from-sky-50 to-green-50 p-5 shadow-md'>
        <h1 className='mb-6 text-2xl font-semibold'>Welcome to Farm</h1>
        {children}
      </div>
    </main>
  );
}
export default AuthLayout;
