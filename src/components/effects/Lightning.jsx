import "./Lightning.css";

function Lightning({ flash }) {
  return (
    <div className={`lightning ${flash ? "flash" : ""}`}></div>
  );
}

export default Lightning;