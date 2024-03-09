import { useState, useEffect } from "react";

export default function useToast() {
  const [shouldRender, setShouldRender] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const showToast = (message) => {
    if (isLoading) return;
    setIsLoading(true);
    setShouldRender(true);
    setIsShown(true);
    setMessage(message);
    setTimeout(() => {
      startHidingToast();
    }, 1000);
  };

  const startHidingToast = () => {
    setIsShown(false);
    setTimeout(() => {
      setShouldRender(false);
      setIsLoading(false);
    }, 500);
  };

  useEffect(() => {
    if (!isShown && !isLoading) {
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isShown, isLoading]);

  return {
    shouldRender,
    isShown,
    showToast,
    startHidingToast,
    message,
  };
}
