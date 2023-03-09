ScreenSignup = {
  createSceen: () => {
    createContent("./img/system/3.png");
    let btnTabSignup = drawImgButton(
      $gameSystem._DOMdivContent,
      "btnTabSignup",
      "",
      "14.png",
      -13,
      -84,
      "btn_large"
    );
    // btnTabSignup.style.width = "20%";
    // btnTabSignup.style.height = "13%";

    let btnTabLogin = drawImgButton(
      $gameSystem._DOMdivContent,
      "btnTabLogin",
      "",
      "15.png",
      26,
      -84,
      "btn_small"
    );
    // btnTabLogin.style.width = "12.5%";
    // btnTabLogin.style.height = "10%";
    $("#btnTabLogin").tap(async function () {
      ScreenLogin.createSceen();
    });

    btnTabLogin.style.zIndex = 9;
    btnTabSignup.style.zIndex = 9;
    createBtnSound(7, 12, 87, -73);
    createBtnMenu(8, 13, -85, -74);
    let window = createWindow(
      $gameSystem._DOMdivContent,
      "window_login",
      0,
      7,
      "./img/system/7.png"
    );
    window.style.height = "90%";
    let name = drawInput(
      window,
      "inputName",
      "input",
      "",
      64,
      12,
      "%",
      0,
      -70,
      "NAME"
    );
    let pw = drawInput(
      window,
      "inputPass",
      "input",
      "",
      64,
      12,
      "%",
      0,
      -40,
      "PASSWORD"
    );
    let repw = drawInput(
      window,
      "inputRePass",
      "input",
      "",
      64,
      12,
      "%",
      0,
      -10,
      "PASSWORD"
    );
    let email = drawInput(
      window,
      "inputEmail",
      "input",
      "",
      64,
      12,
      "%",
      0,
      20,
      "EMAIL"
    );
    let phone = drawInput(
      window,
      "inputPhone",
      "input",
      "",
      64,
      12,
      "%",
      0,
      50,
      "PHONE NUMBER"
    );
    phone.type = "number";
    phone.maxLength = "10";
    phone.oninput = function (e) {
      checkPhone();
    };
    email.type = "email";
    pw.type = repw.type = "password";

    let btnOK = drawImgButton(window, "btnOK", "", "17.png", 0, 82);
    btnOK.style.width = "16%";
    btnOK.style.height = "16%";
    // drawImgButton(window, "btnSignUp", "", "BTN_OK.png", 0, 44);
    $("#btnOK").tap(async function () {
      btnOk();
    });
    btnOk = async () => {
      if (checkPW() && checkEmail()) {
        let res = await axios.post($gameSystem.api.register, {
          username: name.value,
          email: email.value,
          phone: phone.value,
          password: pw.value,
          passwordConf: repw.value,
        });

        if (res.data.code == 0) {
          showPopup(res.data.msg, "success", 1200);
          ScreenLogin.createSceen();
        } else {
          showPopup(res.data.msg, "error", 1200);
        }
      }
    };

    checkPW = () => {
      let pw = document.getElementById("inputPass").value;
      let repw = document.getElementById("inputRePass").value;
      if (pw.length < 8) {
        showPopup(
          "Password should contain at least 8 characters and max 30 characters.",
          "error"
        );
        return false;
      }
      if (pw != repw) {
        showPopup("Password not match", "error");
        return false;
      }
      return true;
    };

    checkPhone = () => {
      let input = document.getElementById("inputPhone").value;
      if (input[0] != 0 && input.length > 0) {
        document.getElementById("inputPhone").value = "0";
      }
      if (input.length > 10) {
        document.getElementById("inputPhone").value = input.slice(0, 10);
      }
      return true;
    };

    checkEmail = () => {
      let input = document.getElementById("inputEmail").value;
      if (!input.includes("@")) {
        showPopup("Email Invalid", "error");
        return false;
      }
      return true;
    };
  },
};
