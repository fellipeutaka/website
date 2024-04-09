"use client";

import { motion } from "framer-motion";

export const MotionDiv = (props: React.ComponentProps<typeof motion.div>) => (
  <motion.div {...props} />
);
