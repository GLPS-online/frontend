import Ptla from "./Ptla";
import Student from "./Student";

type PropName = keyof Student | keyof Ptla;

interface SearchOption {
  propName: PropName;
  inputType: string;
  placeholder: string;
  searchType: string;
}

export default SearchOption;
