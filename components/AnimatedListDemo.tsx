"use client";

import { cn } from "@/lib/utils";
import { AnimatedList } from "@/components/magicui/animated-list";
import Image from 'next/image'; // Import Image from Next.js
import mfk from '@/assets/mfk.webp';
import oud from '@/assets/oudmaracuja.png'
import lv from '@/assets/louisont view.webp'
import angl from '@/assets/angels-share.png'
import sljedd from '@/assets/file.png'

interface Item {
  name: string;
  description: string;
  icon: string; // This can be either a URL or a text icon
  color: string;
}
let notifications = [
  {
    name: "Grand Soir",
    description: "MAISON FRANCIS KURKDJIAN",
    time: "15m ago",
    icon: mfk, // StaticImageData
    color: "#000",
  },
  {
    name: "Oud Maracujá",
    description: "MAISON CRIVELLI",
    time: "10m ago",
    icon: oud , // Text icon
    color: "#000",
  },
  {
    name: "Ombre Nomade",
    description: "LOUIS VUITTON",
    time: "5m ago",
    icon: lv, // Text icon
    color: "#000",
  },
  {
    name: "Angel Share",
    description: "KILLIAN",
    time: "2m ago",
    icon: angl, // Text icon
    color: "#000",
  },
  {
    name: " Soleil de Jeddah ",
    description: "Stéphane Humbert Lucas ",
    time: "2m ago",
    icon: sljedd, // Text icon
    color: "#000",
  },
];

notifications = Array.from({ length: 10 }, () => notifications).flat();

const Notification = ({ name, description, icon, color }: Item) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex size-10 items-center justify-center rounded-2xl"
          
        >
          
            <Image src={icon} alt={name} height={40} width={40} />
          
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white">
            <span className="text-sm sm:text-lg">{name}</span>
          </figcaption>
          <p className="text-sm font-normal dark:text-white/60">
            {description}
          </p>
        </div>
      </div>
    </figure>
  );
};

export function AnimatedListDemo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-[500px] w-full flex-col p-6 overflow-hidden rounded-lg border bg-background md:shadow-xl",
        className,
      )}
    >
      <AnimatedList>
        {notifications.map((item, idx) => (
          <Notification {...item} key={idx} />
        ))}
      </AnimatedList>
    </div>
  );
}
