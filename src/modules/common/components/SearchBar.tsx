import SearchIcon from "@mui/icons-material/Search";
import { Search, SearchIconWrapper, StyledInputBase } from "../styles/styles";

interface SearchInput {
  searchText? : string;
}


interface SearchProps {
    onSearch: (query: string) => void;
  }
export const SearchBar:React.FC<SearchProps> = ({onSearch}) => {
  // const [searchText, setSearchText] = useState('');
  // const [rows, setRows] = useState<[]>([]);
  // const handleSearch = (searchValue: { target: { value: string; }; }) => {
  //   const value = searchValue.target.value.toLowerCase();
  //   setSearchText(value);

  //   const filteredRows = data.filter((row: []) => 
  //     Object.values(row).some((field) => 
  //       String(field).toLowerCase().includes(value)
  //     )
  //   );

  //   setRows(filteredRows);
  // };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  
  return (
    <Search sx={{ width: "36%" }}>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        // value= {searchText}
        fullWidth
        onChange={handleSearchChange}
        placeholder="Search"
        inputProps={{ "aria-label": "search" }}
      />
    </Search>
  );
};
