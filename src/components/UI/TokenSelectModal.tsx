import React from "react";
import { useTranslation } from "react-i18next";
import { XIcon } from "@heroicons/react/solid";
import TokenListItem from "./TokenListItem";
import { TokenList } from "../../types";

type TokenSelectModalProps = {
  initial?: boolean;
  tokenList: TokenList;
};

const TokenSelectModal = ({ tokenList }: TokenSelectModalProps): JSX.Element => {
  const { t } = useTranslation();

  return (
    <>
      <div className="absolute top-0 left-0 w-screen h-screen bg-gray-500 z-30 opacity-20"></div>
      <div className="absolute w-screen h-[70%] bottom-0 left-0 bg-white rounded-t-2xl z-40 py-5 flex flex-col md:w-[450px] md:h-[450px] md:m-auto md:top-0 md:right-0 md:rounded-xl md:py-2 md:pb-0">
        {/* Modal Header */}
        <div className="h-10 w-full flex flex-row justify-between items-center px-5">
          <span className="font-semibold text-lg">{t("choose-token.swap")}</span>
          <XIcon className="h-6 w-6" />
        </div>

        {/* Modal Search Bar */}
        <div className="h-24 p-3 pb-5 border-b border-b-gray-200">
          <input
            className="border border-gray-200 w-full h-full rounded-2xl px-3"
            placeholder={t("choose-token.search")}
          />
        </div>

        {/* Modal List  */}
        <div className="flex-1 p-4 overflow-hidden">
          <ul className="w-full h-full overflow-y-scroll">
            {tokenList.map(({ logoURI, name, symbol, address }) => (
              <TokenListItem key={address} logo={logoURI} name={name} symbol={symbol} />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default TokenSelectModal;
