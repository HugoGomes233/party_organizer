import { useEffect } from 'react';

const useScrollToTopOnInputBlur = () => {
  useEffect(() => {
    const handleBlur = (event) => {
      if (['INPUT', 'TEXTAREA'].includes(event.target.tagName)) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('blur', handleBlur, true);

    return () => {
      window.removeEventListener('blur', handleBlur, true);
    };
  }, []);
};

export default useScrollToTopOnInputBlur;
