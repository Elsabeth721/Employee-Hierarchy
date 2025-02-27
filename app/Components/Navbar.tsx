"use client";
import { useState } from "react";
import {
  Burger,
  Drawer,
  Button,
  Group,
  Box,
  Divider,
  ScrollArea,
  Text,
  Anchor,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import Link from "next/link";
import Image from "next/image";

const Navbar: React.FC = () => {
  const [opened, { toggle, close }] = useDisclosure(false);
  const isMobile = useMediaQuery("(max-width: 768px)") ?? false;

  return (
    <Box className="bg-gray-100 shadow-md py-4 px-6 md:px-10">
      <Group justify="space-between" align="center">
      <Link href="/" className="text-center">
          <Image src="/per.webp" alt="Perago Logo" width={150} height={150} priority />
          <Text size="lg" className="text-gray-700 font-semibold mt-2">
            Employee Hierarchy
          </Text>
        </Link>


        {!isMobile && (
          <Group gap="xl">
            <Anchor component={Link} href="/" className="text-gray-700 hover:text-[#2f9e44] transition ease-in">
              Home
            </Anchor>
            <Anchor component={Link} href="#about" className="text-gray-700 hover:text-[#2f9e44]  transition ease-in">
              About
            </Anchor>
            <Anchor component={Link} href="#contact"  className="text-gray-700 hover:text-[#2f9e44] transition ease-in">
              Contact Us
            </Anchor>
          </Group>
        )}

        {!isMobile && <Button component={Link} href="/login" color="green">Login</Button>}

        {/* Mobile Menu */}
        {isMobile && <Burger opened={opened} onClick={toggle} />}
      </Group>

      {/* Mobile r */}
      <Drawer opened={opened} onClose={close} size="75%" padding="md" title="Perago Employee Hierarchy">
        <ScrollArea>
          <Divider my="sm" />
          <Anchor component={Link} href="/" onClick={close} className="text-[#2f9e44] hover:text-[#69db7c] block py-2 ">Home</Anchor>
          <Anchor component={Link} href="#about" onClick={close} className=" text-[#2f9e44] hover:text-[#69db7c] block py-2">About</Anchor>
          <Anchor component={Link} href="#contact" onClick={close} className="text-[#2f9e44] hover:text-[#69db7c] block py-2">Contact Us</Anchor>
          <Divider my="sm" />
          <Button component={Link} href="/login" color="green" fullWidth onClick={close}>Login</Button>
        </ScrollArea>
      </Drawer>
    </Box>
  );
};

export default Navbar;
