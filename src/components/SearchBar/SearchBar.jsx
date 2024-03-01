import { useEffect } from "react";
import "./SearchBar.css";

export default function SearchBar({ searches, setSearches, searchOptions }) {
  return (
    <div className="searches">
      {searchOptions.map((searchOption, i) => (
        <input
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
    </div>
  );
}
