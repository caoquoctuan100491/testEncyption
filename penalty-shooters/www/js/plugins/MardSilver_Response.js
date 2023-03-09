var checkResponse = (code, api) => {
  if (code == 3) {
    showPopup("", "error");
  } else {
    switch (api) {
      case "login":
        login(code);
        break;
      case "register":
        register(code);
        break;
      default:
        break;
    }
    var login = (code) => {
      let msg;
      let status = true;
      switch (code) {
        case -1:
          status = false;
          break;
        case 1:
          status = false;
          break;
        case 2:
          status = false;
          break;
        default:
          break;
      }
      if (!status) {
        showPopup(msg, "error");
      }
      return status;
    };
    var register = () => {
      let msg;
      let status = true;
      switch (code) {
        case -1:
          status = false;
          break;
        default:
          break;
      }
      if (!status) {
        showPopup(msg, "error");
      }
      return status;
    };
  }
};
