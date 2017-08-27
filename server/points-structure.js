module.exports.assignPoints = function(result, structure) {
  // Production Car Challenge --> uses SCCA point structure
  if (structure === 112 ) {
    const points = {
      1: 25,
      2: 21,
      3: 18,
      4: 17,
      5: 16,
      6: 15,
      7: 14,
      8: 13,
      9: 12,
      10: 11,
      11: 10,
      12: 9,
      13: 8,
      14: 7,
      15: 6,
      16: 5,
      17: 4,
      19: 3,
      20: 2,
      21: 1,
    };
    for (i = 0; i < result.length; i++) {
      result[i].points = points[result[i].finishPos]
    }
    return result;
  }
}