import SearchOption from "@/interfaces/SearchOption";
import * as S from "./TableStyled";
import { useSearchParams } from "react-router-dom";

export default function Inputs({
  searchOptions,
}: {
  searchOptions: SearchOption[];
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <>
      {searchOptions.map((searchOption, i) => (
        <S.SearchBarInputContainer key={i}>
          <S.SearchBarInput
            autoComplete="off"
            name={searchOption.propName + "search"}
            type={searchOption.inputType}
            inputMode={searchOption.inputType === "number" ? "numeric" : "text"}
            placeholder={searchOption.placeholder}
            value={searchParams.get(searchOption.propName) || ""}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                (document.activeElement as HTMLElement).blur();
              }
            }}
            onChange={(e) => {
              if (!e.target.value) {
                searchParams.delete(searchOption.propName);
                setSearchParams(searchParams, {
                  replace: true,
                });
              } else {
                searchParams.set(searchOption.propName, e.target.value);
                setSearchParams(searchParams, {
                  replace: true,
                });
              }
            }}
          />
          <S.ClearIcon
            src="/icons/clear.svg"
            draggable={false}
            style={{
              display: `${
                searchParams.get(searchOption.propName) ? "" : "none"
              }`,
            }}
            onClick={() => {
              searchParams.delete(searchOption.propName);
              setSearchParams(searchParams);
            }}
          />
        </S.SearchBarInputContainer>
      ))}
    </>
  );
}
