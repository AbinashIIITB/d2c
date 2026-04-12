"use client";

import { motion } from "framer-motion";

export function HeroBackground({
  bottomOffsetClass = "bottom-0",
}: {
  bottomOffsetClass?: string;
}) {
  return (
    <div className={`absolute top-0 left-0 right-0 ${bottomOffsetClass} overflow-hidden pointer-events-none z-0`}>
      {/* Bottom Left Large Circle */}
      <motion.div 
        className="absolute w-[600px] lg:w-[800px] h-[600px] lg:h-[800px] rounded-full bg-white/10 -bottom-[200px] lg:-bottom-[400px] -left-[200px] lg:-left-[200px]"
        animate={{ x: [0, 20, -10, 0], y: [0, -20, 15, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="hidden lg:block absolute w-[400px] lg:w-[600px] h-[400px] lg:h-[600px] rounded-full bg-white/10 -bottom-[100px] lg:-bottom-[250px] -left-[150px] lg:-left-[100px]"
        animate={{ x: [0, -30, 20, 0], y: [0, 20, -25, 0], scale: [1, 1.05, 0.98, 1] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Top Right Overlapping Circles */}
      <motion.div 
        className="hidden lg:block absolute w-[500px] lg:w-[700px] h-[500px] lg:h-[700px] rounded-full bg-white/10 -top-[150px] lg:-top-[250px] -right-[150px] lg:-right-[100px]"
        animate={{ x: [0, -20, 30, 0], y: [0, 30, -15, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="hidden lg:block absolute w-[600px] lg:w-[900px] h-[600px] lg:h-[900px] rounded-full bg-white/5 -top-[50px] lg:-top-[100px] -right-[250px] lg:-right-[200px]"
        animate={{ x: [0, 40, -20, 0], y: [0, -20, 30, 0], scale: [1, 1.06, 0.95, 1] }}
        transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Dashed Arc Top Right */}
      <motion.div
          className="absolute rounded-full border-[3px] border-dashed border-white/30"
          style={{
            width: 600,
            height: 600,
            top: "-150px",
            right: "-150px",
          }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Inner subtle circle behind content */}
      <motion.div 
        className="hidden lg:block absolute w-[400px] lg:w-[500px] h-[400px] lg:h-[500px] rounded-full bg-white/10 bottom-[10%] lg:bottom-[20%] right-[0%] lg:right-[5%]"
        animate={{ x: [0, 15, -15, 0], y: [0, -15, 15, 0], scale: [1, 1.08, 0.92, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
