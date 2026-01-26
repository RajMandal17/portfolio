import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Palette, ShoppingCart, Globe, Sparkles, Layout } from "lucide-react";

export default function FeaturedMarketplace() {
    const projectUrl = "https://makemycrafts.com/";

    return (
        <section id="marketplace" className="py-24 bg-white dark:bg-slate-950 relative overflow-hidden">
            {/* Soft Background Accents */}
            <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none opacity-50">
                <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-100 dark:bg-blue-900/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-100 dark:bg-indigo-900/10 rounded-full blur-[120px]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 items-center">

                    {/* Left: Interactive Preview Card */}
                    <div className="w-full lg:w-1/2 order-2 lg:order-1">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2.5rem] blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
                            <Card className="relative bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-[2rem] overflow-hidden shadow-2xl">
                                <CardContent className="p-0">
                                    <div className="aspect-[4/3] relative bg-slate-50 dark:bg-slate-950 overflow-hidden">
                                        {/* Simulated Browser UI */}
                                        <div className="absolute top-0 left-0 right-0 h-8 bg-slate-100 dark:bg-slate-800 flex items-center px-4 gap-2 z-20">
                                            <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                                            <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                                            <div className="ml-4 h-5 flex-1 bg-white/50 dark:bg-black/20 rounded-md flex items-center px-3">
                                                <span className="text-[10px] text-slate-400 font-mono">https://makemycrafts.com</span>
                                            </div>
                                        </div>

                                        {/* Actual Preview Image */}
                                        <div className="absolute inset-x-0 bottom-0 top-8 bg-[url('https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center group-hover:scale-105 transition-transform duration-700">
                                            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-900 via-transparent to-transparent opacity-60"></div>
                                        </div>

                                        {/* Floating Info Badge */}
                                        <div className="absolute bottom-8 left-8 right-8 p-6 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 rounded-2xl border border-white dark:border-white/10 shadow-xl animate-in slide-in-from-bottom-5 duration-700">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1">Premium Platform</p>
                                                    <h4 className="text-xl font-bold text-slate-900 dark:text-white">Art & Craft Marketplace</h4>
                                                </div>
                                                <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center text-white">
                                                    <ShoppingCart className="w-5 h-5" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Right: Project Details */}
                    <div className="w-full lg:w-1/2 order-1 lg:order-2 space-y-8">
                        <div className="space-y-4">
                            <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
                                Full-Stack E-commerce
                            </div>
                            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
                                MakeMyCrafts <br />
                                <span className="text-blue-600 dark:text-blue-400">Handmade Marketplace</span>
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                A sophisticated multi-vendor marketplace designed for artists to showcase and sell masterpieces.
                                Built with a focus on visual storytelling and seamless purchasing experiences.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                                    <Palette className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white">Artist Galleries</h4>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Custom profile pages for creators to curate their work.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl flex items-center justify-center">
                                    <Sparkles className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white">AI Art Analysis</h4>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Integrated Gemini AI for automated artwork descriptions.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl flex items-center justify-center">
                                    <Globe className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white">Global Search</h4>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">High-performance elastic search across thousands of crafts.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-purple-50 dark:bg-purple-900/20 rounded-xl flex items-center justify-center">
                                    <Layout className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white">Responsive Design</h4>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Optimized for desktop, tablet, and mobile gallery viewing.</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <Button size="lg" className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:scale-105 transition-all px-8 py-7 rounded-2xl text-lg font-bold shadow-xl" asChild>
                                <a href={projectUrl} target="_blank" rel="noopener noreferrer">
                                    Visit Marketplace
                                    <ExternalLink className="ml-2 w-5 h-5" />
                                </a>
                            </Button>
                            <Button variant="outline" size="lg" asChild className="border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 px-8 py-7 rounded-2xl text-lg font-semibold transition-all">
                                <a href="https://github.com/RajMandal17/makemycraftsEcom" target="_blank" rel="noopener noreferrer">
                                    View Source Code
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
