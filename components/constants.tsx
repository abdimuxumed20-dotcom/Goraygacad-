
import React from 'react';
import { StatusUpdate } from './types';

export const STATUS_UPDATES: StatusUpdate[] = [
  {
    id: 1,
    message: "App-ka waa diyaar ✅",
    subMessage: "Waxaan hadda bilaabaynaa talaabada xigta.",
    type: 'success'
  },
  {
    id: 2,
    message: "Hadda waa la bilabayaa!",
    subMessage: "App-ka iyo Firebase test environment waa diyaar.",
    type: 'info'
  },
  {
    id: 3,
    message: "Team, app-ka waa diyaar. Waxaa hadda u gudbaynaa live testing iyo 🚀",
    subMessage: "Final validation phase in progress.",
    type: 'success'
  },
  {
    id: 4,
    message: "Somali Exchange Online waa diyaar!",
    subMessage: "Hadda waa waqtigii aan ku dhaqaaqi lahayn igta 🚀",
    type: 'info'
  },
  {
    id: 5,
    message: "All systems ready ✅",
    subMessage: "Agent & Admin apps test mode ayaa diyaar ah.",
    type: 'success'
  },
  {
    id: 6,
    message: "Mock data iyo commission logic waa la diyaariyey, test-ka ayaa bilabanaya.",
    subMessage: "Core financial logic verified.",
    type: 'info'
  },
  {
    id: 7,
    message: "Talaabada xigta: Test Firebase & verify orders, agents, and commissions. ✅",
    subMessage: "Full stack integration check.",
    type: 'success'
  },
  {
    id: 8,
    message: "Team, waqtigii live testing ee Somali Exchange Online waa yimid ✅",
    subMessage: "Production-ready environment verification.",
    type: 'info'
  },
  {
    id: 9,
    message: "App-ka iyo branding (logo + splash) waa diyaar, hadda waxaan u gudbaynaa user testing. 🚀",
    subMessage: "Visual identity and UI/UX finalized.",
    type: 'success'
  },
  {
    id: 10,
    message: "Ready, set, go! 🚀 Somali Exchange Online app test environment waa live.",
    subMessage: "Public testing environment available now.",
    type: 'info'
  }
];

export const EXCHANGE_COLORS = {
  primary: '#0369a1', // Sky 700
  secondary: '#15803d', // Green 700
  accent: '#0e7490', // Cyan 700
  bg: '#f8fafc',
};
