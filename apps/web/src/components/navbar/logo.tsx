import Image from 'next/image';

function Logo() {
  return (
    <div>
      <Image
        src={'/logo.PNG'}
        width={70}
        height={70}
        alt='farm logo'
        className='rounded-xl'
      />
    </div>
  );
}
export default Logo;
