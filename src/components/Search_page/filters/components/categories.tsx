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
import { MainCatsWithSpecificCats } from "@/types/type";
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "./AccordionStyled";

// const Accordion = styled((props: AccordionProps) => (
//   <MuiAccordion disableGutters elevation={0} square {...props} />
// ))(({ theme }) => ({
//   // border: `1px solid ${theme.palette.divider}`,
//   // borderRadius: "10px",
//   // backgroundColor: "gray",
//   // marginBottom: "2px",
//   "&:not(:last-child)": {
//     borderBottom: 0,
//   },
//   "&:before": {
//     display: "none",
//   },
// }));

// const AccordionSummary = styled((props: AccordionSummaryProps) => (
//   <MuiAccordionSummary
//     expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
//     {...props}
//   />
// ))(({ theme }) => ({
//   backgroundColor:
//     theme.palette.mode === "dark"
//       ? "rgba(255, 255, 255, .05)"
//       : "rgba(0, 0, 0, .03)",
//   // flexDirection: "row-reverse",
//   "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
//     transform: "rotate(-90deg)",
//   },
//   "& .MuiAccordionSummary-expandIconWrapper": {
//     transform: "rotate(90deg)",
//   },
//   "& .MuiAccordionSummary-content": {
//     marginLeft: theme.spacing(1),
//   },
// }));

// const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
//   padding: theme.spacing(2),
//   // borderTop: "1px solid rgba(0, 0, 0, .125)",
// }));

interface Props {
  mainCats: MainCatsWithSpecificCats[];
  searchQuery: string;
  sort: string;
}

export default function Categories({ mainCats, searchQuery, sort }: Props) {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const url = `${!!sort || !!searchQuery ? "?" : ""}${
    !!sort ? `sort=${sort}` : ""
  }${sort && searchQuery ? "&" : ""}${
    !!searchQuery ? `searchQuery=${searchQuery}` : ""
  }`;
  return (
    <div>
      {mainCats.map((main) => {
        return (
          <Accordion
            expanded={expanded === `${main.label}`}
            onChange={handleChange(`${main.label}`)}
            key={main.id}
          >
            <AccordionSummary
              className=""
              aria-controls={`${main.label}d-content`}
              id={`${main.label}d-header`}
            >
              {main.title}
            </AccordionSummary>
            <AccordionDetails className="flex flex-col gap-4 ">
              <Link
                href={`/search/${main.label}${url}`}
                key={main.id}
                className="font-iranyekan_bold border-b-2 border-transparent hover:border-b-slate-500 flex items-center"
              >
                <PlusIcon className="stroke-g1_6" height={12} width={12} />
                <span>{`همه ${main.title}`} </span>
              </Link>
              {main.Specific_cat.map((specific) => {
                return (
                  <Link
                    href={`${specific.label}${url}`}
                    key={specific.id}
                    className="font-iranyekan_bold border-b-2 border-transparent hover:border-b-slate-500"
                  >
                    {specific.title}
                  </Link>
                );
              })}
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
}
