import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import TomanIcon from "@/components/Util/icons/TomanIcon";
import { numberGenerator, numberSeperator } from "@/lib/util/price_formt";

// function valuetext(value: number) {
//   return `${value}°C`;
// }

enum Typer {
  min = "min",
  max = "max",
}

const minDistance = 1;

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

export default function PriceRange() {
  const [value, setValue] = React.useState<number[]>([0, 1000000]);

  const [minVal, setMinVal] = React.useState<string>("0");
  const [maxVal, setMaxVal] = React.useState<string>("1,000,000");

  const marks = [
    {
      value: 80000,
      label: "ارزانترین",
    },
    {
      value: 930000,
      label: "گرانترین",
    },
  ];

  const handleChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    // console.log(newValue);
    // console.log(activeThumb);
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
      setMinVal(numberSeperator(value[0]));
      setMaxVal(numberSeperator(value[1]));
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
      setMinVal(numberSeperator(value[0]));
      setMaxVal(numberSeperator(value[1]));
    }
  };

  const onChangeMaxVal = (
    typer: Typer,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const num = numberGenerator(e.target.value);
    // console.log(num);
    const newValue: number = num;

    if (typer === Typer.min) {
      setValue([Math.min(newValue, value[1] - minDistance), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue, value[0] + minDistance)]);
    }
  };

  return (
    <div className="">
      <div className="flex flex-col gap-3 items-center justify-center">
        <div className="flex items-center gap-3 justify-between">
          <span className="text-lg">از</span>
          <input
            className="border-b w-1/2 text-center text-[2rem] font-iransansnum"
            type="text"
            value={numberSeperator(value[0])}
            onChange={onChangeMaxVal.bind(null, Typer.min)}
          />
          <span>
            <TomanIcon classes="h-[2rem] w-[2rem]" />
          </span>
        </div>
        <div className="flex items-center gap-3 justify-between">
          <span className="text-lg">تا</span>
          <input
            className="border-b w-1/2 text-center text-[2rem] font-iransansnum"
            type="text"
            value={numberSeperator(value[1])}
            onChange={onChangeMaxVal.bind(null, Typer.max)}
          />
          <span>
            <TomanIcon classes="h-[2rem] w-[2rem]" />
          </span>
        </div>
      </div>
      <Box sx={{ width: 300 }}>
        <AirbnbSlider
          className="font-iransansbold text-xl"
          getAriaLabel={() => "Minimum distance"}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          // getAriaValueText={valuetext}
          disableSwap
          min={0}
          max={1000000}
          marks={marks}
        />
      </Box>
    </div>
  );
}
