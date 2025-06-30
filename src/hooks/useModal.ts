import { useState } from 'react';

export function useModal() {
  const [switchModal, setSwitchModal] = useState<string | null>(null);

  const handleSwitchModal = (modal: string) => setSwitchModal(modal);

  const handleCloseModal = () => setSwitchModal(null);

  return {
    switchModal,
    handleSwitchModal,
    handleCloseModal,
  };
}
