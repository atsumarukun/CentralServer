"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@/styles";
import { Header } from "@/components/layouts/Header";
import { Layout } from "@/components/layouts/Layout";
import { FetchProvider } from "@/providers/fetch";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <ChakraProvider cssVarsRoot="body" theme={theme}>
          <FetchProvider>
            <Layout>{children}</Layout>
          </FetchProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
