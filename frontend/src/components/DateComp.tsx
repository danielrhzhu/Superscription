import { Text } from "@chakra-ui/layout";
import { useEffect } from "react";
import { useEditSubMutation } from "../generated/graphql";

export const DateComp = ({ sub, data, loading }: any) => {
  const [editSub] = useEditSubMutation();

  if (!sub.startDate || !sub.frequency) {
    return <Text fontSize={{ sm: "xs", md: "md" }}>Insufficient data</Text>;
  }
  let startDay = new Date(sub.startDate);
  let interMed = startDay.getTime();
  let endDateNum = interMed + sub.frequency * 24 * 60 * 60 * 1000;
  let endDate = new Date(endDateNum);
  let today = Date.now();

  let dateDifference = endDateNum - today;
  let daysLeft = dateDifference / 1000 / 60 / 60 / 24;
  let daysLeftInt = daysLeft.toFixed(0);

  //if date difference is less than 0 (let it = x), we are x days overdue on a billing day.
  //thus, to renew, we must add set the new start day to Date.now() + x

  useEffect(() => {
    if (dateDifference <= 0) {
      editSub({
        variables: {
          id: sub._id,
          inputs: { startDate: `${new Date(today + dateDifference)}` },
        },
      });
    }
  }, [data, loading]);

  return (
    <Text fontSize={{ sm: "xs", md: "md" }}>Billed in {daysLeftInt} days</Text>
  );
};
