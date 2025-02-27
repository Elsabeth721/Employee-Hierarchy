'use client';
import {
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandYoutube,
} from "@tabler/icons-react";
import { ActionIcon, Anchor, Group } from "@mantine/core";
import Image from "next/image";
import classes from "./FooterCentered.module.css";

const links = [
  // { link: "#", label: "Home" },
  // { link: "#", label: "About" },
  // { link: "#", label: "Contact" },
  { link: "#", label: "All right reserved @2025." },
];

export function FooterCentered() {
  const items = links.map((link) => (
    <Anchor
      className={classes.links} // Ensure this class is applied to the Anchor
      key={link.label}
      href={link.link}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <div className={classes.inner}>
      <Image
          src="/perago-white.webp"
          alt="Perago Logo"
          width={150}
          height={150}
          priority
        />{" "}
        <Group className={classes.links} color="white">{items}</Group>
      
        <Group gap="xs" justify="flex-end" wrap="nowrap">
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandTwitter size={18} stroke={1.5} color="green" />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandYoutube size={18} stroke={1.5} color="green" />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandInstagram size={18} stroke={1.5} color="green" />
          </ActionIcon>
        </Group>
      </div>
    </div>
  );
}
