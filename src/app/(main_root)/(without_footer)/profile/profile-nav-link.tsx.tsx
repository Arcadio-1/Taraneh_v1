"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { useEffect } from "react";

// This *client* component will be imported into a blog layout
export default function ProfileNavLink({
  slug,
  children,
}: {
  slug: string;
  children: React.ReactNode;
}) {
  // Navigating to `/blog/hello-world` will return 'hello-world'
  // for the selected layout segment
  const segment = useSelectedLayoutSegment();
  const isActive = slug === segment;

  // useEffect(() => {
  //   console.log(segment);
  // }, [segment]);

  return (
    <Link
      href={`${slug}`}
      // Change style depending on whether the link is active
      style={{ fontWeight: isActive ? "bold" : "normal" }}
    >
      {children}
    </Link>
  );
}
