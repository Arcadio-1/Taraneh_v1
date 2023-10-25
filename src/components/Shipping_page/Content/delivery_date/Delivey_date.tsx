"use client";
import {
  Day,
  calendarArray,
  getdayOfYear,
  jalali_to_gregorian,
} from "@/lib/util/calender";
import { ClockIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Label } from "@/components_shadcn/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components_shadcn/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components_shadcn/ui/radio-group";
import { SlectedInterface } from "../../Shipping";
import { SheetClose } from "@/components_shadcn/ui/sheet";

export interface DateInterface {
  gregorianDate: string;
}
interface Props {
  selectedDateHandler: (date: SlectedInterface) => void;
  sheeter: boolean;
}

const Delivey_date = ({ selectedDateHandler, sheeter }: Props) => {
  const [datesList, setDatesList] = useState<SlectedInterface[]>([]);

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
        // setDatesList([]);

        setDatesList((prevDays) => {
          const newDay = calendarArray[i];
          const gregorianDate = jalali_to_gregorian(
            `${newDay.year}/${newDay.month}/${newDay.day}`
          );
          prevDays.push({
            ...newDay,
            gregorianDate: gregorianDate,
          });
          return prevDays;
        });
      }
    }
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 mb-3 ml-auto">
        <ClockIcon className="stroke-gray-400 w-6 h-6" />
        <p>انتخاب زمان ارسال</p>
      </div>
      {!!datesList.length && (
        <div className="border rounded-lg py-4 px-4">
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
                    className="font-iranyekan_bold text-md flex-col items-center gap-3 pt-6"
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
                const date = JSON.parse(e);
                selectedDateHandler(date);
              }}
            >
              {datesList.map((date, index) => {
                return (
                  <TabsContent
                    className="mt-4 mx-6"
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
                            className="flex gap-1 cursor-pointer text-md"
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
                          className="flex gap-1 cursor-pointer text-md"
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
