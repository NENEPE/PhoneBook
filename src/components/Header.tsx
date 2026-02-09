interface Props {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onSave: () => void;
  onLoad: () => void;
}

export default function Header({ searchTerm, onSearchChange, onSave, onLoad }: Props) {
  return (
    <div className="header">
      <h1>Phone Book</h1>
      <div className="header-controls">
        <input 
          type="text" 
          className="search-input"
          placeholder="Search by last name"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <button className="btn" onClick={onSave}>Save to localStorage</button>
        <button className="btn" onClick={onLoad}>Load from localStorage</button>
      </div>
    </div>
  );
};