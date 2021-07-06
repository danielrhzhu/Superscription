import { getModelForClass } from "@typegoose/typegoose";
import cron from "node-cron";
import { Sub } from "../models/Sub";
import "dotenv-safe/config";
import { User } from "../models/User";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

export const smsSender = () => {
  const SubModel = getModelForClass(Sub);

  //function runs every 10 minutes.
  const cronT = cron.schedule(
    "0,10,20,30,40,50 * * * *",
    async (): Promise<null | boolean> => {
      const subs = await SubModel.find({
        notification: true,
      });
      if (!subs) {
        return null;
      }
      subs.forEach(async (sub: Sub) => {
        if (!sub.startDate || !sub.frequency) {
          return;
        }

        let startDay = new Date(sub.startDate);
        let interMed = startDay.getTime();
        let endDateNum = interMed + sub.frequency * 24 * 60 * 60 * 1000;
        let endDate = new Date(endDateNum);
        let endDateParsed = endDate.toISOString().substring(0, 10);
        let today = Date.now();

        let dateDifference = endDateNum - today;
        let sendDate = 1000 * 60 * 60 * 24;

        //will notify one day prior.
        if (sendDate >= dateDifference) {
          const UserModel = getModelForClass(User);
          const user = await UserModel.findById(sub.userId);
          client.messages.create({
            body: `Superscription Update: You will be billed $${sub.amount} for ${sub.name} on ${endDateParsed}.`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: `+1${user?.phonenumber}`,
          });
          //updating after message sent (so won't send the notif again)
          await SubModel.findOneAndUpdate(
            { _id: sub._id },
            { startDate: `${new Date(endDateNum)}` }
          );
        }
      });

      return true;
    },
    {
      scheduled: true,
    }
  );

  cronT.start();
};
