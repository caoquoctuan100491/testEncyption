let stepXY = {
  "-3": { x: 550, y: 295, angle: -57 }, //Left14
  "-2": { x: 600, y: 295, angle: -57 },
  "-1": { x: 650, y: 295, angle: -57 },
  0: { x: 690, y: 250, angle: 0 }, //Up9
  1: { x: 735, y: 290, angle: 57 },
  2: { x: 785, y: 290, angle: 57 },
  3: { x: 835, y: 290, angle: 57 }, //Right13
};
ScreenGamePlay = {
  createSceen: () => {
    createContent();
    // createContent("./img/system/5.png");
    createBtnSound(7, 12, 90, -80);
    createBtnMenu(8, 13, -82, -80);
    // drawScore(
    //   $gameSystem._namesTeam[$gameSystem._groups[$gamePlayer._teamSelected]],
    //   "playerScore",
    //   73
    // );
    // drawScore($gameSystem._namesTeam[$gamePlayer._vs], "vsScore", 90);
    // let points = drawText(
    //   $gameSystem._DOMdivContent,
    //   "POINTS: " + 0,
    //   "points",
    //   0,
    //   90
    // );
    // points.style.textAlign = "left";
    showPicture();
    $gameSystem._start = true;
  },
};

var alias_update_Scene_Map = Scene_Map.prototype.update;
Scene_Map.prototype.update = function () {
  alias_update_Scene_Map.call(this);
  //
  if ($gameMap._mapId == 2 && $gameSystem._start) {
    if (!$gamePlayer._isTouch) {
      initScreenGame();
    } else {
      checkKeepGoal();
    }
  }
};

function initScreenGame() {
  if ($gameScreen._pictures[2]) {
    if ($gameScreen._pictures[2]._x == 150) {
      $gameScreen.movePicture(2, 1, 1180, 410, 100, 100, 255, 0, 75);

      // Alternative
      //   picture.move(
      //     origin, x, y, scaleX, scaleY, opacity, blendMode, frames, easing);
      //(pictureId, origin, x, y, scaleX,  scaleY, opacity, blendMode, duration)
    } else if ($gameScreen._pictures[2]._x == 1180) {
      $gameScreen.movePicture(2, 1, 150, 410, 100, 100, 255, 0, 75);
    }

    $gameScreen._pictures[3]._angle = getDegree(
      685 - $gameScreen._pictures[2]._x,
      640 - 410
    );

    if (TouchInput.isPressed()) {
      console.log(TouchInput._x, TouchInput._y);
    }

    if (
      TouchInput.isPressed() &&
      !$gamePlayer._isTouch &&
      !(
        TouchInput._x > 1218 &&
        TouchInput._x < 1310 &&
        TouchInput._y > 29 &&
        TouchInput._y < 116
      ) &&
      !(
        TouchInput._x > 62 &&
        TouchInput._x < 175 &&
        TouchInput._y > 23 &&
        TouchInput._y < 121
      )
    ) {
      $gamePlayer._isTouch = true;
      $gameScreen.movePicture(
        2,
        1,
        $gameScreen._pictures[2]._x,
        $gameScreen._pictures[2]._y,
        100,
        100,
        255,
        0,
        90
      );
      let randomVector = getRndInteger(1, 10) / 10;
      // randomVector = 0.5;
      // $gameScreen._pictures[2]._x = 700;
      $gameScreen._ballVector = {
        x:
          $gameScreen._pictures[2]._x -
          randomVector * (685 - $gameScreen._pictures[2]._x),
        y:
          $gameScreen._pictures[2]._y -
          randomVector * (640 - $gameScreen._pictures[2]._y),
      };
      $gameScreen.rotatePicture(5, 10);
      $gameScreen.movePicture(
        5,
        1,
        $gameScreen._ballVector.x,
        $gameScreen._ballVector.y,
        50,
        50,
        255,
        0,
        10
      );
      // $gameScreen.movePicture(
      //   5,
      //   1,
      //   TouchInput._x,
      //   TouchInput._y,
      //   50,
      //   50,
      //   255,
      //   0,
      //   10
      // );
      $gameScreen._pictures[3]._name = "_";
      $gameScreen._pictures[2]._name = "_";
      $gameScreen.erasePicture(2);
      let step = getRndInteger(-3, 3);
      // $gameMap.event(2).moveStraight(4);
      // if (step < 0) {
      //   $gameMap.event(2)._direction = 4;
      // } else if (step > 0) {
      //   $gameMap.event(2)._direction = 4;
      // }
      if (step == 0) {
        $gameMap.event(2)._direction = 8;
      }
      $gameScreen._keeperPosition = stepXY[step];
      $gameMap.event(2)._direction = 8;
      $gameMap.event(2).jump(step, 0);
      $gameMap.event(2)._stepAnime = false;
      // setTimeout(() => {
      //   $gameMap.event(2)._direction = 2;
      //   $gameMap.event(2)._stepAnime = true;
      // }, 1000);

      // let rate = 75;
      // if ($gamePlayer._isKeeper) {
      //   rate = 100;
      //   $gameScreen.showPicture(
      //     2,
      //     "point",
      //     1,
      //     TouchInput._x,
      //     TouchInput._y,
      //     100,
      //     100,
      //     255,
      //     0
      //   );
      // }
      // let rd = getRndInteger(0, 100);
      // keeper = {};
      // if (rd <= rate) {
      //   keeper = {
      //     x: $gameScreen._pictures[2]._x,
      //     y: $gameScreen._pictures[2]._y,
      //   };
      // } else {
      //   keeper = { x: getRndInteger(300, 800), y: getRndInteger(100, 250) };
      // }
      // moveKeeper(keeper.x, keeper.y);
    }
  } else {
    showPicture();
  }
}

