import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import TomanIcon from "@/components/Util/icons/TomanIcon";
import { numberSeperator } from "@/util_functions/price_formt";
import { useRouter, useSearchParams } from "next/navigation";
import { SortValue } from "@/types_validation/type";

// enum Typer {
//   min = "min",
//   max = "max",
// }

const minDistance = 50000;
const minValue = 0;
const maxValue = 1000000;

const AirbnbSlider = styled(Slider)(({ theme }) => ({
  color: "#3a8589",
  height: 3,
  width: 180,
  marginTop: "2rem",

  //   border: "2px solid red",
  padding: "13px 0px",
  "& .MuiSlider-thumb": {
    height: 20,
    width: 20,
    // backgroundColor: "#fff",
    border: "1px solid currentColor",
    "&:hover": {
      boxShadow: "0 0 0 8px rgba(58, 133, 137, 0.16)",
    },

    "& .airbnb-bar": {
      height: 9,
      width: 10,
      backgroundColor: "currentColor",
      marginLeft: 1,
      marginRight: 1,
    },
  },
  "& .MuiSlider-track": {
    // border: "2px solid red",
    height: 3,
  },
  "& .MuiSlider-valueLabel": {
    display: "none",
    // lineHeight: 1.2,
    // fontSize: 12,
    // background: "unset",
    // padding: 0,
    // width: 32,
    // height: 32,
    // borderRadius: "50% 50% 50% 0",
    // backgroundColor: "#52af77",
    // transformOrigin: "bottom left",
    // transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    // "&:before": { display: "none" },
    // "&.MuiSlider-valueLabelOpen": {
    //   transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    // },
    // "& > *": {
    //   transform: "rotate(45deg)",
    // },
  },
  "& .MuiSlider-markLabel": {
    fontSize: 12,
    fontFamily: "iranyekan_bold",
    // margin: "0px 10px",
  },
  "& .MuiSlider-rail": {
    color: theme.palette.mode === "dark" ? "#bfbfbf" : "#d8d8d8",
    opacity: theme.palette.mode === "dark" ? undefined : 1,
    height: 3,
  },
}));
//minPrice=206050&maxPrice=672716
//minPrice=-7454&maxPrice=672716
interface Props {
  searchQuery: string | undefined;
  sort: SortValue;
  bQ: string[];
  maxPrice: string;
  minPrice: string;
}

export default function PriceRange({
  searchQuery = "",
  sort = SortValue.grtView,
  bQ,
  maxPrice = "1000000",
  minPrice = "0",
}: Props) {
  const [value, setValue] = React.useState<number[]>([
    maxValue - Number(maxPrice),
    maxValue - Number(minPrice),
  ]);

  const marks = [
    {
      value: 80000,
      label: "گرانترین",
    },
    {
      value: 930000,
      label: "ارزانترین",
    },
  ];
  const router = useRouter();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      const miner = maxValue - value[1];
      const maxer = maxValue - value[0];
      if (
        value[0] === minValue &&
        value[1] === maxValue &&
        Number(minPrice) === minValue &&
        Number(maxPrice) === maxValue
      ) {
        return;
      }
      const url = `?${sort !== SortValue.grtView ? `sort=${sort}&` : ``}${bQ
        .map((item) => {
          return `bQ=${item}`;
        })
        .toString()
        .replaceAll(",", "&")}${bQ.length ? `&` : ``}${
        !!searchQuery ? `searchQuery=${searchQuery}&` : ``
      }minPrice=${miner}&maxPrice=${maxer}`;

      router.push(`${url}`);
    }, 2000);
    return () => clearTimeout(timer);
  }, [value]);

  const handleChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (activeThumb === 0) {
      setValue((prev) => {
        const minVal = Math.min(newValue[0], value[1] - minDistance);
        return (prev = [minVal, value[1]]);
      });
    } else {
      setValue((prev) => {
        const maxVal = Math.max(newValue[1], value[0] + minDistance);
        return (prev = [value[0], maxVal]);
      });
    }
  };

  return (
    <div className="">
      <div className="flex flex-col items-center justify-center gap-3">
        <div className="flex w-full items-center justify-evenly gap-3">
          <span className="text-lg">از</span>
          <span className="w-1/2 select-none border-b bg-white bg-opacity-80 text-center font-iransansnum text-[1.7rem]">
            {numberSeperator(maxValue - value[1])}
          </span>
          <TomanIcon classes="h-[2rem] w-[2rem]" />
        </div>
        <div className="flex w-full items-center justify-evenly gap-3">
          <span className="text-lg">تا</span>
          <span className="w-1/2 select-none border-b bg-white bg-opacity-80 text-center font-iransansnum text-[1.7rem]">
            {numberSeperator(maxValue - value[0])}
          </span>
          <TomanIcon classes="h-[2rem] w-[2rem]" />
        </div>
      </div>
      <div className="flex items-center justify-center">
        {/* <Box sx={{ width: 300 }}> */}
        <AirbnbSlider
          dir="ltr"
          className="text-md font-iransansbold text-red-400"
          getAriaLabel={() => "Minimum distance"}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          // getAriaValueText={valuetext}
          disableSwap
          sx={{ ".MuiSlider-markLabel": { fontSize: "1rem" } }}
          min={minValue}
          max={maxValue}
          marks={marks}
        />
        {/* </Box> */}
      </div>
    </div>
  );
}
