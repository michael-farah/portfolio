import { useEffect, useRef, useState, useCallback } from "react";

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useInView = ({
  threshold = 0.1,
  rootMargin = "0px",
  triggerOnce = true,
}: UseInViewOptions = {}) => {
  const ref = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const hasTriggered = useRef(false);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && triggerOnce && !hasTriggered.current) {
          setIsInView(true);
          hasTriggered.current = true;
        } else if (!triggerOnce) {
          setIsInView(entry.isIntersecting);
        }
      });
    },
    [triggerOnce],
  );

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(handleIntersect, {
      threshold,
      rootMargin,
    });

    observer.observe(node);

    return () => observer.disconnect();
  }, [handleIntersect, threshold, rootMargin]);

  return { ref, isInView };
};
