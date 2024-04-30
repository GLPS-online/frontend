import * as S from "./TableStyled";
import { useSearchParams } from "react-router-dom";
import User from "@/interfaces/User";
import UserRow from "../Row/UserRow";

type Props = {
  data: User[];
};

const searchOptions = [
  {
    propName: "korName",
    inputType: "string",
    placeholder: "이름",
    searchType: "string",
  },
  {
    propName: "position",
    inputType: "string",
    placeholder: "직책",
    searchType: "string",
  },
  {
    propName: "roomNum",
    inputType: "number",
    placeholder: "방",
    searchType: "string",
  },
];

export default function UserTable({ data = [] }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const filteredData: User[] = data.filter((datum: any) => {
    return searchOptions.every((searchOption) => {
      if (!searchParams.get(searchOption.propName)) {
        return true;
      }
      switch (searchOption.searchType) {
        case "string":
          return datum[searchOption.propName]
            ?.toString()
            .includes(searchParams.get(searchOption.propName));
        case "number":
          return (
            searchParams.get(searchOption.propName) === "" ||
            datum[searchOption.propName] ===
              Number(searchParams.get(searchOption.propName))
          );
        default:
          return false;
      }
    });
  });

  return (
    <>
      <S.TableContainer>
        <S.SearchBarContainer>
          {searchOptions.map((searchOption, i) => (
            <S.SearchBarInputContainer key={i}>
              <S.SearchBarInput
                autoComplete="off"
                name={searchOption.propName + "search"}
                type={searchOption.inputType}
                inputMode={
                  searchOption.inputType === "number" ? "numeric" : "text"
                }
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
                  // console.log(e.target.value);
                  // console.log(e.nativeEvent);
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
        </S.SearchBarContainer>
        {filteredData.map((user: User) => (
          <S.RowContainer key={user._id}>
            <S.RowBox
              onClick={() => {
                if (!window.getSelection()?.isCollapsed) {
                  console.log(window.getSelection());
                  return;
                }
                if (searchParams.get("expanded") === user._id) {
                  searchParams.delete("expanded");
                  setSearchParams(searchParams, {
                    replace: true,
                  });
                } else {
                  searchParams.set("expanded", user._id);
                  setSearchParams(searchParams, {
                    replace: true,
                  });
                }
              }}
            >
              <UserRow
                user={user}
                isExpanded={searchParams.get("expanded") === user._id}
              />
            </S.RowBox>
          </S.RowContainer>
        ))}
      </S.TableContainer>
    </>
  );
}
