import { useCallback, useState } from "react";

                // 파라미터 없어도 기본값 null
export default (initialValue = null) => {
  const [value, setValue] = useState(initialValue);
  const handler = useCallback((e) => {
    setValue(e.target.value);
  }, []);
  return [value, handler];
};