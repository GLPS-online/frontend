import { useState, useEffect } from "react";

export default function useSearches(data, searchOptions) {
  const [searches, setSearches] = useState({});

  const filteredData = data.filter((datum) => {
    return searchOptions.every((searchOption) => {
      switch (searchOption.realType) {
        case "string":
          return datum[searchOption.propName]
            .toString()
            .includes(searches[searchOption.propName]);
        case "number":
          return (
            searches[searchOption.propName] === "" ||
            datum[searchOption.propName] ===
              Number(searches[searchOption.propName])
          );
        default:
          return false;
      }
    });
  });

  useEffect(() => {
    searchOptions.forEach((searchOption) => {
      setSearches((prev) => ({ ...prev, [searchOption.propName]: "" }));
    });
  }, []);

  return [filteredData, searches, setSearches];
}
