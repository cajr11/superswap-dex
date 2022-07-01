import React from "react";
import SwapFormHeader from "./SwapFormHeader";
import SwapFormInput from "./SwapFormInput";
import SwapButton from "./SwapButton";

const SwapForm = (): JSX.Element => {
  return (
    <form className="border-2 border-orange-400 bg-orange-400 rounded-3xl h-80 w-11/12 sm:w-[500px]">
      <div className="w-full rounded-3xl p-2">
        <SwapFormHeader />
        <SwapFormInput initial={true} />
        <SwapFormInput />
        <SwapButton />
      </div>
    </form>
  );
};

export default SwapForm;
