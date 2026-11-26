import { useState } from "react";
// Initial packing items
const initialItems = [
  { id: 1, description: "Shirt", quantity: 5, packed: false },
  { id: 2, description: "Pants", quantity: 2, packed: true },
];

function Logo() {
  return <h1>My Travel List</h1>;
}

function Form() {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [items, setItems] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return; // Prevent adding empty items

    const newItem = {
      id: Date.now(),
      description: description,
      quantity: quantity,
      packed: false,
    };

    handleAddItems(newItem);

    setDescription("");
    setQuantity(1);
  }

  function handleAddItems(item) {
  setItems((prevItems) => [...prevItems, item]);
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

function PackingList() {
  function Item({ propItem }) {
    return (
      <li>
        <span style={propItem.packed ? { textDecoration: "line-through" } : {}}>
          {propItem.quantity} {propItem.description}
        </span>
      </li>
    );
  }
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <Item propItem={item} key={item.id}/>
        ))}
      </ul>
    </div>
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
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

export default App;
