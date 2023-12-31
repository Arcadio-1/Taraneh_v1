"use client";
import {
  StateAndCityInterface,
  states,
} from "@/components/Profile_page/content/components/Personal_info/components/Address";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components_shadcn/ui/form";
import { Input } from "@/components_shadcn/ui/input";
import { getCities, setAddress } from "@/lib/actions/manageAddress";
import { AddressSchame, personalInfoFormSchame } from "@/lib/util/validation";
import { Address_Full } from "@/types/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Autocomplete, Divider, TextField } from "@mui/material";
import { City } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface Props {
  userId: string;
  address: Address_Full | null;
}

const Address_info = ({ userId, address }: Props) => {
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

  const address_form = useForm<z.infer<typeof AddressSchame>>({
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
    const isValid = AddressSchame.parse(values);
    const res = await setAddress(userId, values);
    if (res.status === "success") {
      location.reload();
    }
  };

  return (
    <div className=" bg-opacity-100 bg-light_1 w-full">
      <div className=" flex flex-col gap-3">
        <h1 className="text-xl">ثبت اطلاعات آدرس</h1>
        <Divider className="my-" />
        <p className="text-dark_2 text-lg">
          لطفا آدرس خود را جهت دریافت مرسوله پستی ثبت نمایید.
        </p>
      </div>
      <Form {...address_form}>
        <form
          className="flex flex-col gap-4"
          onSubmit={address_form.handleSubmit(onSubmit)}
        >
          <div className="flex items-stretch gap-4">
            <div className="flex grow gap-4 flex-col">
              <FormField
                control={address_form.control}
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
                          address_form.setValue("state_id", newValue.value);
                        } else {
                          address_form.setValue("city_id", "");
                          address_form.setValue("state_id", "");
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
                          padding: "0px 2px  !important",
                        },
                        "& .MuiAutocomplete-endAdornment": {
                          display: "flex",
                          right: "80%  !important",
                          top: "calc(50% - 10px)",
                        },
                        "& .MuiAutocomplete-input": {
                          fontFamily: "iranyekan_bold",
                          height: "10px",
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
                control={address_form.control}
                name="city_id"
                render={({ field }) => (
                  <FormItem>
                    <div className="">
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
                            address_form.setValue("city_id", newValue.value);
                          } else {
                            address_form.setValue("city_id", "");
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
                          maxWidth: "25rem",
                          height: 40,
                          "& .MuiOutlinedInput-root": {
                            padding: "0px 2px  !important",
                          },
                          "& .MuiAutocomplete-endAdornment": {
                            display: "flex",
                            right: "80%  !important",
                            top: "calc(50% - 10px)",
                          },
                          "& .MuiAutocomplete-input": {
                            fontFamily: "iranyekan_bold",
                            height: "10px",
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
            control={address_form.control}
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
              control={address_form.control}
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
              control={address_form.control}
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
          <div>
            <button
              className="bg-g1_5 text-light_1 rounded-lg hover:scale-[1.01] px-6 py-2 text-lg font-iranyekan_bold"
              type="submit"
            >
              ثبت آدرس
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Address_info;
