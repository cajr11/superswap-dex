import React from "react";
import { useTranslation } from "react-i18next";
import SwapFormChangeTokenButton from "./SwapFormChangeTokenButton";
import TokenSelectModal from "../UI/TokenSelectModal";
import { TokenList } from "../../types";
import type { SelectedToken } from "../../types";
import { DebounceInput } from "react-debounce-input";

type SwapFormInputProps = {
  initial?: boolean;
  tokenList: TokenList;
  choose(val: SelectedToken): void;
  selected: SelectedToken;
  getQuote(val: string): void;
  value: number | undefined | string;
  changeValue(val: number | undefined | string): void;
  changeCounterValue(val: number | undefined | string): void;
};

const SwapFormInput = ({
  initial,
  tokenList,
  choose,
  selected,
  value,
  getQuote,
  changeValue,
  changeCounterValue,
}: SwapFormInputProps): JSX.Element => {
  const [isSelecting, setIsSelecting] = React.useState(false);
  const { t } = useTranslation();
  const [inputValue, setInputValue] = React.useState<number | undefined | string>();

  React.useEffect(() => {
    if (value === 0 || value === "") {
      setInputValue("");
      changeCounterValue("");
    }
    setInputValue(value);
  }, [value, setInputValue, changeCounterValue]);

  return (
    <div className="w-full h-20 rounded-2xl mb-2 bg-gray-100 flex items-center p-5">
      <div className="flex items-center w-full ">
        <DebounceInput
          className="min-w-0 h-full rounded-2xl bg-gray-100 text-3xl font-medium font-inc focus:outline-none px-1"
          placeholder={t("swap_form.placeholder")}
          type="number"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => getQuote(e.target.value)}
          value={inputValue}
        />
        <SwapFormChangeTokenButton
          initial={initial}
          select={setIsSelecting}
          selected={selected}
        />
        {isSelecting && (
          <TokenSelectModal
            tokenList={tokenList}
            select={setIsSelecting}
            choose={choose}
            isSelecting={setIsSelecting}
          />
        )}
      </div>
    </div>
  );
};

export default SwapFormInput;
