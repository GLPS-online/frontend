import User from "./User";
import Student from "./Student";

type PropName = (keyof Student | keyof User) & string;

interface SearchOption {
  propName: PropName;
  inputType: string;
  placeholder: string;
  searchType: string;
}

export default SearchOption;
