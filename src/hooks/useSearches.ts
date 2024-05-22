import SearchOption from "@/interfaces/SearchOption";
import { chosungIncludes, hangulIncludes } from "es-hangul";
import { useSearchParams } from "react-router-dom";

export default function useSearches(
  data: any[],
  searchOptions: SearchOption[],
  selectedItems: Set<string> | null = null,
  depth: string | null = null
) {
  const [searchParams] = useSearchParams();
  let filteredData: any[] = data.filter((datum: any) => {
    if (selectedItems && selectedItems.has(datum._id)) {
      return true;
    }
    return searchOptions.every((searchOption) => {
      const searchInput = searchParams.get(searchOption.propName);
      const datumToCompare = depth
        ? datum[depth][searchOption.propName]
        : datum[searchOption.propName];
      if (!searchInput) {
        return true;
      }
      switch (searchOption.searchType) {
        case "hangul":
          return (
            chosungIncludes(datumToCompare?.toString(), searchInput || "") ||
            hangulIncludes(datumToCompare?.toString(), searchInput || "")
          );
        case "text":
          console.log(datumToCompare);
          return datumToCompare?.toString().includes(searchInput);
        case "number":
          return searchInput === "" || datumToCompare === Number(searchInput);
        default:
          return false;
      }
    });
  });

  return filteredData;
}
