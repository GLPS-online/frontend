import { useEffect, useRef } from "react";

export default function useInifiniteScroll(callback, isLoading) {
  const ref = useRef();

  useEffect(() => {
    function onIntersection(entries) {
      const firstEntry = entries[0];
      if (firstEntry.isIntersecting) {
        callback();
      }
    }
    const observer = new IntersectionObserver(onIntersection);
    if (observer && ref.current) {
      // console.log("start observing scroll");
      observer.observe(ref.current);
    }
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [isLoading]);
  return ref;
}
