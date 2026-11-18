// The Webify logo: a pink circle with white sound-wave bars.
// It is drawn with SVG, so it stays sharp at any size.
function Logo({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-label="Webify logo">
      <circle cx="50" cy="50" r="50" fill="#e84393" />
      {/* five bars, tallest in the middle */}
      <rect x="21" y="38" width="8" height="24" rx="4" fill="white" />
      <rect x="33" y="28" width="8" height="44" rx="4" fill="white" />
      <rect x="46" y="20" width="8" height="60" rx="4" fill="white" />
      <rect x="59" y="28" width="8" height="44" rx="4" fill="white" />
      <rect x="71" y="38" width="8" height="24" rx="4" fill="white" />
    </svg>
  );
}

export default Logo;
