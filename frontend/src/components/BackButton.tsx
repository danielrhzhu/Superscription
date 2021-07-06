import { ArrowLeftIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

export const BackButton = () => {
  const router = useRouter();
  return (
    <Button
      display={{ sm: "none", md: "block" }}
      leftIcon={<ArrowLeftIcon />}
      position="fixed"
      top="4rem"
      left="1rem"
      onClick={() => {
        router.push("/subscription");
      }}
    >
      back
    </Button>
  );
};
