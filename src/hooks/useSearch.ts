import { useState } from 'react';

function useSearch(initialValue: string) {
  const [value, setValue] = useState(initialValue);

  function handleChange(newValue: string) {
    setValue(newValue);
    console.log(newValue);
  }

  return {
    value,
    onChange: handleChange,
  };
}

export default useSearch;
