import * as S from "./SearchBarStyled.js";

export default function SearchBar({ searches, setSearches, searchOptions }) {
  return (
    <S.SearchBarContainer>
      {searchOptions.map((searchOption, i) => (
        <S.SearchBarInput
          key={i}
          name={searchOption.propName}
          type={searchOption.type}
          placeholder={searchOption.placeholder}
          value={searches[searchOption.propName] ?? ""}
          onChange={(e) => {
            setSearches((prev) => ({
              ...prev,
              [searchOption.propName]: e.target.value,
            }));
          }}
        />
      ))}
    </S.SearchBarContainer>
  );
}
