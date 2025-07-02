import Link from "next/link";
import Image from "next/image";
import NavItems from "@/components/NavItems";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link href="/">
        <div className="flex items-center gap-2.5 cursor-pointer">
          <Image src="/images/logo.svg" alt="logo" width={46} height={44} />
        </div>
      </Link>
      <div className="flex items-center gap-8">
        <NavItems />
        <Button>Sign-In</Button>
      </div>
    </nav>
  );
};

export default Navbar;
