import { Filter } from "lucide-react";

function FilterProducts({ filterOption, handleChangeFilter }) {
  return (
    <div className="filter-products">
      <i className="filter-icon">
        <Filter />
      </i>
      <select
        className="filter"
        value={filterOption}
        onChange={(e) => handleChangeFilter(e)}
      >
        <option value="name-asc">Name (A-Z)</option>
        <option value="name-desc">Name (Z-A)</option>
        <option value="price-asc">Price (Low to High)</option>
        <option value="price-desc">Price (High to Low)</option>
      </select>
    </div>
  );
}

export default FilterProducts;
