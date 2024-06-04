import User from "./User";
import Student from "./Student";

type PropName = (keyof Student | keyof User) & string;

interface SearchOption {
  propName: PropName;
  inputType: "text" | "number";
  placeholder: string;
  searchType: "hangul" | "text" | "number";
}

export default SearchOption;