function checkKeepGoal() {
  if (
    // $gameScreen._pictures[5]._x != 685 &&
    // $gameScreen._pictures[5]._y != 640 &&
    !$gamePlayer._endRound
  ) {
    // let vector = {
    //   x:
    //     $gameScreen._pictures[5]._x + 1.5 * (685 - $gameScreen._pictures[2]._x),
    //   y:
    //     $gameScreen._pictures[5]._y + 1.5 * (640 - $gameScreen._pictures[2]._y),
    // };
    setTimeout(() => {
      $gameMap.event(2).setImage("$Hero01_2", 1);
      if ($gameScreen._keeperPosition.x > 690) {
        $gameMap.event(2)._direction = 4;
      }
      if ($gameScreen._keeperPosition.x < 690) {
        $gameMap.event(2)._direction = 2;
      }
    }, 300);

    if (isMeetKeeper($gameScreen._keeperPosition, $gameScreen._pictures[5])) {
      console.log("isMeetKeeper");
      $gamePlayer._lose++;
      let min = -350;
      let max = 0;
      if ($gameScreen._keeperPosition.x > 690) {
        min = 0;
        max = 350;
      }
      $gameScreen.movePicture(
        5,
        1,
        $gameScreen._pictures[5]._x + getRndInteger(min, max),
        $gameScreen._pictures[5]._y + 1.7 * $gameScreen._ballVector.y,
        100,
        100,
        255,
        0,
        60
      );
      $gamePlayer._endRound = true;
    } else {
      checkWall();
      if (
        $gameScreen._pictures[5]._x == $gameScreen._ballVector.x &&
        $gameScreen._pictures[5]._y == $gameScreen._ballVector.y
      ) {
        if (
          $gameScreen._pictures[5]._x >= 280 &&
          $gameScreen._pictures[5]._x <= 1050 &&
          $gameScreen._pictures[5]._y >= 155 &&
          $gameScreen._pictures[5]._y < 410
        ) {
          // $gamePlayer._endRound = true;
          $gamePlayer._win++;
          console.log("goal");
          if ($gameScreen._pictures[5]._y < 350) {
            $gameScreen.movePicture(
              5,
              1,
              $gameScreen._pictures[5]._x,
              370,
              50,
              50,
              255,
              0,
              5
            );
            setTimeout(() => {
              $gameScreen.movePicture(
                5,
                1,
                $gameScreen._pictures[5]._x,
                350,
                50,
                50,
                255,
                0,
                10
              );
              setTimeout(() => {
                $gameScreen.movePicture(
                  5,
                  1,
                  $gameScreen._pictures[5]._x,
                  370,
                  50,
                  50,
                  255,
                  0,
                  5
                );
                $gameScreen.showPicture(
                  4,
                  "Shadow1",
                  1,
                  $gameScreen._pictures[5]._x,
                  375,
                  125,
                  125,
                  255,
                  0
                );
                setTimeout(() => {
                  $gameScreen.movePicture(
                    5,
                    1,
                    $gameScreen._pictures[5]._x,
                    375,
                    50,
                    50,
                    255,
                    0,
                    10
                  );
                  setTimeout(() => {
                    $gameScreen.movePicture(
                      5,
                      1,
                      $gameScreen._pictures[5]._x,
                      370,
                      50,
                      50,
                      255,
                      0,
                      5
                    );
                  }, 100);
                }, 100);
              }, 100);
            }, 100);
          }
          $gameScreen.rotatePicture(5, 0);
          $gamePlayer._endRound = true;
          $gameScreen.showPicture(
            4,
            "Shadow1",
            1,
            $gameScreen._pictures[5]._x,
            $gameScreen._pictures[5]._y + 5,
            125,
            125,
            255,
            0
          );
        } else {
          $gamePlayer._lose++;
          $gamePlayer._endRound = true;
        }
      }
      // console.log("not isMeetKeeper");
      // if (
      //   $gameScreen._pictures[5]._x >= 280 &&
      //   $gameScreen._pictures[5]._x <= 1050
      // ) {
      //   if ($gameScreen._pictures[5]._y >= 155) {
      //     // $gamePlayer._endRound = true;
      //     $gamePlayer._win++;
      //     console.log("goal");
      //   }
      // } else {
      //   $gamePlayer._lose++;
      //   if (
      //     ($gameScreen._pictures[5]._x < 280 &&
      //       $gameScreen._pictures[5]._x > 215) ||
      //     ($gameScreen._pictures[5]._x < 1110 &&
      //       $gameScreen._pictures[5]._x > 1050)
      //   ) {
      //     console.log("faild");
      //     if ($gameScreen._pictures[5]._y <= 275) {
      //       $gameScreen.movePicture(
      //         5,
      //         1,
      //         $gameScreen._pictures[5]._x,
      //         $gameScreen._pictures[5]._y + 1.7 * $gameScreen._ballVector.y,
      //         100,
      //         100,
      //         255,
      //         0,
      //         65
      //       );
      //       $gamePlayer._endRound = true;
      //     }
      //   } else {
      //     // console.log("faild out");
      //     // let vector = {
      //     //   x:
      //     //     $gameScreen._pictures[5]._x -
      //     //     0.25 * (685 - $gameScreen._pictures[2]._x),
      //     //   y:
      //     //     $gameScreen._pictures[5]._y -
      //     //     0.25 * (640 - $gameScreen._pictures[2]._y),
      //     // };
      //     // $gameScreen.movePicture(5, 1, vector.x, vector.y, 45, 45, 255, 0, 10);
      //     // if ($gameScreen._pictures[5]._x >= 197) {
      //     //   $gamePlayer._endRound = true;
      //     // }
      //   }
      // }
    }
    // if ($gamePlayer._endRound) {
    //   if ($gamePlayer._isKeeper) {
    //     $gamePlayer._isKeeper = false;
    //   } else {
    //     $gamePlayer._isKeeper = true;
    //   }
    //   setTimeout(() => {
    //     if ($gamePlayer._win + $gamePlayer._lose < 5) {
    //       showPicture();
    //     } else {
    //       //TODO reset game
    //       window.alert("Endgame");
    //     }
    //   }, 1500);
    // }
  } else {
    $gameSystem._start = false;
    $gamePlayer._isTouch = false;
    if (
      document.getElementById("points") &&
      document.getElementById("playerScore") &&
      document.getElementById("vsScore")
    ) {
      document.getElementById("points").innerText =
        "points: " + $gamePlayer._win;
      document.getElementById("playerScore").innerText = $gamePlayer._win;
      document.getElementById("vsScore").innerText = $gamePlayer._lose;
    }

    setTimeout(() => {
      // ScreenRoad.createSceen();
      // $gamePlayer.reserveTransfer(2, 7, 12, $gamePlayer.direction(), 2);
      //
      $gamePlayer._endRound = false;
      $gameMap.event(2).setImage("$Hero01_2", 1);
      $gameMap.event(2)._direction = 6;
      $gameMap.event(2)._x = 13;
      $gameMap.event(2)._y = 8;
      if ($gamePlayer._win + $gamePlayer._lose == 10) {
        $gamePlayer.reserveTransfer(1, 7, 12, $gamePlayer.direction(), 2);
      } else {
        setTimeout(() => {
          $gameMap.event(2).setImage("$Hero01", 1);
          $gameMap.event(2)._direction = 2;
          $gameMap.event(2)._stepAnime = true;
          $gameSystem._start = true;
          if ($gameScreen._pictures[4]) {
            $gameScreen._pictures[4]._name = "_";
          }
          // showPicture();
          //   console.log("12345");
        }, 1500);
      }
    }, 1000);
  }
}

