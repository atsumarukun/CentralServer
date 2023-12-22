"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@/styles";
import { Layout } from "@/components/layouts/Layout";
import { RequestClient, RequestProvider } from "@/providers/request";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const requestClient = new RequestClient({
    url: process.env.NEXT_PUBLIC_API_URL ?? "",
  });

  return (
    <html lang="ja">
      <body>
        <ChakraProvider cssVarsRoot="body" theme={theme}>
          <RequestProvider client={requestClient}>
            <Layout>{children}</Layout>
          </RequestProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
