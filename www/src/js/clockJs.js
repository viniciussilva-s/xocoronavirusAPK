class Clock {

    constructor(elemento, id) {
        this.countdownInterval = null;
        this.clockInterval = null;
        this.card = $(".card-" + id);
        this.hrClock = 0;
        this.minClock = 0;
        this.segClock = 0;
        this.dayClock = 0;
        this.ide = id;
        this.minDefault = 6;
        this.secDefault = 1;
        this.countdownInterval = null;
        this.clockInterval = null;
        window.localStorage['controlador-' + id] = "false";

        let control = String(window.localStorage['controlador-' + id]);

        this.verifyNumber(String(window.localStorage['clock-' + id]));
        if (control == "true") {
            this.timer();
        } else {
            this.cronometro();
        }
    }
    verifyNumber(number) {
        if (number != '') {
            let qtd_num = number.split(":");
            if (qtd_num.length == 2) {
                this.setValueClock(qtd_num[1], qtd_num[0]);
            } else if (qtd_num.length == 3) {
                this.setValueClock(qtd_num[2], qtd_num[1], qtd_num[0]);
            }
        }
    }
    setValueClock(seg = 0, min = 0, hr = 0) {
        this.segClock = seg;
        this.minClock = min;
        this.hrClock = hr;
    }
    initStatusCard() {
        this.card.removeClass("ativo esgotado");
    }
    alterarStatusCard() {
        this.card.hasClass("ativo") ?
            this.card.addClass("esgotado") :
            this.card.addClass("ativo").addClass("esgotado");
    }

    timer() {
        let minRegressivo = parseInt(this.minClock);
        let segRegressivo = parseInt(this.segClock);
        var timer = this.card.find(".countdown");
        initStatusCard();
        clearInterval(this.countdownInterval);
        clearInterval(this.clockInterval);
        this.countdownInterval = setInterval(() => {
            if ((minRegressivo <= 4 && minRegressivo != 0)
                && (segRegressivo <= 59 && segRegressivo != 0)) {
                this.card.addClass("ativo");
            } else if (minRegressivo == 0 && segRegressivo == 0) {
                window.localStorage['controlador-' + this.ide] = false;
                this.setValueClock();
                this.cronometro();
            }
            if (minRegressivo > 0 || segRegressivo > 0) {

                if (segRegressivo == 0) {
                    segRegressivo = 59;
                    minRegressivo = minRegressivo - 1;
                } else {
                    segRegressivo = segRegressivo - 1;

                }
                if (minRegressivo.toString().length == 1) {
                    minRegressivo = "0" + minRegressivo;
                }
                if (segRegressivo.toString().length == 1) {
                    segRegressivo = "0" + segRegressivo;
                }
                window.localStorage["clock-" + this.ide] = minRegressivo + ":" + segRegressivo;
                window.localStorage['controlador-' + this.ide] = true;

                timer.html(minRegressivo + ":" + segRegressivo);
            }
        }, 1000);
    }

    cronometro() {
        this.alterarStatusCard();
        let sec = this.segClock;
        let min = this.minClock;
        let hr = this.hrClock;
        var clock = this.card.find(".cronometro");
        clearInterval(this.countdownInterval);
        window.localStorage['controlador-' + this.ide] = "false";

        this.clockInterval = setInterval(() => {
            sec = parseInt(sec) + 1;
            let new_clock = '';
            if (min == 59 && sec == 59) {
                min = 0;
                sec = 0;
                hr = parseInt(hr) + 5;
            } else if (sec == 59) {
                sec = 0;
                min = parseInt(min) + 1;
            }
            if (min.toString().length == 1) {
                min = "0" + min;
            }
            if (sec.toString().length == 1) {
                sec = "0" + sec;
            }
            let day = '';
            if (hr >= "24") {
                day = parseInt((parseInt(hr) / 24));
            }
            new_clock = (day >= "1" ? day + "d" : (hr >= "1" ? ((hr < 10) ? '0' : '') + hr + "h" : min + ':' + sec)
            );
            clock.html(
                "- " + String(new_clock)
            );
            window.localStorage["clock-" + this.ide] = (hr >= "1" ? (((hr < 10) ? '0' : '') + hr + ':' + min + ':' + sec) : (min + ':' + sec));
        }, 10);
    }

    resetTimer() {
        this.initStatusCard();
        this.minClock = this.minDefault;
        this.secClock = this.secDefault;

        this.timer();
    }
}