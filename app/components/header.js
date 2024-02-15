import Image from "next/image";
import Link from "next/link";

import logo from "../../public/skyescreationslogo.webp";

function Header() {
  return (
    <header className='bg-white text-black p-2'>
      <div className='container mx-auto flex justify-between items-center'>
        <Link href='/'>
          <Image
            src={logo}
            alt='site logo'
            height={90}
            className='rounded-lg'
          />
        </Link>
        <nav>
          <ul className='flex space-x-6'>
            <li>
              <Link href='/' className='hover:text-blue-200'>
                Home
              </Link>
            </li>
            <li>
              <Link href='#' className='hover:text-blue-200'>
                Services
              </Link>
            </li>
            <li>
              <Link href='#' className='hover:text-blue-200'>
                Gallery
              </Link>
            </li>
            <li>
              <Link href='#' className='hover:text-blue-200'>
                Book
              </Link>
            </li>
          </ul>
        </nav>
        <div className='hover:text-blue-200 cursor-pointer'>Login</div>
      </div>
    </header>
  );
}

export default Header;
