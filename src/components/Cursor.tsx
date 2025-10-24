import React, { useEffect, useState, useRef } from 'react';

const Cursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      // Use pageX/pageY para coordenadas absolutas da página
      const x = e.pageX;
      const y = e.pageY;

      setPosition({ x, y });
      setIsVisible(true);

      const target = e.target as HTMLElement;
      const isInteractive = target.closest('button, a, input, textarea, select, [role="button"], [tabindex]');
      setIsHovering(!!isInteractive);
    };

    document.addEventListener('mousemove', updateCursor, { passive: true });
    document.addEventListener('mouseleave', () => setIsVisible(false));

    return () => {
      document.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mouseleave', () => setIsVisible(false));
    };
  }, []);

  // Don't render if not visible or user prefers reduced motion
  if (!isVisible) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed pointer-events-none z-[9999] transition-all duration-200 ease-out"
      style={{
        left: position.x,
        top: position.y,
        transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`
      }}
      aria-hidden="true"
    >
      <div className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${
        isHovering
          ? 'border-amber-400 bg-amber-400/20 shadow-lg shadow-amber-400/50'
          : 'border-white bg-white/10 shadow-lg shadow-white/30'
      }`}>
        <div className={`w-1 h-1 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${
          isHovering ? 'bg-amber-400' : 'bg-white animate-pulse'
        }`}></div>
      </div>
    </div>
  );
};

export default Cursor;