import Input from "../common/Input";


const SearchBar = ({ searchTerm, setSearchTerm }) => (
    <div className="mb-6">
      <Input
        placeholder="Search users by name, email, or role"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
  export default SearchBar