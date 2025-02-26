"use client";
import { useState } from "react";
import { Burger, Drawer, Button } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks"; // Detect screen size
import Link from "next/link";
import Image from "next/image";


const Navbar: React.FC = () => {
  const [opened, setOpened] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)") ?? false; // Detect mobile screen

  return (
    <header className="bg-white shadow-md py-4 px-6 md:px-10 flex justify-between items-center">
    {/* Logo */}
    <Link href="/">
  <Image 
    src="/perago.png" 
    alt="Perago Logo" 
    width={250} 
    height={250} 
    priority 
  />
</Link>



      {/* Desktop Navigation (Hidden on Mobile) */}
      {!isMobile && (
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className=" hover:text-indigo-600 transition ease-in">Home</Link>
          <Link href="/about" className="hover:text-indigo-600 transition ease-in">About</Link>
          <Link href="/contact" className="hover:text-indigo-600 transition ease-in">Contact Us</Link>
        </nav>
      )}

      {/* Login Button (Desktop) */}
      {!isMobile && (
        <Button component={Link} href="/login" color="green">Login</Button>
      )}

      {/* Mobile Menu Button */}
      {isMobile && (
        <Burger
          opened={opened}
          onClick={() => setOpened(!opened)}
          className="md:hidden"
        />
      )}

      {/* Mobile Drawer (Only Visible on Small Screens) */}
      <Drawer
        opened={opened && isMobile}
        onClose={() => setOpened(false)}
        size="75%"
        padding="md"
      >
        <nav className="flex flex-col space-y-4 text-lg">
          <Link href="/" onClick={() => setOpened(false)}>Home</Link>
          <Link href="/about" onClick={() => setOpened(false)}>About</Link>
          <Link href="/contact" onClick={() => setOpened(false)}>Contact Us</Link>
          <Button component={Link} href="/login" color="green" fullWidth>Login</Button>
        </nav>
      </Drawer>
    </header>
  );
};

export default Navbar;
