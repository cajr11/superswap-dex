'use client';

import { useTranslation } from 'react-i18next';

export default function SwapFormHeader() {
  const { t } = useTranslation();

  return (
    <div className="w-full flex justify-between rounded-3xl p-2 text-neutral-50 mb-3">
      <span className="font-semibold">{t('swap_form.swap')}</span>
    </div>
  );
}
