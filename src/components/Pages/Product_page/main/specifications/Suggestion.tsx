import { InfoIcon } from "lucide-react";
import LikeIcon from "@/components/Util/ui/icons/LikeIcon";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/Util/shadcn/ui/tooltip";
import React from "react";

const Suggestion = () => {
  return (
    <div id="suggestion" className="flex items-center gap-2">
      <LikeIcon classes="h-6 w-6" />
      <p className="text-sm">
        <span>89% (610 نفر)</span>
        <span>از خریداران این محصول را پیشهاد کرده اند.</span>
      </p>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <InfoIcon className="h-6 w-6 opacity-60" />
          </TooltipTrigger>
          <TooltipContent className="max-w-[20rem] bg-gray-600 text-light_2">
            <p>
              خریداران کالا با انتخاب یکی از گزینه‌های پیشنهاد یا عدم پیشنهاد،
              تجربه خرید خود را با کاربران به اشتراک می‌گذارند.
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default Suggestion;
