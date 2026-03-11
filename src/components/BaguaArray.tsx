'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const BaguaArray = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const baguaSymbols = ['☰', '☱', '☲', '☳', '☴', '☵', '☶', '☷'];
  const binaryPatterns = ['111', '011', '101', '001', '100', '000', '010', '110'];

  return (
    <div className="relative w-[600px] h-[600px] mx-auto">
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ rotate: scrollY * 0.1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        {/* Outer ring with binary patterns */}
        <div className="relative w-[500px] h-[500px] border-2 border-primary/30 rounded-full">
          {binaryPatterns.map((pattern, i) => {
            const angle = (i * 45) * (Math.PI / 180);
            const x = 250 + 200 * Math.cos(angle);
            const y = 250 + 200 * Math.sin(angle);
            
            return (
              <motion.div
                key={i}
                className="absolute text-xs font-mono text-primary/70"
                style={{
                  left: x,
                  top: y,
                  transform: 'translate(-50%, -50%)'
                }}
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.1,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              >
                {pattern}
              </motion.div>
            );
          })}

          {/* Middle ring with bagua symbols */}
          <div className="absolute inset-8 border border-secondary/40 rounded-full">
            {baguaSymbols.map((symbol, i) => {
              const angle = (i * 45) * (Math.PI / 180);
              const x = 200 + 140 * Math.cos(angle);
              const y = 200 + 140 * Math.sin(angle);
              
              return (
                <motion.div
                  key={i}
                  className="absolute text-2xl font-bold text-accent"
                  style={{
                    left: x,
                    top: y,
                    transform: 'translate(-50%, -50%)'
                  }}
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 20,
                    delay: i * 0.2,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                >
                  {symbol}
                </motion.div>
              );
            })}
          </div>

          {/* Inner core with data stream effect */}
          <motion.div
            className="absolute inset-0 m-auto w-32 h-32 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(225,29,72,0.3) 0%, rgba(124,58,237,0.1) 70%, transparent 100%)',
              boxShadow: '0 0 60px rgba(225,29,72,0.5), inset 0 0 30px rgba(124,58,237,0.3)'
            }}
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 360]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'linear'
            }}
          >
            {/* Central quantum computing symbol */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="text-4xl"
                animate={{
                  textShadow: [
                    '0 0 20px rgba(225,29,72,0.8)',
                    '0 0 40px rgba(124,58,237,0.8)',
                    '0 0 20px rgba(225,29,72,0.8)'
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity
                }}
              >
                ⚛
              </motion.div>
            </div>
          </motion.div>

          {/* Orbiting particles */}
          {[...Array(8)].map((_, i) => {
            const angle = (i * 45) * (Math.PI / 180);
            return (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-primary"
                style={{
                  left: 250,
                  top: 250,
                }}
                animate={{
                  x: [100 * Math.cos(angle), 180 * Math.cos(angle), 100 * Math.cos(angle)],
                  y: [100 * Math.sin(angle), 180 * Math.sin(angle), 100 * Math.sin(angle)],
                  opacity: [0.3, 1, 0.3],
                  scale: [1, 1.5, 1]
                }}
                transition={{
                  duration: 4 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: 'easeInOut'
                }}
              />
            );
          })}
        </div>
      </motion.div>

      {/* Background glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(225,29,72,0.1) 0%, transparent 70%)',
          filter: 'blur(40px)'
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
    </div>
  );
};

export default BaguaArray;