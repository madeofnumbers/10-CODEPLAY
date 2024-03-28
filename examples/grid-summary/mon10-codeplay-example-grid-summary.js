/* 


  mon10-codeplay-example-grid-summary.js / gridSummary()
  ================================================================================
  
  about:  uses mon10.getXY() and mon10.size() to build a simple summary of 
          the current grid state, including positions of tiles by grouped by value

  requires:  Mon10 object from https://madeofnumbers.com/10/mon10-latest.min.js
             example usage : let mon10 = new Mon10(document.body)

  usage:  gridSummary() // returns grid summary result object


*/

function gridSummary() {

  let result = {};

  // ===== add array of numbers to result (value -10 through to 10) =====
  result.numbers = [];
  for (let i = 0; i < 19; i++) {
    result.numbers.push({
      value: i - 9,
      positions: []
    });
  }

  // ===== add array of blocks to result (move 0 through to 7) =====
  result.blocks = [];
  for (let i = 0; i < 8; i++) {
    result.blocks.push({
      move: i,
      positions: []
    });
  }

  // ===== add counters for numbers/blocks found to result =====
  result.numbersFound = 0;
  result.blocksFound = 0;

  // ===== loop through grid checking for numbers and blocks =====
  for (let iy = 0; iy < mon10.size(); iy++) {
    for (let ix = 0; ix < mon10.size(); ix++) {

      let resultGetXY = mon10.getXY(ix, iy);
      if (!resultGetXY.block && !resultGetXY.empty) {
        // ===== push position into number (of same value) and increment numbersFound =====
        result.numbers[resultGetXY.number + 9].positions.push({
          x: ix,
          y: iy
        });
        result.numbersFound++;
      }
      if (resultGetXY.block) {
        // ===== push position into block (of same move) and increment blocksFound =====
        result.blocks[resultGetXY.move].positions.push({
          x: ix,
          y: iy
        });
        result.blocksFound++;
      }
    }
  }

  return result;
}