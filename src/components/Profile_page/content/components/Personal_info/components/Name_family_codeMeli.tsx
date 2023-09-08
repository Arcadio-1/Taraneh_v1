"use client";
import { Button } from "@/components_shadcn/ui/button";
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
import { personalInfoFormSchame } from "@/lib/util/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit3Icon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface Props {
  userId: string;
}

const Name_family_codeMeli = ({ userId }: Props) => {
  const { update } = useSession();

  const form = useForm<z.infer<typeof personalInfoFormSchame>>({
    resolver: zodResolver(personalInfoFormSchame),
    defaultValues: {
      name: "",
      family: "",
      code_meli: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof personalInfoFormSchame>) => {
    console.log(values);
    const res = update({
      feild: "personal_info",
      id: userId,
      data: { ...values },
    });
    const res2 = await res;
    if (res2) {
      // console.log("success");
      location.reload();
    }
    // console.log(res2);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Edit3Icon className="h-7 w-7" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="">
          <DialogTitle>ثبت اطلاعات شناسایی</DialogTitle>
          <DialogDescription>
            لطفا اطلاعات شناسایی خود را وارد کنید. نام و نام خانوادگی شما باید
            با اطلاعاتی که وارد می‌کنید همخوانی داشته باشند.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نام</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                  <FormLabel>نام خانوادگی</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="code_meli"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>کد ملی</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
        {/* <Button
          onClick={() => {
            const res = update({
              feild: "personal_info",
              id: userId,
              data: {
                name: "تللللار مار",
                family: "اسکندری",
                code_meli: "3790352268",
              },
            });
          }}
          type="button"
        > 
          Save changes2
        </Button> */}
      </DialogContent>
    </Dialog>
  );
};

export default Name_family_codeMeli;
