"use client";

import "@mantine/core/styles.css";
import "./globals.css";
import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from "@mantine/core";
import Navbar from "./Components/Navbar";
import { FooterCentered } from "./Components/Footer";
import ReduxProvider from "./redux/Provider";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hideLayout = pathname.startsWith("/admin-dashboard");

  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
      <link
    href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"
    rel="stylesheet"
  />
        <ColorSchemeScript />
      </head>
      <body>
        <ReduxProvider>
          <MantineProvider>
            {!hideLayout && <Navbar />}
            {children}
            {!hideLayout && <FooterCentered />}
          </MantineProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}

export default RootLayout;
