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
      <head>
        {/* Filter out browser extension errors in development */}
        {process.env.NODE_ENV === 'development' && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                // Suppress browser extension errors
                window.addEventListener('error', function(e) {
                  if (e.message && (
                    e.message.includes('message channel closed') ||
                    e.message.includes('illegal path') ||
                    e.message.includes('ResumeSwitcher') ||
                    e.message.includes('autofillInstance')
                  )) {
                    e.stopImmediatePropagation();
                    e.preventDefault();
                    return true;
                  }
                });
                window.addEventListener('unhandledrejection', function(e) {
                  if (e.reason && e.reason.message && (
                    e.reason.message.includes('message channel closed') ||
                    e.reason.message.includes('illegal path')
                  )) {
                    e.stopImmediatePropagation();
                    e.preventDefault();
                    return true;
                  }
                });
              `,
            }}
          />
        )}
      </head>
      <body className={`${openSans.variable} ${sourceSansPro.variable}`}>
        <ThemeProvider>
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
