import { useApolloClient } from "@apollo/client";
import { Button, IconButton } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useLogoutMutation } from "../generated/graphql";
import { ImExit } from "react-icons/im";
export const LogoutButton = () => {
  const router = useRouter();
  const apolloClient = useApolloClient();
  const [logout] = useLogoutMutation();
  return (
    <Button
      display={{ sm: "none", md: "block" }}
      leftIcon={<ImExit />}
      position="fixed"
      top="1rem"
      left="1rem"
      onClick={async () => {
        await logout();
        await apolloClient.resetStore();

        router.push("/");
      }}
    >
      logout
    </Button>
  );
};
