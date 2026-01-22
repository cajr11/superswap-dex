'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAccount } from 'wagmi';
import { useTranslation } from 'react-i18next';
import SwapFormHeader from './SwapFormHeader';
import SwapFormInput from './SwapFormInput';
import SwapButton from './SwapButton';
import { useTheme } from '@/context/theme-context';
import { useChainContext } from '@/context/chain-context';
import { useQuote } from '@/hooks/useQuote';
import { useSwap } from '@/hooks/useSwap';
import { NATIVE_TOKEN_ADDRESS } from '@/types';
import type { TokenList, SelectedToken } from '@/types';

type SwapFormProps = {
  tokenList: TokenList;
  setLoginModalOpen: (val: boolean) => void;
  openTransactionModal: (val: boolean) => void;
  getTxHash: (hash: string) => void;
  getErrorMessage: (message: string) => void;
  setMadeTx: (val: boolean) => void;
}

export default function SwapForm({
  tokenList,
  setLoginModalOpen,
  openTransactionModal,
  getTxHash,
  getErrorMessage,
  setMadeTx,
}: SwapFormProps) {
  const { isLight } = useTheme();
  const { chain } = useChainContext();
  const { address } = useAccount();
  const { t } = useTranslation();

  const [firstToken, setFirstToken] = useState<SelectedToken>({ decimals: 18 });
  const [secondToken, setSecondToken] = useState<SelectedToken>({ decimals: 0 });
  const [firstAmount, setFirstAmount] = useState<number | undefined | string>();
  const [secondAmount, setSecondAmount] = useState<number | undefined | string>();

  // Calculate amount in wei for quote
  const amountInWei =
    firstAmount && firstToken.decimals
      ? BigInt(
          Math.floor(parseFloat(String(firstAmount)) * 10 ** firstToken.decimals)
        ).toString()
      : undefined;

  // Quote hook
  const { data: quoteData, isLoading: isQuoteLoading } = useQuote({
    chain,
    fromTokenAddress: firstToken.address || NATIVE_TOKEN_ADDRESS,
    toTokenAddress: secondToken.address,
    amount: amountInWei,
    enabled: !!firstToken.address && !!secondToken.address && !!amountInWei,
  });

  // Swap hook
  const { mutateAsync: executeSwap, isPending: isSwapping } = useSwap(chain);

  // Set default first token to native token on chain change
  useEffect(() => {
    setFirstToken({
      address: NATIVE_TOKEN_ADDRESS,
      decimals: 18,
    });
    setSecondToken({ decimals: 0 });
    setFirstAmount('');
    setSecondAmount('');
  }, [chain]);

  // Update second amount when quote changes
  useEffect(() => {
    if (quoteData?.dstAmount && secondToken.decimals) {
      const outputAmount =
        Number(quoteData.dstAmount) / 10 ** secondToken.decimals;
      setSecondAmount(outputAmount.toFixed(6));
    }
  }, [quoteData, secondToken.decimals]);

  const getQuoteFirst = useCallback(
    (val: string) => {
      setFirstAmount(val);
      if (!val || val === '0') {
        setFirstAmount('');
        setSecondAmount('');
      }
    },
    []
  );

  const getQuoteSecond = useCallback(
    (val: string) => {
      setSecondAmount(val);
      if (!val || val === '0') {
        setFirstAmount('');
        setSecondAmount('');
      }
    },
    []
  );

  const makeSwap = async () => {
    if (!firstToken.address || !secondToken.address || !amountInWei || !address) {
      return;
    }

    openTransactionModal(true);

    try {
      const txHash = await executeSwap({
        fromTokenAddress: firstToken.address,
        toTokenAddress: secondToken.address,
        amount: amountInWei,
        slippage: 1,
      });

      getTxHash(txHash);
      setMadeTx(true);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Swap failed';
      getErrorMessage(message);
    }

    setFirstAmount('');
    setSecondAmount('');
  };

  const estimatedGas = quoteData?.gas;

  return (
    <form className={isLight ? styles.light : styles.dark}>
      <div className="w-full rounded-3xl p-2 select-none">
        <SwapFormHeader />
        <SwapFormInput
          initial={true}
          tokenList={tokenList}
          choose={setFirstToken}
          selected={firstToken}
          getQuote={getQuoteFirst}
          value={firstAmount}
          changeValue={setFirstAmount}
          changeCounterValue={setSecondAmount}
        />
        <SwapFormInput
          tokenList={tokenList}
          choose={setSecondToken}
          selected={secondToken}
          getQuote={getQuoteSecond}
          value={secondAmount}
          changeValue={setSecondAmount}
          changeCounterValue={setFirstAmount}
        />
        {estimatedGas && (
          <div className="w-full h-3 flex items-center justify-center py-4">
            <div className="w-[95%] h-full flex items-center justify-end text-sm text-white font-semibold">
              {t('swap_form.estimated')}
              {estimatedGas}
            </div>
          </div>
        )}
        <SwapButton
          setLoginModalOpen={setLoginModalOpen}
          trySwap={makeSwap}
          isLoading={isSwapping || isQuoteLoading}
        />
      </div>
    </form>
  );
}

const styles = {
  light:
    'border-2 border-orange-400 bg-orange-400 rounded-3xl h-90 w-11/12 sm:w-[500px]',
  dark: 'border-2 border-blue-700 bg-blue-700 rounded-3xl h-90 w-11/12 sm:w-[500px]',
};
