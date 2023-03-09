ScreenLogin = {
  createSceen: () => {
    createContent("./img/system/3.png");
    let btnTabLogin = drawImgButton(
      $gameSystem._DOMdivContent,
      "btnTabLogin",
      "",
      "13.png",
      -17,
      -51,
      "btn_large"
    );
    let btnTabSignup = drawImgButton(
      $gameSystem._DOMdivContent,
      "btnTabSignup",
      "",
      "16.png",
      22,
      -51,
      "btn_small"
    );
    $("#btnTabSignup").tap(async function () {
      ScreenSignup.createSceen();
    });

    btnTabLogin.style.zIndex = 9;
    btnTabSignup.style.zIndex = 9;
    let window = createWindow(
      $gameSystem._DOMdivContent,
      "window_login",
      0,
      7,
      "./img/system/7.png"
    );
    createBtnSound(7, 12, 87, -73);
    createBtnMenu(8, 13, -85, -74);
    let name = drawInput(
      window,
      "inputName",
      "input",
      "",
      64,
      18,
      "%",
      0,
      -42,
      "NAME"
    );
    let pw = drawInput(
      window,
      "inputPass",
      "input",
      "",
      64,
      18,
      "%",
      0,
      8,
      "PASSWORD"
    );
    pw.type = "password";

    drawImgButton(window, "btnOK", "", "17.png", 0, 76);
    // drawImgButton(window, "btnSignUp", "", "BTN_OK.png", 0, 44);
    $("#btnOK").tap(async function () {
      btnOk();
    });
    btnOk = async () => {
      try {
        let res = await axios.post($gameSystem.api.login, {
          username: name.value,
          password: pw.value,
        });
        console.log(res);
        if (res.data.code == 0) {
          $gamePlayer._mToken = res.data.token;
          document.cookie = "mToken" + "=" + $gamePlayer._mToken;
          ScreenMenu.createSceen();
        } else {
          showPopup(res.data.msg, "error", 1200);
        }
      } catch (error) {
        console.log(error.response.data);
        showPopup(error.response.data.error, "error", 1200);
      }
    };
  },
};
