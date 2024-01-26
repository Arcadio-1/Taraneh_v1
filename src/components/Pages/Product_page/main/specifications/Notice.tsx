import { InfoIcon } from "lucide-react";
import React from "react";

interface Props {
  category: string;
}

const Notice = ({ category }: Props) => {
  return (
    <div className="flex items-start justify-start gap-3 pt-4">
      <InfoIcon height={20} width={20} />
      <p>
        درخواست مرجوع کردن کالا در گروه {category} با دلیل &quot; انصراف از خرید
        &quot; تنها در صورتی قابل تایید است که کالا در شرایط اولیه باشد (در صورت
        پلمپ بودن، کالا نباید باز شده باشد).
      </p>
    </div>
  );
};

export default Notice;
