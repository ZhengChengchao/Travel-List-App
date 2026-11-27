import { useState } from "react";
import {
  FaPlaneDeparture, 
  FaSuitcaseRolling, 
  FaPlus, FaListCheck, 
  FaTrashCan, 
  FaCircleCheck, 
  FaRegCircle, 
  FaMagnifyingGlass, 
  FaXmark, 
  FaArrowDownWideShort,
  FaRotateLeft,
} from "react-icons/fa6";

function Logo() {
  return (
    <header className="header">
      <div className="header-label">
        <FaPlaneDeparture />
        <span>The adventure awaits</span>
      </div>

      <h1>My Travel List</h1>

      <p>Pack smart. Travel far. Make memories.</p>
    </header>
  );
}


function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  const quantities = Array.from(
    { length: 20 },
    (_, i) => i + 1 // use _ as a naming convention to indicate that the parameter is intentionally unused.
  );

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return; // Prevent adding empty items

    const newItem = {
      id: Date.now(),
      description: description,
      quantity: quantity,
      packed: false,
    };

    onAddItems(newItem);

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>
        <FaSuitcaseRolling />
        What do you need to pack?
      </h3>

      <div className="form-fields">
        <div className="quantity-field">
          <label htmlFor="quantity">Quantity</label>

          <select
            id="quantity"
            value={quantity}
            onChange={(e) =>
              setQuantity(Number(e.target.value))
            }
          >
            {quantities.map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        <div className="description-field">
          <label htmlFor="description">Item name</label>

          <input
            id="description"
            type="text"
            placeholder="e.g. Camera"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button type="submit" className="add-button">
          <FaPlus />
          Add
        </button>
      </div>
    </form>
  );
}

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
    sortedItems.sort((a, b) => b.quantity - a.quantity);
  } else if (sortBy === "packed") {
    sortedItems.sort((a, b) =>
      Number(a.packed) - Number(b.packed)
    );
  }

  // Calculate unpacked items
  const numUnpacked = itemsProp.length - numPacked;

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
        numUnpacked={numUnpacked}
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

function PackingToolbar({
  search,
  onSearchChange,
  filter,
  onFilterChange,
  sortBy,
  onSortChange,
  numItems,
  numPacked,
  numUnpacked,
  onClearItems,
}) {
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
          onChange={(e) => onSearchChange(e.target.value)}
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
          className={filter === "all" ? "active-filter" : ""}
          onClick={() => onFilterChange("all")}
        >
          All ({numItems})
        </button>

        <button
          type="button"
          className={filter === "unpacked" ? "active-filter" : ""}
          onClick={() => onFilterChange("unpacked")}
        >
          Unpacked ({numUnpacked})
        </button>

        <button
          type="button"
          className={filter === "packed" ? "active-filter" : ""}
          onClick={() => onFilterChange("packed")}
        >
          Packed ({numPacked})
        </button>
      </div>

      {/* Sorting bar */}
      <div className="sort-bar">
        <FaArrowDownWideShort />

        <label htmlFor="sort-by">Sort by:</label>

        <select
          id="sort-by"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="input">Input order</option>
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
          <option value="quantity">Highest quantity</option>
          <option value="packed">Unpacked first</option>
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
            Clear all items
          </button>
        </div> 
      </div>
    </div>
  );
}

function Item({ propItem, onToggleItem, onDeleteItem }) {
  return (
    <li className={propItem.packed ? "packed-item" : ""}>
      <div className="item-main">
        <input
          type="checkbox"
          checked={propItem.packed}
          onChange={() => onToggleItem(propItem.id)}
          aria-label={`Mark ${propItem.description} as ${
            propItem.packed ? "unpacked" : "packed"
          }`}
        />

        <div className="item-details">
          <span
            style={
              propItem.packed
                ? { textDecoration: "line-through" }
                : {}
            }
          >
            {propItem.description}
          </span>

          <small>Quantity: {propItem.quantity}</small>
        </div>

        <button
          type="button"
          className="delete-button"
          onClick={() => onDeleteItem(propItem.id)}
          title="Delete item"
          aria-label={`Delete ${propItem.description}`}
        >
          <FaTrashCan />
        </button>
      </div>

      <div className="item-status">
        {propItem.packed ? (
          <>
            <FaCircleCheck />
            <span>Packed</span>
          </>
        ) : (
          <>
            <FaRegCircle />
            <span>Not packed</span>
          </>
        )}
      </div>
    </li>
  );
}

function Stats({ itemsProp, numPacked }) {
  const numItems = itemsProp.length;

  const percentage =
    numItems === 0
      ? 0
      : Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      <div className="stats-content">
        <div className="stats-heading">
          <h3>
            <FaCircleCheck />
            Packing progress
          </h3>

          <strong>{percentage}%</strong>
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>

        <p>
          You have {numItems} items in the list. You already
          packed {numPacked} ({percentage}%).
        </p>

        {numItems > 0 && numPacked === numItems && (
          <p className="completed-message">
            <FaCircleCheck />
            Everything is packed. Ready to travel!
          </p>
        )}
      </div>

      <div className="footer-strip">
        Good trips begin with good preparation
      </div>
    </footer>
  );
}

function App() {
  const [items, setItems] = useState([]);

  const numPacked = items.filter((item) => item.packed).length;

  function handleAddItems(item) {
    setItems((prevItems) => [...prevItems, item]);
  }

  function handleToggleItem(id) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, packed: !item.packed }
          : item
      )
    );
  }

  function handleDeleteItem(id) {
    setItems((prevItems) =>
      prevItems.filter((item) => item.id !== id)
    );
  }
  
  function handleClearItems() {
    setItems([]);
  }

  return (
    <div className="app">
      <Logo />

      <main className="main-content">
        <Form onAddItems={handleAddItems} />

        <PackingList
          itemsProp={items}
          numPacked={numPacked}
          onToggleItem={handleToggleItem}
          onDeleteItem={handleDeleteItem}
          onClearItems={handleClearItems}
        />
      </main>

      <Stats 
      itemsProp={items}
      numPacked={numPacked} 
      />
    </div>
  );
}

export default App;
