import {
  FaMagnifyingGlass,
  FaXmark,
  FaArrowDownWideShort,
  FaRotateLeft,
  FaTrashCan,
} from "react-icons/fa6";

function PackingToolbar({
  search,
  onSearchChange,
  filter,
  onFilterChange,
  sortBy,
  onSortChange,
  numItems,
  numPacked,
  onClearItems,
}) {
  const numUnpacked = numItems - numPacked;

  const isDefaultView =
    search === "" &&
    filter === "all" &&
    sortBy === "input";

  function handleResetView() {
    onSearchChange("");
    onFilterChange("all");
    onSortChange("input");
  }

  function handleClearClick() {
    const confirmed = window.confirm(
      "Are you sure you want to clear all packing items?"
    );

    if (confirmed) {
      onClearItems();
      handleResetView();
    }
  }

  return (
    <div className="packing-toolbar">
      {/* Search bar */}
      <div className="search-bar">
        <FaMagnifyingGlass />

        <input
          type="text"
          placeholder="Search packing items..."
          value={search}
          onChange={(e) =>
            onSearchChange(e.target.value)
          }
        />

        {search !== "" && (
          <button
            type="button"
            className="clear-search"
            onClick={() => onSearchChange("")}
            aria-label="Clear search"
            title="Clear search"
          >
            <FaXmark />
          </button>
        )}
      </div>

      {/* Filter buttons */}
      <div className="filter-buttons">
        <button
          type="button"
          className={
            filter === "all" ? "active-filter" : ""
          }
          onClick={() => onFilterChange("all")}
        >
          All ({numItems})
        </button>

        <button
          type="button"
          className={
            filter === "unpacked" ? "active-filter" : ""
          }
          onClick={() => onFilterChange("unpacked")}
        >
          Unpacked ({numUnpacked})
        </button>

        <button
          type="button"
          className={
            filter === "packed" ? "active-filter" : ""
          }
          onClick={() => onFilterChange("packed")}
        >
          Packed ({numPacked})
        </button>
      </div>

      {/* Sorting and action buttons */}
      <div className="sort-bar">
        <FaArrowDownWideShort />

        <label htmlFor="sort-by">Sort by:</label>

        <select
          id="sort-by"
          value={sortBy}
          onChange={(e) =>
            onSortChange(e.target.value)
          }
        >
          <option value="input">Input order</option>
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
          <option value="quantity">
            Highest quantity
          </option>
          <option value="packed">
            Unpacked first
          </option>
        </select>

        <div className="toolbar-actions">
          <button
            type="button"
            className="reset-view-button"
            onClick={handleResetView}
            disabled={isDefaultView}
          >
            <FaRotateLeft />
            Reset view
          </button>

          <button
            type="button"
            className="clear-all-button"
            onClick={handleClearClick}
            disabled={numItems === 0}
          >
            <FaTrashCan />
            Clear all 
          </button>
        </div>
      </div>
    </div>
  );
}

export default PackingToolbar;
