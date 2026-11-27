import { useState } from "react";

import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

function App() {
  const [items, setItems] = useState([]);

  const numPacked = items.filter(
    (item) => item.packed
  ).length;

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
