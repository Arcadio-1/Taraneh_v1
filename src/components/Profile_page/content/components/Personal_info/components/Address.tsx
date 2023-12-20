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
import { getCities, setAddress } from "@/lib/actions/manageAddress";
import { AddressSchame } from "@/lib/util/validation";
import { Address_Full } from "@/types/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Autocomplete, Divider, TextField } from "@mui/material";
import { City } from "@prisma/client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface Props {
  userId: string;
  address: Address_Full | null;
}
export interface StateAndCityInterface {
  value: string;
  label: string;
  key: string;
}
export const states: StateAndCityInterface[] = [
  {
    value: "637ebcac50832e0655c08d20",
    key: "637ebcac50832e0655c08d20",
    label: "آذربایجان شرقی",
  },
  {
    value: "637ebcac50832e0655c08d23",
    key: "637ebcac50832e0655c08d23",
    label: "اصفهان",
  },
  {
    value: "637ebcac50832e0655c08d24",
    key: "637ebcac50832e0655c08d24",
    label: "البرز",
  },
  {
    value: "637ebcac50832e0655c08d2c",
    key: "637ebcac50832e0655c08d2c",
    label: "خوزستان",
  },
  {
    value: "637ebcac50832e0655c08d2d",
    key: "637ebcac50832e0655c08d2d",
    label: "زنجان",
  },
  {
    value: "637ebcac50832e0655c08d2e",
    key: "637ebcac50832e0655c08d2e",
    label: "سمنان",
  },
  {
    value: "637ebcac50832e0655c08d37",
    key: "637ebcac50832e0655c08d37",
    label: "گلستان",
  },
  {
    value: "637ebcac50832e0655c08d38",
    key: "637ebcac50832e0655c08d38",
    label: "گیلان",
  },
  {
    value: "637ebcac50832e0655c08d21",
    key: "637ebcac50832e0655c08d21",
    label: "آذربایجان غربی",
  },
  {
    value: "637ebcac50832e0655c08d22",
    key: "637ebcac50832e0655c08d22",
    label: "اردبیل",
  },
  {
    value: "637ebcac50832e0655c08d25",
    key: "637ebcac50832e0655c08d25",
    label: "ایلام",
  },
  {
    value: "637ebcac50832e0655c08d2b",
    key: "637ebcac50832e0655c08d2b",
    label: "خراسان شمالی",
  },
  {
    value: "637ebcac50832e0655c08d30",
    key: "637ebcac50832e0655c08d30",
    label: "فارس",
  },
  {
    value: "637ebcac50832e0655c08d34",
    key: "637ebcac50832e0655c08d34",
    label: "کرمان",
  },
  {
    value: "637ebcac50832e0655c08d3b",
    key: "637ebcac50832e0655c08d3b",
    label: "مرکزی",
  },
  {
    value: "637ebcac50832e0655c08d26",
    key: "637ebcac50832e0655c08d26",
    label: "بوشهر",
  },
  {
    value: "637ebcac50832e0655c08d27",
    key: "637ebcac50832e0655c08d27",
    label: "تهران",
  },
  {
    value: "637ebcac50832e0655c08d28",
    key: "637ebcac50832e0655c08d28",
    label: "چهارمحال و بختیاری",
  },
  {
    value: "637ebcac50832e0655c08d29",
    key: "637ebcac50832e0655c08d29",
    label: "خراسان جنوبی",
  },
  {
    value: "637ebcac50832e0655c08d2a",
    key: "637ebcac50832e0655c08d2a",
    label: "خراسان رضوی",
  },
  {
    value: "637ebcac50832e0655c08d32",
    key: "637ebcac50832e0655c08d32",
    label: "قم",
  },
  {
    value: "637ebcac50832e0655c08d35",
    key: "637ebcac50832e0655c08d35",
    label: "کرمانشاه",
  },
  {
    value: "637ebcac50832e0655c08d3c",
    key: "637ebcac50832e0655c08d3c",
    label: "هرمزگان",
  },
  {
    value: "637ebcac50832e0655c08d3d",
    key: "637ebcac50832e0655c08d3d",
    label: "همدان",
  },
  {
    value: "637ebcac50832e0655c08d2f",
    key: "637ebcac50832e0655c08d2f",
    label: "سیستان و بلوچستان",
  },
  {
    value: "637ebcac50832e0655c08d31",
    key: "637ebcac50832e0655c08d31",
    label: "قزوین",
  },
  {
    value: "637ebcac50832e0655c08d33",
    key: "637ebcac50832e0655c08d33",
    label: "کردستان",
  },
  {
    value: "637ebcac50832e0655c08d36",
    key: "637ebcac50832e0655c08d36",
    label: "کهگیلویه وبویراحمد",
  },
  {
    value: "637ebcac50832e0655c08d39",
    key: "637ebcac50832e0655c08d39",
    label: "لرستان",
  },
  {
    value: "637ebcac50832e0655c08d3a",
    key: "637ebcac50832e0655c08d3a",
    label: "مازندران",
  },
  {
    value: "637ebcac50832e0655c08d3e",
    key: "637ebcac50832e0655c08d3e",
    label: "یزد",
  },
];

const Address = ({ userId, address }: Props) => {
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
    const res = await setAddress(userId, values);
    if (res.status === "success") {
      // location.reload();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <svg viewBox="0 0 24 24" className="h-6 w-6 cursor-pointer">
          <path d="m16 2.012 3 3L16.713 7.3l-3-3zM4 14v3h3l8.299-8.287-3-3zm0 6h16v2H4z" />
        </svg>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-opacity-100 bg-light_1">
        <DialogHeader className=" flex flex-col gap-3">
          <DialogTitle className="text-xl">ثبت اطلاعات آدرس</DialogTitle>
          <Divider className="my-" />
          <DialogDescription className="text-dark_2 text-lg">
            لطفا آدرس خود را جهت دریافت مرسوله پستی ثبت نمایید.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
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

            <DialogFooter>
              <button
                className="bg-g1_5 text-light_1 rounded-lg hover:scale-[1.01] px-6 py-2 text-lg font-iranyekan_bold"
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

export default Address;
