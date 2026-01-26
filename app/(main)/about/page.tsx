"use client";
import Image from "next/image";

import { Users, Award, Zap, Heart, Star } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      
      {/* BACKGROUND GLOWS */}
      <div className="absolute -top-50 -left-50 w-150 h-150 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute top-[40%] -right-50 w-150 h-150 bg-pink-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-50 left-[30%] w-150 h-150 bg-orange-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto px-6 py-24">

        {/* ================= MEMORIAL SECTION ================= */}
        <section className="max-w-6xl mx-auto mb-32">
          <div className="text-center mb-16">
            <p className="text-cyan-400 tracking-[0.3em] uppercase text-sm mb-4">
              In Loving Memory
            </p>

            <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
              <span className="bg-linear-to-r from-cyan-400 via-pink-500 to-orange-400 bg-clip-text text-transparent">
                Kartikya Rindani
              </span>
            </h1>

            <p className="text-gray-400 text-lg">
              A Dreamer Who Inspired Thousands
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">

            {/* PHOTO CARD */}
<div className="flex justify-center">
  <div className="relative">

    {/* WHITE SHINY GLOW */}
    <div className="
      absolute inset-0
      rounded-2xl
      blur-2xl
      bg-white/40
      scale-110
    " />

    {/* COLORED GRADIENT FRAME */}
    <div className="relative p-1 rounded-2xl bg-linear-to-br from-cyan-400 via-pink-500 to-orange-400">

      {/* IMAGE CONTAINER */}
      <div className="
        relative
        w-72 h-96
        rounded-2xl
        overflow-hidden
        bg-black
        shadow-[0_0_60px_rgba(255,255,255,0.35)]
      ">
        <Image
          src="/images/Kartikya.jpg"
          alt="Kartikya Rindani"
          fill
          className="object-cover"
          priority
        />
      </div>

    </div>
  </div>
</div>


            {/* STORY CARDS */}
            <div className="space-y-6">

              <div className="
  bg-white/5 backdrop-blur-xl
  border border-white/10
  rounded-xl p-6
  transition-all duration-300 ease-out
  hover:-translate-y-2
  hover:border-cyan-400/40
  hover:shadow-[0_0_30px_rgba(34,211,238,0.25)]
">
  <h3 className="text-xl font-semibold mb-3">
    A Life Full of Dreams
  </h3>
  <p className="text-gray-400 leading-relaxed">
    Kartikya Rindani was a bright and passionate student, filled with
    dreams and aspirations that touched everyone around him. Though
    his journey was cut short, his enthusiasm, creativity, and
    kindness continue to inspire us all.
  </p>
</div>


              <div className="
  bg-white/5 backdrop-blur-xl
  border border-white/10
  rounded-xl p-6
  transition-all duration-300 ease-out
  hover:-translate-y-2
  hover:border-pink-400/40
  hover:shadow-[0_0_30px_rgba(236,72,153,0.25)]
">
  <h3 className="text-xl font-semibold mb-3">
    A Family’s Love That Lives On
  </h3>
  <p className="text-gray-400 leading-relaxed">
    Founded by Kartikya’s parents in his loving memory, this annual fest celebrates hope, ambition, and young dreams. Through scholarships for deserving students, his legacy continues to inspire.
  </p>
</div>


              <div className="bg-black/70 border border-cyan-400/40 rounded-xl p-6">
                <p className="italic text-lg">
                  “Dreams don’t die, they live on through those who remember them.”
                </p>
                <p className="text-cyan-400 text-sm mt-2">
                  — In memory of Kartikya
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ==== ABOUT FEST ===== */}
        <section className="max-w-6xl mx-auto mb-32">

          <p className="text-cyan-400 tracking-[0.3em] uppercase text-sm mb-4">
            About the Fest
          </p>

          <h2 className="text-5xl font-extrabold mb-8 leading-tight">
            Where Dreams <br />
            <span className="bg-linear-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
              Take Flight
            </span>
          </h2>

          <p className="text-gray-400 text-lg max-w-3xl mb-6">
            Kartikya Rindani Fest is the flagship annual cultural and technical
            extravaganza bringing together the brightest minds and most talented
            performers from across the region.
          </p>

          <p className="text-gray-400 text-lg max-w-3xl leading-relaxed mb-12">
  From intense coding battles to mesmerizing dance performances, from
  thought-provoking debates to soulful singing competitions – we celebrate
  excellence in every form. Win exciting{" "}
  <span className="text-cyan-400 font-semibold">medals</span>{" "}
  and receive{" "}
  <span className="text-cyan-400 font-semibold">e-certificates</span>{" "}
  for your achievements! Join us for three unforgettable days of learning,
  competition, and celebration.
</p>



          {/* STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Users, value: "1000+", label: "Participants" },
              { icon: Award, value: "10+", label: "Events" },
              { icon: Zap, value: "3", label: "Days" },
              { icon: Heart, value: "100%", label: "Fun Guaranteed" },
            ].map((item) => (
              <div
  key={item.label}
  className="
    group
    bg-white/5 backdrop-blur-xl
    border border-white/10
    rounded-xl p-6 text-center
    transition-all duration-300 ease-out
    hover:-translate-y-1
    hover:border-cyan-400/40
    hover:shadow-[0_0_25px_rgba(34,211,238,0.25)]
  "
>
  <item.icon className="w-6 h-6 text-cyan-400 mx-auto mb-2 transition-transform duration-300 group-hover:scale-110" />
  <div className="text-2xl font-bold bg-linear-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
    {item.value}
  </div>
  <p className="text-gray-400 text-sm">{item.label}</p>
</div>

            ))}
          </div>
        </section>

        {/* ========== SCHOLARSHIP ====== */}
        <section className="flex justify-center">
          <div className="max-w-3xl w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-12 text-center">

            <Award className="w-12 h-12 text-cyan-400 mx-auto mb-6" />

            <h3 className="text-3xl font-bold mb-4">
              <span className="bg-linear-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
                Kartikya Rindani Scholarship
              </span>
            </h3>

            <p className="text-gray-400 mb-8">
              Every year, deserving students receive scholarships in Kartikya’s
              memory — helping them pursue dreams and continue education.<br /><br />
              This scholarship is awarded exclusively to students of Modern College of Arts, Science and Commerce (Autonomous), Shivajinagar ,Pune-411005.
            </p>
            

            <div className="flex justify-center gap-6 flex-wrap">
              <div className="px-6 py-3 bg-black/60 rounded-full border border-white/10">
                <span className="text-cyan-400 font-bold text-xl">₹20,000+</span>
                <span className="text-gray-400 text-sm ml-2">in scholarships</span>
              </div>

              <div className="px-6 py-3 bg-black/60 rounded-full border border-white/10">
                <span className="text-cyan-400 font-bold text-xl">10+</span>
                <span className="text-gray-400 text-sm ml-2">students supported</span>
              </div>
              {/* <span className="text-red-600">Scholarship is only given to Modern College's Students</span> */}
            </div>

          </div>
        </section>

      </div>
    </main>
  );
}
