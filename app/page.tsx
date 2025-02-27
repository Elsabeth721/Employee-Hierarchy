"use client";
import { AboutUs } from "./Components/Aboutus";
import { ContactUs } from "./Components/Contactus";
import HeroImageRight from "./Components/Hero";

export default function Home() {
  return (
    <main>
      <HeroImageRight />
      
      <div id="about">
        <AboutUs />
      </div>

      <div id="contact">
        <ContactUs />
      </div>
    </main>
  );
}
