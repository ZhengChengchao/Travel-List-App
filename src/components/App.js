import { useState } from "react";

function Logo() {
  return <h1>My Travel List</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);


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
      <h3>What do you need to pack?</h3>
      
      <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
      </select>

      <input type="text" placeholder="Item..." value={description} onChange={(e) => setDescription(e.target.value)} />

      <button>Add</button>
    </form>
  );
}

function PackingList({ itemsProp, onToggleItem, onDeleteItem }) {
  return (
    <div className="list">
      <ul>
        {itemsProp.map((item) => (
          <Item 
            propItem={item} 
            key={item.id} 
            onToggleItem={onToggleItem}
            onDeleteItem={onDeleteItem}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ propItem, onToggleItem, onDeleteItem  }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={propItem.packed}
        onChange={() => onToggleItem(propItem.id)}
      />
      <span style={propItem.packed ? { textDecoration: "line-through" } : {}}>
        {propItem.quantity} {propItem.description}
      </span>
      <button onClick={() => onDeleteItem(propItem.id)}>Delete</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>You have X items in the list. You already packed Y (Z%).</em>
    </footer>
  );
}

function App() {
  const [items, setItems] = useState([]);

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


  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList 
        itemsProp={items}
        onToggleItem={handleToggleItem}
        onDeleteItem={handleDeleteItem} 
      />
      <Stats />
    </div>
  );
}

export default App;
