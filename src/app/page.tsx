@@ .. @@
 "use client";
-import { useEffect, useMemo, useRef, useState } from 'react';
+import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
 import { motion, AnimatePresence } from 'framer-motion';
 import LiquidButton from '../components/LiquidButton';
 import TypingDots from '../components/TypingDots';
+import ThemeToggle from '../components/ThemeToggle';
 
 type ChatMessage = {
   id: string;
@@ .. @@
 export default function HomePage() {
   const [messages, setMessages] = useState<ChatMessage[]>([]);
   const [input, setInput] = useState('');
   const [temperature, setTemperature] = useState(0.4);
   const [isLoading, setIsLoading] = useState(false);
   const [controller, setController] = useState<AbortController | null>(null);
+  const [isDarkMode, setIsDarkMode] = useState(true);
   const containerRef = useRef<HTMLDivElement | null>(null);
 
+  useEffect(() => {
+    document.body.className = isDarkMode ? '' : 'light';
+  }, [isDarkMode]);
+
   useEffect(() => {
     containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: 'smooth' });
   }, [messages, isLoading]);
@@ .. @@
   const canSend = useMemo(() => input.trim().length > 0 && !isLoading, [input, isLoading]);
 
+  const toggleTheme = useCallback(() => {
+    setIsDarkMode(prev => !prev);
+  }, []);
+
   async function sendMessage(text?: string) {
@@ .. @@
   }
 
   return (
-    <main className="flex min-h-screen flex-col items-center justify-center p-4" style={{ backgroundColor: '#0d0d0d' }}>
-      <div className="w-full max-w-3xl glass rounded-3xl p-4 md:p-6">
-        <header className="mb-3 flex items-center justify-between">
-          <div className="flex items-center gap-3">
-            <div className="h-8 w-8 rounded-xl bg-[rgba(0,209,255,0.18)] border border-[rgba(0,209,255,0.35)]" />
-            <h1 className="text-lg font-semibold tracking-wide">
-              <span className="text-sky-300">Vyoma</span>AI
+    <main className="min-h-screen flex flex-col items-center justify-center p-3 sm:p-4 lg:p-6 xl:p-8">
+      <motion.div 
+        initial={{ opacity: 0, y: 20 }}
+        animate={{ opacity: 1, y: 0 }}
+        transition={{ duration: 0.6, ease: "easeOut" }}
+        className="w-full max-w-4xl xl:max-w-5xl 2xl:max-w-6xl glass rounded-3xl p-4 sm:p-6 lg:p-8 animate-float"
+      >
+        <header className="mb-4 sm:mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
+          <div className="flex items-center gap-3 sm:gap-4">
+            <motion.div 
+              className="relative h-10 w-10 sm:h-12 sm:w-12 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 p-0.5 animate-glow"
+              whileHover={{ scale: 1.05 }}
+              whileTap={{ scale: 0.95 }}
+            >
+              <div className="h-full w-full rounded-2xl bg-black/20 backdrop-blur-sm flex items-center justify-center">
+                <span className="text-white font-bold text-lg sm:text-xl">S</span>
+              </div>
+            </motion.div>
+            <div>
+              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
+                Seido AI
+              </h1>
+              <p className="text-xs sm:text-sm text-gray-400 mt-0.5">Advanced AI Assistant</p>
+            </div>
+          </div>
+          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
+            <div className="flex items-center gap-2 sm:gap-3 rounded-2xl glass px-3 sm:px-4 py-2 sm:py-3 flex-1 sm:flex-none">
+              <span className="text-xs text-gray-400 whitespace-nowrap">Temp</span>
+              <input
+                type="range"
+                min={0}
+                max={1}
+                step={0.1}
+                value={temperature}
+                onChange={(e) => setTemperature(parseFloat(e.target.value))}
+                className="accent-indigo-500 flex-1 sm:w-20"
+              />
+              <span className="text-xs text-gray-400 w-8 text-right font-mono">{temperature.toFixed(1)}</span>
+            </div>
+            <ThemeToggle isDark={isDarkMode} onToggle={toggleTheme} />
+            <LiquidButton variant="secondary" onClick={clearChat} className="whitespace-nowrap">
+              Clear
+            </LiquidButton>
+          </div>
+        </header>
+
+        <motion.div 
+          ref={containerRef} 
+          className="h-[50vh] sm:h-[55vh] lg:h-[60vh] xl:h-[65vh] overflow-y-auto rounded-2xl lg:rounded-3xl p-3 sm:p-4 lg:p-6 glass border-2 border-white/5"
+          initial={{ opacity: 0 }}
+          animate={{ opacity: 1 }}
+          transition={{ delay: 0.2, duration: 0.4 }}
+        >
+          <AnimatePresence mode="popLayout">
+            {messages.length === 0 && (
+              <motion.div
+                initial={{ opacity: 0, y: 20 }}
+                animate={{ opacity: 1, y: 0 }}
+                exit={{ opacity: 0, y: -20 }}
+                className="flex flex-col items-center justify-center h-full text-center"
+              >
+                <motion.div
+                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-blue-500/20 backdrop-blur-sm border border-white/10 flex items-center justify-center mb-4 sm:mb-6"
+                  animate={{ rotate: [0, 5, -5, 0] }}
+                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
+                >
+                  <span className="text-2xl sm:text-3xl">🤖</span>
+                </motion.div>
+                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-300">Welcome to Seido AI</h3>
+                <p className="text-sm sm:text-base text-gray-400 max-w-md">
+                  Start a conversation with your advanced AI assistant. Ask questions, get insights, or explore ideas together.
+                </p>
+              </motion.div>
+            )}
+            {messages.map((m, index) => (
+              <motion.div
+                key={m.id}
+                initial={{ opacity: 0, y: 20, scale: 0.95 }}
+                animate={{ opacity: 1, y: 0, scale: 1 }}
+                exit={{ opacity: 0, y: -10, scale: 0.95 }}
+                transition={{ 
+                  duration: 0.4, 
+                  delay: index * 0.05,
+                  ease: "easeOut"
+                }}
+                className={`mb-4 sm:mb-6 flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
+              >
+                <div className={`max-w-[85%] sm:max-w-[80%] lg:max-w-[75%] rounded-2xl lg:rounded-3xl px-4 sm:px-6 py-3 sm:py-4 border transition-all duration-300 hover:scale-[1.02] ${m.role === 'user' ? 'bubble-user' : 'bubble-ai'}`}>
+                  <p className="whitespace-pre-wrap text-sm sm:text-base leading-relaxed">{m.content}</p>
+                  <div className="mt-3 flex justify-end">
+                    <LiquidButton 
+                      variant="secondary" 
+                      className="text-xs px-3 py-1.5 opacity-70 hover:opacity-100" 
+                      onClick={() => copyMessage(m.id)}
+                    >
+                      Copy
+                    </LiquidButton>
+                  </div>
+                </div>
+              </motion.div>
+            ))}
+          </AnimatePresence>
+          {isLoading && (
+            <motion.div 
+              initial={{ opacity: 0, y: 20 }}
+              animate={{ opacity: 1, y: 0 }}
+              className="mb-4 sm:mb-6 flex justify-start"
+            >
+              <div className="bubble-ai max-w-[60%] rounded-2xl lg:rounded-3xl px-4 sm:px-6 py-3 sm:py-4 border">
+                <TypingDots />
+              </div>
+            </motion.div>
+          )}
+        </motion.div>
+
+        <motion.div 
+          className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3"
+          initial={{ opacity: 0, y: 20 }}
+          animate={{ opacity: 1, y: 0 }}
+          transition={{ delay: 0.4, duration: 0.4 }}
+        >
+          <div className="flex-1 glass rounded-2xl px-4 sm:px-6 py-3 sm:py-4 flex items-center gap-3 min-h-[3rem] sm:min-h-[3.5rem]">
+            <input
+              className="w-full bg-transparent outline-none placeholder:text-gray-400 text-sm sm:text-base"
+              placeholder="Ask Seido AI anything..."
+              value={input}
+              onChange={(e) => setInput(e.target.value)}
+              onKeyDown={(e) => {
+                if (e.key === 'Enter' && !e.shiftKey) {
+                  e.preventDefault();
+                  sendMessage();
+                }
+              }}
+            />
+          </div>
+          <div className="flex items-center gap-2 sm:gap-3">
+            <LiquidButton 
+              onClick={() => sendMessage()} 
+              disabled={!canSend}
+              className="flex-1 sm:flex-none px-6 sm:px-8 py-3 sm:py-4 font-medium"
+            >
+              Send
+            </LiquidButton>
+            <LiquidButton 
+              variant="secondary" 
+              onClick={abortRequest} 
+              disabled={!isLoading}
+              className="px-4 sm:px-6 py-3 sm:py-4"
+            >
+              Stop
+            </LiquidButton>
+            <LiquidButton 
+              variant="secondary" 
+              onClick={regenerate} 
+              disabled={isLoading || messages.every((m) => m.role !== 'user')}
+              className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap"
+            >
+              Retry
             </h1>
           </div>
-          <div className="flex items-center gap-2">
-            <div className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2 border border-white/10">
-              <span className="text-xs text-gray-300/80">Temperature</span>
-              <input
-                type="range"
-                min={0}
-                max={1}
-                step={0.1}
-                value={temperature}
-                onChange={(e) => setTemperature(parseFloat(e.target.value))}
-                className="accent-sky-400"
-              />
-              <span className="text-xs text-gray-300/80 w-8 text-right">{temperature.toFixed(1)}</span>
-            </div>
-            <LiquidButton variant="secondary" onClick={clearChat}>Clear</LiquidButton>
           </div>
-        </header>
-
-        <div ref={containerRef} className="h-[60vh] overflow-y-auto rounded-2xl p-3 bg-black/20 border border-white/10">
-          <AnimatePresence initial={false}>
-            {messages.map((m) => (
-              <motion.div
-                key={m.id}
-                initial={{ opacity: 0, y: 12 }}
-                animate={{ opacity: 1, y: 0 }}
-                exit={{ opacity: 0, y: -8 }}
-                transition={{ duration: 0.25 }}
-                className={`mb-3 flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
-              >
-                <div className={`max-w-[85%] rounded-2xl px-4 py-3 border ${m.role === 'user' ? 'bubble-user' : 'bubble-ai'}`}>
-                  <p className="whitespace-pre-wrap text-sm leading-relaxed">{m.content}</p>
-                  <div className="mt-2 flex justify-end">
-                    <LiquidButton variant="secondary" className="text-xs px-2 py-1" onClick={() => copyMessage(m.id)}>Copy</LiquidButton>
-                  </div>
-                </div>
-              </motion.div>
-            ))}
-          </AnimatePresence>
-          {isLoading && (
-            <div className="mb-3 flex justify-start">
-              <div className="bubble-ai max-w-[60%] rounded-2xl px-4 py-3 border">
-                <TypingDots />
-              </div>
-            </div>
-          )}
-        </div>
-
-        <div className="mt-4 flex items-center gap-2">
-          <div className="flex-1 glass rounded-2xl px-3 py-2 flex items-center gap-2">
-            <input
-              className="w-full bg-transparent outline-none placeholder:text-gray-400 text-gray-100"
-              placeholder="Ask VyomaAI..."
-              value={input}
-              onChange={(e) => setInput(e.target.value)}
-              onKeyDown={(e) => {
-                if (e.key === 'Enter' && !e.shiftKey) {
-                  e.preventDefault();
-                  sendMessage();
-                }
-              }}
-            />
-          </div>
-          <LiquidButton onClick={() => sendMessage()} disabled={!canSend}>
-            Send
-          </LiquidButton>
-          <LiquidButton variant="secondary" onClick={abortRequest} disabled={!isLoading}>
-            Stop
-          </LiquidButton>
-          <LiquidButton variant="secondary" onClick={regenerate} disabled={isLoading || messages.every((m) => m.role !== 'user')}>
-            Regenerate
-          </LiquidButton>
-        </div>
-      </div>
+        </motion.div>
+      </motion.div>
     </main>
   );
 }