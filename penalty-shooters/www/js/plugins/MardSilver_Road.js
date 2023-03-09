ScreenRoad = {
  createSceen: () => {
    // createContent("./img/parallaxes/road.jpg");
    createContent("./img/system/41.png");
    createBtnSound(7, 12, 87, -78);
    drawImgButton(
      $gameSystem._DOMdivContent,
      "btnNext",
      "Next",
      "10.png",
      75,
      78,
      ""
    );
    $("#btnNext").tap(async function () {
      ScreenVS.createSceen();
    });
    let arrXY = [
      { x: -74, y: -55 },
      { x: -74, y: -36 },
      { x: -74, y: -16 },
      { x: -74, y: 4 },
      { x: -74, y: 24 },
      { x: -74, y: 43 },
      { x: -74, y: 63 },
      { x: -74, y: 82 },
      { x: -36, y: -45 },
      { x: -36, y: -6 },
      { x: -36, y: 33 },
      { x: -36, y: 72 },
      { x: 2.5, y: -25 },
      { x: 2.5, y: 52 },
      { x: 40.5, y: 14 },
      { x: 74.5, y: 14 },
    ];
    // let round = matcth();
    let index = 0;
    let curPosition = 0;
    for (let i = 0; i < 16; i++) {
      let divRoad = drawDOM(
        $gameSystem._DOMdivContent,
        "road_" + i,
        "div",
        "road",
        arrXY[i].x,
        arrXY[i].y
      );
      if (i < 8) {
        if (!$gameSystem._round1) {
          $gameSystem._round1 = $gameSystem._groups;
        }
        let res = ScreenRoad.drawRoad($gameSystem._round1, divRoad, index);
        index = res.index;
        if (res.curPosition) {
          curPosition = i;
          $gamePlayer._vs = res.vs;
        }
      } else if (i < 12) {
        if ($gameSystem._round2) {
          let res = ScreenRoad.drawRoad($gameSystem._round2, divRoad, index);
          index = res.index;
          if (res.curPosition) {
            curPosition = i;
            $gamePlayer._vs = res.vs;
          }
        }
      } else if (i < 14) {
        if ($gameSystem._round3) {
          let res = ScreenRoad.drawRoad($gameSystem._round3, divRoad, index);
          index = res.index;
          if (res.curPosition) {
            curPosition = i;
            $gamePlayer._vs = res.vs;
          }
        }
      } else {
        if ($gameSystem._round4) {
          drawText(
            divRoad,
            $gameSystem._namesTeam[$gameSystem._groups[index]],
            "",
            0,
            0,
            "teamName"
          );
          drawImg(
            divRoad,
            "",
            "EL_ROAD_" + $gameSystem._groups[index] + ".png",
            70,
            0,
            "teamIcon"
          );
        }
      }
    }
    // console.log(curPosition);
    document.getElementById("road_" + curPosition).animate(
      [
        // keyframes
        { border: "none" },
        { border: "2px solid gold" },
      ],
      {
        // timing options
        duration: 400,
        iterations: Infinity,
      }
    );
  },
  drawRoad: (arr, divRoad, index) => {
    let curPosition = false;
    let vs = 0;
    drawText(
      divRoad,
      $gameSystem._namesTeam[arr[index]],
      "",
      0,
      -40,
      "teamName"
    );
    drawImg(divRoad, "", "EL_ROAD_" + arr[index] + ".png", 70, -50, "teamIcon");
    if (
      $gameSystem._namesTeam[arr[index]].toLowerCase() ==
      $gamePlayer._team.toLowerCase()
    ) {
      curPosition = true;
      vs = index + 1;
    }
    index++;

    drawText(
      divRoad,
      $gameSystem._namesTeam[arr[index]],
      "",
      0,
      40,
      "teamName"
    );
    drawImg(divRoad, "", "EL_ROAD_" + arr[index] + ".png", 70, 50, "teamIcon");
    if (
      $gameSystem._namesTeam[arr[index]].toLowerCase() ==
      $gamePlayer._team.toLowerCase()
    ) {
      curPosition = true;
      vs = index - 1;
    }
    index++;
    return { index: index, curPosition: curPosition, vs: arr[vs] };
  },
};
