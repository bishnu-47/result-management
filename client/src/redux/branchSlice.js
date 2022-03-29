import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  branches: [
    // school of Engg & IT
    {
      name: "Bachelor of Computer Application",
      acronym: "BCA",
      totalSeem: 6,
    },
    {
      name: "Master of Computer Application",
      acronym: "MCA",
      totalSeem: 4,
    },
    {
      name: "Polytechnic (Mechanical)",
      acronym: "Poly (Mechanical)",
      totalSeem: 6,
    },
    {
      name: "Polytechnic (EEE)",
      acronym: "Poly (EEE)",
      totalSeem: 6,
    },
    {
      name: "Polytechnic (CS)",
      acronym: "Poly (CS)",
      totalSeem: 6,
    },
    {
      name: "Bachelor of Vocation",
      acronym: "B.Voc",
      totalSeem: 6,
    },

    // School of commerce and management
    {
      name: "Bachelor of Business Administration",
      acronym: "BBA",
      totalSeem: 6,
    },
    {
      name: "Bachelor of Commerce",
      acronym: "B.Com",
      totalSeem: 6,
    },
    {
      name: "Master of Business Administration",
      acronym: "MBA",
      totalSeem: 4,
    },

    // School of Humanities
    {
      name: "B.A. ( HONS.) - ENGLISH",
      acronym: "B.A. ( HONS.) - ENGLISH",
      totalSeem: 6,
    },
    {
      name: "B.A. ( HONS.) - FASHION DESIGN",
      acronym: "B.A. ( HONS.) - FASHION DESIGN",
      totalSeem: 6,
    },
    {
      name: "BA ( HONS.) - JOURNALISM & MASS COMMUNICATION",
      acronym: "BA ( HONS.) - JOURNALISM & MASS COMMUNICATION",
      totalSeem: 6,
    },

    // School of Health & Allied Science
    {
      name: "Bachelor of Optometry",
      acronym: "B.Optom",
      totalSeem: 8,
    },
    {
      name: "Bachelor of Science In Bio Technology",
      acronym: "B.Sc Biotechnology",
      totalSeem: 6,
    },
    {
      name: "B.Pharma",
      acronym: "B.Pharma",
      totalSeem: 8,
    },
    {
      name: "D.Pharma",
      acronym: "D.Pharma",
      totalSeem: 6,
    },

    // school of law
    {
      name: "BBA LLB (Hons.)",
      acronym: "BBA LLB (Hons.)",
      totalSeem: 10,
    },
  ],
  current: null,
  semesters: null,
};

export const branchSlice = createSlice({
  name: "branches",
  initialState,
  reducers: {
    // change current branch
    changeSemester(state, { payload }) {
      state.semesters = payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { changeSemester } = branchSlice.actions;

export default branchSlice.reducer;
