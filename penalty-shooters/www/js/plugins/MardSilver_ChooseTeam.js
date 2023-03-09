ScreenChooseTeam = {
  createSceen: () => {
    createContent("./img/system/4.png");
    createBtnSound(7, 12, 87, -78);
    createBtnMenu(8, 13, -79, 80);
    ScreenChooseTeam.drawTeams();
  },
  get4Teams: () => {
    // Tạo một mảng gồm 16 số
    const arr = Array.from({ length: 16 }, (_, i) => i + 25);
    let result = [];
    for (let i = 0; i < 4; i++) {
      let a = [];
      for (let j = 0; j < 4; j++) {
        const index = Math.floor(Math.random() * arr.length);
        result.push(arr[index]);
        arr.splice(index, 1);
      }
    }
    return result;
  },
  drawTeams: () => {
    $gameSystem._namesTeam = {
      25: "armeros",
      26: "atlet",
      27: "atletismo",
      28: "blankos",
      29: "blaugranes",
      30: "califas",
      31: "franji",
      32: "granotas",
      33: "nazaries",
      34: "noomantino",
      35: "pepin",
      36: "periquitos",
      37: "pucelanos",
      38: "recre",
      39: "txuri",
      40: "union",
    };
    let groups = ScreenChooseTeam.get4Teams();
    $gameSystem._groups = groups;
    let x = -65; //43
    let y = -31; //26
    let index = 0;
    let child = 0;
    let btnNext = drawImgButton(
      $gameSystem._DOMdivContent,
      "btnNext",
      "Next",
      "10.png",
      75,
      78,
      ""
    );
    btnNext.style.visibility = "hidden";
    for (let i = 0; i < 16; i++) {
      let team = drawDOM(
        $gameSystem._DOMdivContent,
        "team_" + i,
        "div",
        "team",
        x,
        y
      );
      team.style.cursor = "pointer";
      drawText(team, $gameSystem._namesTeam[groups[i]], "", 0, 0, "teamName");
      drawImg(team, "", "team" + groups[i] + ".png", 70, 0, "teamIcon");
      y = y + 26;
      if (child == 3) {
        child = 0;
        index++;
        y = -31;
        x = x + 43;
        if (index == 2) {
          x++;
        }
      } else {
        if (child == 2) {
          y++;
        }
        child++;
      }
      $("#team_" + i).tap(async function () {
        if ($gamePlayer._teamSelected != undefined) {
          document.getElementById("team_" + $gamePlayer._teamSelected).animate(
            [
              // keyframes
              { border: "none" },
              { border: "none" },
            ],
            {
              // timing options
              duration: 1000,
              iterations: Infinity,
            }
          );
        }
        $gamePlayer._teamSelected = i;
        $gamePlayer._team = document.getElementById("team_" + i).innerText;
        document.getElementById("team_" + i).animate(
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
        btnNext.style.visibility = "visible";
        $("#btnNext").tap(async function () {
          setTimeout(() => {
            // ScreenRoad.createSceen();
            let vs_index = $gamePlayer._teamSelected - 1;
            if ($gamePlayer._teamSelected % 4 == 0) {
              vs_index = $gamePlayer._teamSelected + 1;
            }
            $gamePlayer._vs = groups[vs_index];
            $gamePlayer.reserveTransfer(2, 7, 12, $gamePlayer.direction(), 2);
            ScreenGamePlay.createSceen();
          }, 100);
        });
      });
    }
  },
};
