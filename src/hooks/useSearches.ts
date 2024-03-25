import { useState, useEffect } from "react";
import Person from "../interfaces/Person";
import SearchOption from "../interfaces/SearchOptions";

export default function useSearches(
  data: Person[],
  selectedItems: string[],
  searchOptions: SearchOption[]
) {
  let filteredData = data;

  // const [searches, setSearches] = useState<{ [key: string]: string }>({});
  // function changeSearches(val: string, propName: string) {
  //   setSearches((prev) => ({
  //     ...prev,
  //     [propName]: val,
  //   }));
  // }

  // const filteredData = data.filter((datum: any) => {
  //   if (selectedItems.includes(datum._id)) {
  //     return true;
  //   }
  //   return searchOptions.every((searchOption) => {
  //     if (searches[searchOption.propName] === "") {
  //       return true;
  //     }
  //     switch (searchOption.searchType) {
  //       case "string":
  //         return datum[searchOption.propName]
  //           .toString()
  //           .includes(searches[searchOption.propName]);
  //       case "number":
  //         return (
  //           searches[searchOption.propName] === "" ||
  //           datum[searchOption.propName] ===
  //             Number(searches[searchOption.propName])
  //         );
  //       default:
  //         return false;
  //     }
  //   });
  // });

  // useEffect(() => {
  //   searchOptions.forEach((searchOption) => {
  //     setSearches((prev) => ({ ...prev, [searchOption.propName]: "" }));
  //   });
  // }, []);

  // return { filteredData: data, searches: {}, changeSearches: () => {} };
  // return { filteredData, searches, changeSearches };
}
