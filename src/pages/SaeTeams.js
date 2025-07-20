import React from 'react';
import { Cpu } from 'lucide-react';
import Garuda from '../Asset/grudra.png';
import Alphaone from '../Asset/alpha_one.png';
import Vayuver from '../Asset/vayuveer.png';
import Abhedya from '../Asset/abhedya.png';

const teams = [
  {
    logo: Garuda,
    name: 'Garuda Motorsports',
    description:
      'Motorsports team of SAE UIET, aims to foster innovation and excellence in Motorsports and Mobility.',
  },
  {
    logo: Vayuver,
    name: 'Team VayuVeer',
    description:
      'Aerospace team of SAE UIET, aims to power up thrusters to fly high in the sky with modernized equipment.',
  },
  {
    logo: Alphaone,
    name: 'Alpha One',
    description:
      'Software team of SAE UIET. Aims to revolutionize problems with feasible technology.',
  },
  {
    logo: Abhedya,
    name: 'Team Abhedya',
    description:
        'Gears spinning, circuits buzzing — the robotics team of SAE UIET turns curiosity into creation.',
  },
];

export default function SAETeams() {
  return (
    <div className="min-h-screen text-white overflow-hidden relative z-[0]">
      {/* Container */}
      <div className="container mx-auto px-6 pt-32">
        <h2 className="text-5xl font-bold mb-12 text-center text-blue-400">
          <span className="relative">
            <span className="absolute inset-0 blur-[2px] text-blue-500 opacity-70">
              SAE Wings
            </span>
            <span className="relative text-white">SAE Wings</span>
          </span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {teams.map((team, index) => (
            <div
              key={index}
              className="group relative p-8 border border-blue-500/30 rounded-xl bg-black/50 backdrop-blur-md hover:border-blue-500 transition-all duration-300 cursor-pointer"
            >
              {/* Glow background */}
              <div className="absolute inset-0 bg-blue-500/10 blur-xl group-hover:bg-blue-500/20 transition-all duration-300"></div>

              {/* Content */}
              <div className="relative flex flex-col items-center text-center">
                <img
                  src={team.logo}
                  alt={team.name}
                  className="w-full max-w-[70%] aspect-square mb-4 object-contain"
                />
                <h3 className="text-2xl font-bold mb-2 text-blue-300">
                  {team.name}
                </h3>
                <p className="text-blue-300 text-sm">{team.description}</p>
              </div>
              <div className="absolute -bottom-1 left-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent transform -translate-x-1/2 animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
