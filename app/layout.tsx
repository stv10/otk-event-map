import { ThemeProvider } from "@/components/theme-provider";
import {
  Fallback as AvatarFallback,
  Image as AvatarImage,
  Root as AvatarRoot,
} from "@radix-ui/react-avatar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type React from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Otakar - Mapa de eventos",
  description: "Interactive map showing team events with details",
  generator: "v0.dev",
  icons: {
    icon: "https://pbs.twimg.com/profile_images/1871509049952354305/OaNmsXIl_400x400.jpg"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Add viewport meta tag to ensure proper mobile rendering */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="flex min-h-screen flex-col">
            <header className="border-b bg-background px-4 py-3 flex-shrink-0">
              <div className="container mx-auto gap-2 flex items-center">
                <AvatarRoot className="inline-flex size-[45px] select-none items-center justify-center overflow-hidden rounded-full bg-blackA1 align-middle">
                  <AvatarImage
                    className="size-full rounded-[inherit] object-cover"
                    src="https://pbs.twimg.com/profile_images/1871509049952354305/OaNmsXIl_400x400.jpg"
                    alt="Colm Tuite"
                  />
                  <AvatarFallback
                    className="leading-1 flex size-full items-center justify-center bg-white text-[15px] font-medium text-violet11"
                    delayMs={600}
                  >
                    OTK Logo
                  </AvatarFallback>
                </AvatarRoot>
                <h1 className="text-xl font-bold inline-flex">OTAKAR</h1>
                <span className="text-sm text-muted-foreground">
                  Encuentra los próximos partidos presenciales
                </span>
              </div>
            </header>
            <div className="flex-1 overflow-hidden">{children}</div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}

import "./globals.css";
