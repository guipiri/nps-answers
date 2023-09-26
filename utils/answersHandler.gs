function doGet(e) {
  var planilha = SpreadsheetApp.openByUrl(
    "https://docs.google.com/spreadsheets/d/1V9nlkNWe7r-4xENWOZBKaJgR74gfIRnVVHhdGhczdM4/edit#gid=0"
  ).getSheetByName("NPS");
  var dataAtual = new Date();
  var dados = e.parameter;

  if (dados.action == "nps") {
    planilha.appendRow([dados.email, dados.nota, dataAtual]);
    SpreadsheetApp.flush();
  }
  return ContentService.createTextOutput(JSON.stringify(e.parameter.action));
}

function doPost(e) {
  if (typeof e !== "undefined") {
    var planilhaNps = SpreadsheetApp.openByUrl(
      "https://docs.google.com/spreadsheets/d/1V9nlkNWe7r-4xENWOZBKaJgR74gfIRnVVHhdGhczdM4/edit#gid=0"
    ).getSheetByName("NPS");
    var planilhaCsatFtd = SpreadsheetApp.openByUrl(
      "https://docs.google.com/spreadsheets/d/1V9nlkNWe7r-4xENWOZBKaJgR74gfIRnVVHhdGhczdM4/edit#gid=0"
    ).getSheetByName("CSAT FTD");

    var dataAtual = new Date();
    var dados = JSON.parse(e.postData.contents);
    dados.push(dataAtual);

    var action = e.parameter.action;

    if (action == "nps") {
      var result = planilhaNps
        .getRange(1, 1, planilhaNps.getLastRow())
        .getValues();
      var ids = [];
      result.forEach((item) => {
        ids.push(item[0]);
      });
      var inputRow = ids.indexOf(dados[0]);

      if (inputRow != -1) {
        planilhaNps.getRange(inputRow + 1, 4).setValue(dados[3]);
      } else {
        planilhaNps.appendRow(dados);
      }
    } else if (action == "csat-ftd") {
      planilhaCsatFtd.appendRow(dados);
    }

    // Até aqui as alterações estão com status pendente
    // Na linha abaixo as alterações são aplicadas na planilha.
    SpreadsheetApp.flush();

    // Retorna uma mensagem de sucesso para o remetente
    return ContentService.createTextOutput(JSON.stringify(e));
  }
}

function teste() {
  var planilhaNps = SpreadsheetApp.openByUrl(
    "https://docs.google.com/spreadsheets/d/1V9nlkNWe7r-4xENWOZBKaJgR74gfIRnVVHhdGhczdM4/edit#gid=0"
  ).getSheetByName("NPS");
  var valuesId = planilhaNps
    .getRange(1, 1, planilhaNps.getLastRow())
    .getValues();
  var ids = [];
  valuesId.forEach((item) => {
    ids.push(item[0]);
  });

  Logger.log(ids);
}

function getToken() {
  Logger.log(ScriptApp.getOAuthToken());
}
