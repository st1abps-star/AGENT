@@ .. @@
 "use client";
 import { motion } from 'framer-motion';
 import { cn } from '../lib/cn';
 import React from 'react';
 
 type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
   variant?: 'primary' | 'secondary';
   icon?: React.ReactNode;
+  size?: 'sm' | 'md' | 'lg';
 };
 
-export default function LiquidButton({ className, variant = 'primary', icon, children, ...props }: Props) {
+export default function LiquidButton({ 
+  className, 
+  variant = 'primary', 
+  size = 'md',
+  icon, 
+  children, 
+  disabled,
+  ...props 
+}: Props) {
   return (
     <motion.button
-      whileHover={{ scale: 1.02 }}
-      whileTap={{ scale: 0.98 }}
+      whileHover={disabled ? {} : { scale: 1.02, y: -1 }}
+      whileTap={disabled ? {} : { scale: 0.98 }}
+      transition={{ duration: 0.2, ease: "easeOut" }}
       className={cn(
-        'liquid-button relative rounded-xl px-4 py-2 transition-colors',
-        'border backdrop-blur-md',
+        'liquid-button relative rounded-xl transition-all duration-300',
+        'border backdrop-blur-md font-medium',
+        'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
+        // Size variants
+        size === 'sm' && 'px-3 py-1.5 text-sm',
+        size === 'md' && 'px-4 py-2 text-sm',
+        size === 'lg' && 'px-6 py-3 text-base',
+        // Color variants
         variant === 'primary'
-          ? 'bg-[rgba(0,209,255,0.12)] border-[rgba(0,209,255,0.35)] text-sky-100 hover:bg-[rgba(0,209,255,0.18)]'
-          : 'bg-white/10 border-white/15 text-gray-100 hover:bg-white/15',
+          ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border-indigo-500/30 text-indigo-100 hover:from-indigo-500/30 hover:to-purple-500/30 hover:border-indigo-400/40 hover:shadow-lg hover:shadow-indigo-500/25'
+          : 'bg-white/10 border-white/15 text-gray-100 hover:bg-white/15 hover:border-white/20',
         className
       )}
+      disabled={disabled}
       {...props}
     >
       <span className="liquid-sheen pointer-events-none" />
-      <span className="relative inline-flex items-center gap-2">
+      <span className="relative inline-flex items-center justify-center gap-2">
         {icon}
         {children}
       </span>