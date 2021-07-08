import { Box, Divider, Flex, Heading, Text, VStack } from "@chakra-ui/layout";
import Head from "next/head";
import React, { useState } from "react";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import {
  useCreateSubMutation,
  useDeleteSubMutation,
  useFindSubsQuery,
} from "../generated/graphql";
import { withApollo } from "../lib/withApollo";
import {
  Drawer,
  useDisclosure,
  Button,
  Input,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  useToast,
  DrawerOverlay,
  Select,
  PopoverTrigger,
  Popover,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  useBreakpointValue,
  Spinner,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { errorDisp } from "../lib/errorDisp";
import { InputTextField } from "../components/InputTextField";
import { CircleIcon } from "../components/CircleIcon";
import { useApolloClient } from "@apollo/client";
import { withAuth } from "../lib/withAuth";
import { useRouter } from "next/router";
import { IoMdAdd } from "react-icons/io";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { DateComp } from "../components/DateComp";
import { LogoutButton } from "../components/LogoutButton";
import { Hamburger } from "../components/Hamburger";

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = ({}) => {
  withAuth(); // would've created a HOC if there were more routes to protect.
  const apolloClient = useApolloClient();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searching, setSearching] = useState(""); // default to show all.
  const [offsetState, setOffsetState] = useState(0);
  const [limitState, setLimitState] = useState(6);
  const options = [6, 10, 15];
  const { data, loading } = useFindSubsQuery({
    variables: {
      limit: limitState,
      offset: offsetState,
      name: searching,
    },
    pollInterval: 0,
    fetchPolicy: "network-only",
  });
  const [deleteSub] = useDeleteSubMutation();
  const [createSub] = useCreateSubMutation();
  const toast = useToast();

  const variant = useBreakpointValue({
    sm: "md",
    md: "lg",
    lg: "lg",
    xl: "lg",
    "2xl": "lg",
  });

  return (
    <Box>
      <Head>
        <title>Subscriptions</title>
        <link
          rel="icon"
          type="image/png"
          href="/Screen Shot 2021-07-03 at 2.59.15 AM.png"
        />
      </Head>
      <Flex
        direction="column"
        pl={{ sm: "2vw", md: "5vw" }}
        pr={{ sm: "2vw", md: "5vw" }}
        pb={{ sm: "2vh", md: "5vh" }}
        pt={{ sm: "2vh", md: "5vh" }}
      >
        <Box
          ml="auto"
          mr="auto"
          w={{ sm: "96vw", md: "80vw", lg: "60vw", xl: "40vw" }}
          display="flex"
          flexDirection="column"
          border="1px solid grey"
          borderRadius="lg"
          pl="2vw"
          pr="2vw"
          mt={{ sm: "5vh", md: "2vh", lg: 0 }}
          pt={{ sm: "1vh", md: "3vh" }}
          pb="3vh"
        >
          <Heading
            mb="0.5vw"
            fontSize={{ sm: "2xl", md: "3xl" }}
            textAlign="center"
          >
            Subscriptions
          </Heading>
          <Divider color="grey" mb="1.2vw" orientation="horizontal" />
          <Flex mb={{ sm: 3, md: 5 }} mt={{ sm: 1, md: 0 }}>
            <Input
              variant="outline"
              onChange={async (e) => {
                setOffsetState(0);
                setSearching(e.target.value);
              }}
              size={variant}
              placeholder="Quick search"
              _placeholder={{ color: "grey" }}
            />
            <Button
              leftIcon={<IoMdAdd />}
              size={variant}
              pl="5"
              pr={{ sm: "3", md: "5" }}
              ml="5"
              variant="outline"
              colorScheme="twitter"
              onClick={() => {
                onOpen();
              }}
            >
              <Text display={{ sm: "none", md: "contents" }}>Create</Text>
            </Button>
          </Flex>
          <Drawer onClose={onClose} isOpen={isOpen} size="md">
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Create subscription</DrawerHeader>
              <DrawerBody>
                <Formik
                  initialValues={{
                    name: "",
                    color: "linkedin",
                    amount: 0,
                    startDate: "",
                    frequency: 0,
                    notification: false,
                  }}
                  onSubmit={async (values, { setErrors }) => {
                    if (!values.name) {
                      return setErrors(
                        errorDisp([
                          {
                            field: "name",
                            message: "required field",
                          },
                        ])
                      );
                    }
                    await createSub({ variables: { inputs: values } });
                    await apolloClient.resetStore();
                    onClose();
                    toast({
                      title: "Subscription created",
                      description: `${values.name} has been added to your subscription list.`,
                      status: "success",
                      duration: 9000,
                      isClosable: true,
                      position: "bottom-left",
                    });
                  }}
                >
                  {({ isSubmitting, values }) => (
                    <Form>
                      <Flex flexDirection="column" alignItems="flex-start">
                        <InputTextField
                          mb={5}
                          needError
                          name="name"
                          label="Name"
                          placeholder="Blueberryseed music"
                        />
                        <InputTextField
                          mb={5}
                          addon={
                            <Text fontSize="md" w="30px" pl="12px">
                              $
                            </Text>
                          }
                          name="amount"
                          label="Billed amount"
                          placeholder="0.00"
                          numberfield
                          precision={2}
                          type="number"
                        />
                        <InputTextField
                          mb={5}
                          placeholder="..."
                          label="Start date"
                          type="date"
                          name="startDate"
                        />
                        <InputTextField
                          numberfield
                          precision={0}
                          mb={5}
                          type="number"
                          placeholder="30"
                          label="Billing frequency"
                          name="frequency"
                          addonright={
                            <Text fontSize="md" pl={{ sm: "4px", md: "20px" }}>
                              days
                            </Text>
                          }
                        />
                        <InputTextField
                          mb={5}
                          switchBool={true}
                          placeholder="..."
                          label="Set SMS notifications?"
                          name="notification"
                        />
                        <Flex
                          direction="row"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Field name="color" type="select" as={Select} mr="5">
                            <option value="linkedin">LinkedIn Blue</option>
                            <option value="blackAlpha">black/white</option>
                            <option value="gray">Gray</option>
                            <option value="red">Red</option>
                            <option value="orange">Orange</option>
                            <option value="yellow">Yellow</option>
                            <option value="green">Green</option>
                            <option value="teal">Teal</option>
                            <option value="messenger">Facebook Blue</option>
                            <option value="cyan">Cyan</option>
                            <option value="purple">Purple</option>
                            <option value="pink">Pink</option>
                            <option value="whatsapp">WhatsApp green</option>
                          </Field>
                          <CircleIcon
                            color={values?.color?.concat(".500")}
                            boxSize={10}
                          />
                        </Flex>
                        <Button
                          w="100%"
                          isLoading={isSubmitting}
                          mt={5}
                          type="submit"
                          colorScheme="blue"
                        >
                          create
                        </Button>
                      </Flex>
                    </Form>
                  )}
                </Formik>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
          <Box w={{ sm: "92vw", md: "76vw", lg: "56vw" }} ml="auto" mr="auto">
            {!data && loading ? (
              <Box
                d="flex"
                w={{ sm: "92vw", md: "76vw", lg: "56vw", xl: "36vw" }}
                alignItems="center"
              >
                <Spinner
                  ml="auto"
                  mr="auto"
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.500"
                  color="linkedin.500"
                  size="xl"
                />
              </Box>
            ) : (
              <VStack
                w={{ sm: "92vw", md: "76vw", lg: "56vw", xl: "36vw" }}
                spacing="2"
              >
                {data?.findSubs.subs.length === 0 ? (
                  <Text color="red.500" fontWeight="bold">
                    No subscriptions to show
                  </Text>
                ) : null}
                {data?.findSubs.subs.map((sub) => (
                  <Box key={sub._id}>
                    <Popover>
                      <PopoverTrigger>
                        <Button
                          w={{ sm: "92vw", md: "76vw", lg: "56vw", xl: "36vw" }}
                          pt="4vh"
                          pb="4vh"
                          colorScheme={sub.color}
                        >
                          <Box display="flex" flexDirection="row">
                            <Heading
                              fontWeight="bold"
                              fontSize={{ sm: "lg", md: "large" }}
                              mr="auto"
                            >
                              {sub.name}
                            </Heading>
                          </Box>
                          <Flex
                            w={{
                              sm: "80vw",
                              md: "80vw",
                              lg: "60vw",
                              xl: "40vw",
                            }}
                            flexDirection="column"
                            alignItems="flex-end"
                          >
                            <Text
                              fontWeight="bold"
                              fontSize={{ sm: "xs", md: "md" }}
                            >
                              ${sub.amount}
                            </Text>
                            <Box d="flex">
                              <DateComp sub={sub} />
                            </Box>
                          </Flex>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <PopoverArrow />
                        <PopoverBody>
                          <Flex direction="row" justifyContent="flex-start">
                            <Button
                              flexGrow={1}
                              onClick={() => {
                                router.push(`/subscription/${sub._id}`);
                              }}
                              colorScheme="orange"
                            >
                              Edit
                            </Button>
                            <Button
                              ml={2}
                              colorScheme="red"
                              onClick={() => {
                                deleteSub({
                                  variables: {
                                    _id: sub._id,
                                  },
                                  update: (cache) => {
                                    cache.evict({
                                      id: "Sub:" + sub._id,
                                    });
                                  },
                                });
                                toast({
                                  title: "Subscription deleted",
                                  description: `${sub.name} has been deleted from your subscription list.`,
                                  status: "success",
                                  duration: 9000,
                                  isClosable: true,
                                  position: "bottom-left",
                                });
                              }}
                            >
                              Delete
                            </Button>
                          </Flex>
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                  </Box>
                ))}
              </VStack>
            )}
          </Box>
          <Divider color="grey" mb="1vh" orientation="horizontal" mt="1.2vh" />
          <Flex justifyContent="flex-end">
            <Box display="flex" alignItems="center" mr={{ sm: "2", md: "4" }}>
              <Text fontSize={{ sm: "xs", md: "md" }} mr={{ sm: "1", md: "3" }}>
                Rows per page:
              </Text>
              <Select
                w={{ sm: "20vw", md: "10vw", lg: "8vw" }}
                onChange={(e) => {
                  setLimitState(parseInt(e.target.value));
                }}
              >
                {options.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </Select>
            </Box>
            <Button
              variant="outline"
              ml={{ sm: 0, md: "2" }}
              mr="1"
              isDisabled={offsetState < limitState ? true : false}
              colorScheme="linkedin"
              onClick={() => {
                if (offsetState >= limitState) {
                  setOffsetState(offsetState - limitState);
                }
              }}
            >
              <ChevronLeftIcon w={5} h={5} />
            </Button>
            <Button
              variant="outline"
              ml={{ sm: "1", md: "2" }}
              isDisabled={data?.findSubs.more ? false : true}
              colorScheme="linkedin"
              onClick={() => {
                if (data?.findSubs.more) {
                  setOffsetState(offsetState + limitState);
                }
              }}
            >
              <ChevronRightIcon w={5} h={5} />
            </Button>
          </Flex>
        </Box>
        <Hamburger />
        <LogoutButton />
        <DarkModeSwitch />
      </Flex>
    </Box>
  );
};

export default withApollo()(Dashboard);
