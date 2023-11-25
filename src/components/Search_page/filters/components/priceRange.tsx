import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import TomanIcon from "@/components/Util/icons/TomanIcon";
import { numberSeperator } from "@/lib/util/price_formt";
import { useRouter, useSearchParams } from "next/navigation";
import { SortValue } from "../../sorts/Sort";

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
    activeThumb: number
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

  // const textChangeHandler = (
  //   typer: Typer,
  //   e: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   console.log(e.target.value);
  //   const num = numberGenerator(e.target.value);
  //   const newValue: number = num;

  //   if (typer === Typer.min) {
  //     setValue([Math.min(newValue, value[1] - minDistance), value[1]]);
  //   } else {
  //     setValue([value[0], Math.max(newValue, value[0] + minDistance)]);
  //   }
  // };

  return (
    <div className="">
      <div className="flex flex-col gap-3 items-center justify-center">
        <div className="flex items-center gap-3 justify-evenly w-full">
          <span className="text-lg">از</span>
          <span className="border-b w-1/2 text-center text-[1.7rem] font-iransansnum bg-white bg-opacity-80 select-none">
            {numberSeperator(maxValue - value[1])}
          </span>
          <TomanIcon classes="h-[2rem] w-[2rem]" />
        </div>
        <div className="flex items-center gap-3 justify-evenly w-full">
          <span className="text-lg">تا</span>
          <span className="border-b w-1/2 text-center text-[1.7rem] font-iransansnum bg-white bg-opacity-80 select-none">
            {numberSeperator(maxValue - value[0])}
          </span>
          <TomanIcon classes="h-[2rem] w-[2rem]" />
        </div>
      </div>
      <Box sx={{ width: 300 }}>
        <AirbnbSlider
          dir="ltr"
          className="font-iransansbold text-xl"
          getAriaLabel={() => "Minimum distance"}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          // getAriaValueText={valuetext}
          disableSwap
          min={minValue}
          max={maxValue}
          marks={marks}
        />
      </Box>
    </div>
  );
}
