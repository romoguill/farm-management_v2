import AuthSection from './auth-section';
import Logo from './logo';

type NavbarProps = {};

function Navbar({}: NavbarProps) {
  return (
    <nav className='flex items-center justify-center'>
      <div className='container flex items-center justify-between p-8'>
        <Logo />
        <AuthSection />
      </div>
    </nav>
  );
}

export default Navbar;
