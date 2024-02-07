"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/Util/shadcn/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/Util/shadcn/ui/form";
import { Input } from "@/components/Util/shadcn/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Divider from "@/components/Util/ui/Divider";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { emailSchame } from "@/types_validation/validation";
import { z } from "zod";
import { toast } from "@/hook/use-toast";

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
      data: { ...values },
    });
    const res2 = await res;
    if (res2?.user.email !== values.email) {
      setSubmitError("ایمیل وارد شده قبلا ثبت نام شده");
    } else {
      setOpen(false);
      toast({
        duration: 2500,
        title: "ایمیل شما با موفقیت ثبت شد",
        className: "bg-success text-light_1 text-xl",
      });
      setSubmitError("");
      setTimeout(() => {
        location.reload();
      }, 2000);
      return;
    }
  };
  const [open, setOpen] = useState(false);

  if (!mount) {
    <></>;
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <svg viewBox="0 0 24 24" className="h-6 w-6 cursor-pointer">
          <path d="m16 2.012 3 3L16.713 7.3l-3-3zM4 14v3h3l8.299-8.287-3-3zm0 6h16v2H4z" />
        </svg>
      </DialogTrigger>
      <DialogContent className="bg-light_1 bg-opacity-100 sm:max-w-[425px]">
        <DialogHeader className=" flex flex-col gap-3">
          <DialogTitle className="text-xl">ثبت ایمیل</DialogTitle>
          <Divider className="my-" />
          <DialogDescription className="text-lg text-dark_2">
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
                  <span className="text-lg text-g1_5">*</span>
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
                <span className="ml-auto text-lg text-g1_5 sm:ml-5">
                  {submitError}
                </span>
              )}
              <button
                className="rounded-lg bg-g1_5 px-6 py-2 font-iranyekan_bold text-lg text-light_1 hover:scale-[1.01]"
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
