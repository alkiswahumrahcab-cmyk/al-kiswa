export default function BookingFormSkeleton() {
    return (
        <div className="w-full max-w-4xl mx-auto px-4 pt-0 pb-16 animate-pulse">
            
            {/* Header Skeleton */}
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="h-10 md:h-12 w-64 bg-white/10 rounded-lg mb-4"></div>
                    <div className="h-6 w-80 bg-white/5 rounded-lg"></div>
                </div>
                <div className="h-10 w-32 bg-white/10 rounded-full"></div>
            </div>

            {/* Form Steps Skeleton */}
            <div className="space-y-16">
                
                {/* Step 1 Skeleton */}
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 rounded-full bg-white/20"></div>
                        <div className="h-8 w-48 bg-white/10 rounded-lg"></div>
                    </div>
                    
                    <div className="pl-0 md:pl-11 space-y-8">
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 h-80"></div>
                        <div className="w-full h-14 border-2 border-dashed border-white/10 rounded-xl"></div>
                    </div>
                </section>

                {/* Step 2 Skeleton */}
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 rounded-full bg-white/5"></div>
                        <div className="h-8 w-48 bg-white/5 rounded-lg"></div>
                    </div>
                    
                    <div className="pl-0 md:pl-11 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="rounded-2xl p-5 md:p-6 bg-[#111] border border-white/5 h-80">
                                <div className="w-full h-40 bg-white/5 rounded-xl mb-6"></div>
                                <div className="h-6 w-32 bg-white/10 rounded-lg mb-2"></div>
                                <div className="h-4 w-24 bg-white/5 rounded-lg"></div>
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
}
