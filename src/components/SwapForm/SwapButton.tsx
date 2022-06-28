import React from 'react'
import { useTranslation } from 'react-i18next';

const SwapButton = ():JSX.Element => {
    const { t } = useTranslation();

  return (
    <div className='border-orange-300 h-16 w-full rounded-3xl'>
        <button className='h-full w-full rounded-3xl flex justify-center items-center bg-orange-300 text-orange-600 font-semibold'>{t("swap_form.connect")}</button>
    </div>
  )
}

export default SwapButton;