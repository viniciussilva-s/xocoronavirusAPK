var estados = '<option selected disabled ></option>';
var uf = $("#uf");
uf.html("");

$.each(cidadesbrasil.estados, function (i, val) {
  estados += '<option value="' + val.sigla + '">' + val.nome + '</option>';
});
uf.html(estados);
uf.change(function () {
  var cidades = '<option selected disabled ></option>';
  var selectedVal = this.selectedOptions[0].value;
  var selectedIndex = $(this).find("option").index($(this.selectedOptions)) - 1;

  var selectedUf = cidadesbrasil.estados[selectedIndex].cidades;

  $.each(selectedUf, function (i, val) {
    cidades += '<option value="' + val + '">' + val + '</option>';
  });

  $("#city").html(cidades);

  // $.each(cidadesbrasil.estados, function (i, val) {
  //   var
  //   if (val.sigla === uf.val()) {
  //     // cidades += '<option value="' + val.sigla + '">' + val.nome + '</option>';
  //     // $("#city").autocomplete({
  //     //   appendTo: "#someElem",
  //     //   source: cidadesbrasil.estados[i].cidades
  //     // });
  //   }
  // });
});
