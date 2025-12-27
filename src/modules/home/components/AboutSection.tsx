import React from 'react';

export const AboutSection = () => {
  return (
    <section className="py-20 md:py-32 bg-coffee-secondary text-white overflow-hidden">
      <div className="max-w-[1140px] mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-16">
          {/* Image Side */}
          <div className="w-full md:w-1/2 relative h-[400px] md:h-[500px]">
             <img 
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop" 
                alt="About Coffee" 
                className="w-full h-full object-cover object-center"
             />
          </div>

          {/* Content Side */}
          <div className="w-full md:w-1/2 flex flex-col gap-6 items-start">
             <span className="text-coffee-primary font-serif italic text-3xl">Discover</span>
             <h2 className="text-4xl font-bold uppercase tracking-wider leading-tight">Our Story</h2>
             <p className="text-gray-400 font-light leading-loose">
                On her way she met a copy. The copy warned the Little Blind Text, that where it came from it would have been rewritten a thousand times and everything that was left from its origin would be the word "and" and the Little Blind Text should turn around and return to its own, safe country.
             </p>
             <p className="text-gray-400 font-light leading-loose">
                But nothing the copy said could convince her and so it didn't take long until a few insidious Copy Writers ambushed her.
             </p>
          </div>
        </div>
      </div>
    </section>
  );
};