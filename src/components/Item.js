import {
  FaTrashCan,
  FaCircleCheck,
  FaRegCircle,
} from "react-icons/fa6";

function Item({
  propItem,
  onToggleItem,
  onDeleteItem,
}) {
  return (
    <li className={propItem.packed ? "packed-item" : ""}>
      <div className="item-main">
        <input
          type="checkbox"
          checked={propItem.packed}
          onChange={() =>
            onToggleItem(propItem.id)
          }
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
          onClick={() =>
            onDeleteItem(propItem.id)
          }
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

export default Item;
