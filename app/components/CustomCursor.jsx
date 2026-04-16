import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const outlineRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const outline = outlineRef.current;

    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;

    const moveCursor = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dot) {
        dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      }
    };

    const animateOutline = () => {
      outlineX += (mouseX - outlineX) * 0.15;
      outlineY += (mouseY - outlineY) * 0.15;

      if (outline) {
        outline.style.transform = `translate(${outlineX}px, ${outlineY}px) translate(-50%, -50%)`;
      }

      requestAnimationFrame(animateOutline);
    };

    const addHoverState = () => document.body.classList.add("cursor-hover");
    const removeHoverState = () => document.body.classList.remove("cursor-hover");

    const hoverTargets = document.querySelectorAll(
      "a, button, .work-card, .btn, input, textarea"
    );

    window.addEventListener("mousemove", moveCursor);
    animateOutline();

    hoverTargets.forEach((el) => {
      el.addEventListener("mouseenter", addHoverState);
      el.addEventListener("mouseleave", removeHoverState);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);

      hoverTargets.forEach((el) => {
        el.removeEventListener("mouseenter", addHoverState);
        el.removeEventListener("mouseleave", removeHoverState);
      });
    };
  }, []);

  return (
    <>
      <div ref={outlineRef} className="cursor-outline"></div>
      <div ref={dotRef} className="cursor-dot"></div>
    </>
  );
}