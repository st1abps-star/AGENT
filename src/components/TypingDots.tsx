@@ .. @@
 "use client";
+import { motion } from 'framer-motion';
+
 export default function TypingDots() {
   return (
-    <div className="flex items-center gap-1">
-      <span className="h-2 w-2 rounded-full bg-gray-300/80 animate-pulseDots" />
-      <span className="h-2 w-2 rounded-full bg-gray-300/60 animate-pulseDots" style={{ animationDelay: '0.2s' }} />
-      <span className="h-2 w-2 rounded-full bg-gray-300/40 animate-pulseDots" style={{ animationDelay: '0.4s' }} />
+    <div className="flex items-center gap-1.5">
+      {[0, 1, 2].map((index) => (
+        <motion.span
+          key={index}
+          className="h-2 w-2 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400"
+          animate={{
+            opacity: [0.3, 1, 0.3],
+            scale: [0.8, 1, 0.8],
+          }}
+          transition={{
+            duration: 1.4,
+            repeat: Infinity,
+            delay: index * 0.2,
+            ease: "easeInOut",
+          }}
+        />
+      ))}
     </div>
   );
 }