const ceilingHeight = 0.5

export default [
  // Living
  {
    type: "light",
    topic: "/moreillon/light-d084cb",
    position: {
      x: 0.75,
      y: ceilingHeight,
      z: 0.4,
    },
    state: "off",
  },
  // Bedroom
  {
    type: "light",
    topic: "/moreillon/light-a4d3d9",
    position: {
      x: 0.6,
      y: ceilingHeight,
      z: -1.2,
    },
    state: "off",
  },
  // Kitchen
  {
    type: "light",
    topic: "/moreillon/light-a4c2f0",
    position: {
      x: -0.5,
      y: ceilingHeight,
      z: 0.8,
    },
    state: "off",
  },
  // Corridor
  {
    type: "light",
    topic: "/moreillon/light-d13efb",
    position: {
      x: -0.25,
      y: ceilingHeight,
      z: -0.5,
    },
    state: "off",
  },
  // Entrance
  {
    type: "light",
    topic: "/moreillon/light-c64739",
    position: {
      x: -0.25,
      y: ceilingHeight,
      z: -1.5,
    },
    state: "off",
  },
  // Bathroom
  // {
  //   type: "light",
  //   topic: "light/bathroom",
  //   position: {
  //     x: -0.8,
  //     y : ceilingHeight,
  //     z: -0.7,
  //   },
  //   state: "off",
  // },
  // Toilet
  // {
  //   type: "light",
  //   topic: "light/toilet",
  //   position: {
  //     x: -0.7,
  //     y : ceilingHeight,
  //     z: -1.4,
  //   },
  //   state: "off",
  // },
]
