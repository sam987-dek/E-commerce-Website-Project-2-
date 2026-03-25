import React from 'react';
import { motion } from 'framer-motion';

const animations = {
  initial: { opacity: 0, x: -30, filter: 'blur(4px)' },
  animate: { opacity: 1, x: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, x: 30, filter: 'blur(4px)' },
};

const AnimatedPage = ({ children }) => {
  return (
    <motion.div
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5, ease: 'easeOut', type: "spring", bounce: 0.2 }}
      className="w-full h-full origin-center"
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;