function checkWall() {
  if (
    ($gameScreen._pictures[5]._x < 280 && $gameScreen._pictures[5]._x > 215) ||
    ($gameScreen._pictures[5]._x < 1110 && $gameScreen._pictures[5]._x > 1050)
  ) {
    console.log("faild");
    if (
      $gameScreen._pictures[5]._x < 1080 ||
      $gameScreen._pictures[5]._x < 245
    ) {
      x = -1;
    } else {
      x = 1;
    }
    if (
      $gameScreen._pictures[5]._y >= 100 &&
      $gameScreen._pictures[5]._y <= 410
    ) {
      $gameScreen.movePicture(
        5,
        1,
        $gameScreen._pictures[5]._x + x * 1.7 * $gameScreen._ballVector.x,
        $gameScreen._pictures[5]._y + 1.7 * $gameScreen._ballVector.y,
        100,
        100,
        255,
        0,
        30
      );
    } else {
      $gameScreen.movePicture(
        5,
        1,
        $gameScreen._pictures[5]._x + 1.7 * $gameScreen._ballVector.x,
        $gameScreen._pictures[5]._y - 1.7 * $gameScreen._ballVector.y,
        100,
        100,
        255,
        0,
        30
      );
    }
    $gamePlayer._lose++;
    $gamePlayer._endRound = true;
  }
}

