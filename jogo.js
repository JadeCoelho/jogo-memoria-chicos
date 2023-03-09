const grid = document.querySelector(".grid");

const chicos = [
  "c1",
  "c2",
  "c3",
  "c4",
  "c5",
  "c6",
  "c7",
  "c8",
  "c9",
  "c10",
  "p1",
  "p2",
  "p3",
  "p4",
  "p5",
  "p6",
  "p7",
  "p8",
  "p9",
  "p10",
];

const tempo = document.querySelector(".tempo");

const criaElemento = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
};

const verificaJogo = () => {
  const cardsDesabilitados = document.querySelectorAll(".card-desabilitado");
  if (cardsDesabilitados.length === 40) {
    clearInterval(this.loop);
    alert(
      `Parabéns! Você conseguiu! 🤠 Seu tempo foi de ${tempo.innerHTML} segundos`
    );
  }
};

let primeira = "";
let segunda = "";

const verificaCards = () => {
  const primeirochicx = primeira.getAttribute("data-chicx");
  const segundochicx = segunda.getAttribute("data-chicx");

  if (primeirochicx === segundochicx) {
    primeira.firstChild.classList.add("card-desabilitado");
    segunda.firstChild.classList.add("card-desabilitado");

    primeira = "";
    segunda = "";

    verificaJogo();
  } else {
    setTimeout(() => {
      primeira.classList.remove("revela-card");
      segunda.classList.remove("revela-card");

      primeira = "";
      segunda = "";
    }, 500);
  }
};

const revelaCard = ({ target }) => {
  if (target.parentNode.className.includes("revela-card")) {
    return;
  }

  if (primeira === "") {
    target.parentNode.classList.add("revela-card");
    primeira = target.parentNode;
  } else if (segunda === "") {
    target.parentNode.classList.add("revela-card");
    segunda = target.parentNode;

    verificaCards();
  }
};

const criaCard = (chicx) => {
  const card = criaElemento("div", "card");
  const frente = criaElemento("div", "frente face");
  const verso = criaElemento("div", "verso face");

  frente.style.backgroundImage = `url(/imgs/chicos/${chicx}.jpeg)`;

  card.appendChild(frente);
  card.appendChild(verso);

  card.addEventListener("click", revelaCard);
  card.setAttribute("data-chicx", chicx);

  return card;
};

const carregaJogo = () => {
  const duplicaChicos = [...chicos, ...chicos];

  const embaralha = duplicaChicos.sort(() => Math.random() - 0.5);

  embaralha.forEach((chicx) => {
    const card = criaCard(chicx);
    grid.appendChild(card);
  });
};

const startTempo = () => {
  this.loop = setInterval(() => {
    // const tempoAtual = Number(tempo.innerHTML)
    const tempoAtual = +tempo.innerHTML;
    tempo.innerHTML = tempoAtual + 1;
  }, 1000);
};

window.onload = () => {

  startTempo();
  carregaJogo();
};
