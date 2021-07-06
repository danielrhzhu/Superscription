import { useApolloClient } from "@apollo/client";
import { Button } from "@chakra-ui/button";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { Spinner } from "@chakra-ui/spinner";
import { useToast } from "@chakra-ui/toast";
import { Field, Form, Formik } from "formik";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BackButton } from "../../components/BackButton";
import { CircleIcon } from "../../components/CircleIcon";
import { DarkModeSwitch } from "../../components/DarkModeSwitch";
import { Hamburger } from "../../components/Hamburger";
import { InputTextField } from "../../components/InputTextField";
import { LogoutButton } from "../../components/LogoutButton";
import {
  useDeleteSubMutation,
  useEditSubMutation,
  useFindOneSubQuery,
} from "../../generated/graphql";
import { errorDisp } from "../../lib/errorDisp";
import { withApollo } from "../../lib/withApollo";
import { withAuth } from "../../lib/withAuth";

interface idProps {}

const SubscriptionId: React.FC<idProps> = ({}) => {
  withAuth();
  const router = useRouter();
  const { _id } = router.query as any;
  const [editState, setEditState] = useState(false);
  const { data, loading, error } = useFindOneSubQuery({
    variables: {
      id: _id,
    },
    fetchPolicy: "network-only",
    pollInterval: 0,
  });
  const [editSub] = useEditSubMutation();
  const [deleteSub] = useDeleteSubMutation();
  const apolloClient = useApolloClient();
  const toast = useToast();

  return (
    <Box>
      <Head>
        <title>Editing: {data?.findOneSub.name}</title>
        <link
          rel="icon"
          type="image/png"
          href="/Screen Shot 2021-07-03 at 2.59.15 AM.png"
        />
      </Head>
      <Flex direction="column" pl="4vw" pr="4vw" pb="4vh" pt="4vh">
        <Box
          mt={{ sm: "5vh", md: "8vh", lg: "2vh" }}
          ml="auto"
          mr="auto"
          w={{ sm: "92vw", md: "80vw", lg: "60vw", xl: "40vw" }}
          display="flex"
          flexDirection="column"
          border="1px solid grey"
          borderRadius="lg"
          pl="2vw"
          pr="2vw"
          pt="3vh"
          pb="3vh"
        >
          {!data && loading ? (
            <Box
              d="flex"
              w={{ sm: "92vw", md: "80vw", lg: "60vw", xl: "40vw" }}
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
            <>
              <Heading
                mb="2vw"
                textAlign="center"
                fontSize={{ sm: "xl", md: "2xl", lg: "3xl" }}
              >
                Editing: {data?.findOneSub.name}
              </Heading>
              <Formik
                initialValues={{
                  name: data?.findOneSub.name,
                  color: data?.findOneSub.color,
                  amount: data?.findOneSub.amount,
                  startDate: data?.findOneSub.startDate,
                  frequency: data?.findOneSub.frequency,
                  notification: data?.findOneSub.notification,
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
                  await editSub({ variables: { id: _id, inputs: values } });
                  await apolloClient.resetStore();
                  router.push("/subscription");
                  toast({
                    title: "Subscription edited",
                    description: `Changes have been made to ${values.name}.`,
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
                        isDisabled={editState ? false : true}
                        label="Name"
                        placeholder="Blueberryseed music"
                      />
                      <InputTextField
                        mb={5}
                        width="100%"
                        isDisabled={editState ? false : true}
                        addon={
                          <Text fontSize="md" w="30px" pl="12px">
                            $
                          </Text>
                        }
                        name="amount"
                        label="Billed amount"
                        placeholder="0.00"
                        numberfield
                        defaultValue={data?.findOneSub.amount as number}
                        precision={2}
                        type="number"
                      />
                      <InputTextField
                        mb={5}
                        placeholder="..."
                        isDisabled={editState ? false : true}
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
                        isDisabled={editState ? false : true}
                        label="Billing frequency"
                        name="frequency"
                        defaultValue={data?.findOneSub.frequency as number}
                        addonright={
                          <Text
                            opacity={editState ? 1 : 0.6}
                            fontSize="md"
                            pl={{ sm: "4px", md: "20px" }}
                          >
                            days
                          </Text>
                        }
                      />
                      <InputTextField
                        isDisabled={editState ? false : true}
                        mb={5}
                        switchBool={true}
                        placeholder="..."
                        label="Set SMS notifications?"
                        name="notification"
                        isChecked={!!data?.findOneSub.notification}
                      />
                      <Flex
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                        mb={5}
                      >
                        <Field
                          name="color"
                          type="select"
                          as={Select}
                          mr="5"
                          isDisabled={editState ? false : true}
                        >
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
                      <Flex
                        w={{ sm: "88vw", md: "76vw", lg: "56vw", xl: "36vw" }}
                      >
                        <Button
                          size="lg"
                          type="button"
                          mt={5}
                          mr="2"
                          colorScheme="red"
                          onClick={async () => {
                            await deleteSub({
                              variables: {
                                _id,
                              },
                            });
                            toast({
                              title: "Subscription deleted",
                              status: "success",
                              duration: 9000,
                              isClosable: true,
                              position: "bottom-left",
                            });
                            router.push("/subscription");
                          }}
                        >
                          Delete
                        </Button>
                        <Button
                          size="lg"
                          ml="auto"
                          flexGrow={1}
                          isLoading={isSubmitting}
                          mt={5}
                          pl="5vw"
                          pr="5vw"
                          variant={editState ? "solid" : "outline"}
                          type={editState ? "submit" : "button"}
                          colorScheme={editState ? "whatsapp" : "linkedin"}
                          onClick={(e) => {
                            setEditState(true);
                            if (editState === false) {
                              e.preventDefault();
                            }
                          }}
                        >
                          {editState ? "submit" : "edit"}
                        </Button>
                      </Flex>
                    </Flex>
                  </Form>
                )}
              </Formik>
            </>
          )}
        </Box>
        <LogoutButton />
        <BackButton />
        <Hamburger />
        <DarkModeSwitch />
      </Flex>
    </Box>
  );
};

export default withApollo()(SubscriptionId);
