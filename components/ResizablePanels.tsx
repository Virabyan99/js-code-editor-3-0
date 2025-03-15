'use client';

import { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import IconWithHover from './IconWithHover';

const MIN_WIDTH_VW = 24;
const MAX_WIDTH_VW = 70;
const INITIAL_WIDTH_VW = 48;
const GUTTER_VW = 2;

export default function ResizablePanels() {
  const [totalWidth, setTotalWidth] = useState(0);
  const x = useMotionValue(0);

  useEffect(() => {
    const updateTotalWidth = () => {
      const newTotalWidth = window.innerWidth - 4 * (window.innerWidth * GUTTER_VW / 100);
      setTotalWidth(newTotalWidth);
    };
    updateTotalWidth();
    window.addEventListener('resize', updateTotalWidth);
    return () => window.removeEventListener('resize', updateTotalWidth);
  }, []);

  const leftWidth = useTransform(x, (value) => {
    if (totalWidth === 0) return INITIAL_WIDTH_VW;
    const newWidth = (value / totalWidth) * 100 + INITIAL_WIDTH_VW;
    return Math.max(MIN_WIDTH_VW, Math.min(MAX_WIDTH_VW, newWidth));
  });

  return (
    <main className="flex h-screen w-screen flex-col p-4 md:flex-row md:p-[2vw]">
      <motion.div
        className="relative h-1/2 w-full rounded-lg bg-gray-100 p-4 shadow-md md:h-full"
        style={{ width: leftWidth }}
      >
        <h2>Left Panel</h2>
        <IconWithHover className="absolute left-2 top-2" />
        <IconWithHover className="absolute right-2 top-2" />
        <IconWithHover className="absolute bottom-2 left-2" />
        <IconWithHover className="absolute bottom-2 right-2" />
      </motion.div>
      <motion.div
        className="h-4 w-full bg-gray-400 md:h-full md:w-2 md:cursor-ew-resize hidden md:block"
        drag="x"
        dragConstraints={{ left: -totalWidth * (MIN_WIDTH_VW / 100), right: totalWidth * ((MAX_WIDTH_VW - INITIAL_WIDTH_VW) / 100) }}
        dragElastic={0}
        style={{ x }}
        role="separator"
        aria-label="Resize panels"
      ></motion.div>
      <div className="relative h-1/2 w-full rounded-lg bg-gray-200 p-4 shadow-md md:h-full md:flex-1">
        <h2>Right Panel</h2>
        <IconWithHover className="absolute left-2 top-2" />
        <IconWithHover className="absolute right-2 top-2" />
        <IconWithHover className="absolute bottom-2 left-2" />
        <IconWithHover className="absolute bottom-2 right-2" />
      </div>
    </main>
  );
}
