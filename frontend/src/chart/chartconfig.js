// export const historyOptions = {
//     lineHeightAnnotation: {
//         always: true,
//         hover: false,
//         lineWeight: 1.5,
//     },

//     animation: {
//         duration: 2000,
//     },
//     maintainAspectRatio: false,
//     responsive: true,
//     scales: {
//         xAxes: [
//             {
//                 type: "time",
//                 distribution: "linear",
//             }
//         ]
//     }
// }

export const historyOptions = {
    lineHeightAnnotation: {
      always: true,
      hover: false,
      lineWeight: 1.5,
    },
  
    animation: {
      duration: 2000,
    },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            unit: "hour"
          },
          distribution: "linear",
        },
      ],
    },
  };