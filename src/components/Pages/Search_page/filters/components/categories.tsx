"use client";
import * as React from "react";
import { MainCatsWithSpecificCats } from "@/types_validation/type";
import Link from "next/link";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "./AccordionStyled";
import { Divider } from "@mui/material";
import AllIcon from "@/components/Util/ui/icons/AllIcon";

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
    <div className="">
      {mainCats.map((main, index) => {
        return (
          <div key={index}>
            <Accordion
              className={`md:text-md text-xl md:font-iranyekan ${
                expanded !== main.label && `!bg-transparent`
              }  `}
              expanded={expanded === `${main.label}`}
              onChange={handleChange(`${main.label}`)}
              key={main.id}
              // className="!bg-transparent"
            >
              <AccordionSummary
                className="md:text-md !bg-transparent font-iransansbold text-xl !text-dark_3 md:font-iranyekan"
                aria-controls={`${main.label}d-content`}
                id={`${main.label}d-header`}
              >
                {main.title}
              </AccordionSummary>
              <AccordionDetails className="flex flex-col gap-2 !bg-transparent !pr-8 !pt-0">
                {main.Specific_cat.map((specific) => {
                  return (
                    <Link
                      href={`/search/${specific.label}${url}`}
                      key={specific.id}
                      className="md:text-md border-b-[1px] border-slate-200 pb-2 font-iranyekan_bold text-lg text-dark_4 md:font-iranyekan"
                    >
                      {specific.title}
                    </Link>
                  );
                })}
                <Link
                  href={`/search/${main.label}${url}`}
                  key={main.id}
                  className="md:text-md flex items-center gap-2 border-b-2 border-transparent pt-3 font-iranyekan_bold text-lg hover:border-b-slate-500 md:font-iranyekan"
                >
                  <AllIcon classes="h-8 w-8 fill-dark_4" />

                  <span className="text-dark_4">{`همه ${main.title}`} </span>
                </Link>
              </AccordionDetails>
            </Accordion>
            {expanded === main.label && <Divider />}
          </div>
        );
      })}
    </div>
  );
}
