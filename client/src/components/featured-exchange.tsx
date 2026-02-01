import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Maximize2, X, TrendingUp, Shield, Zap } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

export default function FeaturedExchange() {
    const [isOpen, setIsOpen] = useState(false);
    const { toast } = useToast();
    const tradingUrl = "https://tradex-exchange.143.110.250.170.sslip.io/trading/BTC-USDT";

    // Removed automatic toast on load as per Naveen's feedback to avoid driving concentration away from portfolio
    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         toast({
    //             title: "🚀 New Project: TRADEX",
    //             description: "Check out my new high-performance trading platform!",
    //             action: (
    //                 <Button size="sm" onClick={() => setIsOpen(true)}>
    //                     View Live
    //                 </Button>
    //             ),
    //         });
    //     }, 2000);
    //     return () => clearTimeout(timer);
    // }, [toast]);

    return (
        <section id="exchange" className="py-24 bg-slate-900 text-white relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-600 rounded-full blur-[120px]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4 animate-pulse">
                        < Zap className="w-4 h-4 mr-2" />
                        New Project Launch
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-slate-400 bg-clip-text text-transparent">
                        TRADEX Trading Platform
                    </h2>
                    <p className="text-lg text-slate-400 max-w-3xl mx-auto">
                        A high-performance cryptocurrency exchange featuring real-time order matching,
                        interactive charts, and a professional-grade trading terminal.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div className="space-y-6">
                            <div className="flex gap-4 items-start">
                                <div className="mt-1 bg-blue-500/20 p-3 rounded-xl border border-blue-500/30">
                                    <TrendingUp className="w-6 h-6 text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">Real-time Order Book</h3>
                                    <p className="text-slate-400 text-sm md:text-base">
                                        High-frequency order matching engine capable of processing thousands of transactions per second.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4 items-start">
                                <div className="mt-1 bg-emerald-500/20 p-3 rounded-xl border border-emerald-500/30">
                                    <Maximize2 className="w-6 h-6 text-emerald-400" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">Advanced Analytics</h3>
                                    <p className="text-slate-400 text-sm md:text-base">
                                        Integrated TradingView charts with custom technical indicators and market depth visualization.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4 items-start">
                                <div className="mt-1 bg-purple-500/20 p-3 rounded-xl border border-purple-500/30">
                                    <Shield className="w-6 h-6 text-purple-400" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">Secure Microservices</h3>
                                    <p className="text-slate-400 text-sm md:text-base">
                                        Architected using Spring Boot and Apache Kafka for extreme scalability and fault tolerance.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                                <DialogTrigger asChild>
                                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-7 rounded-2xl text-lg font-bold shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all hover:scale-105">
                                        Launch Exchange
                                        <ExternalLink className="ml-2 w-5 h-5" />
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-[95vw] w-[1400px] h-[90vh] p-0 bg-slate-950 border-slate-800 overflow-hidden rounded-3xl">
                                    <div className="flex flex-col h-full">
                                        <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900/50">
                                            <div className="flex items-center gap-3">
                                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                                <span className="ml-4 text-sm font-medium text-slate-400">TRADEX Terminal v1.0</span>
                                            </div>
                                            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
                                                <X className="w-5 h-5" />
                                            </Button>
                                        </div>
                                        <div className="flex-1 bg-black relative">
                                            <iframe
                                                src={tradingUrl}
                                                className="w-full h-full border-0"
                                                title="TRADEX Trading Terminal"
                                            />
                                        </div>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                        <Card className="relative bg-slate-900 border-slate-800 rounded-[2rem] overflow-hidden shadow-2xl">
                            <CardContent className="p-0">
                                <div className="aspect-video relative bg-slate-950 border-b border-slate-800">
                                    {/* Preview Image/Iframe Mockup */}
                                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1642388691919-40899818819a?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-40"></div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-center p-6 backdrop-blur-sm bg-slate-950/40 rounded-3xl border border-white/10 max-w-sm">
                                            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-500/30">
                                                <TrendingUp className="w-8 h-8 text-blue-400" />
                                            </div>
                                            <h4 className="text-xl font-bold mb-2">Live Trading Demo</h4>
                                            <p className="text-slate-400 text-sm">Experience the full power of TRADEX with our interactive sandbox environment.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-8">
                                    <div className="flex justify-between items-center mb-6">
                                        <div className="flex gap-2">
                                            <span className="px-3 py-1 bg-blue-500/10 text-blue-500 text-xs font-bold rounded-lg border border-blue-500/20 uppercase tracking-wider">BTC / USDT</span>
                                            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-xs font-bold rounded-lg border border-emerald-500/20 uppercase tracking-wider">LIVE</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-emerald-400">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                            <span className="text-sm font-mono">+4.25%</span>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-blue-500 w-[70%]" />
                                        </div>
                                        <div className="flex justify-between text-xs text-slate-500 font-mono">
                                            <span>LOAD CAPACITY</span>
                                            <span>850K TPS</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
}
