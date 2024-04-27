import { useState } from "react";

export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
    document.body.style.pointerEvents = "none";
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
    document.body.style.removeProperty("pointer-events");
  };

  return {
    isModalOpen,
    handleModalOpen,
    handleModalClose,
  };
};
