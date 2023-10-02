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
      urlBack: `${query[3].split("=")[1]}?${paramsUrlBack}`,
      username: query[4].split("=")[1],
    };
    const { name, score } = params;
    const question = document.getElementById("nameLabel");
    if (score && score != "undefined") {
      if (name && name != "undefined") {
        question.innerHTML = `${name}, o que te motivou a dar nota ${score}?`;
      } else {
        question.innerHTML = `O que te motivou a dar nota ${score}?`;
      }
    }

    return params;
  }
  return { id: null, name: null, score: null, url: null, username: null };
}

window.addEventListener("load", handleQuestion);

function handleSubmit(e) {
  document.getElementById("loading").classList.toggle("none");
  e.preventDefault();
  const answer = document.getElementById("answer").value;
  const { id, name, score, urlBack, username } = handleQuestion();
  const options = {
    method: "POST",
    body: JSON.stringify([id, name, score, answer, username]),
    mode: "no-cors",
  };
  fetch(
    "https://script.google.com/macros/s/AKfycbxdn0MZE6CmjauHIOlsn_OZq_XyshVcSupNV9MVQwZgpbsVcZ4-ZSn23yKFX2L_NotG/exec?action=nps",
    options
  ).then(() => {
    document.getElementById("congrats").classList.toggle("none");
    document.getElementById("answerForm").classList.toggle("none");
    document.getElementById("loading").classList.toggle("none");
    setTimeout(() => {
      window.location.href = urlBack;
    }, 1500);
  });
}

document.getElementById("answerForm").addEventListener("submit", handleSubmit);
