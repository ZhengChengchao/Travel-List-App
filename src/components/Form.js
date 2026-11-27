import { useState } from "react";
import {
  FaSuitcaseRolling,
  FaPlus,
} from "react-icons/fa6";

const quantities = Array.from(
  { length: 20 },
  (_, i) => i + 1
);

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

	function handleSubmit(e) {
		e.preventDefault();

		if (!description.trim()) return; // Prevent empty or whitespace-only items

		const newItem = {
			id: Date.now(),
			description: description.trim(),
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
            onChange={(e) =>
              setDescription(e.target.value)
            }
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

export default Form;
