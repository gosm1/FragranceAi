'use client';

import { useState } from "react";
import { cn } from "@/lib/utils";
import DotPattern from "@/components/magicui/dot-pattern";
import Image from "next/image";
import BlurIn from "@/components/magicui/blur-in";

import jpg from '@/assets/jpg.webp'
import ShimmerButton from "@/components/magicui/shimmer-button";
import { AnimatedListDemo } from "@/components/AnimatedListDemo";
import Navbar from "@/components/Navbar";

export default function Home() {


  

  return (
    <main className="">
      <Navbar/>
      <div className="relative flex h-[750px] md:h-[90vh] w-full flex-col items-center justify-center overflow-hidden rounded-lg   ">
        <div className="z-10 whitespace-pre-wrap text-center text-3xl md:text-5xl lg:text-6xl font-medium tracking-tighter text-black dark:text-white inline-flex items-center">
          <BlurIn className="bg-gradient-to-t from-gray-600 to-[#12181C] bg-clip-text text-transparent " word="Get Your Perfect Fragrance" />
          <Image src={jpg} alt="jpg" height={120} className="hidden md:block" />
        </div>
        <div className="z-10 whitespace-pre-wrap text-center text-3xl md:text-5xl lg:text-6xl font-medium tracking-tighter text-black dark:text-white inline-flex items-center">
          <BlurIn className="bg-gradient-to-t from-gray-600 to-[#12181C] bg-clip-text text-transparent "  word="To Match Your Unique Preferences." />
        </div>
        <Image src={jpg} alt="jpg" height={120} className="z-10 mt-5 block md:hidden" />
        <p className="pt-8 text-sm md:text-lg md:max-w-2xl text-center">Let our intelligent fragrance matcher learn your preferences and recommend the perfect perfume tailored just for you</p>
        <div className="z-10 flex pt-8 items-center justify-center">
          <ShimmerButton href="/perfume-recommendation" className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-md">
              Get Recommendation
          </ShimmerButton>
          
    </div>
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(470px_circle_at_center,white,transparent)]",
        )}
      />
      
    </div>
    <div className="flex flex-col lg:flex-row items-center justify-around">
        <div className="text-xl sm:text-2xl text-center lg:text-left px-8 pb-12 md:px-0 lg:py-0  lg:text-4xl xl:text-4xl  md:max-w-xl font-semibold">
          See What Fragrance AI can recommend only to you
        </div>
        <div className="md:w-[500px]">
          <AnimatedListDemo/>
        </div>
      </div>
    </main>
  );
}
