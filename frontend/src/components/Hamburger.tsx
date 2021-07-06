import { useApolloClient } from "@apollo/client";
import { ArrowLeftIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { ImExit } from "react-icons/im";
import { useLogoutMutation } from "../generated/graphql";
interface HamburgerProps {}

export const Hamburger: React.FC<HamburgerProps> = () => {
  const [logout] = useLogoutMutation();
  const apolloClient = useApolloClient();
  const router = useRouter();
  return (
    <Box
      position="fixed"
      top="1rem"
      left="1rem"
      display={{ sm: "block", md: "none", lg: "none" }}
    >
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<HamburgerIcon />}
          w={8}
          h={8}
          variant="outline"
        />
        <MenuList>
          <MenuItem
            icon={<ArrowLeftIcon />}
            iconSpacing={{ sm: "5vw" }}
            pl={{ sm: "5vw" }}
            pt={{ sm: "1vh" }}
            pb={{ sm: "1vh" }}
            onClick={() => {
              router.push("/subscription");
            }}
          >
            <Text fontWeight="semibold">Home</Text>
          </MenuItem>
          <MenuItem
            pl={{ sm: "5vw" }}
            pt={{ sm: "1vh" }}
            pb={{ sm: "1vh" }}
            onClick={async () => {
              await logout();
              await apolloClient.resetStore();
              router.push("/");
            }}
            icon={<ImExit />}
            iconSpacing={{ sm: "5vw" }}
          >
            <Text fontWeight="semibold">Logout</Text>
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};
