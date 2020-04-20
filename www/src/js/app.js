
$(document).ready(function () {
  $(".sidemenu__toggler").on("click", function () {
    $(this).parent().toggleClass("is-open");
  });
});

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var user = {
  metaDiariaD1: 8,
  metaDiariaD2: 8,
  metaDiariaD3: 8,
  init: function (arrayData) {
    this.clearValues();
    this.setValues(arrayData);

  },
  clearValues: function () {
    window.localStorage.username = '';
    window.localStorage.id_userFB = '';
    window.localStorage.id_user = '';
    window.localStorage.email = '';
    window.localStorage.token = '';
    window.localStorage.logged = false;
    window.localStorage.date_nasc = "";

    window.localStorage['clock-1'] = '';
    window.localStorage['clock-2'] = '';
    window.localStorage['clock-3'] = '';
  },
  setValues: function (arrayData) {

    window.localStorage.username = arrayData['username'];
    window.localStorage.id_userFB = arrayData['id_userFB'];
    window.localStorage.id_user = arrayData['id_user'];
    window.localStorage.email = arrayData['email'];
    window.localStorage.token = arrayData['token'];
    console.log(arrayData);
    if (typeof (arrayData['date_nasc']) != "undefined") {
      this.formatData(arrayData['date_nasc']);
    }
    window.localStorage.logged = true;
    this.logged = window.localStorage.logged;
  },
  formatData: function (data) {
    var dt = data.split("-");
    window.localStorage.date_nasc = dt["2"] + "/" + dt[1] + "/" + dt["0"];
  },

  clock1: new Clock($(".card-1"), 1),
  clock2: new Clock($(".card-2"), 2),
  clock3: new Clock($(".card-3"), 3)
};
var app = {
  // Application Constructor
  initialize: function () {
    for (let i = 1; i <= 3; i++) {
      $(".value-challenge-" + i).html(user["metaDiariaD" + i]);
    }
    this.bindEvents();
    this.loadingResults();

  },
  // Bind Event Listeners
  //
  // Bind any events that are required on startup. Common events are:
  // 'load', 'deviceready', 'offline', and 'online'.
  bindEvents: function () {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },
  // deviceready Event Handler
  //
  // The scope of 'this' is the event. In order to call the 'receivedEvent'
  // function, we must explicitly call 'app.receivedEvent(...);'
  onDeviceReady: function () {
    // window.plugins.PushbotsPlugin.initialize("5e9cb1b98e4e070a0c32cd7b", { "android": { "sender_id": "278077712979" } });

    // // Only with First time registration
    // window.plugins.PushbotsPlugin.on("registered", function (token) {
    //   console.log("Registration Id:" + token);
    // });
    // //Get user registrationId/token and userId on PushBots, with evey launch of the app even launching with notification
    // window.plugins.PushbotsPlugin.on("user:ids", function (data) {
    //   console.log("user:ids" + JSON.stringify(data));
    // });
    // this.loadingResults();
  },

  onRouteLocation: function (route, verifyUser = true) {
    if (verifyUser) {
      if (window.localStorage.logged) {
        window.location.href = route + ".html";
      } else {
        window.location.href = "initcadastro.html";
      }
    } else {
      window.location.href = route + ".html";
    }
  },
  loadingResults: function () {
    get_results_challenge();
    this.atualizarValores();
  },
  atualizarValores: function () {
    var sum_total = 0;
    $(JSON.parse(String(window.localStorage.resultsChallenge))).each(function (i, val) {
      sum_total += parseInt(val.qtd_row);
      $(".count-challenge-" + val.id_desafio).html(val.qtd_row);
      app.loopDots(val.id_desafio, val.qtd_row);
    });

    let percent = (sum_total / (user.metaDiariaD1 + user.metaDiariaD2 + user.metaDiariaD3)) * 100 + "%";
    this.valorPorcentagem(percent);
    $(".count-challenge-total").html(sum_total);
  },
  loopDots: function (id_desafio, qtd_dots) {
    let context_dots = $(".card-simple-" + id_desafio + " .challenges__dots");

    if (qtd_dots <= (parseInt(user["metaDiariaD" + id_desafio]) - 1)) {
      let span_dots = '';
      context_dots.parent().removeClass("completo");
      context_dots.html(span_dots);
      $(qtd_dots).each(function (idx) {
        span_dots += "<span class='checked'></span> ";
      });
      span_dots += "<span></span> ";
      context_dots.html(span_dots);
    } else {
      context_dots.parent().addClass("completo");
    }
  },
  valorPorcentagem(value) {
    $(".meta__porcentagem").html(value);
    $('head').append('<style>.sidemenu-menu__bar:before{width:' + value + ' !important;}</style>');
    $(".meta .meta__bar").css("width", value);
  }

};
// app.onRouteLocation("home");
if (window.localStorage.logged) {
  $(".username").html(window.localStorage.username);
  if (typeof (window.localStorage.id_userFB) != undefined && window.localStorage.id_userFB != '') {
    $(".image-user").attr("src", "http://graph.facebook.com/ " + window.localStorage.id_userFB + "/picture?type=small");
  }

}