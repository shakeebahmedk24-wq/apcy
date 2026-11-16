import { motion } from 'motion/react';

interface HeroBotanicalBackdropProps {
  flavorId: string;
  accentHex: string;
  ringColor: string;
}

export function HeroBotanicalBackdrop({
  flavorId,
  accentHex,
  ringColor,
}: HeroBotanicalBackdropProps) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-visible"
    >
      {/* Glowing Radial Display Halo */}
      <motion.div
        key={`halo-${flavorId}`}
        initial={{ scale: 0.78, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.34 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="absolute w-[310px] h-[310px] sm:w-[400px] sm:h-[400px] rounded-full blur-2xl"
        style={{ backgroundColor: accentHex }}
      />

      {/* Crisp Outer Display Ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}
        className="absolute w-[310px] h-[310px] sm:w-[410px] sm:h-[410px] rounded-full border border-dashed opacity-35"
        style={{ borderColor: ringColor }}
      />
      <div
        className="absolute w-[250px] h-[250px] sm:w-[335px] sm:h-[335px] rounded-full border opacity-20"
        style={{ borderColor: ringColor }}
      />

      {/* Flavor-Specific Oversized Botanical & Fruit SVG Display Art */}
      <motion.div
        key={`art-${flavorId}`}
        initial={{ opacity: 0, scale: 0.88, rotate: -10 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-[340px] h-[340px] sm:w-[450px] sm:h-[450px] flex items-center justify-center"
      >
        {(flavorId === 'matcha-lemon' || flavorId === 'ginger-lime') && (
          <svg viewBox="0 0 400 400" className="w-full h-full opacity-90">
            {/* Large Citrus Wheel Top-Left */}
            <g transform="translate(88, 95) rotate(-18)">
              <circle cx="0" cy="0" r="68" fill={accentHex} fillOpacity="0.22" stroke={ringColor} strokeOpacity="0.55" strokeWidth="4" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
                <path
                  key={a}
                  d="M0 0 L-16 -54 A56 56 0 0 1 16 -54 Z"
                  fill={ringColor}
                  fillOpacity="0.28"
                  transform={`rotate(${a})`}
                />
              ))}
              <circle cx="0" cy="0" r="10" fill={ringColor} fillOpacity="0.5" />
            </g>

            {/* Botanical Leaves Bottom-Right */}
            <g transform="translate(300, 290) rotate(24)">
              <path
                d="M0 0 C22 -48 64 -72 86 -70 C84 -42 60 -6 0 0 Z"
                fill={accentHex}
                fillOpacity="0.32"
                stroke={ringColor}
                strokeOpacity="0.45"
                strokeWidth="2.5"
              />
              <path
                d="M-6 12 C-52 -18 -76 -54 -72 -80 C-44 -76 -12 -46 -6 12 Z"
                fill={ringColor}
                fillOpacity="0.2"
                stroke={ringColor}
                strokeOpacity="0.4"
                strokeWidth="2"
              />
            </g>

            {/* Secondary Citrus Wedge */}
            <g transform="translate(310, 108) rotate(35)">
              <path
                d="M-46 0 A46 46 0 0 1 46 0 Z"
                fill={accentHex}
                fillOpacity="0.28"
                stroke={ringColor}
                strokeOpacity="0.5"
                strokeWidth="3"
              />
            </g>
          </svg>
        )}

        {flavorId === 'cucumber-basil' && (
          <svg viewBox="0 0 400 400" className="w-full h-full opacity-90">
            {/* Crisp Cucumber Rings */}
            <g transform="translate(96, 110)">
              <circle cx="0" cy="0" r="64" fill={accentHex} fillOpacity="0.22" stroke={ringColor} strokeOpacity="0.55" strokeWidth="6" />
              <circle cx="0" cy="0" r="44" fill="none" stroke={ringColor} strokeOpacity="0.35" strokeWidth="2.5" strokeDasharray="6 6" />
              {[0, 60, 120, 180, 240, 300].map((a) => (
                <ellipse key={a} cx="0" cy="-22" rx="5" ry="11" fill={ringColor} fillOpacity="0.35" transform={`rotate(${a})`} />
              ))}
            </g>
            <g transform="translate(302, 275) scale(0.82)">
              <circle cx="0" cy="0" r="64" fill={accentHex} fillOpacity="0.24" stroke={ringColor} strokeOpacity="0.5" strokeWidth="6" />
              <circle cx="0" cy="0" r="40" fill="none" stroke={ringColor} strokeOpacity="0.3" strokeWidth="2" />
            </g>
            {/* Sweet Basil Leaves */}
            <g transform="translate(290, 96) rotate(22)">
              <path d="M0 40 C-36 0 -34 -52 0 -76 C34 -52 36 0 0 40 Z" fill={ringColor} fillOpacity="0.24" stroke={ringColor} strokeOpacity="0.5" strokeWidth="2.5" />
              <line x1="0" y1="36" x2="0" y2="-66" stroke={ringColor} strokeOpacity="0.4" strokeWidth="2" />
            </g>
          </svg>
        )}

        {flavorId === 'strawberry-mint' && (
          <svg viewBox="0 0 400 400" className="w-full h-full opacity-90">
            {/* Stylized Strawberry Silhouette Top-Left */}
            <g transform="translate(94, 115) rotate(-14)">
              <path
                d="M0 -48 C42 -48 56 -12 36 32 C22 62 8 76 0 76 C-8 76 -22 62 -36 32 C-56 -12 -42 -48 0 -48 Z"
                fill={accentHex}
                fillOpacity="0.3"
                stroke={ringColor}
                strokeOpacity="0.55"
                strokeWidth="3"
              />
              {/* Calyx Crown */}
              <path d="M-28 -48 L-8 -66 L0 -52 L8 -66 L28 -48 L10 -38 L-10 -38 Z" fill={ringColor} fillOpacity="0.38" />
              {/* Seeds */}
              {[[-14, -18], [14, -18], [0, -4], [-18, 12], [18, 12], [-8, 34], [8, 34]].map(([sx, sy], i) => (
                <circle key={i} cx={sx} cy={sy} r="3" fill={ringColor} fillOpacity="0.55" />
              ))}
            </g>

            {/* Crisp Mint Sprig Bottom-Right */}
            <g transform="translate(300, 275) rotate(28)">
              <path d="M0 46 C-34 8 -30 -44 0 -70 C30 -44 34 8 0 46 Z" fill={ringColor} fillOpacity="0.22" stroke={ringColor} strokeOpacity="0.48" strokeWidth="2.5" />
              <path d="M24 20 C68 12 88 -24 86 -52 C52 -46 28 -16 24 20 Z" fill={accentHex} fillOpacity="0.26" stroke={ringColor} strokeOpacity="0.4" strokeWidth="2" />
            </g>
          </svg>
        )}

        {flavorId === 'turmeric-pepper' && (
          <svg viewBox="0 0 400 400" className="w-full h-full opacity-90">
            {/* Golden Botanical Starburst */}
            <g transform="translate(200, 200)">
              {Array.from({ length: 16 }).map((_, i) => (
                <path
                  key={i}
                  d="M0 -185 L10 -120 L-10 -120 Z"
                  fill={ringColor}
                  fillOpacity="0.26"
                  transform={`rotate(${i * 22.5})`}
                />
              ))}
            </g>
            {/* Peppercorn Cluster */}
            {[[88, 112, 16], [118, 92, 11], [72, 142, 10], [312, 286, 18], [284, 310, 12], [332, 260, 10]].map(([cx, cy, r], i) => (
              <circle key={i} cx={cx} cy={cy} r={r} fill={ringColor} fillOpacity="0.3" stroke={ringColor} strokeOpacity="0.5" strokeWidth="2" />
            ))}
          </svg>
        )}

        {flavorId === 'blackberry-lavender' && (
          <svg viewBox="0 0 400 400" className="w-full h-full opacity-90">
            {/* Blackberry Drupelet Cluster */}
            <g transform="translate(96, 118)">
              {[
                [0, -24], [-18, -10], [18, -10], [-22, 12], [0, 12], [22, 12],
                [-14, 34], [14, 34], [0, 48],
              ].map(([bx, by], i) => (
                <circle
                  key={i}
                  cx={bx}
                  cy={by}
                  r="15"
                  fill={accentHex}
                  fillOpacity="0.34"
                  stroke={ringColor}
                  strokeOpacity="0.55"
                  strokeWidth="2"
                />
              ))}
            </g>

            {/* Lavender Botanical Stem */}
            <g transform="translate(302, 245) rotate(22)">
              <line x1="0" y1="88" x2="0" y2="-86" stroke={ringColor} strokeOpacity="0.45" strokeWidth="3" />
              {[-68, -44, -20, 4, 28].map((ly, i) => (
                <g key={i} transform={`translate(0, ${ly})`}>
                  <ellipse cx="-12" cy="0" rx="11" ry="6" fill={ringColor} fillOpacity="0.32" transform="rotate(-30 -12 0)" />
                  <ellipse cx="12" cy="0" rx="11" ry="6" fill={ringColor} fillOpacity="0.32" transform="rotate(30 12 0)" />
                </g>
              ))}
            </g>
          </svg>
        )}
      </motion.div>
    </div>
  );
}
