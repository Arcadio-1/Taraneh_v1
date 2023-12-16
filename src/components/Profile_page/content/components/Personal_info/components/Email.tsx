"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components_shadcn/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components_shadcn/ui/form";
import { Input } from "@/components_shadcn/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Divider } from "@mui/material";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { emailSchame } from "@/lib/util/validation";
import { z } from "zod";

interface Props {
  userId: string;
  email: string;
}

const Email = ({ userId, email }: Props) => {
  const [mount, setMount] = useState(false);
  const [submitError, setSubmitError] = useState<string>("");

  useEffect(() => {
    setMount(true);
  }, []);

  const { update, data } = useSession();

  const form = useForm<z.infer<typeof emailSchame>>({
    resolver: zodResolver(emailSchame),
    defaultValues: {
      email: email,
    },
  });

  const onSubmit = async (values: z.infer<typeof emailSchame>) => {
    if (values.email === data?.user.email) {
      setSubmitError("لطفا ایمیل جدید وارد کنید");
      return;
    }
    const res = update({
      feild: "email",
      id: userId,
      data: { ...values },
    });
    const res2 = await res;
    if (res2?.user.email !== values.email) {
      setSubmitError("ایمیل وارد شده قبلا ثبت نام شده");
    } else {
      location.reload();
      setSubmitError("");
    }
  };
  if (!mount) {
    <></>;
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <svg viewBox="0 0 24 24" className="h-6 w-6 cursor-pointer">
          <path d="m16 2.012 3 3L16.713 7.3l-3-3zM4 14v3h3l8.299-8.287-3-3zm0 6h16v2H4z" />
        </svg>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-opacity-100 bg-light_1">
        <DialogHeader className=" flex flex-col gap-3">
          <DialogTitle className="text-xl">ثبت ایمیل</DialogTitle>
          <Divider className="my-" />
          <DialogDescription className="text-dark_2 text-lg">
            لطفا ایمیل خود را وارد کنید
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="grow">
                  <FormLabel className="text-md">ایمیل</FormLabel>
                  <span className="text-g1_5 text-lg">*</span>
                  <FormControl>
                    <Input
                      className="rounded-[4px] border border-gray-400"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="items-end">
              {submitError && (
                <span className="text-g1_5 text-lg sm:ml-5 ml-auto">
                  {submitError}
                </span>
              )}
              <button
                className="bg-g1_5 text-light_1 rounded-lg hover:scale-[1.01] px-6 py-2 text-lg font-iranyekan_bold"
                type="submit"
              >
                ثبت ایمیل
              </button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default Email;
