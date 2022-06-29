import React from "react";
import { useTranslation } from "react-i18next";
import SwapFormChangeTokenButton from "./SwapFormChangeTokenButton";


type SwapFormInputProps = {
  initial?: boolean;
};

const SwapFormInput = ({ initial }: SwapFormInputProps): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div className="w-full h-20 rounded-2xl mb-2 bg-gray-100 flex items-center p-5">
      <div className="flex items-center w-full">
        <input
          className=" min-w-0 h-full rounded-2xl bg-gray-100 text-3xl font-medium font-inc focus:outline-none px-1"
          placeholder={t("swap_form.placeholder")}
          type="number"
        />
        <SwapFormChangeTokenButton initial={initial} />
      </div>
    </div>
  );
};

export default SwapFormInput;
