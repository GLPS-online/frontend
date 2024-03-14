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
  return (
    <S.SearchBarContainer>
      {searchOptions.map((searchOption, i) => (
        <S.SearchBarInput
          autoFocus={i === 0}
          key={i}
          name={searchOption.propName}
          type={searchOption.inputType}
          placeholder={searchOption.placeholder}
          value={searches[searchOption.propName] ?? ""}
          onChange={(e) => {
            changeSearches(e.target.value, searchOption.propName);
          }}
        />
      ))}
    </S.SearchBarContainer>
  );
}
