import { Button } from '../ui/button';

type NavbarProps = {};

function Navbar({}: NavbarProps) {
  return (
    <nav>
      <div className='container flex justify-center p-8'>
        <div className='ml-auto flex gap-3'>
          <Button>Login</Button>
          <Button variant='secondary'>Register</Button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
