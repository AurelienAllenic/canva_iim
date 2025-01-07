import React, { useRef, useEffect } from "react";
import p5 from "p5";

const CanvasP5 = ({ setCanvasURL }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const sketch = (p) => {
      p.setup = () => {
        const canvas = p.createCanvas(500, 500).parent(canvasRef.current);
        p.background(21, 8, 50); // Exemple de fond
        // Dessin de particules ou autres
      };

      p.draw = () => {
        p.fill(255);
        p.ellipse(p.random(p.width), p.random(p.height), 5, 5);
      };
    };

    const p5Instance = new p5(sketch);

    return () => {
      if (p5Instance) p5Instance.remove();
    };
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current.querySelector("canvas");
      if (canvas) {
        const canvasURL = canvas.toDataURL(); // Génère l'URL de l'image
        setCanvasURL(canvasURL); // Passe l'URL au parent
      }
    }
  }, [setCanvasURL]);

  return <div ref={canvasRef} ></div>;
};

export default CanvasP5;
