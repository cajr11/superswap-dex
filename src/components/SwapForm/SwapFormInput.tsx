import React from "react";
import { useTranslation } from "react-i18next";
import { ChevronDownIcon } from "@heroicons/react/solid";
import ethLogo from "../../assets/images/eth.png";

type SwapFormInputProps = {
  initial?: boolean;
};

const SwapFormInput = ({ initial }: SwapFormInputProps): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div className="w-full h-20 rounded-2xl mb-2 bg-gray-100 flex items-center">
      <div className="flex items-center border">
        <input
          className="w-full h-full rounded-2xl bg-gray-100 px-5 text-3xl font-medium font-inc focus:outline-none"
          placeholder={t("swap_form.placeholder")}
        />
        <button className="w-fit flex">
          {initial && <img src={ethLogo} alt="token logo" className="h-6 w-6 mr-3" />}
          <span>{initial ? "ETH" : t("swap_form.select")}</span>
        </button>
      </div>
    </div>
  );
};

export default SwapFormInput;
