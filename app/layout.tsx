import type { Metadata } from "next";
import { Open_Sans, Source_Sans_3 } from "next/font/google";
import { Providers } from "@/components/Providers";
import { ThemeProvider } from "@/lib/theme";
import "@/styles/food-design-system.css";
import "@/styles/food-figma-design.css";
import "@/styles/food-theme.css";
import "./globals.css";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  display: "swap",
});

const sourceSansPro = Source_Sans_3({
  variable: "--font-source-sans-pro",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FoodWagen - Discover Amazing Meals",
  description: "Browse and discover amazing meals from restaurants around you",
  keywords: ["food", "meals", "restaurants", "delivery"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${openSans.variable} ${sourceSansPro.variable}`}>
        <ThemeProvider>
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
