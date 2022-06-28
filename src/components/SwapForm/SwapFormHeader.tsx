import React from "react";
import { CogIcon } from "@heroicons/react/outline";
import { useTranslation } from "react-i18next";

const SwapFormHeader = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div className="w-full flex justify-between rounded-3xl p-2 text-neutral-50 mb-3">
      <span className="font-semibold">{t("swap_form.swap")}</span>
      <CogIcon className="h-7 w-7" />
    </div>
  );
};

export default SwapFormHeader;
