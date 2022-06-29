import React from 'react';
import { ChevronDownIcon } from "@heroicons/react/solid";
import ethLogo from "../../assets/images/eth.png";
import { useTranslation } from "react-i18next";


type SwapFormChangeTokenButtonProps = {
    initial?: string
}

const SwapFormChangeTokenButton = ({ initial }: SwapFormChangeTokenButtonProps) => {

    const { t } = useTranslation();

  return (
    <button className="flex whitespace-nowrap ml-1 border rounded-3xl p-2">
          {initial && <img src={ethLogo} alt="token logo" className="h-6 w-6 mr-3" />}
          <span className="flex items-center">
            {initial ? "ETH" : t("swap_form.select")}
          <ChevronDownIcon className={`h-4 w-4 ${initial && "mr-2"}`}/>
          </span>
    </button>
  )
}

export default SwapFormChangeTokenButton