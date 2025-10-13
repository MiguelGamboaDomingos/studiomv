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
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('button, a, input, textarea, select, [role="button"], [tabindex]');
      setIsHovering(!!isInteractive);
    };

    const hideCursor = () => setIsVisible(false);

    // Only apply custom cursor to specific areas
    const customCursorElements = document.querySelectorAll('.custom-cursor-area');

    customCursorElements.forEach(element => {
      element.addEventListener('mousemove', updateCursor);
      element.addEventListener('mouseleave', hideCursor);
    });

    return () => {
      customCursorElements.forEach(element => {
        element.removeEventListener('mousemove', updateCursor);
        element.removeEventListener('mouseleave', hideCursor);
      });
    };
  }, []);

  // Don't render if not visible or user prefers reduced motion
  if (!isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-50 mix-blend-difference transition-transform duration-150"
      style={{
        left: position.x,
        top: position.y,
        transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`
      }}
      aria-hidden="true"
    >
      <div className={`w-8 h-8 border border-white rounded-full flex items-center justify-center transition-all duration-150 ${
        isHovering ? 'border-amber-500' : 'border-white'
      }`}>
        <div className={`w-2 h-2 rounded-full transition-all duration-150 ${
          isHovering ? 'bg-red-500 scale-150' : 'bg-red-500 animate-pulse'
        }`}></div>
      </div>
    </div>
  );
};

export default Cursor;