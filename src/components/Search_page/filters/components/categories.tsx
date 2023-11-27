"use client";
import * as React from "react";
import { MainCatsWithSpecificCats } from "@/types/type";
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "./AccordionStyled";
import { Divider } from "@mui/material";

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
      {mainCats.map((main) => {
        return (
          <>
            <Accordion
              className={`text-xl ${
                expanded !== main.label && `!bg-transparent`
              }  `}
              expanded={expanded === `${main.label}`}
              onChange={handleChange(`${main.label}`)}
              key={main.id}
              // className="!bg-transparent"
            >
              <AccordionSummary
                className="!bg-transparent text-xl"
                aria-controls={`${main.label}d-content`}
                id={`${main.label}d-header`}
              >
                {main.title}
              </AccordionSummary>
              <AccordionDetails className="flex flex-col gap-6 !bg-transparent !pt-0">
                <Link
                  href={`/search/${main.label}${url}`}
                  key={main.id}
                  className="font-iranyekan_bold border-b-2 border-transparent hover:border-b-slate-500 flex items-center gap-2"
                >
                  <PlusIcon className="stroke-g1_6" height={12} width={12} />
                  <span className="text-dark_4">{`همه ${main.title}`} </span>
                </Link>
                {main.Specific_cat.map((specific) => {
                  return (
                    <Link
                      href={`/search/${specific.label}${url}`}
                      key={specific.id}
                      className="font-iranyekan_bold text-dark_4"
                    >
                      {specific.title}
                    </Link>
                  );
                })}
              </AccordionDetails>
            </Accordion>
            {expanded === main.label && <Divider />}
          </>
        );
      })}
    </div>
  );
}
