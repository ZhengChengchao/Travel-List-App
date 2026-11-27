import { FaPlaneDeparture } from "react-icons/fa6";

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

export default Logo;
