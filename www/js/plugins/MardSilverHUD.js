let SceneGame = {
  Picture: [],
  Text: [],
};
let SceneLogin = {
  Picture: [
    {
      type: "Picture",
      Condition: "true",
      Layer: "0",
      Image: "login_guest",
      "Scale X": "1",
      "Scale Y": "1",
      Opacity: "255",
      Hue: "0",
      Blend: "0",
      animateInfo: {
        x: { spd: 0, loop: false, min: 0, max: 0 },
        y: { spd: 0, loop: false, min: 0, max: 0 },
        s: { spd: 0, loop: false, min: 1, max: 1 },
        r: { spd: 0, loop: false, min: 0, max: 0 },
      },
      id: 1,
      x: 379,
      y: 588,
    },
    {
      type: "Picture",
      Condition: "",
      Layer: "0",
      Image: "login_fb",
      "Scale X": "1",
      "Scale Y": "1",
      Opacity: "255",
      Hue: "0",
      Blend: "0",
      animateInfo: {
        x: { spd: 0, loop: false, min: 0, max: 0 },
        y: { spd: 0, loop: false, min: 0, max: 0 },
        s: { spd: 0, loop: false, min: 1, max: 1 },
        r: { spd: 0, loop: false, min: 0, max: 0 },
      },
      id: 2,
      x: 684,
      y: 588,
    },
  ],
  Text: [
    {
      type: "Text",
      Value: "Gold: ${$gameParty.gold()}",
      Condition: "",
      Layer: "0",
      Font: "GameFont",
      "Max Width": "150",
      Align: "left",
      "Font Size": "063",
      "Text Color": "#ffffff",
      "Text Alpha": "255",
      "Outline Color": "#000000",
      "Outline Alpha": "127",
      animateInfo: {
        x: { spd: 0, loop: false, min: 0, max: 0 },
        y: { spd: 0, loop: false, min: 0, max: 0 },
        s: { spd: 0, loop: false, min: 1, max: 1 },
        r: { spd: 0, loop: false, min: 0, max: 0 },
      },
      id: 6,
      x: 665,
      y: 372.5,
    },
  ],
};

let arrHUD = { Picture: [], Text: [] };
function getDataHud() {
  $dataMapHUD.forEach((e) => {
    arrHUD[e.type].push(e);
  });
  console.log(JSON.stringify(arrHUD));
}

drawUI = (data) => {
  if (data) {
    $gameScreen._pictures = [];
    let pictures = data.Picture;
    let texts = data.Text;
    pictures.forEach((e) => {
      console.log(e);
      $gameScreen.showPicture(
        e.id,
        e.Image,
        1,
        e.x,
        e.y,
        e["Scale X"] * 100,
        e["Scale Y"] * 100,
        parseInt(e.Opacity),
        parseInt(e.Blend)
      );
    });
  }
};
