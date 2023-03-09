function drawDOM(parent, id, tag, css, x, y, disCenter) {
  var obj = document.createElement(tag);
  obj.id = id;
  obj.classList = css;
  obj.style.zIndex = 4;
  if (tag === "button") {
    obj.style.zIndex = 100;
    obj.style.cursor = "pointer";
  }
  if (!disCenter) {
    Graphics._centerElement(obj);
  }
  parent.appendChild(obj);
  obj.style.left = x + "%";
  obj.style.top = y + "%";
  return obj;
}

function drawInput(
  parent,
  id,
  type,
  css,
  w,
  h,
  sizeType,
  x,
  y,
  placeholder,
  filename
) {
  let div = drawDOM(parent, "", "div", css);
  div.style.left = x + "%";
  div.style.top = y + "%";
  div.style.width = w + sizeType;
  div.style.height = h + sizeType;

  var input = drawDOM(div, id, "INPUT");
  input.style.width = "82%";
  input.style.zIndex = 999;
  input.type = type;
  input.placeholder = placeholder;
  let bg = drawDOM(div, "bg", "img");
  bg.style.width = "100%";
  bg.style.height = "100%";
  if (filename) {
    bg.src = "./img/system/" + filename;
  } else {
    bg.src = "./img/system/8.png";
  }
  return input;
}

function drawButton(parent, id, text, css, x, y) {
  let button = drawDOM(parent, id, "BUTTON", css);
  button.innerText = text;
  button.style.zIndex = 999;
  button.style.left = x + "%";
  button.style.top = y + "%";
  return button;
}

function drawImgButton(parent, id, text, filename, x, y, css) {
  let div = drawDOM(parent, id, "div", css);
  div.style.left = x + "%";
  div.style.top = y + "%";
  div.style.cursor = "pointer";
  let bg = drawDOM(div, "bg", "img");
  bg.style.width = "100%";
  bg.style.height = "100%";
  bg.src = "./img/system/" + filename;
  let span = drawDOM(div, "", "span", "spanImgBtn");
  span.innerText = text;
  span.style.top = -20 + "%";
  return div;
}

function drawImg(parent, id, filename, x, y, css) {
  let div = drawDOM(parent, id, "div", css);
  div.style.left = x + "%";
  div.style.top = y + "%";
  div.style.cursor = "pointer";
  let bg = drawDOM(div, "bg", "img");
  bg.style.width = "100%";
  bg.style.height = "100%";
  bg.src = "./img/system/" + filename;
  return div;
}

function drawText(parent, text, id, x, y, css) {
  spantext = drawDOM(parent, id, "span", css, x, y);
  spantext.innerText = text;
  spantext.style.textAlign = "center";
  spantext.style.height = "min-content";
  return spantext;
}

function createContent(url) {
  if ($gameSystem._DOMdivContent) {
    document.body.removeChild($gameSystem._DOMdivContent);
  }
  $gameSystem._DOMdivContent = drawDOM(document.body, "Content", "div", "");
  if (url) {
    let bg = drawDOM($gameSystem._DOMdivContent, "bg", "img");
    bg.style.width = "100%";
    bg.style.height = "100%";
    bg.src = url;
  }
}

function createWindow(parent, css, x, y, url) {
  let window = drawDOM(parent, css, "div", css);
  window.style.left = x + "%";
  window.style.top = y + "%";
  if (url) {
    let bg = drawDOM(window, "bg", "img");
    bg.style.width = "100%";
    bg.style.height = "100%";
    bg.src = url;
  }

  return window;
}

OnOffSound = () => {
  let btn_sound = document.getElementById("btn_sound");
  if ($gameSystem._isDisSound) {
    $gameSystem._isDisSound = false;
    // btn_sound.style.backgroundImage = "url('./img/system/btn_sound.png')";
    btn_sound.firstChild.src = "../img/system/18.png";
    AudioManager.bgmVolume = 100;
    AudioManager.seVolume = 100;
  } else {
    console.log("mute");
    $gameSystem._isDisSound = true;
    btn_sound.firstChild.src = "../img/system/19.png";
    AudioManager.bgmVolume = 0;
    AudioManager.seVolume = 0;
  }
  document.cookie = "isDisSound" + "=" + $gameSystem._isDisSound;
  return true;
};

createBtnSound = (w, h, x, y) => {
  let img = "18.png";
  if ($gameSystem._isDisSound) {
    img = "19.png";
  }
  let btn = drawImgButton(
    $gameSystem._DOMdivContent,
    "btn_sound",
    "",
    img,
    x,
    y
  );
  btn.style.width = w + "%";
  btn.style.height = h + "%";
  $("#btn_sound").tap(async function () {
    OnOffSound();
  });
};

createBtnMenu = (w, h, x, y) => {
  let btn = drawImgButton(
    $gameSystem._DOMdivContent,
    "btn_menu",
    "",
    "20.png",
    x,
    y
  );
  btn.style.width = w + "%";
  btn.style.height = h + "%";
  $("#btn_menu").tap(async function () {
    setTimeout(() => {
      ScreenMenu.createSceen();
      for (let index = 0; index < $gameScreen._pictures.length; index++) {
        $gameScreen.erasePicture(index);
      }
      return true;
    }, 100);
  });
};

showPopup = (msg, type, timeout, diasbleAutoClose) => {
  let popup = createWindow(
    $gameSystem._DOMdivContent,
    "popup",
    0,
    0,
    "./img/system/7.png"
  );
  popup.style.zIndex = 999;
  drawText(popup, msg, "", 0, 0, type);
  if (!diasbleAutoClose) {
    let t = 1000;
    if (timeout) {
      t = timeout;
    }
    setTimeout(() => {
      $gameSystem._DOMdivContent.removeChild(popup);
    }, t);
  }
};

var styleElement = document.createElement("style");
if (Utils.isMobileDevice()) {
  styleElement.appendChild(
    document.createTextNode(
      ".spanImgBtn { height: min-content; text-align: center; color: #004507; font-weight: 999; font-size: 18px; text-transform: uppercase; font-family: GameFont; }" +
        ".team .teamName { color: white; font-size: 16px; text-align: left !important; padding: 10px; text-transform: uppercase; font-family: HelvetIns; }" +
        ".road .teamName { color: white; font-size: 10px; text-align: left !important; padding: 10px; text-transform: uppercase; font-family: GameFont; }"
    )
  );
} else {
  styleElement.appendChild(
    document.createTextNode(
      ".spanImgBtn { height: min-content; text-align: center; color: #004507; font-weight: 999; font-size: 30px; text-transform: uppercase; font-family: GameFont; }" +
        ".team .teamName { color: white; font-size: 28px; text-align: left !important; padding: 10px; text-transform: uppercase; font-family: HelvetIns; }" +
        ".road .teamName { color: white; font-size: 20px; text-align: left !important; padding: 10px; text-transform: uppercase; font-family: GameFont; }"
    )
  );
}

document.getElementsByTagName("head")[0].appendChild(styleElement);
