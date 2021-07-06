import { useApolloClient } from "@apollo/client";
import { Button, ButtonGroup, IconButton } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Box, Flex, Link, Text } from "@chakra-ui/layout";
import { useBreakpointValue } from "@chakra-ui/media-query";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useLoginMutation, useRegisterMutation } from "../generated/graphql";
import { errorDisp } from "../lib/errorDisp";
import { InputTextField } from "./InputTextField";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
interface LoginRegisterModalProps {}

export const LoginRegisterModal: React.FC<LoginRegisterModalProps> = ({}) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modal, setModal] = useState(true); // true means login, false means register
  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();
  const [showPass, setShowPass] = useState(false);
  const apolloClient = useApolloClient();

  const variant = useBreakpointValue({
    sm: "xs",
    md: "xl",
    lg: "xl",
    xl: "xl",
    "2xl": "xl",
  });
  return (
    <>
      <ButtonGroup
        position={{ sm: "fixed", md: "sticky" }}
        bottom={{ sm: "40vh", md: "unset" }}
        ml={{ sm: "0", md: "5vw" }}
        variant="outline"
      >
        <Button
          pl={{ sm: "8vw", md: "5vw" }}
          pr={{ sm: "8vw", md: "5vw" }}
          pt="4vh"
          pb="4vh"
          size="lg"
          fontWeight="bold"
          mr={10}
          colorScheme="twitter"
          onClick={() => {
            onOpen();
            setModal(false);
          }}
        >
          Register
        </Button>
        <Button
          pl={{ sm: "8vw", md: "5vw" }}
          pr={{ sm: "8vw", md: "5vw" }}
          pt="4vh"
          pb="4vh"
          size="lg"
          fontWeight="bold"
          colorScheme="messenger"
          onClick={() => {
            onOpen();
            setModal(true);
          }}
        >
          Login
        </Button>
      </ButtonGroup>
      <Modal
        motionPreset="slideInRight"
        size={variant}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <Flex flexDirection="column" alignItems="center">
            <ModalHeader fontSize={{ sm: "large", md: "2xl" }}>
              {modal
                ? "Sign into Superscription"
                : "Create your Superscription account"}
            </ModalHeader>
          </Flex>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <Formik
              initialValues={{ phonenumber: "", password: "" }}
              onSubmit={async (values, { setErrors }) => {
                if (modal) {
                  const response = await login({
                    variables: { inputs: values },
                  });

                  if (response.data?.login.errors) {
                    setErrors(errorDisp(response.data.login.errors));
                  } else if (response.data?.login.user) {
                    await apolloClient.resetStore();
                    router.push("/subscription");
                  }
                } else {
                  const res = await register({ variables: { inputs: values } });
                  if (res.data?.register.errors) {
                    setErrors(errorDisp(res.data.register.errors));
                  } else if (res.data?.register.user) {
                    await apolloClient.resetStore();
                    router.push("/subscription");
                  }
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Flex flexDirection="column">
                    <InputTextField
                      needError
                      numberfield
                      name="phonenumber"
                      label="Phone number"
                      placeholder="6046046004"
                      mb={4}
                    />
                    <InputTextField
                      needError
                      mb={1}
                      name="password"
                      label="Password"
                      type={showPass === false ? "password" : "text"}
                      placeholder="password"
                      addonright={
                        <IconButton
                          icon={showPass ? <ViewOffIcon /> : <ViewIcon />}
                          aria-label="toggle password"
                          onClick={() => {
                            setShowPass(!showPass);
                          }}
                        />
                      }
                    />
                    <Flex flexDirection="column">
                      {modal ? (
                        <NextLink href="/forgotpassword">
                          <Link mt={5} as={Link}>
                            <Text fontSize={{ sm: "s", md: "md" }}>
                              Forgot password?
                            </Text>
                          </Link>
                        </NextLink>
                      ) : null}
                      <ButtonGroup mt={6} mb={4}>
                        {modal ? (
                          <Button
                            onClick={() => {
                              setModal(false);
                            }}
                            mr={10}
                            variant="outline"
                          >
                            <Text fontSize={{ sm: "xs", md: "md" }}>
                              Don't have an account?
                            </Text>
                          </Button>
                        ) : (
                          <Button
                            onClick={() => {
                              setModal(true);
                            }}
                            mr={10}
                          >
                            <Text fontSize={{ sm: "sm", md: "md" }}>
                              Have an account?
                            </Text>
                          </Button>
                        )}
                        <Button
                          isLoading={isSubmitting}
                          ml={5}
                          type="submit"
                          flexGrow={1}
                          fontWeight="bold"
                          colorScheme={modal ? "messenger" : "twitter"}
                        >
                          <Text fontSize={{ sm: "sm", md: "md" }}>
                            {modal ? "Login" : "Register"}
                          </Text>
                        </Button>
                      </ButtonGroup>
                    </Flex>
                  </Flex>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
