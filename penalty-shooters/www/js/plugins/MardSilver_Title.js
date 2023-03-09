ScreenMenu = {
  createSceen: () => {
    // createContent("./img/parallaxes/home.jpg");
    createContent("./img/system/2.png");
    createBtnSound(7, 12, 88, -76);
    drawImg($gameSystem._DOMdivContent, "title", "6.png", 0, -41);
    // let window = createWindow(
    //   $gameSystem._DOMdivContent,
    //   "window_login"
    //   // "bg_window_login.png"
    // );
    drawImgButton(
      $gameSystem._DOMdivContent,
      "btnChangeLeague",
      "Change League",
      "9.png",
      -65,
      72,
      "btnLeague"
    );

    drawImgButton(
      $gameSystem._DOMdivContent,
      "btnHTP",
      "How To Play",
      "12.png",
      65,
      72
    );
    if (!document.cookie.split("mToken=")[1]) {
      drawImgButton(
        $gameSystem._DOMdivContent,
        "btnLogin",
        "Login",
        "10.png",
        -19,
        72
      );
      drawImgButton(
        $gameSystem._DOMdivContent,
        "btnSignup",
        "Sign Up",
        "11.png",
        15.5,
        72
      );
      $("#btnLogin").tap(async function () {
        btnLogin();
      });
      $("#btnSignup").tap(async function () {
        btnSignup();
      });
    } else {
      drawImgButton(
        $gameSystem._DOMdivContent,
        "btnStart",
        "Start",
        "9.png",
        0,
        32,
        "btnLeague"
      );
      $("#btnStart").tap(async function () {
        btnStart();
      });

      drawImgButton(
        $gameSystem._DOMdivContent,
        "btnLogout",
        "Logout",
        "9.png",
        0,
        72,
        "btnLeague"
      );
      $("#btnLogout").tap(async function () {
        document.cookie = "mToken" + "=";
        ScreenMenu.createSceen();
      });

      $gamePlayer._mToken = document.cookie.split("mToken=")[1];
    }

    $("#btnChangeLeague").tap(async function () {
      btnChangeLeague();
    });
    $("#btnHTP").tap(async function () {
      btnHTP();
    });

    btnChangeLeague = async () => {
      setTimeout(() => {
        ScreenLeague.createSceen();
      }, 100);

      // $gamePlayer.reserveTransfer(1, 7, 12, $gamePlayer.direction(), 2);
    };
    btnStart = async () => {
      setTimeout(() => {
        ScreenChooseTeam.createSceen();
      }, 100);
    };
    btnLogin = async () => {
      ScreenLogin.createSceen();
    };
    btnSignup = async () => {
      ScreenSignup.createSceen();
    };
    btnHTP = async () => {};
  },
};
