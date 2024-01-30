"use client";
import {
  Day,
  calendarArray,
  getdayOfYear,
  jalali_to_gregorian,
} from "@/util_functions/calender";
import { ClockIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Label } from "@/components/Util/shadcn/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/Util/shadcn/ui/tabs";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/Util/shadcn/ui/radio-group";
import { SheetClose } from "@/components/Util/shadcn/ui/sheet";
import { useGlobalContext } from "@/app/provider/Provider";
import { OrderSelectedDate } from "@prisma/client";
import { cn } from "@/lib/utils";

interface Props {
  sheeter: boolean;
}

const Delivey_date = ({ sheeter }: Props) => {
  const [datesList, setDatesList] = useState<OrderSelectedDate[]>([]);
  const { setDeliveryDate } = useGlobalContext();

  useEffect(() => {
    const dayOfYear = getdayOfYear();
    let avalbelDatesList = 0;
    const delayDays = 1;
    const avalbelDatesListNumber = 5;
    setDatesList([]);
    for (
      let i = dayOfYear + delayDays;
      avalbelDatesList < avalbelDatesListNumber;
      i++
    ) {
      if (!calendarArray[i].holiday) {
        avalbelDatesList++;

        setDatesList((prevDays) => {
          const newDay = calendarArray[i];
          const gregorianDate = jalali_to_gregorian(
            `${newDay.year}/${newDay.month}/${newDay.day}`,
          );
          // prevDays.push({
          //   ...newDay,
          //   gregorianDate: gregorianDate,
          // });
          // return prevDays;
          return (prevDays = [
            ...prevDays,
            {
              ...newDay,
              gregorianDate: gregorianDate,
            },
          ]);
        });
      }
    }
  }, []);

  return (
    <div
      className={cn(`hidden flex-col gap-4 md:flex`, {
        flex: sheeter,
        "md:hidden": sheeter,
      })}
    >
      <div className="mb-3 ml-auto flex items-center gap-2">
        <ClockIcon className="h-6 w-6 stroke-gray-400" />
        <p>انتخاب زمان ارسال</p>
      </div>
      {!!datesList.length && (
        <div className="rounded-lg border px-4 py-4">
          <Tabs
            className=" flex flex-col gap-6"
            defaultValue={datesList[0].dayOfyear.toString()}
          >
            <TabsList className="flex flex-row-reverse justify-start gap-2 p-4 ">
              {datesList.map((date, index) => {
                return (
                  <TabsTrigger
                    key={date.dayOfyear}
                    value={date.dayOfyear.toString()}
                    className="text-md flex-col items-center gap-3 pt-6 font-iranyekan_bold"
                  >
                    <span>{date.weekday}</span>
                    <span className="font-iransansnum text-2xl">
                      {date.day}
                    </span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
            <RadioGroup
              className="border-t py-3"
              onValueChange={(e) => {
                const date: OrderSelectedDate = JSON.parse(e);
                setDeliveryDate((prev) => {
                  return (prev = date);
                });
              }}
            >
              {datesList.map((date, index) => {
                return (
                  <TabsContent
                    className="mx-6 mt-4"
                    key={date.dayOfyear}
                    value={date.dayOfyear.toString()}
                  >
                    <div className="flex items-center justify-end space-x-2">
                      <RadioGroupItem
                        value={JSON.stringify(date)}
                        // defaultChecked={index === 0}
                        // checked={index === 1}
                        id={date.dayOfyear.toString()}
                      />
                      {sheeter && (
                        <SheetClose asChild>
                          <Label
                            htmlFor={date.dayOfyear.toString()}
                            className="text-md flex cursor-pointer gap-1"
                          >
                            <span>ساعت</span>
                            <span className="font-iransansnum">9</span>
                            <span>تا</span>
                            <span className="font-iransansnum">22</span>
                          </Label>
                        </SheetClose>
                      )}
                      {!sheeter && (
                        <Label
                          htmlFor={date.dayOfyear.toString()}
                          className="text-md flex cursor-pointer gap-1"
                        >
                          <span>ساعت</span>
                          <span className="font-iransansnum">9</span>
                          <span>تا</span>
                          <span className="font-iransansnum">22</span>
                        </Label>
                      )}
                    </div>
                  </TabsContent>
                );
              })}
            </RadioGroup>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default Delivey_date;
