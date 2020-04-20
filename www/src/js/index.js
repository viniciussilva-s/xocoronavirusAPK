// const diretorioLocate = "http://localhost/flutter/server/";
const diretorioLocate = "http://www.mondopubli.com.br/claro/";
var messageError = '<div class="alert alert-danger alert-dismissible fade show" role="alert">  <strong>Aviso</strong><br> message<button type="button" class="close closeInformation" data-dismiss="alert" aria-label="Close">    <span aria-hidden="true">&times;</span>  </button> </div>';

$(".closeInformation").click(function () {
    cleanInformation();
});
function cleanInformation() {
    $(".information").html("");
}
function messageShow(txt) {
    $(".information").html(messageError.replace("message", txt));
}
$(".btn-login").click(function (e) {
    alert("function login");
    e.preventDefault();
    $.ajax({
        url: diretorioLocate + "login.php",
        method: "POST",
        data: {
            "email": $("#emaillogin").val(),
            "password": $("#passwordlogin").val()
        },
        success: function (data) {
            cleanInformation();
            alert("Sucess");
            var usuarioLoggen = JSON.parse(data);
            user.init(usuarioLoggen[0]);

            app.onRouteLocation("home");
        },
        error: function (data) {
            var rlt = JSON.parse(data.responseText);
            alert(rlt);
            messageShow(rlt.message);
        }

    });
});
function save_challenge(id_challenge) {
    let count = $("count-challenge-" + id_challenge).html();
    let value_total_challenge = user['metaDiariaD' + id_challenge];
    if (id_challenge != '' && window.localStorage.id_user != '' &&
        (count <= (value_total_challenge - 1))
    ) {
        get_results_challenge();
        $.ajax({
            url: diretorioLocate + "save_challenge.php",
            method: "POST",
            data: {
                "id_challenge": id_challenge,
                "id_user": window.localStorage.id_user
            },
            success: function (data) {
                messageShow("Desafio feito");
                user["clock" + id_challenge].resetTimer();
                app.loadingResults();

                cleanInformation();
            },
            error: function (data) {
                var rlt = JSON.parse(data);
                messageShow(rlt.message);
            }

        });
    } else {
        alert("LIMIT :" + id_challenge);
    }

}
function get_results_challenge() {
    if (window.localStorage.id_user != '') {
        $.ajax({
            url: diretorioLocate + "get_results_challenge.php",
            method: "POST",
            data: {
                "id_user": window.localStorage.id_user
            },
            success: function (data) {
                messageShow("Resultados Atualizados");
                window.localStorage.resultsChallenge = [];
                window.localStorage.resultsChallenge = data;
                cleanInformation();
            },
            error: function (data) {
                var rlt = JSON.parse(data);
                messageShow(rlt.message);
            }

        });
    }
}

$(".btn__avancar-casdastro").click(function (e) {
    e.preventDefault();
    $(".step-2").addClass("active");
    $(".step-1").removeClass("active");
});


// $("#password,#password2").change(function () {
//     if ($("#password").val() !== $("#password2 ").val()) {

//         $(this).parent().addClass("formAlert");
//         $("#password").parent().removeClass("is-valid");
//         messageShow("As senhas devem coincidir");

//     } else if ($("#password").val() == $("#password2 ").val()) {
//         cleanInformation();
//         $("#password,#password2").parent().removeClass("formAlert");
//         $("#password").parent().addClass("is-valid");
//     }

// });
// $("#email").change(function () {
//     $.ajax({
//         url: diretorioLocate + "verifyUserExist.php",
//         method: "POST",
//         data: { "email": $("#email").val() },
//         success: function (data) {
//             cleanInformation();
//             $("#email").parent().addClass("is-valid").removeClass("formAlert");
//         },
//         error: function (data) {
//             $("#email").parent().addClass("formAlert").removeClass("is-valid");
//             var rlt = JSON.parse(data.responseText);
//             messageShow(rlt.message);
//         }
//     });
// })


// $(".stepped-form").change(function () {
//     if (
//         $("#name").val() != '' &&
//         $("#dia").val() !== null &&
//         $("#mes").val() !== null &&
//         $("#ano").val() !== null &&
//         $("#uf").val() !== null &&
//         $("#city").val() !== null
//     ) {
//         $(".btn__avancar-casdastro").attr("disabled", false).removeClass("op");
//     } else {
//         $(".btn__avancar-casdastro").attr("disabled", true).addClass("op");
//     }

//     if (
//         $("#email").parent().hasClass("is-valid") &&
//         $("#password").parent().hasClass("is-valid")
//     ) {
//         alert("TRUE");
//         $(".btn__concluir-cadastro").attr("disabled", false).removeClass("op");
//     } else {
//         $(".btn__concluir-cadastro").attr("disabled", true).addClass("op");
//     }
// });
$(".btn__concluir-cadastro").click(function (e) {
    e.preventDefault();
    var x = $(".stepped-form");
    var arrayData = {};
    var data = [];
    $(x[0].elements).each(function (e, val) {
        if (!$(val).hasClass("btn") && !$(val).hasClass("password2")) {
            if (val.name == "dia" || val.name == "mes" || val.name == "ano") {
                data[val.name] = val.value;
            } else {
                arrayData[":" + val.name] = val.value;
            }
        }
    });
    arrayData[":date_nasc"] = data["ano"] + "-" + data["mes"] + "-" + data["dia"];


    $.ajax({
        url: diretorioLocate + "insertNewUser.php",
        method: "POST",
        data: arrayData,
        success: function (data) {

            user.init(JSON.parse(data));
            app.onRouteLocation("home");
            alert(JSON.parse(data));
            // $("#emailcreate").addClass("is-valid").removeClass("formAlert");
        },
        error: function (data) {
            var rlt = JSON.parse(data.responseText);
            messageShow(rlt.message);
        }
    });
});

$(".btn-getresult-challenge").click(function () {
    $.ajax({
        url: diretorioLocate + "get_challenge.php",
        method: "POST",
        // data: ,
        success: function (data) {
            // console.log(data);
            var rlt = JSON.parse(data);
            console.log(rlt.challenge);
            $(".sectionChallenge").html(rlt.challenge);
            $(".numberToday").html(rlt.countToday);
            $(".numberWeek").html(rlt.week);
            $(".numberPosition").html(rlt.position);
            $(".numberNotifications").html(rlt.notifications);

            // $("#emailcreate").addClass("is-valid").removeClass("formAlert");
        },
        error: function (data) {
            // var rlt = JSON.parse(data.responseText);
            // messageShow(rlt.message);
        }
    });
});
