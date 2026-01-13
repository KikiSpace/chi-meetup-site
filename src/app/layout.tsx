import type { Metadata } from "next";
import "./globals.css";
import { Layout } from "@/components/Layout";

export const metadata: Metadata = {
  title: "CHI Meetup: Generative Design & Vibe Coding",
  description: "Exploring Gen-AI assisted prototyping in HCI. A meetup for researchers, practitioners, and educators to explore generative design, agency, and best practices.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
