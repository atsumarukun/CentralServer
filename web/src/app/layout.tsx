"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@/styles";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <ChakraProvider cssVarsRoot="body" theme={theme}>
          {children}
        </ChakraProvider>
      </body>
    </html>
  );
}
