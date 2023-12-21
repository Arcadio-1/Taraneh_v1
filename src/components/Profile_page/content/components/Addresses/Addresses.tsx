import { Address_Full } from "@/types/type";
import { Session } from "next-auth";
import React, { useEffect, useState } from "react";
import {
  StateAndCityInterface,
  states,
} from "../Personal_info/components/Address";
import { getCities, setAddress } from "@/lib/actions/manageAddress";
import { useForm } from "react-hook-form";
import { AddressSchame } from "@/lib/util/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { City } from "@prisma/client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components_shadcn/ui/form";
import { Autocomplete, TextField } from "@mui/material";
import { Input } from "@/components_shadcn/ui/input";
import { toast } from "@/components_shadcn/ui/use-toast";
import Link from "next/link";
import ArrowLongIcon, { Arrow } from "@/components/Util/icons/ArrowLongIcon";

interface Props {
  address: Address_Full | null;
  user: Session;
}
const Addresses = ({ address, user }: Props) => {
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

  const form = useForm<z.infer<typeof AddressSchame>>({
    resolver: zodResolver(AddressSchame),
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
      if (stateValue?.value) {
        const fetchCities = await getCities(stateValue.value);
        const formatedCities = fetchCities.map(
          (city: City): StateAndCityInterface => {
            return {
              key: city.id,
              label: city.city_name,
              value: city.id,
            };
          }
        );
        setCities((prev) => {
          return (prev = formatedCities);
        });
      }
    };

    cityGeter();
  }, [stateValue]);

  const onSubmit = async (values: z.infer<typeof AddressSchame>) => {
    const isValid = AddressSchame.safeParse(values);
    const res = await setAddress(user.user.id, values);
    if (res.status === "success") {
      toast({
        duration: 2500,
        title: "آدرس شما ثبت شد",
        className: "bg-success text-light_1 text-xl",
      });
      return;
    } else {
      toast({
        duration: 2500,
        title: "خطا در ثبت آدرس شما رخ داد",
        className: "bg-g1_7 text-light_1 text-xl",
      });
    }
  };

  return (
    <div className=" bg-opacity-100 bg-light_1 ">
      <div className="flex items-center justify-start gap-2 mb-5">
        <Link href={`/profile`}>
          <ArrowLongIcon
            classes="h-10 w-10 md:hidden fill-dark_4"
            direction={Arrow.right}
          />
        </Link>
        <h1 className=" text-lg font-iranyekan_bold text-dark_3">
          مدیریت آدرس
        </h1>
      </div>
      <Form {...form}>
        <form
          className="flex flex-col gap-4 px-5"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex items-stretch gap-4">
            <div className="flex grow gap-4 flex-col">
              <FormField
                control={form.control}
                name="state_id"
                render={({ field }) => (
                  <FormItem>
                    <div>
                      <FormLabel className="text-md">استان</FormLabel>
                      <span className="text-g1_5 text-lg">*</span>
                    </div>
                    <Autocomplete
                      disablePortal
                      id="state-item"
                      value={stateValue || null}
                      defaultValue={states[2]}
                      onChange={(
                        event: any,
                        newValue: StateAndCityInterface | null
                      ) => {
                        setCities(null);
                        setCityValue(null);
                        setCityInputValue("");
                        if (newValue?.value) {
                          form.setValue("state_id", newValue.value);
                        } else {
                          form.setValue("city_id", "");
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
                            className="font-iranyekan_bold p-3 hover:bg-slate-100 cursor-pointer"
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
            <div className="flex  grow gap-4 flex-col">
              <FormField
                control={form.control}
                name="city_id"
                render={({ field }) => (
                  <FormItem>
                    <div>
                      <FormLabel className="text-md">شهر</FormLabel>
                      <span className="text-g1_5 text-lg">*</span>
                      {!!!stateValue && (
                        <span className="text-gray-400 text-x,">
                          (لطفا ابتدا استان خود را انتخاب کنید)
                        </span>
                      )}
                    </div>
                    <FormControl>
                      <Autocomplete
                        {...field}
                        disabled={!!!cities}
                        disablePortal
                        id="city-item"
                        value={cityValue || null}
                        onChange={(
                          event: any,
                          newValue: StateAndCityInterface | null
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
                              className="font-iranyekan_bold p-3 hover:bg-slate-100 cursor-pointer focus:bg-slate-100 selection:bg-red-500 "
                            >
                              {option.label}
                            </li>
                          );
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...field}
                            className="bg-light_1 "
                            key={params.id}
                            {...params}
                          />
                        )}
                      />
                    </FormControl>
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
                <span className="text-g1_5 text-lg">*</span>
                <FormControl>
                  <Input
                    // defaultValue={"00000000000000"}
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
            <FormField
              control={form.control}
              name="zip_code"
              render={({ field }) => (
                <FormItem className="grow">
                  <FormLabel className="text-md">کد پستی</FormLabel>
                  <span className="text-g1_5 text-lg">*</span>
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

          <button
            className="bg-g1_5 text-light_1 rounded-lg hover:scale-[1.01] px-6 py-2 text-lg font-iranyekan_bold"
            type="submit"
          >
            ذخیره اطلاعات
          </button>
        </form>
      </Form>
    </div>
  );
};

export default Addresses;
