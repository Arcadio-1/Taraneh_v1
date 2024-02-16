import { toast } from "@/hook/use-toast";
import {
  ChangePhoneFormScheme,
  otpFormSchame,
  PhoneSchame,
} from "@/types_validation/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useTransition,
} from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/Util/shadcn/ui/form";
import { Input } from "@/components/Util/shadcn/ui/input";
import { OtpType } from "@/types_validation/type";
import OtpButton from "@/components/Util/components/OptControl/OtpButton";
import OTPInput from "react-otp-input";
import setNewPhone from "@/actions/userInfo/changePhone/redisActions/setNewPhone";
import SpinnerIcon from "@/components/Util/ui/icons/SpinnerIcon";

interface Props {
  setNewPhoneNumber: Dispatch<SetStateAction<string | null>>;
  currentPhone: z.infer<typeof PhoneSchame>;
}

const FirstStep = ({ setNewPhoneNumber, currentPhone }: Props) => {
  const [firstOtp, setFirstOtp] = useState("");
  const [isPending, startTransition] = useTransition();
  const firstForm = useForm<z.infer<typeof ChangePhoneFormScheme>>({
    resolver: zodResolver(ChangePhoneFormScheme),
    defaultValues: {
      newPhone: "",
      otpNumber: "",
    },
  });

  useEffect(() => {
    firstForm.setValue("otpNumber", firstOtp);
    otpFormSchame.safeParse({
      otpNumber: firstOtp,
    }).success && firstForm.clearErrors();
  }, [firstOtp]);

  const onSubmitFirstForm = async (
    values: z.infer<typeof ChangePhoneFormScheme>,
  ) => {
    startTransition(async () => {
      const phoneSeter = await setNewPhone({
        otpNumber: values.otpNumber,
        newPhone: values.newPhone,
      });
      if (!phoneSeter.ok) {
        toast({
          duration: 2500,
          title: phoneSeter.message,
          className: "bg-success text-light_1 text-xl",
        });
        return;
      }
      setNewPhoneNumber(phoneSeter.newPhone);
      toast({
        duration: 2500,
        title: phoneSeter.message,
        className: "bg-success text-light_1 text-xl",
      });
    });
  };

  return (
    <Form {...firstForm}>
      <form
        className="flex flex-col gap-4"
        onSubmit={firstForm.handleSubmit(onSubmitFirstForm)}
      >
        <FormField
          control={firstForm.control}
          name="newPhone"
          render={({ field }) => (
            <FormItem className="grow">
              <FormLabel className="text-lg">شماره جدید </FormLabel>
              <span className="text-lg text-g1_5">*</span>
              <FormControl>
                <Input
                  placeholder="...0912"
                  className="h-14 border-b-2 border-g1_5 border-l-transparent border-r-transparent border-t-transparent  bg-gray-100 text-center font-iransansnum text-xl placeholder:text-dark_7"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={firstForm.control}
          name="otpNumber"
          render={({ field }) => (
            <FormItem className="grow">
              <div
                dir="ltr"
                className="flex flex-col items-center justify-center gap-4"
              >
                <OtpButton phone={currentPhone} otpType={OtpType.changePhone} />
                <FormControl>
                  <OTPInput
                    shouldAutoFocus
                    containerStyle={"rtl"}
                    inputStyle={`bg-gray-100 !w-14 !h-14 text-2xl iran font-iransansnum focus:outline-g1_7 ${isPending ? "cursor-not-allowed" : ""}`}
                    value={firstOtp}
                    inputType="tel"
                    onChange={setFirstOtp}
                    numInputs={5}
                    renderSeparator={<span className="w-4"></span>}
                    renderInput={(props) => (
                      <input disabled={isPending} {...props} />
                    )}
                  />
                </FormControl>
              </div>
              <FormMessage className="text-lg text-g1_5" />
            </FormItem>
          )}
        />
        <button
          className="flex items-center justify-center gap-2 rounded-lg bg-g1_5 px-6 py-2 font-iranyekan_bold text-lg text-light_1 hover:scale-[1.01]"
          type="submit"
        >
          ادامه
          {isPending && <SpinnerIcon className="h-5 w-5 border-2" />}
        </button>
      </form>
    </Form>
  );
};

export default FirstStep;
