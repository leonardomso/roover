import { useState, useEffect } from "react";

import { UseHawk } from "../types";

const useHawk: UseHawk = (
  src,
  format,
  html5,
  preload,
  autoplay
) => {
  const [play, setPlay] = useState<boolean>(false);

  const handlePlay = () => setPlay(!play);

  useEffect(() => {
    if (!src) return
  }, [src, format, html5, preload, autoplay])

  return { play, handlePlay }
};

export default useHawk;