/* 


  mon10-codeplay-examples-demo.js
  ================================================================================
  
  about: interface and notes for 10 / CODEPLAY examples demo
  

*/

function addCodeplayExamplesDemo(domElement) {

  // ===== array of example methods to be refreshed on interval =====
  let refreshExamples = [];

  // ===== notes on 10 / CODEPLAY =====
  addElement("h1", "10 / CODEPLAY : write code to solve puzzles");
  addElement("div", "This examples demo is not great on small&nbsp;screens. We would recommend you try it out on a larger&nbsp;display.", "note-small-screens");
  addElement("p", "<strong>GitHub : <a href='https://github.com/madeofnumbers/10-codeplay/' target='_blank'>https://github.com/madeofnumbers/10-codeplay/</a></strong>");
  addElement("p", "<strong>About :</strong> example code to interact with <a href='https://madeofnumbers.com/10/' target='_blank'>madeofnumbers/10</a>, a game where the player slides numbers into each other to make 10s. Once all the numbers have been combined, the player has solved the&nbsp;puzzle.");
  addElement("p", "<a href='#example-grid-summary'>Example : gridSummary()</a><br><a href='#example-random-moves'>Example : randomMoves()</a>")
  addElement("p", "The <strong>Mon10</strong> object from <strong>https://madeofnumbers.com/10/mon10-latest.min.js</strong> provides the following&nbsp;methods :");

  // ===== example mon10.title() =====
  addExample({
    name: "mon10.title",
    refresh: () => {
      return mon10.title()
    }
  });

  // ===== example mon10.size() =====
  addExample({
    name: "mon10.size",
    refresh: () => {
      return mon10.size()
    },
    comment: "grid size, width and height"
  });

  // ===== example mon10.nonzero() =====
  addExample({
    name: "mon10.nonzero",
    refresh: () => {
      return mon10.nonzero()
    },
    comment: "active non-zero numbers"
  });

  // ===== example mon10.total() =====
  addExample({
    name: "mon10.total",
    refresh: () => {
      return mon10.total()
    },
    comment: "sum total of active numbers"
  });

  // ===== example mon10.title() =====
  addExample({
    name: "mon10.moves",
    refresh: () => {
      return mon10.moves()
    },
    comment: "moves made"
  });

  // ===== example mon10.undo() =====
  addExample({
    name: "mon10.undo",
    use: () => {
      mon10.undo();
      return ""
    },
    comment: "undo last move made"
  });

  // ===== example mon10.reset() =====
  addExample({
    name: "mon10.reset",
    use: () => {
      mon10.reset();
      return ""
    },
    comment: "reset grid to initial state"
  });

  // ===== example mon10.getXY(x, y) =====
  addExample({
    name: "mon10.getXY",
    params: [{
        type: "number",
        id: "getX",
        min: 0,
        max: 8,
        value: 0
      },
      {
        type: "number",
        id: "getY",
        min: 0,
        max: 8,
        value: 0
      }
    ],
    use: () => {
      return formatReturnedObject(mon10.getXY(parseInt(getValue("getX")), parseInt(getValue("getY"))))
    },
    comment: "get values of tile at XY position"
  });

  // ===== example mon10.moveXYD(x, y, d) =====
  addExample({
    name: "mon10.moveXYD",
    params: [{
        type: "number",
        id: "moveX",
        min: 0,
        max: 8,
        value: 0
      },
      {
        type: "number",
        id: "moveY",
        min: 0,
        max: 8,
        value: 0
      },
      {
        type: "number",
        id: "moveD",
        min: 1,
        max: 4,
        value: 2
      }
    ],
    use: () => {
      return formatReturnedObject(mon10.moveXYD(parseInt(getValue("moveX")), parseInt(getValue("moveY")), parseInt(getValue("moveD"))))
    },
    comment: "move tile at XY in Direction"
  });

  // ===== example mon10.loadMaker(c) =====
  addExample({
    name: "mon10.loadMaker",
    params: [{
      type: "text",
      id: "makerCustom",
      size: 8,
      value: "3MpDvCvDpM"
    }],
    use: () => {
      let makerCustom = getValue("makerCustom");
      if (makerCustom.split("c=").length > 1) {
        custom = custom.split("?c=")[1];
      }
      mon10.loadMaker(makerCustom);
      return ""
    },
    comment: "load a custom 10 / MAKER puzzle"
  });

  // ===== notes on Mon10 object =====
  addElement("p", "<strong>mon10.getXY(x, y)</strong><br> -- <strong>x, y</strong> // (int, int) position : top-left corner of the grid is (0, 0)<br>result :<br> -- <strong>block: 1</strong> // is a non-numeric block tile<br> -- <strong>empty: 1</strong> // is empty, no tile at that position<br> -- <strong>number: <em>value</em></strong> // is a numeric tile, including <strong>number: 0</strong> which is 0<br> -- <strong>move: <em>direction</em></strong> // permitted directions : 0 = none, 1 = up, 2 = right, 3 = down, 4 = left, 5 = up/down, 6 = left/right, 7 = all<br>");
  addElement("p", "<strong>mon10.moveXYD(x, y, d)</strong><br> -- <strong>x, y</strong> // (int, int) position : top-left corner of the grid is (0, 0)<br> -- <strong>d</strong> // (int) direction : 1 = up, 2 = right, 3 = down, 4 = left<br>result :<br> -- <strong>x:, y:</strong> // tile moved to this new position<br> -- <strong>fail: 1</strong> // tile could not be moved<br> -- <strong>fail: 2</strong> // tile could have been moved but would result in an illegal value (below -10 or above 10)<br>");
  addElement("p", "<strong>mon10.loadMaker(c)</strong><br> -- <strong>c</strong> // (string) custom : for test purposes you can load puzzles created in <a href='https://madeofnumbers.com/10/maker/' target='_blank'>10 / MAKER</a><br>In a share link the parameter '<strong>c=</strong>' is the custom string - e.g. from <a href='https://madeofnumbers.com/10/?c=3MpDvCvDpM' target='_blank'>https://madeofnumbers.com/10/?c=3MpDvCvDpM</a> the custom string is&nbsp;<strong>3MpDvCvDpM</strong> - an empty or invalid string will result in the daily puzzle being loaded");
  
  // ===== example gridSummary() / mon10-codeplay-example-grid-summary.js =====
  addElement("hr", "", "example-grid-summary");
  addElement("h1", "Example : gridSummary()");
  addElement("p", "Uses mon10.getXY() to build a simple summary of the current grid state, including positions of tiles grouped by&nbsp;value");
  addElement("p", "Script : <a href='../examples/grid-summary/mon10-codeplay-example-grid-summary.js' target='_blank'>examples/grid-summary/mon10-codeplay-example-grid-summary.js</a>");
  addElement("p", "", "html-grid-summary");
  addExample({
    name: "gridSummary",
    use: () => {
      document.getElementById("html-grid-summary").innerHTML = htmlGridSummary();
      return formatReturnedObject(gridSummary("grid-summary-report"))
    },
    comment: "returns a summary of current grid state"
  });
  
  // ===== example randomMoves() / mon10-codeplay-example-random-moves.js =====
  addElement("hr", "", "example-random-moves");
  addElement("h1", "Example : randomMoves()");
  addElement("p", "Uses mon10.getXY(), mon10.moveXYD(), mon10.nonzero() and mon10.size() to make entirely random moves with almost no chance of solving&nbsp;a&nbsp;puzzle");
  addElement("p", "Script : <a href='../examples/random-moves/mon10-codeplay-example-random-moves.js' target='_blank'>examples/random-moves/mon10-codeplay-example-random-moves.js</a>");
  addElement("p", "", "html-random-moves-log");
  addExample({
    name: "randomMoves",
    params: [{
      type: "number",
      id: "randomMovesState",
      min: 0,
      max: 2,
      value: 1
    }
  ],
    use: () => {
      randomMoves(parseInt(getValue("randomMovesState")), htmlRandomMovesLog);
      return ""
    },
    comment: "0 = stop, 1 = slow, 2 = fast"
  });

  // ===== duplicate example of mon10.reset(), useful with randomMoves() =====
  addExample({
    name: "mon10.reset",
    use: () => {
      mon10.reset();
      return ""
    },
    comment: "reset grid to initial state"
  });

  // ===== legal notes =====
  addElement("hr");
  addElement("div", "<p class='small'>The puzzle game 'madeofnumbers/10' and its editor '10 / MAKER' are &copy;2024&nbsp;IOJOE&nbsp;/&nbsp;madeofnumbers. All&nbsp;rights&nbsp;reserved.<br>'10 / CODEPLAY' examples are open-source under the MIT&nbsp;license &copy;2024&nbsp;madeofnumbers<br><br><br></p>")


  /* ========================================================================== */


  // ===== add dom elements =====
  function addElement(type, html, id) {

    let elAdd = document.createElement(type);
    if (html) {
      elAdd.innerHTML = html;
    }
    if (id) {
      elAdd.id = id;
    }
    domElement.appendChild(elAdd);
  }

  // ===== add example to dom and functions/methods to refresh or use =====
  function addExample(example) {

    let elExample = document.createElement("div");
    let elName = document.createElement("div");
    let elResult = document.createElement("div");

    elExample.classList.add("example");
    domElement.appendChild(elExample);

    elName.classList.add("name");
    let params = "";
    if (example.params) {
      example.params.forEach((param, index) => {
        params += `${index > 0 ? ", " : ""}<input type="${param.type}" id="${param.id}" value="${param.value}" `;
        params += param.type == "number" ? `min="${param.min}" max="${param.max}" size="2">` : "";
        params += param.type == "text" ? `size="${param.size}">` : "";
      });
    }
    elName.innerHTML = `${example.name}(${params}) :`;
    elExample.appendChild(elName);

    if (example.use) {
      let elUse = document.createElement("button");
      elUse.innerHTML = "CALL";
      elUse.onclick = () => {
        elResult.innerHTML = example.use();
      }
      elExample.appendChild(elUse);
    }

    elResult.classList.add("result");
    if (example.comment) {
      elResult.innerHTML = formatComment(example.comment);
    }
    elExample.appendChild(elResult);

    if (example.refresh) {
      refreshExamples.push({
        refresh: example.refresh,
        comment: example.comment,
        elResult: elResult
      });
    }
  }

  // ===== return value of dom input element =====
  function getValue(id) {
    return document.getElementById(id).value;
  }

  // ===== format comment html =====
  function formatComment(comment) {
    return `<em> // ${comment}</em>`
  }

  // ===== format result object =====
  function formatReturnedObject(object) {
    return JSON.stringify(object).replace(/"([^"]+)":/g, '$1:');
  }

  // ===== return html formated result from gridSummary() =====
  function htmlGridSummary() {

    let result = gridSummary();
    let htmlReport = "<em>";
    let directionLabels = ["none", "up", "right", "down", "left", "up/down", "left/right", "all"];

    function formatPositions(positions) {
      let htmlPostions = "";
      positions.forEach((position, index) => {
        htmlPostions += `${index > 0 ? ", " : ""}(${position.x},${position.y})`;
      });
      return htmlPostions;
    }
    result.numbers.forEach((number) => {

      if (number.positions.length > 0) {

        htmlReport += `Number ${number.value} found : x${number.positions.length} at ${formatPositions(number.positions)}<br>`;
      }
    });

    htmlReport += `${result.numbersFound} numbers found<br><br>`;

    result.blocks.forEach((block) => {

      if (block.positions.length > 0) {

        htmlReport += `Block with move direction ${block.move} (${directionLabels[block.move]}) found : x${block.positions.length} at ${formatPositions(block.positions)}<br>`;
      }
    });

    htmlReport += `${result.blocksFound} blocks found<br></em>`;

    return htmlReport;
  }

  // ===== set innerHTML of result from randomMoves() =====
  function htmlRandomMovesLog(text) {

    document.getElementById("html-random-moves-log").innerHTML = `<em>${text}</em>`;
  }

  // ===== set interval to refresh example methods =====
  setInterval(() => {
    refreshExamples.forEach((example) => {
      let result = example.refresh();
      if (example.comment) {

        result += formatComment(example.comment);
      }
      example.elResult.innerHTML = result;
    });
  }, 250);

}