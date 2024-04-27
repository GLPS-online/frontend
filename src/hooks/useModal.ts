import { useState } from "react";

export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const body = document.body;
  const scrollPosition = window.scrollY;

  const handleModalOpen = () => {
    setIsModalOpen(true);
    body.style.overflow = "hidden";
    body.style.pointerEvents = "none";
    body.style.position = "fixed";
    body.style.top = `-${scrollPosition}px`;
    body.style.left = "0";
    body.style.right = "0";
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    body.style.removeProperty("overflow");
    body.style.removeProperty("pointer-events");
    body.style.removeProperty("position");
    body.style.removeProperty("top");
    body.style.removeProperty("left");
    body.style.removeProperty("right");
    window.scrollTo(0, scrollPosition);
  };

  return {
    isModalOpen,
    handleModalOpen,
    handleModalClose,
  };
};
