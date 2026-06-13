// Program Library — each program defines a training split with exercises,
// sets/reps, notes, and a description of what it's best suited for.

const PROGRAMS = {

  ppl: {
    name: "Push / Pull / Legs",
    tag: "3-Day Rotation",
    description: "Classic 3-way split rotating Push, Pull, and Legs days. Each muscle group gets dedicated focus once per rotation. Great for building a strength base and learning major compound lifts with good recovery between sessions.",
    bestFor: "Building foundational strength, learning compound movements, flexible scheduling (works with 3, 5, or 6 day weeks)",
    frequency: "Each muscle group trained 1x per rotation (2x if run 6 days/week)",
    days: {
      push: {
        title: "Push", sub: "Chest · Shoulders · Triceps",
        groups: [
          { name: "Compound", exercises: [
            { id:"bp",   name:"Barbell Bench Press",   sets:4, reps:"6–8",    note:"Control the descent, pause at chest" },
            { id:"ohp",  name:"Overhead Press",         sets:3, reps:"6–8",    note:"Strict — no leg drive" }
          ]},
          { name: "Accessory", exercises: [
            { id:"incdb",  name:"Incline DB Press",         sets:3, reps:"8–10"  },
            { id:"latrl",  name:"Lateral Raises",            sets:3, reps:"12–15" },
            { id:"cgbp",   name:"Close-Grip Bench",          sets:3, reps:"8–10"  },
            { id:"tride",  name:"Overhead Tricep Ext.",       sets:3, reps:"10–12" }
          ]}
        ]
      },
      pull: {
        title: "Pull", sub: "Back · Biceps · Rear Delts",
        groups: [
          { name: "Compound", exercises: [
            { id:"rdl",   name:"Romanian Deadlift",   sets:4, reps:"5–6",    note:"Hip hinge — feel the hamstrings load" },
            { id:"bbrow", name:"Barbell Row",          sets:4, reps:"6–8",    note:"Chest to pad, drive elbows back" }
          ]},
          { name: "Accessory", exercises: [
            { id:"pu",       name:"Pull-Ups / Weighted",    sets:3, reps:"6–10"  },
            { id:"cabrow",   name:"Cable Row",               sets:3, reps:"10–12" },
            { id:"facepull", name:"Face Pulls",              sets:3, reps:"15–20", note:"Shoulder health — don't skip" },
            { id:"bbcurl",   name:"Barbell Curl",            sets:3, reps:"8–10"  }
          ]}
        ]
      },
      legs: {
        title: "Legs", sub: "Quads · Glutes · Hamstrings",
        groups: [
          { name: "Compound", exercises: [
            { id:"sq",    name:"Barbell Squat",           sets:4, reps:"5–6",    note:"Brace hard, knees track toes" },
            { id:"bss",   name:"Bulgarian Split Squat",   sets:3, reps:"8–10ea", note:"Unilateral — don't skip these" }
          ]},
          { name: "Accessory", exercises: [
            { id:"legpr",   name:"Leg Press",              sets:3, reps:"10–12" },
            { id:"legcurl", name:"Leg Curl",                sets:3, reps:"10–12" },
            { id:"calf",    name:"Standing Calf Raise",    sets:4, reps:"12–15" },
            { id:"abwhl",   name:"Ab Wheel / Plank",       sets:3, reps:"10 / 45s" }
          ]}
        ]
      }
    }
  },

  upperLower: {
    name: "Upper / Lower",
    tag: "4-Day Split",
    description: "Each muscle group is trained twice per week — once with a strength emphasis (heavier, lower reps) and once with a hypertrophy emphasis (higher volume, shorter rest, more pump work). Built for Tue/Thu/Sat/Sun training with Mon/Wed/Fri off.",
    bestFor: "Body recomposition, balancing strength gains with muscle growth, structured 4-day weeks with built-in rest days",
    frequency: "Each muscle group trained 2x per week",
    days: {
      upperA: {
        title: "Upper A", sub: "Push Focus — Chest · Shoulders · Triceps + Back",
        groups: [
          { name: "Compound", exercises: [
            { id:"bp2",   name:"Barbell Bench Press",   sets:4, reps:"6–8",  note:"Heavy day — control the descent" },
            { id:"row2",  name:"Barbell Row",            sets:4, reps:"6–8",  note:"Chest to pad, drive elbows back" }
          ]},
          { name: "Accessory", exercises: [
            { id:"ohp2",   name:"Seated DB Shoulder Press",   sets:3, reps:"8–10" },
            { id:"latpd",  name:"Lat Pulldown",                sets:3, reps:"10–12" },
            { id:"cgbp2",  name:"Close-Grip Bench",            sets:3, reps:"8–10" }
          ]},
          { name: "Pump Finisher (superset, 2 rounds)", exercises: [
            { id:"latrl2", name:"Lateral Raises",            sets:2, reps:"15–20", note:"Pair with tricep pushdowns — minimal rest" },
            { id:"tripd2", name:"Tricep Pushdown",            sets:2, reps:"15–20" }
          ]}
        ]
      },
      lowerA: {
        title: "Lower A", sub: "Strength Focus — Quads · Hamstrings · Glutes",
        groups: [
          { name: "Compound", exercises: [
            { id:"sq2",   name:"Barbell Squat",           sets:4, reps:"5–6",  note:"Heavy day — brace hard" },
            { id:"rdl2",  name:"Romanian Deadlift",       sets:4, reps:"6–8",  note:"Hip hinge — feel the hamstrings load" }
          ]},
          { name: "Accessory", exercises: [
            { id:"legpr2",   name:"Leg Press",              sets:3, reps:"10–12" },
            { id:"legcurl2", name:"Leg Curl",                sets:3, reps:"10–12" },
            { id:"calf2",    name:"Standing Calf Raise",    sets:4, reps:"12–15" }
          ]},
          { name: "Pump Finisher (superset, 2 rounds)", exercises: [
            { id:"legext2", name:"Leg Extension",          sets:2, reps:"15–20", note:"Pair with walking lunges — minimal rest" },
            { id:"lunge2",  name:"Walking Lunges",          sets:2, reps:"12ea" }
          ]}
        ]
      },
      upperB: {
        title: "Upper B", sub: "Pull Focus — Back · Biceps · Rear Delts + Chest",
        groups: [
          { name: "Compound", exercises: [
            { id:"pu2",    name:"Pull-Ups / Weighted",       sets:4, reps:"6–10",  note:"Add weight if bodyweight gets easy" },
            { id:"incdb2", name:"Incline DB Press",           sets:4, reps:"8–10" }
          ]},
          { name: "Accessory", exercises: [
            { id:"cabrow2",   name:"Cable Row",               sets:3, reps:"10–12" },
            { id:"facepull2", name:"Face Pulls",              sets:3, reps:"15–20", note:"Shoulder health — don't skip" },
            { id:"bbcurl2",   name:"Barbell Curl",            sets:3, reps:"8–10" }
          ]},
          { name: "Pump Finisher (superset, 2 rounds)", exercises: [
            { id:"hammer2",  name:"Hammer Curls",            sets:2, reps:"15–20", note:"Pair with rear delt flyes — minimal rest" },
            { id:"reardelt2",name:"Rear Delt Flyes",         sets:2, reps:"15–20" }
          ]}
        ]
      },
      lowerB: {
        title: "Lower B", sub: "Volume Focus — Different Angles, More Pump",
        groups: [
          { name: "Compound", exercises: [
            { id:"frontsq2", name:"Front Squat / Goblet Squat", sets:3, reps:"8–10",  note:"Lighter than Lower A — different stimulus" },
            { id:"bss2",     name:"Bulgarian Split Squat",       sets:3, reps:"10–12ea" }
          ]},
          { name: "Accessory", exercises: [
            { id:"hipthrust2", name:"Hip Thrust",              sets:3, reps:"10–12" },
            { id:"legcurl3",   name:"Leg Curl",                 sets:3, reps:"12–15" },
            { id:"calf3",      name:"Seated Calf Raise",       sets:4, reps:"15–20" }
          ]},
          { name: "Pump Finisher (superset, 2 rounds)", exercises: [
            { id:"legext3", name:"Leg Extension",          sets:2, reps:"15–20", note:"Pair with ab work — minimal rest" },
            { id:"abwhl2",  name:"Ab Wheel / Hanging Knee Raise", sets:2, reps:"10–15" }
          ]}
        ]
      }
    }
  },

  fullBody: {
    name: "Full Body x3",
    tag: "3-Day, Simple",
    description: "Every session trains the whole body — compound lifts for major muscle groups plus accessory and pump work. Efficient and simple, hits every muscle group with high frequency even on just 3 days/week.",
    bestFor: "Time-limited schedules, beginners, anyone who wants maximum frequency with minimum days in the gym",
    frequency: "Each muscle group trained 3x per week",
    days: {
      fullA: {
        title: "Full Body A", sub: "Squat Emphasis",
        groups: [
          { name: "Compound", exercises: [
            { id:"sq3",   name:"Barbell Squat",        sets:4, reps:"6–8" },
            { id:"bp3",   name:"Barbell Bench Press",  sets:3, reps:"6–8" },
            { id:"row3",  name:"Barbell Row",           sets:3, reps:"8–10" }
          ]},
          { name: "Accessory", exercises: [
            { id:"ohp3",   name:"DB Shoulder Press",   sets:2, reps:"10–12" },
            { id:"curl3",  name:"Barbell Curl",         sets:2, reps:"10–12" },
            { id:"plank3", name:"Plank",                sets:3, reps:"45s" }
          ]}
        ]
      },
      fullB: {
        title: "Full Body B", sub: "Deadlift Emphasis",
        groups: [
          { name: "Compound", exercises: [
            { id:"rdl3",   name:"Romanian Deadlift",    sets:4, reps:"6–8" },
            { id:"ohp4",   name:"Overhead Press",        sets:3, reps:"6–8" },
            { id:"pu3",    name:"Pull-Ups / Weighted",   sets:3, reps:"6–10" }
          ]},
          { name: "Accessory", exercises: [
            { id:"legpr3",  name:"Leg Press",            sets:2, reps:"10–12" },
            { id:"latrl3",  name:"Lateral Raises",        sets:2, reps:"12–15" },
            { id:"tride3",  name:"Overhead Tricep Ext.",  sets:2, reps:"10–12" }
          ]}
        ]
      },
      fullC: {
        title: "Full Body C", sub: "Unilateral + Pump",
        groups: [
          { name: "Compound", exercises: [
            { id:"bss3",   name:"Bulgarian Split Squat", sets:3, reps:"8–10ea" },
            { id:"incdb3", name:"Incline DB Press",       sets:3, reps:"8–10" },
            { id:"cabrow3",name:"Cable Row",              sets:3, reps:"10–12" }
          ]},
          { name: "Accessory", exercises: [
            { id:"legcurl4",  name:"Leg Curl",              sets:2, reps:"12–15" },
            { id:"hammer3",   name:"Hammer Curls",          sets:2, reps:"12–15" },
            { id:"facepull3", name:"Face Pulls",            sets:2, reps:"15–20" }
          ]}
        ]
      }
    }
  }

};
