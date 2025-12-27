import React from "react";
import { Metadata } from "next";
import AboutPage from "@/modules/about/AboutPage";

export const metadata: Metadata = {
  title: "About Us | N.S Coffee",
  description: "Discover our story and passion for coffee",
};

export default function Page() {
  return <AboutPage />;
}