import { DarkModeSwitch } from "../components/DarkModeSwitch";
import {
  Box,
  Circle,
  Flex,
  Heading,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import Head from "next/head";
import { withApollo } from "../lib/withApollo";
import React, { useEffect, useRef } from "react";
import { init } from "ityped";
import { LoginRegisterModal } from "../components/LoginRegisterModal";
import { FaRegLightbulb } from "react-icons/fa";
import { useRouter } from "next/router";
import { useMeQuery } from "../generated/graphql";

const Index = () => {
  const { data, loading } = useMeQuery();
  const router = useRouter();
  useEffect(() => {
    if (data?.me && !loading) {
      router.replace(`/subscription`);
    }
  }, [loading, data, router]);

  const textRef: any = useRef();
  useEffect(() => {
    init(textRef.current, {
      showCursor: true,
      strings: [
        "Onlyfans subscription. ayo??",
        "Netflix membership.",
        "Spotify Premium.",
        "Amazon Prime.",
        "Apple Music.",
        "Disney+.",
      ],
      backDelay: 2000,
      backSpeed: 80,
    });
  }, []);
  const variant = useBreakpointValue({
    sm: "0",
    md: "100px",
    lg: "150px",
    xl: "200px",
    "2xl": "200px",
  });
  return (
    <Box>
      <Head>
        <title>Superscription</title>
        <link
          rel="icon"
          type="image/png"
          href="/Screen Shot 2021-07-03 at 2.59.15 AM.png"
        />
      </Head>
      <Flex direction="column" p={{ sm: "5", md: "6", lg: "10" }}>
        <Flex>
          <Box flexGrow={1}>
            <Flex
              mt={{ sm: "15vh", md: "15vh" }}
              ml={{ sm: "0", md: "5vw" }}
              justifyContent="start"
              alignItems="center"
              bgGradient="linear(to-l, #425af5, #42d7f5)"
              bgClip="text"
            >
              <Heading fontSize={{ sm: "12vw", md: "8vw", lg: "7vw" }}>
                Superscription
              </Heading>
            </Flex>
            <Box
              mt="8vh"
              ml={{ sm: "0", md: "5vw" }}
              mb={{ sm: "0", md: "10vh" }}
            >
              <Text fontSize={{ sm: "20px", md: "20px", lg: "2vw" }}>
                Never forget to cancel your <Box as="span" ref={textRef}></Box>
              </Text>
            </Box>
            <LoginRegisterModal />
          </Box>
          <Box
            mt={{ sm: "15vh", md: "18vh" }}
            display={{ sm: "none", md: "block" }}
            mr={{ xl: "5vw" }}
          >
            <Circle
              h={{ md: "180px", lg: "300px", xl: "400px" }}
              w={{ md: "180px", lg: "300px", xl: "400px" }}
              bg="#425af5"
            >
              <FaRegLightbulb size={variant} color="white" />
            </Circle>
          </Box>
        </Flex>
        <DarkModeSwitch />
      </Flex>
    </Box>
  );
};

export default withApollo()(Index);
