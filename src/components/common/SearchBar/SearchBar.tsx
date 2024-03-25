import { useSearchParams } from "react-router-dom";
import SearchOption from "../../../interfaces/SearchOptions";
import * as S from "./SearchBarStyled";

type Props = {
  searches: { [key: string]: string };
  changeSearches: (arg0: string, arg1: string) => void;
  searchOptions: SearchOption[];
};

export default function SearchBar({
  searches,
  changeSearches,
  searchOptions,
}: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get("name") || "";
  return (
    <S.SearchBarContainer>
      {searchOptions.map((searchOption, i) => (
        <S.SearchBarInput
          autoFocus={i === 0}
          autoComplete="off"
          key={i}
          name={searchOption.propName}
          type={searchOption.inputType}
          //inputmode numeric
          placeholder={searchOption.placeholder}
          value={name}
          onChange={(e) => {
            if (!e.target.value) {
              searchParams.delete("name");
              setSearchParams(searchParams);
            } else {
              setSearchParams(
                { name: e.target.value },
                {
                  replace: true,
                }
              );
            }
          }}
        />
      ))}
    </S.SearchBarContainer>
  );
}
