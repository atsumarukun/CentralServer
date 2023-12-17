"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@/styles";
import { Header } from "@/components/layouts/Header";
import { Layout } from "@/components/layouts/Layout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <ChakraProvider cssVarsRoot="body" theme={theme}>
          <Layout>{children}</Layout>
        </ChakraProvider>
      </body>
    </html>
  );
}