function getDegree(a, b) {
  const c = Math.sqrt(a * a + b * b);

  // Tính góc nhọn của tam giác theo định lý cô-sin
  const radians = Math.acos(a / c);
  const degrees = (radians * 180) / Math.PI - 90;
  return degrees;
}

// function moveKeeper(x, y) {
//   if (x >= 200 && x < 900) {
//     let degrees = getDegree(
//       $gameScreen._pictures[1]._x - x,
//       $gameScreen._pictures[1]._y - y
//     );
//     $gameScreen.showPicture(1, "LEFT" + 11, 1, 350, 260, 120, 120, 255, 0);
//     // for (let i = 2; i < 14; i++) {
//     //
//     //   setTimeout(() => {
//     //     $gameScreen._pictures[5 + i]._name = "_";
//     //   }, 500);
//     // }
//     // moveLeft(20, 1);
//     // $gameScreen._pictures[1]._angle = degrees;
//     // $gameScreen.movePicture(1, 1, x, y, 100, 100, 255, 0, 20);
//     // setTimeout(() => {
//     //   if (degrees > 45) {
//     //     $gameScreen._pictures[1]._angle = 90;
//     //   } else if (degrees < -45) {
//     //     $gameScreen._pictures[1]._angle = -90;
//     //   } else {
//     //     $gameScreen._pictures[1]._angle = 0;
//     //   }
//     //   if ($gameScreen._pictures[1]._angle == 0) {
//     //     $gameScreen.movePicture(1, 1, x, 185, 100, 100, 255, 0, 60);
//     //   } else {
//     //     $gameScreen.movePicture(1, 1, x, 250, 100, 100, 255, 0, 60);
//     //   }
//     // }, 500);
//   }
// }

