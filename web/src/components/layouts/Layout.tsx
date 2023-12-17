import { Box } from "@chakra-ui/react";
import { Header, HeaderHeight } from "./Header";

type Props = {
  children: React.ReactNode;
};

export function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <Box pt={HeaderHeight}>{children}</Box>
    </>
  );
}
