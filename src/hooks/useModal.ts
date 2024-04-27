import { useState } from "react";

export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const root = document.getElementById("root") as HTMLElement;
  const scrollPosition = window.scrollY;

  const handleModalOpen = () => {
    setIsModalOpen(true);
    root.style.overflow = "hidden";
    root.style.pointerEvents = "none";
    root.style.position = "fixed";
    root.style.top = `-${scrollPosition}px`;
    root.style.left = "0";
    root.style.right = "0";
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    root.style.removeProperty("overflow");
    root.style.removeProperty("pointer-events");
    root.style.removeProperty("position");
    root.style.removeProperty("top");
    root.style.removeProperty("left");
    root.style.removeProperty("right");
    window.scrollTo(0, scrollPosition);
  };

  return {
    isModalOpen,
    handleModalOpen,
    handleModalClose,
  };
};
