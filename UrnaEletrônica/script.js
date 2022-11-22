/* VARIAVEIS DE CONTROLE */
let seuVotoPara = document.querySelector('.d_1_1 span');
let cargo = document.querySelector('.d_1_2 span')
let numeros = document.querySelector('.d_1_3')
let descricao = document.querySelector('.d_1_4')
let foto = document.querySelector('.d_1_right')
let aviso = document.querySelector('.d_2')

/*VARIAVEIS DE AMBIENTE*/
let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let votos = [];


/* FUNÇÕES */
function comecarEtapa() {
    let etapa = etapas[etapaAtual];
    let numeroHTML = ''
    votoBranco = false
    numero = ''
    for (i = 0; i < etapa.numeros; i++) {
        if(i === 0) {
            numeroHTML += '<div class="numero pisca"></div>'
        } else {
            numeroHTML += '<div class="numero"></div>'
        }
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    numeros.innerHTML = numeroHTML;
    descricao.innerHTML = ''
    foto.innerHTML = ''
    aviso.style.display = 'none';
}

function atualizaInterface() {
    let etapa = etapas[etapaAtual];
    let candidado = etapa.candidatos.filter((item)=>{
        if (item.numero === numero) {
            return true
        } else {
            return false
        }
    });
    if (candidado.length > 0) {
        candidado = candidado[0];
        seuVotoPara.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidado.nome}<br/> Partido: ${candidado.partido}`
        aviso.style.display = 'block';
        let fotoHTML = ''
        for(let i in candidado.fotos)
        if (candidado.fotos[i].small) {
            fotoHTML += `<div class="imagem small"><img src="images/${candidado.fotos[i].url}" alt=""> ${candidado.fotos[i].legenda}`
        } else {
            fotoHTML += `<div class="imagem"><img src="images/${candidado.fotos[i].url}" alt="">
            ${candidado.fotos[i].legenda}
        </div>`
        }
        foto.innerHTML = fotoHTML;
    } else {
        seuVotoPara.style.display = 'block';
        descricao.innerHTML = '<div class="aviso_grande pisca">VOTO NULO</div>'
        aviso.style.display = 'block';

    }
};

function clicou(n) {
    let elNumero = document.querySelector('.numero.pisca');
    if (elNumero !== null) {
        elNumero.innerHTML = n
        numero = `${numero}${n}`
        elNumero.classList.remove ('pisca');
        if (elNumero.nextElementSibling !== null) {
            elNumero.nextElementSibling.classList.add ('pisca');
        } else {
            atualizaInterface();
        }
    }
}

function corrige() {
    comecarEtapa()
}

function branco() {
    numero = ''
    let etapa = etapas[etapaAtual];
    if (numero === '') {
        votoBranco = true
        seuVotoPara.style.display = 'block';
        cargo.innerHTML = etapa.titulo;
        numeros.innerHTML = '';
        descricao.innerHTML = '<div class="aviso_grande pisca">VOTO EM BRANCO</div>'
        aviso.style.display = 'block';
        foto.innerHTML = ''
    } else {

    }
}

function confirma() {
    let etapa = etapas[etapaAtual];
    let votoConfirmado = false
    if (votoBranco === true){
        votoConfirmado = true 
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        });
    } else if (numero.length === etapa.numeros ) {
        votoConfirmado = true
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        });
    }
    if (votoConfirmado) {
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined) {
            comecarEtapa();
        } else {
            document.querySelector('.tela').innerHTML = '<div class="aviso_gigante pisca">FIM</div>'
            console.log (votos)
        }
    }
}


comecarEtapa();