import { toast } from "@/hook/use-toast";
import { otpFormSchame } from "@/types_validation/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
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
import OtpButton from "@/components/Util/components/OptControl/OtpButton";
import { OtpType } from "@/types_validation/type";
import OTPInput from "react-otp-input";
import changePhone from "@/actions/userInfo/changePhone/changePhone";
import SpinnerIcon from "@/components/Util/ui/icons/SpinnerIcon";

interface Props {
  newPhoneNumber: string | null;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
const SecondStep = ({ newPhoneNumber, setOpen }: Props) => {
  const [secondOtp, setSecondOtp] = useState("");
  const { update, data } = useSession();
  const [isPending, startTransition] = useTransition();

  const secondForm = useForm<z.infer<typeof otpFormSchame>>({
    resolver: zodResolver(otpFormSchame),
    defaultValues: {
      otpNumber: "",
    },
  });
  useEffect(() => {
    secondForm.setValue("otpNumber", secondOtp);
    otpFormSchame.safeParse({
      otpNumber: secondOtp,
    }).success && secondForm.clearErrors();
  }, [secondOtp]);

  const onSubmitSecondForm = async (values: z.infer<typeof otpFormSchame>) => {
    startTransition(async () => {
      const phoneChanger = await changePhone({
        otpNumber: values.otpNumber,
      });
      if (!phoneChanger.ok) {
        toast({
          duration: 2500,
          title: phoneChanger.message,
          className: "bg-error text-light_1 text-xl",
        });
        return;
      }

      const res = await update({
        feild: "phone",
      });
      if (!res) {
        toast({
          duration: 2500,
          title: "خطا در ثبت شماره جدید",
          className: "bg-error text-light_1 text-xl",
        });
        return;
      }
      if (res?.user.phone !== newPhoneNumber) {
        toast({
          duration: 2500,
          title: "خطا در ثبت شماره جدید",
          className: "bg-error text-light_1 text-xl",
        });
        return;
      }
      toast({
        duration: 5000,
        title: `شماره شما با موفقیت به ${newPhoneNumber} تغییر یافت`,
        className: "bg-success text-light_1 text-xl",
      });
    });

    setOpen(false);
    location.reload();
  };

  return (
    <Form {...secondForm}>
      <form
        className="flex flex-col gap-4"
        onSubmit={secondForm.handleSubmit(onSubmitSecondForm)}
      >
        <FormField
          control={secondForm.control}
          name="otpNumber"
          render={({ field }) => (
            <FormItem>
              <div
                dir="ltr"
                className="flex flex-col items-center justify-center gap-4"
              >
                <OtpButton phone={newPhoneNumber!} otpType={OtpType.login} />
                <FormControl>
                  <OTPInput
                    shouldAutoFocus
                    containerStyle={"rtl"}
                    inputStyle={`bg-gray-100 !w-14 !h-14 text-2xl iran font-iransansnum focus:outline-g1_7 ${isPending ? "cursor-not-allowed" : ""}`}
                    value={secondOtp}
                    inputType="tel"
                    onChange={setSecondOtp}
                    numInputs={5}
                    renderSeparator={<span className="w-4"></span>}
                    renderInput={(props) => (
                      <input disabled={isPending} {...props} />
                    )}
                  />
                </FormControl>
              </div>
              <FormMessage className="text-lg text-red-700" />
            </FormItem>
          )}
        />
        <button
          className="flex items-center justify-center gap-2 rounded-lg bg-g1_5 px-6 py-2 font-iranyekan_bold text-lg text-light_1 hover:scale-[1.01]"
          type="submit"
        >
          ثبت شماره
          {isPending && <SpinnerIcon className="h-5 w-5 border-2" />}
        </button>
      </form>
    </Form>
  );
};

export default SecondStep;
