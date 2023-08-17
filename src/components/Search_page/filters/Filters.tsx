"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Brand } from "@prisma/client";
import { MainCatsWithSpecificCats } from "@/types/type";
import Categories from "./components/categories";
import PriceRange from "./components/priceRange";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  // border: `1px solid ${theme.palette.divider}`,
  // borderRadius: "10px",
  // backgroundColor: "gray",
  // marginBottom: "2px",
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  // flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(-90deg)",
  },
  "& .MuiAccordionSummary-expandIconWrapper": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  // backgroundColor: "red",
  // borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

interface Props {
  brands: Brand[];
  mainCats: MainCatsWithSpecificCats[];
}

export default function Filters({ brands, mainCats }: Props) {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        className=""
      >
        <AccordionSummary
          className=""
          aria-controls="panel1d-content"
          id="panel1d-header"
        >
          <Typography className="font-iranyekan_bold text-xl">
            دسته بندی ها
          </Typography>
        </AccordionSummary>
        <AccordionDetails className="bg-slate-100">
          <Categories mainCats={mainCats} />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography className="font-iranyekan_bold text-xl">
            برند ها
          </Typography>
        </AccordionSummary>
        <AccordionDetails className="bg-slate-100">
          {brands.map((brand) => {
            return (
              <div key={brand.id} className="flex justify-between">
                <div className="flex gap-1">
                  <input type="checkbox" />
                  <span>{brand.title_fr}</span>
                </div>
                <span>{brand.title_en}</span>
              </div>
            );
          })}
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography className="font-iranyekan_bold text-xl">
            محدوده قیمت
          </Typography>
        </AccordionSummary>
        <AccordionDetails className="bg-slate-100">
          <PriceRange />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
