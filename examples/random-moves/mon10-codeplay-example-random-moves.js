/* 


  mon10-codeplay-example-random-moves.js / randomMoves()
  ================================================================================
  
  about:  uses mon10.getXY(), mon10.moveXYD(), mon10.nonzero() and mon10.size() to
          make entirely random moves with almost no chance of solving a puzzle 

  requires:  Mon10 object from https://madeofnumbers.com/10/mon10-latest.min.js
             example usage : let mon10 = new Mon10(document.body)

  usage:  randomMoves(state, functionLog) // no return
            - state (int) // 0 = stop, 1 = slow, 2 = fast
            - functionLog (function) // optional log function, e.g. console.log


*/

// ===== store interval so it can be cleared ======
let intervalRandomMoves;

function randomMoves(state, functionLog = null) {

  // ===== logMessage(text) : pass string to functionLog, if it exists ======
  function logMessage(text) {

    if (functionLog) {

      functionLog(`randomMoves(${state}) : ${text}`);
    }
  }

  // ===== clear any previous interval =====  
  clearInterval(intervalRandomMoves);

  // ===== if state is 0, stop =====
  if (state == 0) {

    logMessage("stopped");
  }
  // ===== else, set an interval for move attempts =====
  else {

    logMessage("started");

    // ===== set interval time (milliseconds), default state 1 : slow =====
    let intervalMs = 500;
    
    // ===== interval time (milliseconds), state 2 : fast =====
    intervalMs = state == 2 ? 50 : intervalMs;

    // ===== attempt to make a move every interval =====
    intervalRandomMoves = setInterval(() => {

      // ===== if there are no active numbers, there is no puzzle to solve =====
      if (mon10.nonzero() == 0) {

        logMessage("no numbers found, no puzzle to solve");
      }
      // ===== else, attempt to make a move =====
      else {

        // ===== number of attempts allowed, set to number of possible grid positions =====
        let ttlAttempts = mon10.size() * mon10.size();

        // ===== select a random X, Y position =====
        let randomX = Math.floor(Math.random() * mon10.size());
        let randomY = Math.floor(Math.random() * mon10.size());

        // ===== while-loop until something has moved or no attempts left =====
        let movedSomething = false;
        while (!movedSomething && ttlAttempts >= 0) {

          // ===== if position returns empty or move 0, it cannot be moved =====
          let getXYResult = mon10.getXY(randomX, randomY);
          if (getXYResult.empty || getXYResult.move == 0) {

            logMessage(`nothing to move at (${randomX}, ${randomY})`);
          }
          // ===== else, attempt to move number or block at position =====
          else {

            // ===== select a random direction ======
            let randomDirection = Math.floor(Math.random() * 4);

            // ===== for-loop through and attempt all 4 directions =====
            for (let i = 0; i < 4; i++) {
              
              // ===== cast randomDirection + i to a valid direction value (1 - 4) =====
              let direction = (randomDirection + i) % 4 + 1;

              // ===== attempt move =====
              let moveXYDResult = mon10.moveXYD(randomX, randomY, direction);

              // ===== if move succeeds, we moved something - any subsequent moves will fail without issue =====
              if (!moveXYDResult.fail) {

                logMessage(`moved tile at (${randomX}, ${randomY}) ${[ "up", "right", "down", "left" ][direction-1]}`);
                movedSomething = true;
              }

            }

            // ===== if all move attempts failed, just log a message ======
            if (!movedSomething) {

              logMessage(`failed to move tile at (${randomX}, ${randomY})`);
            }
          }

          // ===== if nothing moved, try next position in grid and decrease attempts =====
          if (!movedSomething) {

            ttlAttempts--;

            // ===== increment randomX position ======
            randomX++;

            // ===== if randomX position is out of bounds, reset and increment randomY position =====
            if (randomX == mon10.size()) {

              randomX = 0;
              randomY++;
            }

            // ===== if randomY position is out of bounds, reset =====
            if (randomY == mon10.size()) {

              randomY = 0;
            }
          }
        }
      }
    }, intervalMs);


  }
}