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
import { PersonalInfoSchame } from "@/types_validation/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import Divider from "@/components/Util/ui/Divider";
import { useSession } from "next-auth/react";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/hook/use-toast";
import { addPersonalInfo } from "@/actions/userInfo/personalInfo/addPersonalInfo";
import SpinnerIcon from "@/components/Util/ui/icons/SpinnerIcon";

interface Props {
  name: string;
  family: string;
  code_meli: string;
}

const Name_family_codeMeli = ({ code_meli, family, name }: Props) => {
  const [mount, setMount] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  const { update } = useSession();

  const form = useForm<z.infer<typeof PersonalInfoSchame>>({
    resolver: zodResolver(PersonalInfoSchame),
    defaultValues: {
      name: name,
      family: family,
      code_meli: code_meli,
    },
  });

  const onSubmit = async (
    values: z.infer<typeof PersonalInfoSchame>,
  ): Promise<void> => {
    console.log("run");
    const personal_info: z.infer<typeof PersonalInfoSchame> = {
      name: values.name,
      family: values.family,
      code_meli: convert_to_en_number(values.code_meli),
    };
    const isValid = PersonalInfoSchame.safeParse(personal_info);
    if (!isValid.success) {
      toast({
        duration: 2500,
        title: isValid.error.message,
        className: "bg-g1_5 text-light_1 text-xl",
      });
      return;
    }
    startTransition(async () => {
      const request = await addPersonalInfo(personal_info);
      if (!request.ok) {
        toast({
          duration: 2500,
          title: request.message,
          className: "bg-g1_5 text-light_1 text-xl",
        });
      } else {
        const updateSession = await update({
          feild: "personal_info",
        });
        setOpen(false);
        if (!updateSession) {
          toast({
            duration: 2500,
            title: "لطفا مجددا به حساب کاربری خود وارد شوید",
            className: "bg-error text-light_1 text-xl",
          });
        } else {
          toast({
            duration: 2500,
            title: request.message,
            className: "bg-success text-light_1 text-xl",
          });
          setTimeout(() => {
            location.reload();
          }, 2000);
        }
      }
    });
  };
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
                disabled={isPending}
                className="flex items-center justify-center gap-2 rounded-lg bg-g1_5 px-6 py-2 font-iranyekan_bold text-lg text-light_1 hover:scale-[1.01]"
                type="submit"
              >
                ذخیره اطلاعات
                {isPending && <SpinnerIcon className="h-5 w-5 border-2" />}
              </button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default Name_family_codeMeli;
