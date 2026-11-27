import { useState } from "react";
import {
  FaListCheck,
  FaSuitcaseRolling,
  FaMagnifyingGlass,
} from "react-icons/fa6";

import PackingToolbar from "./PackingToolbar";
import Item from "./Item";

function PackingList({
  itemsProp,
  numPacked,
  onToggleItem,
  onDeleteItem,
  onClearItems,
}) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("input");

  // Search items by description
  const searchedItems = itemsProp.filter((item) =>
    item.description.toLowerCase().includes(search.toLowerCase())
  );

  // Filter searched items by packed status
  const filteredItems = searchedItems.filter((item) => {
    if (filter === "packed") {
      return item.packed === true;
    } else if (filter === "unpacked") {
      return item.packed === false;
    } else {
      return true;
    }
  });

  // Create a copy before sorting
  const sortedItems = [...filteredItems];

  // Sort filtered items
  if (sortBy === "name-asc") {
    sortedItems.sort((a, b) =>
      a.description.localeCompare(b.description)
    );
  } else if (sortBy === "name-desc") {
    sortedItems.sort((a, b) =>
      b.description.localeCompare(a.description)
    );
  } else if (sortBy === "quantity") {
    sortedItems.sort((a, b) =>
      b.quantity - a.quantity
    );
  } else if (sortBy === "packed") {
    sortedItems.sort((a, b) =>
      Number(a.packed) - Number(b.packed)
    );
  }

  return (
    <section className="list">
      <div className="list-heading">
        <h2>
          <FaListCheck />
          Packing checklist
        </h2>

        <span className="item-count">
          {sortedItems.length} of {itemsProp.length} items
        </span>
      </div>

      <PackingToolbar
        search={search}
        onSearchChange={setSearch}
        filter={filter}
        onFilterChange={setFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
        numItems={itemsProp.length}
        numPacked={numPacked}
        onClearItems={onClearItems}
      />

      {itemsProp.length === 0 ? (
        <div className="empty-list">
          <FaSuitcaseRolling />
          <h3>Your suitcase is empty.</h3>
          <p>Add your first item to get started.</p>
        </div>
      ) : sortedItems.length === 0 ? (
        <div className="empty-list">
          <FaMagnifyingGlass />
          <h3>No matching items.</h3>
          <p>Try changing your search or filter.</p>
        </div>
      ) : (
        <ul>
          {sortedItems.map((item) => (
            <Item
              propItem={item}
              key={item.id}
              onToggleItem={onToggleItem}
              onDeleteItem={onDeleteItem}
            />
          ))}
        </ul>
      )}
    </section>
  );
}

export default PackingList;
