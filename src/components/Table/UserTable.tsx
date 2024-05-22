import * as S from "./TableStyled";
import { useSearchParams } from "react-router-dom";
import User from "@/interfaces/User";
import UserRow from "../Row/user/UserRow";
import useSearches from "@/hooks/useSearches";
import SearchOption from "@/interfaces/SearchOption";
import Inputs from "./Inputs";

type Props = {
  data: User[];
};

const searchOptions: SearchOption[] = [
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
  let filteredData = useSearches(data, searchOptions);

  return (
    <>
      <S.TableContainer>
        <S.SearchBarContainer>
          <Inputs searchOptions={searchOptions} />
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
