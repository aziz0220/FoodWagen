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
        {/* Suppress browser extension errors - must run before React */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const originalError = console.error;
                console.error = function(...args) {
                  const msg = args[0]?.toString() || '';
                  if (msg.includes('message channel closed') || 
                      msg.includes('illegal path') ||
                      msg.includes('ResumeSwitcher') ||
                      msg.includes('autofillInstance')) {
                    return;
                  }
                  originalError.apply(console, args);
                };
                
                window.addEventListener('error', function(e) {
                  if (e.message && (
                    e.message.includes('message channel closed') ||
                    e.message.includes('illegal path') ||
                    e.message.includes('ResumeSwitcher') ||
                    e.message.includes('autofillInstance') ||
                    e.message.includes('filesystem')
                  )) {
                    e.stopImmediatePropagation();
                    e.preventDefault();
                    return false;
                  }
                }, true);
                
                window.addEventListener('unhandledrejection', function(e) {
                  if (e.reason?.message && (
                    e.reason.message.includes('message channel closed') ||
                    e.reason.message.includes('illegal path') ||
                    e.reason.message.includes('filesystem')
                  )) {
                    e.stopImmediatePropagation();
                    e.preventDefault();
                    return false;
                  }
                }, true);
              })();
            `,
          }}
        />
        <ThemeProvider>
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
