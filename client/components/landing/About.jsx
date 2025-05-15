"use client";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 px-6 bg-gray-100">
      <div className="text-center mb-12">
        <h3 className="text-3xl font-bold">Meet Our Team</h3>
      </div>
      <div className="max-w-7xl mx-auto grid gap-12 md:grid-cols-3">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-tl-full rounded-br-xl"></div>
            <img
              src="/path/to/member1.png"
              alt="Team Member 1"
              className="relative z-10 w-32 h-32 rounded-full object-cover"
            />
          </div>
          <p className="mt-4 font-semibold">John Doe</p>
          <p className="text-sm text-gray-600">Project Manager</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-tl-full rounded-br-xl"></div>
            <img
              src="/path/to/member2.png"
              alt="Team Member 2"
              className="relative z-10 w-32 h-32 rounded-full object-cover"
            />
          </div>
          <p className="mt-4 font-semibold">Jane Smith</p>
          <p className="text-sm text-gray-600">Developer</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-r from-red-500 to-yellow-500 rounded-tl-full rounded-br-xl"></div>
            <img
              src="/path/to/member3.png"
              alt="Team Member 3"
              className="relative z-10 w-32 h-32 rounded-full object-cover"
            />
          </div>
          <p className="mt-4 font-semibold">Alice Johnson</p>
          <p className="text-sm text-gray-600">Designer</p>
        </div>
      </div>
    </section>
  );
}
