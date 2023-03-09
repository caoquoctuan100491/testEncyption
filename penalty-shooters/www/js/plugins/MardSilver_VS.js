ScreenVS = {
  createSceen: () => {
    // createContent("./img/parallaxes/vs.jpg");
    createContent("./img/system/2.png");
    createBtnSound(7, 12, 88, -76);
    let title = drawImg($gameSystem._DOMdivContent, "title", "6.png", 0, -45);
    title.style.width = "70%";
    title.style.height = "50%";

    let vsline = drawImg($gameSystem._DOMdivContent, "vsline", "42.png", 0, 30);
    // vsline.style.width = "100%";
    vsline.style.height = "26%";
    drawText($gameSystem._DOMdivContent, "VS", "vs", 0, 32);
    drawImg(
      $gameSystem._DOMdivContent,
      "",
      $gameSystem._groups[$gamePlayer._teamSelected] + ".png",
      -81,
      29,
      "svIcon"
    );
    drawText(
      $gameSystem._DOMdivContent,
      $gameSystem._namesTeam[
        $gameSystem._groups[$gamePlayer._teamSelected]
      ].substring(0, 4),
      "",
      -44,
      32,
      "vsName"
    );

    drawImg(
      $gameSystem._DOMdivContent,
      "",
      $gamePlayer._vs + ".png",
      81,
      29,
      "svIcon"
    );
    drawText(
      $gameSystem._DOMdivContent,
      $gameSystem._namesTeam[$gamePlayer._vs].substring(0, 4),
      "",
      44,
      32,
      "vsName"
    );

    drawImgButton(
      $gameSystem._DOMdivContent,
      "btnMenu",
      "Main Menu",
      "9.png",
      -65,
      75,
      "btnLeague"
    );

    drawImgButton(
      $gameSystem._DOMdivContent,
      "btnHTP",
      "How To Play",
      "12.png",
      0,
      75
    );

    drawImgButton(
      $gameSystem._DOMdivContent,
      "btnnext",
      "Next",
      "9.png",
      65,
      75,
      "btnLeague"
    );
    $("#btnnext").tap(async function () {
      $gamePlayer.reserveTransfer(2, 7, 12, $gamePlayer.direction(), 2);
      setTimeout(() => {
        ScreenGamePlay.createSceen();
      }, 100);
    });

    $("#btnMenu").tap(async function () {
      ScreenMenu.createSceen();
    });
    $("#btnHTP").tap(async function () {});
  },
};
