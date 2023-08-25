function iniciaJogo(){

let url = window.location.search;
let nivel_jogo = url.replace("?", "");

let tempo_segundo = nivel_jogo == 1 ? 120 : nivel_jogo == 2 ? 60 : 30;

document.getElementById('cronometro').innerHTML = tempo_segundo;
const qtde_baloes = 80;

cria_baloes(qtde_baloes);

document.getElementById('baloes_inteiros').innerHTML = qtde_baloes;
document.getElementById('baloes_estourados').innerHTML = 0;

contagem_tempo(tempo_segundo + 1)
}


function contagem_tempo(segundos){
  segundos = segundos - 1;

  if (segundos == -1) {
    clearTimeout(timerId);
    game_over();
    return false;
  }
  document.getElementById('cronometro').innerHTML = segundos;

  timerId = setTimeout("contagem_tempo("+segundos+")",1000);
}

function game_over(){
   remove_eventos_baloes();
  alert('AAAAAAAAh Acabou o tempo, voce nao conseguiu!')
}

function remove_eventos_baloes() {
    let i = 1;
    while(document.getElementById('b'+i)) {
        
        document.getElementById('b'+i).onclick = '';
        i++; 
    }
}

function cria_baloes(qtde_baloes){
for(let i = 1; i<= qtde_baloes; i++){
    let balao = document.createElement("img");
    balao.src = "imagens/balao_azul_pequeno.png";
	balao.style.margin = '10px';
  balao.id = 'b'+i;
  balao.onclick = function(){ estourar(this); };

    document.getElementById('cenario').appendChild(balao);
        }
}

function estourar(e){
  let id_balao = e.id;
  document.getElementById(id_balao).setAttribute("onclick","");
document.getElementById(id_balao).src = "imagens/balao_azul_pequeno_estourando.png";
pontuacao(-1);
}

function pontuacao(acao){
let baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML;
let baloes_estourados = document.getElementById('baloes_estourados').innerHTML;

baloes_inteiros = parseInt(baloes_inteiros);
baloes_estourados = parseInt(baloes_estourados);

baloes_inteiros = baloes_inteiros + acao;
baloes_estourados = baloes_estourados - acao;

document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
document.getElementById('baloes_estourados').innerHTML = baloes_estourados;
situacao_jogo(baloes_inteiros);
}

function situacao_jogo(baloes_inteiros){
  if (baloes_inteiros == 0) {
    alert('UUUUHFA ,aha você conseguiu!');
    parar_jogo();


  }
}

function parar_jogo(){
  clearTimeout(timerId);
}
