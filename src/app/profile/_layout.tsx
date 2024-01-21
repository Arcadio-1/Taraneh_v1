import React, { ReactNode } from "react";
import ProfileNavLink from "./profile-nav-link.tsx.jsx";

const layout = async ({ children }: { children: ReactNode }) => {
  const pathes = [
    { slug: "/profile" },
    { slug: "/profile/orders" },
    { slug: "/profile/personal-info" },
    { slug: "/profile/addresses" },
  ];
  return (
    <div>
      <h1>testtttttttt</h1>
      <div className="flex gap-4">
        {pathes.map((path, index) => {
          return (
            <ProfileNavLink slug={path.slug} key={index}>
              {path.slug}
            </ProfileNavLink>
          );
        })}
      </div>
      {children}
    </div>
  );
};

export default layout;
