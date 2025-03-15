import { motion } from 'framer-motion';
import { IconCircleDotted } from '@tabler/icons-react';

interface IconWithHoverProps {
  className?: string;
}

export default function IconWithHover({ className }: IconWithHoverProps) {
  return (
    <motion.div
      className={`rounded-md bg-gray-300 p-1 ${className}`}
      whileHover={{ backgroundColor: '#000000', scale: 1.1 }}
      transition={{ duration: 0.2 }}
      role="button"
      aria-label="Interactive icon"
    >
      <motion.div whileHover={{ color: '#ffffff' }}>
        <IconCircleDotted />
      </motion.div>
    </motion.div>
  );
}