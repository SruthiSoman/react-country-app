import { useEffect, useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import "./slider.css";

export default function Slider({ items = [], onActiveChange }) {
  const slides = items.slice(0, 5); 
  const [index, setIndex] = useState(0);

  
  useEffect(() => setIndex(0), [items]);

  useEffect(() => {
    if (slides.length && onActiveChange) onActiveChange(slides[index]);
  }, [index, slides, onActiveChange]);

  const prev = () => setIndex((i) => (i === 0 ? slides.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === slides.length - 1 ? 0 : i + 1));

  if (!slides.length) return null;

  return (
    <div className="hero-slider h-100">
      <button className="nav prev" onClick={prev} aria-label="Previous">
        <IoChevronBack size={22} />
      </button>
      <button className="nav next" onClick={next} aria-label="Next">
        <IoChevronForward size={22} />
      </button>

      {slides.map((c, i) => (
        <div key={c.name} className={`slide ${i === index ? "active" : ""}`}>
          <img src={c.flag} alt={`${c.name} flag`} />
          <div className="overlay">
            <h3>{c.name}</h3>
            <span className="region">{c.region || "—"}</span>
          </div>
        </div>
      ))}

      <div className="dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