function moveLeft(timeout, frame) {
  setTimeout(() => {
    $gameScreen._pictures[5 + frame - 1]._name = "_";
    $gameScreen.showPicture(
      5 + frame,
      "LEFT" + frame,
      1,
      350,
      260,
      120,
      120,
      255,
      0
    );

    if (frame < 14) {
      moveLeft(timeout, frame + 1);
    }
  }, timeout);
}

function isMeetKeeper(keeper, ball) {
  // console.log(keeper);
  // console.log(ball);
  // bitmapKeeper = ImageManager.loadPicture("UP");
  // console.log(bitmapKeeper);
  // let w = bitmapKeeper.width;
  // let h = bitmapKeeper.height;
  let w = 105; //82
  let h = 345;
  if (keeper.angle == 0) {
    h = (h * 1) / 3;
  }
  var centerX = keeper.x; // tọa độ x của trung điểm
  var centerY = keeper.y; // tọa độ y của trung điểm
  let l = keeper.x - w / 2;
  let r = keeper.x + w / 2;
  let t = keeper.y - h / 2;
  let b = keeper.y + h / 2;
  let larm = { x: l, y: keeper.y - h / 4 };
  let rarm = { x: r, y: keeper.y - h / 4 };
  // $gameScreen._pictures[1]._x = keeper.x;
  // $gameScreen._pictures[1]._y = keeper.y;
  // $gameScreen._pictures[1]._angle = keeper.angle;
  var alpha = (keeper.angle * Math.PI) / 180;
  var A = (topLeft = {
    x:
      centerX +
      (l - centerX) * Math.cos(alpha) -
      (t - centerY) * Math.sin(alpha),
    y:
      centerY +
      (l - centerX) * Math.sin(alpha) +
      (t - centerY) * Math.cos(alpha),
  });
  var B = (topRight = {
    x:
      centerX +
      (r - centerX) * Math.cos(alpha) -
      (t - centerY) * Math.sin(alpha),
    y:
      centerY +
      (r - centerX) * Math.sin(alpha) +
      (t - centerY) * Math.cos(alpha),
  });
  var C = (bottomRight = {
    x:
      centerX +
      (r - centerX) * Math.cos(alpha) -
      (b - centerY) * Math.sin(alpha),
    y:
      centerY +
      (r - centerX) * Math.sin(alpha) +
      (b - centerY) * Math.cos(alpha),
  });
  var D = (bottomLeft = {
    x:
      centerX +
      (l - centerX) * Math.cos(alpha) -
      (b - centerY) * Math.sin(alpha),
    y:
      centerY +
      (l - centerX) * Math.sin(alpha) +
      (b - centerY) * Math.cos(alpha),
  });

  var LArmalpha = {
    x:
      centerX +
      (larm.x - centerX) * Math.cos(alpha) -
      (larm.y - centerY) * Math.sin(alpha),
    y:
      centerY +
      (larm.x - centerX) * Math.sin(alpha) +
      (larm.y - centerY) * Math.cos(alpha),
  };
  var RArmalpha = {
    x:
      centerX +
      (rarm.x - centerX) * Math.cos(alpha) -
      (rarm.y - centerY) * Math.sin(alpha),
    y:
      centerY +
      (rarm.x - centerX) * Math.sin(alpha) +
      (rarm.y - centerY) * Math.cos(alpha),
  };
  // $gameScreen.showPicture(10, "p", 1, l, t, 100, 100, 255, 0);
  // $gameScreen.showPicture(11, "p", 1, r, t, 100, 100, 255, 0);
  // $gameScreen.showPicture(12, "p", 1, r, b, 100, 100, 255, 0);
  // $gameScreen.showPicture(13, "p", 1, l, b, 100, 100, 255, 0);
  // $gameScreen.showPicture(10, "p", 1, A.x, A.y, 100, 100, 255, 0);
  // $gameScreen.showPicture(11, "p", 1, B.x, B.y, 100, 100, 255, 0);
  // $gameScreen.showPicture(12, "p", 1, C.x, C.y, 100, 100, 255, 0);
  // $gameScreen.showPicture(13, "p", 1, D.x, D.y, 100, 100, 255, 0);

  // $gameScreen.showPicture(
  //   14,
  //   "p",
  //   1,
  //   LArmalpha.x,
  //   LArmalpha.y,
  //   100,
  //   100,
  //   255,
  //   0
  // );
  // $gameScreen.showPicture(15, "p", 1, ball._x, ball._y, 100, 100, 255, 0);

  // console.log(LArmalpha);
  // console.log(RArmalpha);
  // console.log(distance(ball._x, ball._y, LArmalpha.x, LArmalpha.y));
  // console.log(distance(RArmalpha.x, RArmalpha.y, ball._x, ball._y));
  // console.log(ball._x - LArmalpha.x);
  // console.log(ball._x - RArmalpha.x);
  // console.log(ball);
  let S_Keeper = w * h;
  let ABCD = parseInt(
    triangleArea(A, B, { x: ball._x, y: ball._y }) +
      triangleArea(C, B, { x: ball._x, y: ball._y }) +
      triangleArea(C, D, { x: ball._x, y: ball._y }) +
      triangleArea(D, A, { x: ball._x, y: ball._y })
  );
  if (
    S_Keeper >= ABCD ||
    distance(LArmalpha.x, LArmalpha.y, ball._x, ball._y) < 30 ||
    distance(RArmalpha.x, RArmalpha.y, ball._x, ball._y) < 30
  ) {
    return true;
  }
  return false;
}

