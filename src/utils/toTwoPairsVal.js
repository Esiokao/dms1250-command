var arr = new Array(
  0.0,
  0.0019,
  0.0039,
  0.0058,
  0.0078,
  0.0097,
  0.0117,
  0.0136,
  0.0156,
  0.0175,
  0.0195,
  0.0214,
  0.0233,
  0.0253,
  0.0272,
  0.0292,
  0.0311,
  0.0331,
  0.035,
  0.037,
  0.0389,
  0.0409,
  0.0428,
  0.0447,
  0.0467,
  0.0486,
  0.0506,
  0.0525,
  0.0545,
  0.0564,
  0.0584,
  0.0603,
  0.0622,
  0.0642,
  0.0661,
  0.0681,
  0.07,
  0.072,
  0.0739,
  0.0759,
  0.0778,
  0.0798,
  0.0817,
  0.0836,
  0.0856,
  0.0875,
  0.0895,
  0.0914,
  0.0934,
  0.0953,
  0.0973,
  0.0992,
  0.1012,
  0.1031,
  0.105,
  0.107,
  0.1089,
  0.1109,
  0.1128,
  0.1148,
  0.1167,
  0.1187,
  0.1206,
  0.1226,
  0.1245,
  0.1264,
  0.1284,
  0.1303,
  0.1323,
  0.1342,
  0.1362,
  0.1381,
  0.1401,
  0.142,
  0.144,
  0.1459,
  0.1478,
  0.1498,
  0.1517,
  0.1537,
  0.1556,
  0.1576,
  0.1595,
  0.1615,
  0.1634,
  0.1653,
  0.1673,
  0.1692,
  0.1712,
  0.1731,
  0.1751,
  0.177,
  0.179,
  0.1809,
  0.1829,
  0.1848,
  0.1867,
  0.1887,
  0.1906,
  0.1926,
  0.1945,
  0.1965,
  0.1984,
  0.2004,
  0.2023,
  0.2043,
  0.2062,
  0.2081,
  0.2101,
  0.212,
  0.214,
  0.2159,
  0.2179,
  0.2198,
  0.2218,
  0.2237,
  0.2257,
  0.2276,
  0.2295,
  0.2315,
  0.2334,
  0.2354,
  0.2373,
  0.2393,
  0.2412,
  0.2432,
  0.2451,
  0.2471,
  0.249,
  0.2509,
  0.2529,
  0.2548,
  0.2568,
  0.2587,
  0.2607,
  0.2626,
  0.2646,
  0.2665,
  0.2684,
  0.2704,
  0.2723,
  0.2743,
  0.2762,
  0.2782,
  0.2801,
  0.2821,
  0.284,
  0.286,
  0.2879,
  0.2898,
  0.2918,
  0.2937,
  0.2957,
  0.2976,
  0.2996,
  0.3015,
  0.3035,
  0.3054,
  0.3074,
  0.3093,
  0.3112,
  0.3132,
  0.3151,
  0.3171,
  0.319,
  0.321,
  0.3229,
  0.3249,
  0.3268,
  0.3288,
  0.3307,
  0.3326,
  0.3346,
  0.3365,
  0.3385,
  0.3404,
  0.3424,
  0.3443,
  0.3463,
  0.3482,
  0.3502,
  0.3521,
  0.354,
  0.356,
  0.3579,
  0.3599,
  0.3618,
  0.3638,
  0.3657,
  0.3677,
  0.3696,
  0.3715,
  0.3735,
  0.3754,
  0.3774,
  0.3793,
  0.3813,
  0.3832,
  0.3852,
  0.3871,
  0.3891,
  0.391,
  0.3929,
  0.3949,
  0.3968,
  0.3988,
  0.4007,
  0.4027,
  0.4046,
  0.4066,
  0.4085,
  0.4105,
  0.4124,
  0.4143,
  0.4163,
  0.4182,
  0.4202,
  0.4221,
  0.4241,
  0.426,
  0.428,
  0.4299,
  0.4319,
  0.4338,
  0.4357,
  0.4377,
  0.4396,
  0.4416,
  0.4435,
  0.4455,
  0.4474,
  0.4494,
  0.4513,
  0.4533,
  0.4552,
  0.4571,
  0.4591,
  0.461,
  0.463,
  0.4649,
  0.4669,
  0.4688,
  0.4708,
  0.4727,
  0.4746,
  0.4766,
  0.4785,
  0.4805,
  0.4824,
  0.4844,
  0.4863,
  0.4883,
  0.4902,
  0.4922,
  0.4941,
  0.496
)

function toTwoPairsVal(mA) {
  return findApproximateVal(mA, arr)
}

// Time Complexity: O(n) 
// implement with BS would be O(logN)
function findApproximateVal(val, arr) {
  for (var i = 0; i < arr.length; i += 1) {
    if (arr[i + 1] >= val) return i.toString(16) // return hex string
  }
}
