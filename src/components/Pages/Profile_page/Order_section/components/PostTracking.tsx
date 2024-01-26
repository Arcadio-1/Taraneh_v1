import CopyIcon from "@/components/Util/ui/icons/CopyIcon";
import React, { useState } from "react";

interface Props {
  order_id: string;
}

const PostTracking = ({ order_id }: Props) => {
  enum CopyStatus {
    NOT_TUCHED,
    SUCCESS,
    FAIL,
  }
  const [copyStatus, setCopyStatus] = useState<CopyStatus>(
    CopyStatus.NOT_TUCHED,
  );

  const handleCopyClick = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus(CopyStatus.SUCCESS);
    } catch (err) {
      setCopyStatus(CopyStatus.FAIL);
    }
  };
  return (
    <div className="flex flex-col gap-4 rounded-lg bg-g1_6 bg-opacity-5 p-4">
      <p className="text-lg text-dark_4">
        با استفاده از سامانه رهگیری پست می‌توانید از وضعیت مرسوله باخبر شوید.
      </p>
      <div className="flex items-center">
        <label className="font-iranyekan_bold text-dark_5">کد رهگیری :</label>
        <div className="flex items-center gap-2">
          <span className="font-iransansbold">{order_id}</span>
          <div
            onClick={() => {
              handleCopyClick(order_id);
            }}
          >
            {copyStatus === CopyStatus.NOT_TUCHED && (
              <CopyIcon classes="w-6 h-6" />
            )}
            {copyStatus === CopyStatus.SUCCESS && (
              <span className="">کپی شد</span>
            )}
            {copyStatus === CopyStatus.FAIL && (
              <span className="">خطا در کپی</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostTracking;
