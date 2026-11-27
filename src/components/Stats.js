import { FaCircleCheck } from "react-icons/fa6";

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

export default Stats;
