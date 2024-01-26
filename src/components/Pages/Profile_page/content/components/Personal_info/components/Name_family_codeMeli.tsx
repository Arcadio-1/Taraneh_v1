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
import { convert_to_en_number } from "@/util_functions/translateNumbers";
import { personalInfoFormSchame } from "@/types_validation/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Divider } from "@mui/material";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface Props {
  userId: string;
  name: string;
  family: string;
  code_meli: string;
}

const Name_family_codeMeli = ({ userId, code_meli, family, name }: Props) => {
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  const { update } = useSession();

  const form = useForm<z.infer<typeof personalInfoFormSchame>>({
    resolver: zodResolver(personalInfoFormSchame),
    defaultValues: {
      name: name,
      family: family,
      code_meli: code_meli,
    },
  });

  const onSubmit = async (
    values: z.infer<typeof personalInfoFormSchame>,
  ): Promise<void> => {
    const personal_info: z.infer<typeof personalInfoFormSchame> = {
      name: values.name,
      family: values.family,
      code_meli: convert_to_en_number(values.code_meli),
    };
    const res = update({
      feild: "personal_info",
      data: { ...personal_info },
    });
    const res2 = await res;
    if (res2) {
      location.reload();
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
      <DialogContent className="bg-light_1 bg-opacity-100 sm:max-w-[425px]">
        <DialogHeader className=" flex flex-col gap-3">
          <DialogTitle className="text-xl">ثبت اطلاعات شناسایی</DialogTitle>
          <Divider className="my-" />
          <DialogDescription className="text-lg text-dark_2">
            لطفا اطلاعات شناسایی خود را وارد کنید. نام و نام خانوادگی شما باید
            با اطلاعاتی که وارد می‌کنید همخوانی داشته باشند.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="flex justify-between gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="grow">
                    <FormLabel className="text-md">نام</FormLabel>
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
              <FormField
                name="family"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md">نام خانوادگی</FormLabel>
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
            </div>

            <FormField
              control={form.control}
              name="code_meli"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md">کد ملی</FormLabel>
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
            <DialogFooter>
              <button
                className="rounded-lg bg-g1_5 px-6 py-2 font-iranyekan_bold text-lg text-light_1 hover:scale-[1.01]"
                type="submit"
              >
                ذخیره اطلاعات
              </button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default Name_family_codeMeli;
