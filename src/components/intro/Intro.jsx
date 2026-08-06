import "./Intro.css";

function Intro() {
  return (
    <section className="intro">
      <div className="overlay"></div>

      <div className="content">
        <h1 className="title">THE ORACLE</h1>

        <p className="subtitle">
          Decipher The Prophecy
        </p>

        <button className="enter-btn">
          ENTER THE TEMPLE
        </button>
      </div>
    </section>
  );
}

export default Intro;