"use client";
import React, { ReactNode } from "react";
import { Element } from "react-scroll";

type Props = {
  name: string;
  children: ReactNode;
};

const ReactScrollElement = ({ name, children }: Props) => {
  return <Element name={name}>{children}</Element>;
};

export default ReactScrollElement;
