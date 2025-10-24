import React, { useEffect, useState } from 'react';

const Cursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Check if device supports hover (not touch-only)
    const supportsHover = window.matchMedia('(hover: hover)').matches;
    if (!supportsHover) return;

    const updateCursor = (e: MouseEvent) => {
      // Use pageX/pageY for accurate positioning accounting for scroll
      setPosition({ x: e.pageX, y: e.pageY });
      setIsVisible(true);

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('button, a, input, textarea, select, [role="button"], [tabindex]');
      setIsHovering(!!isInteractive);
    };

    const hideCursor = () => setIsVisible(false);

    // Apply to entire document for consistent behavior
    document.addEventListener('mousemove', updateCursor);
    document.addEventListener('mouseleave', hideCursor);

    return () => {
      document.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mouseleave', hideCursor);
    };
  }, []);

  // Don't render if not visible or user prefers reduced motion
  if (!isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-50 mix-blend-difference transition-transform duration-100"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `translate(-50%, -50%) scale(${isHovering ? 1.2 : 1})`
      }}
      aria-hidden="true"
    >
      <div className={`w-6 h-6 border border-white rounded-full flex items-center justify-center transition-all duration-100 ${
        isHovering ? 'border-amber-400' : 'border-white'
      }`}>
        <div className={`w-1 h-1 rounded-full transition-all duration-100 ${
          isHovering ? 'bg-amber-400 scale-150' : 'bg-white animate-pulse'
        }`}></div>
      </div>
    </div>
  );
};

export default Cursor;