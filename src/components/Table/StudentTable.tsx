import * as S from "./TableStyled";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import useCheckbox from "@/hooks/useCheckbox";
import StudentRow from "@/components/Row/StudentRow";
import { useModal } from "@/hooks/useModal";
import CardModal from "@/modals/CardModal";
import { createPortal } from "react-dom";
import ShuttleModal from "@/modals/ShuttleModal";
import StudyModal from "@/modals/StudyModal";
import Student from "@/interfaces/Student";

type Props = {
  data: Student[];
};

const searchOptions = [
  {
    propName: "korName",
    inputType: "string",
    placeholder: "이름",
    searchType: "string",
  },
  {
    propName: "className",
    inputType: "string",
    placeholder: "학급",
    searchType: "string",
  },
  {
    propName: "roomNum",
    inputType: "number", // 검색 시 입력 타입
    placeholder: "방",
    searchType: "string",
  },
];

export default function StudentTable({ data = [] }: Props) {
  const { isModalOpen, handleModalOpen, handleModalClose } = useModal();
  const { selectedItems, clearItems, handleCheckAll, handleCheckboxChange } =
    useCheckbox();

  const [action, setAction] = useState<string>("default");
  const [searchParams, setSearchParams] = useSearchParams();

  const filteredData: Student[] = data.filter((datum: any) => {
    if (selectedItems.has(datum._id)) {
      return true;
    }
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

  if (selectedItems.size !== 0) {
    filteredData.sort((a, b) => {
      const a_inc = selectedItems.has(a._id);
      const b_inc = selectedItems.has(b._id);
      if (a_inc && b_inc) {
        return a.korName.localeCompare(b.korName);
      } else if (a_inc) {
        return -1;
      } else if (b_inc) {
        return +1;
      } else return 0;
    });
  }

  return (
    <>
      {createPortal(
        isModalOpen &&
          (() => {
            switch (action) {
              case "red":
              case "yellow":
              case "green":
              case "eop":
                return (
                  <CardModal
                    action={action}
                    items={Array.from(selectedItems)}
                    onSuccess={() => {
                      clearItems();
                      setAction("default");
                    }}
                    handleModalClose={handleModalClose}
                  />
                );
              case "shuttle":
                return (
                  <ShuttleModal
                    items={Array.from(selectedItems)}
                    onSuccess={() => {
                      clearItems();
                      setAction("default");
                    }}
                    handleModalClose={handleModalClose}
                  />
                );
              case "study":
                return (
                  <StudyModal
                    items={Array.from(selectedItems)}
                    onSuccess={() => {
                      clearItems();
                      setAction("default");
                    }}
                    handleModalClose={handleModalClose}
                  />
                );
              default:
                return <></>;
            }
          })(),
        document.body
      )}
      <S.TableContainer $selectable={action !== "default"}>
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
        {
          <S.ActionBar>
            <S.CheckBox
              name="all"
              type={action !== "default" ? "checkbox" : "hidden"}
              disabled={filteredData.length > 50}
              checked={
                selectedItems.size !== 0 &&
                filteredData.length === selectedItems.size
              }
              onClick={(e) => handleCheckAll(e, filteredData)}
              value={"all"}
              onChange={(e) => {}}
            />
            <div>
              <S.ActionSelector
                name="action"
                value={action}
                onChange={(e) => setAction(e.target.value)}
              >
                <option value={"default"} disabled>
                  액션 선택
                </option>
                <option value={"attendance"}>(출석체크용)</option>
                <option value={"eop"}>EOP 🔤</option>
                <option value={"green"}>그린카드 🟩</option>
                <option value={"yellow"}>옐로카드 🟨</option>
                <option value={"red"}>레드카드 🟥</option>
                <option value={"study"}>2자습 ✏️</option>
                <option value={"shuttle"}>목발셔틀 🚐</option>
              </S.ActionSelector>
              {` (${selectedItems.size}/${filteredData.length})`}
            </div>
            <S.ActionButtons>
              <S.ActionButton
                hidden={action === "default" || action === "attendance"}
                disabled={selectedItems.size === 0}
                onClick={() => {
                  handleModalOpen();
                }}
              >
                확인
              </S.ActionButton>
              <S.ActionButton
                disabled={action === "default"}
                onClick={() => {
                  clearItems();
                  setAction("default");
                }}
              >
                취소
              </S.ActionButton>
            </S.ActionButtons>
          </S.ActionBar>
        }

        {filteredData.map((student: Student) => (
          <S.RowContainer
            key={student._id + (selectedItems.has(student._id) ? "1" : "")}
          >
            <S.CheckBox
              name={student._id}
              type={action !== "default" ? "checkbox" : "hidden"}
              value={student._id}
              checked={selectedItems.has(student._id)}
              onChange={(e) => {
                handleCheckboxChange(e);
              }}
            />
            <S.RowBox
              onClick={() => {
                if (!window.getSelection()?.isCollapsed) {
                  console.log(window.getSelection());
                  return;
                }
                if (searchParams.get("expanded") === student._id) {
                  searchParams.delete("expanded");
                  setSearchParams(searchParams, {
                    replace: true,
                  });
                } else {
                  searchParams.set("expanded", student._id);
                  setSearchParams(searchParams, {
                    replace: true,
                  });
                }
              }}
            >
              <StudentRow
                student={student}
                selected={selectedItems.has(student._id) ? action : "default"}
                isExpanded={searchParams.get("expanded") === student._id}
              />
            </S.RowBox>
          </S.RowContainer>
        ))}
      </S.TableContainer>
    </>
  );
}
