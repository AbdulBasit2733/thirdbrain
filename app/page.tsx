"use client";

import { Button } from "@/app/components/ui/Button";
import Link from "next/link";
import { ArrowRight, BookMarked, Filter, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function Home() {
  const { status } = useSession();
  const router = useRouter();
  if (status === "authenticated") {
    router.push("/user/dashboard");
  }
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
      <div className="absolute w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-3xl -top-32 -left-32" />
      <div className="absolute w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl -bottom-32 -right-32" />

      <section className="relative max-w-6xl mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h1 className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500">
            Welcome to ThirdBrain
          </h1>
          <h3 className="text-2xl font-medium text-slate-100 max-w-2xl mx-auto">
            Your Ultimate Digital Vault for Organizing and Saving What Matters
          </h3>
          <p className="text-lg font-normal text-slate-300 max-w-3xl mx-auto">
            ThirdBrain is your personal hub to save, organize, and manage all
            your favorite content in one place. Whether it's a must-watch
            YouTube video, an insightful tweet, or a valuable article,
            ThirdBrain helps you keep everything at your fingertips.
          </p>

          <div className="inline-block mt-8">
            <Button
              onClick={() => signIn()}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-32 w-full"
        >
          <h2 className="text-4xl font-bold mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
            Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ y: -8 }}
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300"
            >
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-12 h-12 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                <BookMarked className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">
                Save Your Favorite Content
              </h3>
              <p className="text-slate-300">
                Add your important YouTube videos, tweets, links, photos, and
                PDFs effortlessly. Categorize them with titles, tags, and
                categories for easy retrieval.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -8 }}
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300"
            >
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 w-12 h-12 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                <Filter className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">
                Organize Like Never Before
              </h3>
              <p className="text-slate-300">
                Filter and search through your saved content quickly with
                personalized tags and categories. Stay focused on what matters
                most.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -8 }}
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300"
            >
              <div className="bg-gradient-to-br from-indigo-500 to-purple-500 w-12 h-12 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">
                Access Anytime, Anywhere
              </h3>
              <p className="text-slate-300">
                Your ThirdBrain is always with you. Log in from any device and
                find your saved content instantly.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