function distance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function triangleArea(A, B, C) {
  let s =
    0.5 * Math.abs(A.x * (B.y - C.y) + B.x * (C.y - A.y) + C.x * (A.y - B.y));
  return s;
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function showPicture() {
  $gameScreen.showPicture(3, "21", 1, 685, 640, 100, 100, 255, 0);
  // $gameScreen.showPicture(1, "keeper", 1, 685, 260, 100, 100, 255, 0);
  $gameScreen.showPicture(2, "24", 1, 150, 410, 100, 100, 255, 0);
  $gameScreen.showPicture(5, "22", 1, 685, 640, 100, 100, 255, 0);
  $gamePlayer._endRound = false;
  $gamePlayer._isTouch = false;
  // Alternative
  //   picture.show(name, origin, x, y, scaleX, scaleY, opacity, blendMode);
}
function drawScore(text, id, y) {
  let divScorePlayer = drawDOM(
    $gameSystem._DOMdivContent,
    "",
    "div",
    "divScoreName",
    66,
    y
  );
  drawImg(divScorePlayer, "", "23.png");
  drawText(divScorePlayer, text, "", 0, 0, "ScoreName");

  let divScore = drawDOM(
    $gameSystem._DOMdivContent,
    "",
    "div",
    "divScore",
    88,
    y
  );
  drawImg(divScore, "", "22.png");
  drawText(divScore, 0, id, 0, 0, "ScoreName");
}
