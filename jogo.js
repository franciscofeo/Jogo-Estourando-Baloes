
var timerId = null; // variável que armazena a chamada da função timeout


function iniciajogo(){ // essa função vai ser chamada quando a página for recarregada

    var url = window.location.search; // aqui eu pego o valor 1, 2 ou 3 da dificuldade
    
    var nivel_jogo = url.replace("?", "") // substitui o interregoção por nada

    var tempo_segundos = 0;

    if(nivel_jogo == 1){  // nivel 1 é 120 s
        tempo_segundos = 120

    } else  if(nivel_jogo == 2){  // nivel 2 é 60 s
        tempo_segundos = 60        

    } else  if(nivel_jogo == 3){  // nivel 3 é 30 s
        tempo_segundos = 30

    }

    // inserindo o valor dos segundos no span
    document.getElementById("cronometro").innerHTML =  tempo_segundos // insere um conteúdo dentro da tag

    // quantidade inicial de balões
    var qntdd_baloes = 70;    

     // aqui ele chama a função abaixo para criar os balões
    cria_baloes(qntdd_baloes);

    // imprimir qntdd de baloes inteiros e baloes estourados
    document.getElementById('baloes_inteiros').innerHTML = qntdd_baloes
    document.getElementById('baloes_estourados').innerHTML = 0

    // colocando a dinamica no cronometro

    contagem_tempo(tempo_segundos + 1)

}

function cria_baloes(qntdd_baloes){
    for(var i = 1; i <= qntdd_baloes; i++){
        var balao = document.createElement("img"); // cria o elemento img que vai ser a imagem dos balões azuis
        balao.src = 'imagens/balao_azul_pequeno.png'; // endereço da imagem
        balao.style.margin = '10px' // margem para deixar mais organizado
        balao.id = 'b' + i; // sempre vamos ter id's diferentes, isso vai facilitar na hora de colocar o onclick neles
        balao.onclick = function(){estourar(this); } // esse this quer dizer que estamos referenciando o próprio elemento, assim associamos o evento onclick a função estourar()

        document.getElementById("cenario").appendChild(balao); // adicionamos o elemento balao na div do cenario
    }
}

function contagem_tempo(segundos){

    segundos = segundos - 1 // decremento dos segundos

    if(segundos == -1){
        clearTimeout(timerId) // essa função limpa a chamada da função timeout, ou seja, para a execução do settimeout qndo segundos for igual a -1
        alert('Fim de jogo, você não estourou todos os balões a tempo!')
        return false; // faz o cronometro parar no 0
    }

    document.getElementById('cronometro').innerHTML = segundos

    timerId = setTimeout("contagem_tempo("+segundos+")", 1000); // executa a função a cada 1000 milisegundos

}

function estourar(e){
    var id_balao = e.id; // a variavel id_balao vai receber varios id's de cada balão
    document.getElementById(id_balao).src = "imagens/balao_azul_pequeno_estourado.png"
    pontuacao(-1) // pois a cada clique eu vou ter -1 balão inteiro
}

function pontuacao(acao){
    var baloes_inteiros  = document.getElementById('baloes_inteiros').innerHTML
    var baloes_estourados = document.getElementById('baloes_estourados').innerHTML

    baloes_inteiros = parseInt(baloes_inteiros)
    baloes_estourados = parseInt(baloes_estourados)

    baloes_inteiros = baloes_inteiros + acao    // a acao vale -1, como definimos la em cima
    baloes_estourados = baloes_estourados - acao 

    document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros
    document.getElementById('baloes_estourados').innerHTML = baloes_estourados

    situacao_jogo(baloes_inteiros)

}

function situacao_jogo(baloes_inteiros){
    if(baloes_inteiros == 0){
        alert('Você ganhou, parabéns!')
        parar_jogo() // para o cronometro quando todos os baloes forem estourados
    }
}

function parar_jogo(){
    clearTimeout(timerId) // para o cronometro
}