import React from "react";
import { useTranslation } from "react-i18next";

const SwapFormInput = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div className="w-full h-20 rounded-2xl mb-2">
      <input
        className="w-full h-full rounded-2xl bg-gray-100 placeholder:pl-5 text-3xl font-semibold"
        placeholder={t("swap_form.placeholder")}
      />
    </div>
  );
};

export default SwapFormInput;
