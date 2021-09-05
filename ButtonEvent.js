var isPressed = false;

var probSpeed = 75;
// ProbNum
var probNumPlusEle = document.querySelector("#probNum_plus");
var probNumMinusEle = document.querySelector("#probNum_minus");

probNumPlusEle.addEventListener("mouseup", function (event) {
  isPressed = false;
});

probNumPlusEle.addEventListener("mousedown", function (event) {
  isPressed = true;
  doInterval("up", "probNum", probSpeed);
});

probNumPlusEle.addEventListener("click", function (event) {
  isPressed = false;
  mainInputUpdate();
});

probNumPlusEle.addEventListener("mouseleave", function (event) {
  if (isPressed == true) {
    isPressed = false;
    mainInputUpdate();
  }
});

probNumMinusEle.addEventListener("mouseup", function (event) {
  isPressed = false;
});

probNumMinusEle.addEventListener("mousedown", function (event) {
  isPressed = true;
  doInterval("down", "probNum", probSpeed);
});

probNumMinusEle.addEventListener("click", function (event) {
  isPressed = false;
  mainInputUpdate();
});

probNumMinusEle.addEventListener("mouseleave", function (event) {
  if (isPressed == true) {
    isPressed = false;
    mainInputUpdate();
  }
});

var trySpeed = 100;
// tryNum
var tryNumPlusEle = document.querySelector("#tryNum_plus");
var tryNumMinusEle = document.querySelector("#tryNum_minus");

tryNumPlusEle.addEventListener("mouseup", function (event) {
  isPressed = false;
});

tryNumPlusEle.addEventListener("mousedown", function (event) {
  isPressed = true;
  doInterval("up", "tryNum", trySpeed);
});

tryNumPlusEle.addEventListener("click", function (event) {
  isPressed = false;
  mainInputUpdate();
});

tryNumPlusEle.addEventListener("mouseleave", function (event) {
  if (isPressed == true) {
    isPressed = false;
    mainInputUpdate();
  }
});

tryNumMinusEle.addEventListener("mouseup", function (event) {
  isPressed = false;
});

tryNumMinusEle.addEventListener("mousedown", function (event) {
  isPressed = true;
  doInterval("down", "tryNum", trySpeed);
});

tryNumMinusEle.addEventListener("click", function (event) {
  isPressed = false;
  mainInputUpdate();
});

tryNumMinusEle.addEventListener("mouseleave", function (event) {
  if (isPressed == true) {
    isPressed = false;
    mainInputUpdate();
  }
});

var scopeSpeed = 200;

// frontExpectNum
var frontExpectNumPlusEle = document.querySelector("#frontExpectNum_plus");
var frontExpectNumMinusEle = document.querySelector("#frontExpectNum_minus");

frontExpectNumPlusEle.addEventListener("mouseup", function (event) {
  isPressed = false;
});

frontExpectNumPlusEle.addEventListener("mousedown", function (event) {
  isPressed = true;
  doInterval("up", "frontExpectNum", scopeSpeed);
});

frontExpectNumPlusEle.addEventListener("click", function (event) {
  isPressed = false;
  frontExpectUpdate();
});

frontExpectNumPlusEle.addEventListener("mouseleave", function (event) {
  if (isPressed == true) {
    isPressed = false;
    frontExpectUpdate();
  }
});

frontExpectNumMinusEle.addEventListener("mouseup", function (event) {
  isPressed = false;
});

frontExpectNumMinusEle.addEventListener("mousedown", function (event) {
  isPressed = true;
  doInterval("down", "frontExpectNum", scopeSpeed);
});

frontExpectNumMinusEle.addEventListener("click", function (event) {
  isPressed = false;
  frontExpectUpdate();
});

frontExpectNumMinusEle.addEventListener("mouseleave", function (event) {
  if (isPressed == true) {
    isPressed = false;
    frontExpectUpdate();
  }
});

// backExpectNum
var backExpectNumPlusEle = document.querySelector("#backExpectNum_plus");
var backExpectNumMinusEle = document.querySelector("#backExpectNum_minus");

backExpectNumPlusEle.addEventListener("mouseup", function (event) {
  isPressed = false;
});

backExpectNumPlusEle.addEventListener("mousedown", function (event) {
  isPressed = true;
  doInterval("up", "backExpectNum", scopeSpeed);
});

backExpectNumPlusEle.addEventListener("click", function (event) {
  isPressed = false;
  backExpectUpdate();
});

backExpectNumPlusEle.addEventListener("mouseleave", function (event) {
  if (isPressed == true) {
    isPressed = false;
    backExpectUpdate();
  }
});

backExpectNumMinusEle.addEventListener("mouseup", function (event) {
  isPressed = false;
});

backExpectNumMinusEle.addEventListener("mousedown", function (event) {
  isPressed = true;
  doInterval("down", "backExpectNum", scopeSpeed);
});

backExpectNumMinusEle.addEventListener("click", function (event) {
  isPressed = false;
  backExpectUpdate();
});

backExpectNumMinusEle.addEventListener("mouseleave", function (event) {
  if (isPressed == true) {
    isPressed = false;
    backExpectUpdate();
  }
});

function doInterval(action, inputId, speed) {
  if (isPressed) {
    if (action == "up") {
      document.getElementById(inputId).stepUp();
    } else if (action == "down") {
      document.getElementById(inputId).stepDown();
    }

    setTimeout(function () {
      doInterval(action, inputId, speed);
    }, speed);
  }
}

function captureScreen() {
  var pNum = document.getElementById("probNum").value;
  var tNum = document.getElementById("tryNum").value;
  var captureName = pNum + "-" + tNum + ".png";

  downloadURI(canvas.toDataURL("image/png"), captureName);
}

function downloadURI(uri, filename) {
  var link = document.createElement("a");
  link.download = filename;
  link.href = uri;
  link.click();
}
