
import React from 'react';

export const MEAT_OPTIONS = [
  { label: 'Brisket', icon: '🥩' },
  { label: 'Pork Shoulder', icon: '🐖' },
  { label: 'Beef Ribs', icon: '🍖' },
  { label: 'St. Louis Pork Ribs', icon: '🥓' },
  { label: 'Baby Back Ribs', icon: '🍖' },
  { label: 'Whole Chicken', icon: '🍗' },
  { label: 'Chicken Thighs', icon: '🍗' },
  { label: 'Turkey Breast', icon: '🦃' },
  { label: 'Pork Belly', icon: '🥓' },
  { label: 'Sausage', icon: '🌭' },
  { label: 'Lamb', icon: '🐑' },
  { label: 'Other', icon: '🔥' },
];

export const FUEL_OPTIONS = [
  { label: 'Wood', icon: '🪵' },
  { label: 'Gas', icon: '🔥' },
  { label: 'Charcoal', icon: '⬛' },
  { label: 'Briquettes', icon: '🧱' },
  { label: 'Pellets', icon: '🍬' },
];

export const EQUIPMENT_TEMPLATES = [
  { label: '500 Gal Smoker', icon: '💨' },
  { label: '250 Gal Smoker', icon: '💨' },
  { label: 'Cabinet Smoker', icon: '📦' },
  { label: 'Pellet Grill', icon: '🍭' },
  { label: 'Prep Table', icon: '🍽️' },
  { label: 'Vacuum Sealer', icon: '🎒' },
  { label: 'Refrigerated Trailer', icon: '❄️' },
  { label: 'Cambro / Hot Hold', icon: '🧊' },
  { label: 'Induction Hob', icon: '⚡' },
  { label: 'Robocoupe', icon: '🌪️' },
  { label: 'Scales', icon: '⚖️' },
  { label: 'Utensils Set', icon: '🍴' },
  { label: 'Other', icon: '➕' },
];

export const STAFF_ROLES = [
  { label: 'Chef', icon: '👨‍🍳' },
  { label: 'Pitmaster', icon: '🔥' },
  { label: 'Front of House', icon: '🤝' },
  { label: 'Back of House', icon: '🧼' },
  { label: 'Family', icon: '🏠' },
];

export const REQUIREMENT_TAGS = [
  'Kitchen Access',
  'Outdoor Space',
  'Water Supply',
  'Electricity',
  'Refrigeration',
  'Smoker Space',
];

export const FUMELogo = () => (
  <div className="flex flex-col items-center select-none pointer-events-none">
    <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter text-black uppercase italic">
      FUME
    </h1>
    <div className="bg-black text-white px-4 py-0.5 mt-[-10px] font-bold text-sm tracking-widest uppercase">
      BBQ Festival
    </div>
  </div>
);
