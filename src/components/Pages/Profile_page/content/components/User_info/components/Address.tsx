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
import { addAddress } from "@/actions/userInfo/address/addAddress";
import { FullAddressSchame } from "@/types_validation/validation";
import { Address_Full } from "@/types_validation/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Autocomplete, Divider, TextField } from "@mui/material";
import { City } from "@prisma/client";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/hook/use-toast";
import { states } from "@/constants/states";
import { getCities } from "@/actions/util/getCities";
import SpinnerIcon from "@/components/Util/ui/icons/SpinnerIcon";

interface Props {
  address: Address_Full | null;
}
export interface StateAndCityInterface {
  value: string;
  label: string;
  key: string;
}

const Address = ({ address }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [cities, setCities] = useState<StateAndCityInterface[] | null>();

  const [stateValue, setStateValue] = useState<StateAndCityInterface | null>();
  const [stateInputValue, setStateInputValue] = useState("");

  const [cityValue, setCityValue] = useState<StateAndCityInterface | null>();
  const [cityInputValue, setCityInputValue] = useState("");

  useEffect(() => {
    if (address) {
      setStateValue({
        key: address.state_id,
        label: address.state.state_name,
        value: address.state_id,
      });
      setCityValue({
        key: address.city_id,
        label: address.city.city_name,
        value: address.city_id,
      });
    }
  }, [address]);

  const form = useForm<z.infer<typeof FullAddressSchame>>({
    resolver: zodResolver(FullAddressSchame),
    defaultValues: {
      state_id: address?.state_id || "",
      city_id: address?.city_id || "",
      zip_code: address?.zip_code || "",
      house_number: address?.house_number || "",
      address: address?.address || "",
    },
  });

  useEffect(() => {
    const cityGeter = async () => {
      const fetchCities = await getCities(stateValue!.value);
      if (!fetchCities.ok) {
        toast({
          duration: 2500,
          title: fetchCities.message,
          className: "bg-error text-light_1 text-xl",
        });
        return;
      }
      const formatedCities = fetchCities.cities.map(
        (city: City): StateAndCityInterface => {
          return {
            key: city.id,
            label: city.city_name,
            value: city.id,
          };
        },
      );

      setCities((prev) => {
        return (prev = formatedCities);
      });
    };
    if (stateValue?.value) {
      cityGeter();
    }
  }, [stateValue]);
  const onSubmit = async (values: z.infer<typeof FullAddressSchame>) => {
    const isValid = FullAddressSchame.safeParse(values);
    if (isValid.success) {
      startTransition(async () => {
        const res = await addAddress(values);
        if (res.status === "Success") {
          setOpen(false);
          toast({
            duration: 2500,
            title: res.message,
            className: "bg-success text-light_1 text-xl",
          });
          return;
        } else {
          toast({
            duration: 2500,
            title: res.message,
            className: "bg-g1_5 text-light_1 text-xl",
          });
        }
      });
    }
  };

  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <svg viewBox="0 0 24 24" className="h-6 w-6 cursor-pointer">
          <path d="m16 2.012 3 3L16.713 7.3l-3-3zM4 14v3h3l8.299-8.287-3-3zm0 6h16v2H4z" />
        </svg>
      </DialogTrigger>
      <DialogContent className="bg-light_1 bg-opacity-100 sm:max-w-[425px]">
        <DialogHeader className=" flex flex-col gap-3">
          <DialogTitle className="text-xl">ثبت اطلاعات آدرس</DialogTitle>
          <Divider className="my-" />
          <DialogDescription className="text-lg text-dark_2">
            لطفا آدرس خود را جهت دریافت مرسوله پستی ثبت نمایید.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="flex items-stretch gap-4">
              <div className="flex grow flex-col gap-4">
                <FormField
                  control={form.control}
                  name="state_id"
                  render={({ field }) => (
                    <FormItem>
                      <div>
                        <FormLabel className="text-md">استان</FormLabel>
                        <span className="text-lg text-g1_5">*</span>
                      </div>
                      <Autocomplete
                        disablePortal
                        id="state-item"
                        value={stateValue || null}
                        defaultValue={states[2]}
                        onChange={(
                          event: any,
                          newValue: StateAndCityInterface | null,
                        ) => {
                          setCities(null);
                          setCityValue(null);
                          setCityInputValue("");
                          form.setValue("city_id", "");
                          if (newValue?.value) {
                            form.setValue("state_id", newValue.value);
                          } else {
                            form.setValue("state_id", "");
                          }
                          setStateValue(newValue);
                        }}
                        inputMode="text"
                        inputValue={stateInputValue}
                        onInputChange={(event, newInputValue) => {
                          setStateInputValue(newInputValue);
                        }}
                        options={states}
                        sx={{
                          width: "100%",
                          maxWidth: "18rem",
                          height: 40,
                          "& .MuiOutlinedInput-root": {
                            padding: "0px 5px  !important",
                          },
                          "& .MuiAutocomplete-endAdornment": {
                            display: "flex",
                            right: "80%  !important",
                            top: "calc(50% - 10px)",
                          },
                          "& .MuiAutocomplete-input": {
                            fontFamily: "iranyekan_bold",
                          },
                        }}
                        renderOption={(props, option) => {
                          return (
                            <li
                              {...props}
                              key={option.key}
                              className="cursor-pointer p-3 font-iranyekan_bold hover:bg-slate-100"
                            >
                              {option.label}
                            </li>
                          );
                        }}
                        renderInput={(params) => (
                          <TextField
                            className="bg-light_1 "
                            key={params.id}
                            {...params}
                          />
                        )}
                      />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex  grow flex-col gap-4">
                <FormField
                  control={form.control}
                  name="city_id"
                  render={({ field }) => (
                    <FormItem>
                      <div>
                        <FormLabel className="text-md">شهر</FormLabel>
                        <span className="text-lg text-g1_5">*</span>
                        {!!!stateValue && (
                          <span className="text-x, text-gray-400">
                            (لطفا ابتدا استان خود را انتخاب کنید)
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <FormControl>
                          <Autocomplete
                            {...field}
                            disabled={!!!cities}
                            disablePortal
                            id="city-item"
                            value={cityValue || null}
                            onChange={(
                              event: any,
                              newValue: StateAndCityInterface | null,
                            ) => {
                              if (newValue?.value) {
                                form.setValue("city_id", newValue.value);
                              } else {
                                form.setValue("city_id", "");
                              }
                              setCityValue(newValue);
                            }}
                            inputMode="text"
                            inputValue={cityInputValue}
                            onInputChange={(event, newInputValue) => {
                              setCityInputValue(newInputValue);
                            }}
                            options={cities || []}
                            sx={{
                              width: "100%",
                              height: 40,
                              "& .MuiOutlinedInput-root": {
                                padding: "0px 5px  !important",
                              },
                              "& .MuiAutocomplete-endAdornment": {
                                display: "flex",
                                right: "80%  !important",
                                top: "calc(50% - 10px)",
                              },
                              "& .MuiAutocomplete-input": {
                                fontFamily: "iranyekan_bold",
                              },
                            }}
                            renderOption={(props, option) => {
                              return (
                                <li
                                  {...props}
                                  key={option.key}
                                  className="cursor-pointer p-3 font-iranyekan_bold selection:bg-red-500 hover:bg-slate-100 focus:bg-slate-100 "
                                >
                                  {option.label}
                                </li>
                              );
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...field}
                                className=" bg-light_1 "
                                key={params.id}
                                {...params}
                              />
                            )}
                          />
                        </FormControl>
                        {!!!cities && (
                          <SpinnerIcon className="mb-4 h-5 w-5 border-2 border-g1_7 border-r-transparent" />
                        )}
                      </div>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="grow">
                  <FormLabel className="text-md">آدرس</FormLabel>
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
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="house_number"
                render={({ field }) => (
                  <FormItem className="grow">
                    <FormLabel className="text-md">پلاک</FormLabel>
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
                control={form.control}
                name="zip_code"
                render={({ field }) => (
                  <FormItem className="grow">
                    <FormLabel className="text-md">کد پستی</FormLabel>
                    <span className="text-lg text-g1_5">*</span>
                    <FormControl>
                      <Input
                        className="rounded-[4px] border border-gray-400 font-iranyekan_bold"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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

export default Address;
