import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components_shadcn/ui/form";
import { Input } from "@/components_shadcn/ui/input";
import { Button } from "@/components_shadcn/ui/button";
import * as z from "zod";
import { phoneSchame } from "@/lib/util/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { checkUser } from "@/lib/actions/checkUser";
import { Sign } from "@/types/type";
import SpinnerIcon from "../Util/icons/SpinnerIcon";

interface Props {
  setPhone: React.Dispatch<React.SetStateAction<string>>;
  setSign: React.Dispatch<React.SetStateAction<Sign>>;
  setHasPassword: React.Dispatch<React.SetStateAction<boolean>>;
  sign: Sign;
}

const PhoneForm = ({ setSign, setHasPassword, setPhone, sign }: Props) => {
  const [logError, setLogError] = useState("");
  const [loading, setLoading] = useState(false);

  const get_phone_form = useForm<z.infer<typeof phoneSchame>>({
    resolver: zodResolver(phoneSchame),
    defaultValues: {
      phone: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof phoneSchame>) => {
    try {
      setLoading(true);
      const existing_phone_number_check = await checkUser(values);
      setSign(existing_phone_number_check.type);
      setHasPassword(existing_phone_number_check.password);
      setPhone((prev) => {
        return (prev = values.phone);
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) setLogError(error.message);
      setLogError("خطا در ورود");
    }
  };

  return (
    <div>
      <h1 className="mb-5 text-3xl font-bold">ورود | ثبت نام</h1>
      <Form {...get_phone_form}>
        <form onSubmit={get_phone_form.handleSubmit(onSubmit)}>
          <FormField
            control={get_phone_form.control}
            name="phone"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col gap-4">
                  <FormLabel className="text-lg">
                    لطفا شماره موبایل خود را وارد کنید
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      className={`h-12 rounded-[5px] border-transparent bg-gray-100 font-iransansnum text-2xl ${loading ? "cursor-not-allowed" : ""}`}
                      {...field}
                    />
                  </FormControl>
                  {(sign === Sign.error || logError) && (
                    <p>
                      {logError && logError} {sign && "خطا در ورود"}
                    </p>
                  )}
                  <FormMessage className="text-xl text-red-700" />
                </FormItem>
              );
            }}
          />
          <div className="flex items-center justify-end gap-2 space-x-1 pt-6">
            <Button
              disabled={loading}
              className="w-full rounded-xl bg-g1_5 py-7 font-iranyekan_bold text-xl text-light_1 hover:bg-g1_5"
              type="submit"
            >
              {loading ? <SpinnerIcon /> : "ادامه"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PhoneForm;
