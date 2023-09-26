function handleQuestion() {
  const href = window.location.href.split("?")[1];
  const paramsUrlBack = location.href.split("?")[2] || "";
  if (href) {
    const query = href.split("&");
    query.sort();
    const params = {
      id: query[0].split("=")[1],
      name: query[1].split("=")[1],
      score: query[2].split("=")[1],
      urlBack: `${query[3].split("=")[1]}?${paramsUrlBack}`
    };
  
    const { name, score} = params;
    const question = document.getElementById("nameLabel");
    if (score && score != "undefined") {
      if (name && name != "undefined"){
        question.innerHTML = `${name}, o que te motivou a dar nota ${score}?`     
      } else {
        question.innerHTML = `O que te motivou a dar nota ${score}?`
      }
    }
  
    return params;
  }
  return {id:null, name: null, score: null, url: null  };
}

window.addEventListener("load", handleQuestion)

function handleSubmit(e) {
  document.getElementById("loading").classList.toggle("none");
  e.preventDefault();
  const answer = document.getElementById("answer").value;
  const {id, name, score, urlBack} = handleQuestion();
  const options = {
    method: "POST",
    body: JSON.stringify([id, name, score, answer]),
    mode: "no-cors"
  }
  fetch("https://script.google.com/macros/s/AKfycbz4k1kOg1y1WHrJ8f3B4qJcA5z_C065IkUEXSAZCpnM9GWb8FM60rBt2fxoFCrwB33Z/exec?action=nps", options)
    .then(()=>{
      document.getElementById("congrats").classList.toggle("none");
      document.getElementById("answerForm").classList.toggle("none");
      document.getElementById("loading").classList.toggle("none");
      setTimeout(()=>{window.location.href=urlBack},1500)
    })
}

document.getElementById("answerForm").addEventListener("submit", handleSubmit)