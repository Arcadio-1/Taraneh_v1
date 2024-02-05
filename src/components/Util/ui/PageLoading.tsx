import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/Util/shadcn/ui/alert-dialog";
import LogoIcon from "@/components/Util/ui/icons/LogoIcon";

import React from "react";

const PageLoadingDialog = () => {
  return (
    <AlertDialog defaultOpen open={true}>
      <AlertDialogContent dir="ltr" className="bg-slate-50">
        <AlertDialogHeader className="flex items-center justify-start pb-16">
          <LogoIcon className="h-20 w-80" />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <span className="loading loading-dots loading-lg mx-auto bg-g1_7"></span>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PageLoadingDialog;
