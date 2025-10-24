import React, { useEffect, useState, useRef } from 'react';

const Cursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const target = e.target as HTMLElement;
      const isInteractive = target.closest('button, a, input, textarea, select, [role="button"], [tabindex]');
      setIsHovering(!!isInteractive);
    };

    document.addEventListener('mousemove', updateCursor);
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
      className="fixed pointer-events-none z-50 mix-blend-difference transition-transform duration-150 ease-out"
      style={{
        left: position.x - 12,
        top: position.y - 12,
        transform: `scale(${isHovering ? 1.3 : 1})`
      }}
      aria-hidden="true"
    >
      <div className={`w-6 h-6 border-2 rounded-full flex items-center justify-center transition-all duration-150 ${
        isHovering ? 'border-amber-400 bg-amber-400/10' : 'border-white/80'
      }`}>
        <div className={`w-1.5 h-1.5 rounded-full transition-all duration-150 ${
          isHovering ? 'bg-amber-400' : 'bg-white/80 animate-pulse'
        }`}></div>
      </div>
    </div>
  );
};

export default Cursor;