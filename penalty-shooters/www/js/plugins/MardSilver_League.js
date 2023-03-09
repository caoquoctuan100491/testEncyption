ScreenLeague = {
  createSceen: () => {
    // createContent("./img/parallaxes/league.jpg");
    createContent("./img/system/1.png");
    // createBtnSound(7, 12, 88, -76);
    // drawImg($gameSystem._DOMdivContent, "title", "EL_TEXT_leage.png", 0, -41);
    // let window = createWindow(
    //   $gameSystem._DOMdivContent,
    //   "window_login"
    //   // "bg_window_login.png"
    // );
    drawImgButton(
      $gameSystem._DOMdivContent,
      "ENGLAND",
      "ENGLAND",
      "9.png",
      -65,
      -43,
      "btnLeague"
    );
    drawImgButton(
      $gameSystem._DOMdivContent,
      "SPAIN",
      "SPAIN",
      "9.png",
      0,
      -43,
      "btnLeague"
    );
    drawImgButton(
      $gameSystem._DOMdivContent,
      "WORLDCUP",
      "WORLD CUP",
      "9.png",
      65,
      -43,
      "btnLeague"
    );

    drawImgButton(
      $gameSystem._DOMdivContent,
      "YTALI",
      "YTALI",
      "9.png",
      -65,
      -5,
      "btnLeague"
    );
    drawImgButton(
      $gameSystem._DOMdivContent,
      "FRANCE",
      "FRANCE",
      "9.png",
      0,
      -5,
      "btnLeague"
    );
    drawImgButton(
      $gameSystem._DOMdivContent,
      "BRASIL",
      "BRASIL",
      "9.png",
      65,
      -5,
      "btnLeague"
    );
    drawImgButton(
      $gameSystem._DOMdivContent,
      "MEXICO",
      "MEXICO",
      "9.png",
      -65,
      33,
      "btnLeague"
    );
    drawImgButton(
      $gameSystem._DOMdivContent,
      "NAMERICA",
      "N.AMERICA",
      "9.png",
      0,
      33,
      "btnLeague"
    );
    drawImgButton(
      $gameSystem._DOMdivContent,
      "ARGHENTINA",
      "ARGHENTINA",
      "9.png",
      65,
      33,
      "btnLeague"
    );
    drawImgButton(
      $gameSystem._DOMdivContent,
      "NETHERLANDS",
      "NETHERLANDS",
      "9.png",
      -65,
      72,
      "btnLeague"
    );
    drawImgButton(
      $gameSystem._DOMdivContent,
      "GERMANY",
      "GERMANY",
      "9.png",
      0,
      72,
      "btnLeague"
    );
    drawImgButton(
      $gameSystem._DOMdivContent,
      "RUSSIA",
      "RUSSIA",
      "9.png",
      65,
      72,
      "btnLeague"
    );

    let arrbtn = document.getElementsByClassName("btnLeague");
    for (const key in arrbtn) {
      if (Object.hasOwnProperty.call(arrbtn, key)) {
        const element = arrbtn[key];
        $("#" + element.id).tap(async function () {
          $gamePlayer._league = element.innerText;
          setTimeout(() => {
            ScreenMenu.createSceen();
          }, 100);

          // $gamePlayer.reserveTransfer(2, 7, 12, $gamePlayer.direction(), 0);
        });
      }
    }
  },
};
