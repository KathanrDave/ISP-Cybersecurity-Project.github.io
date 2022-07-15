$(function () {
  var body = $("body"),
    stage = $("#stage"),
    back = $("a.back");

  $("#step1 .button").click(function () {
    $(this).parent().find("input").click();
  });

  var file = null;

  $("#step1").on("change", "#input-encrypt", function (e) {
    if (e.target.files.length != 1) {
      alert("Please select a file to encrypt!");
      return false;
    }
    file = e.target.files[0];
    step(2);
  });

  $("a.button.process").click(function () {
    var input = $(this).parent().find("input[type=password]"),
      a = $("#step3 a.download"),
      password = input.val();

    input.val("");

    if (password.length < 5) {
      alert("Please choose a longer password!");
      return;
    }

    var reader = new FileReader();

    reader.onload = function (e) {
      var encrypted = CryptoJS.AES.encrypt(e.target.result, password);

      a.attr("href", "data:application/octet-stream," + encrypted);
      a.attr("download", file.name + ".encrypted");

      step(3);
    };

    reader.readAsDataURL(file);
  });

  /* The back button */

  back.click(function () {
    $("#step1 input[type=file]").replaceWith(function () {
      return $(this).clone();
    });

    step(1);
  });

  function step(i) {
    if (i == 1) {
      back.fadeOut();
    } else {
      back.fadeIn();
    }

    stage.css("top", -(i - 1) * 100 + "%");
  }
});
