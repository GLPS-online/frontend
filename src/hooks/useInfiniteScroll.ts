import { useEffect, useRef } from "react";

export default function useInifiniteScroll(
  callback: () => void,
  isLoading: boolean
) {
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    function onIntersection(entries: any) {
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
