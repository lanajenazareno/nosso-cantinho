// =========================================================
// NOSSO CANTINHO ❤️
// SCRIPT PRINCIPAL
// PARTE 1 — ABERTURA E ACESSO
// =========================================================

document.addEventListener("DOMContentLoaded", function () {

    const video = document.getElementById("videoAbertura");
    const sistemaTitularidade =
        document.getElementById("sistemaTitularidade");

    // =========================
    // INICIAR VÍDEO AUTOMATICAMENTE
    // =========================

    video.muted = true;
video.playsInline = true;

video.play().catch(function () {
    console.log("O navegador bloqueou o autoplay.");
});

    // =========================
    // ESTADO INICIAL
    // =========================

    // Esconde a senha enquanto o vídeo estiver passando
    sistemaTitularidade
        .style.setProperty("display", "none", "important");

    // Esconde os termos
    document.getElementById("login")
        .style.setProperty("display", "none", "important");

    // Esconde titularidade validada
    document.getElementById("titularidadeValidada")
        .style.setProperty("display", "none", "important");

    // Esconde conteúdo do site
    document.getElementById("conteudoSite")
        .style.setProperty("display", "none", "important");


    // =========================
    // VÍDEO TERMINOU
    // =========================

    video.addEventListener("ended", function () {

        // Mantém o último frame congelado
        video.pause();

        // Agora libera a caixa de senha
        sistemaTitularidade
            .style.setProperty("display", "block", "important");

    });

});


/* =========================
   VERIFICAR SENHA
   ========================= */

function verificarSenha() {

    const senhaDigitada =
        document.getElementById("senha").value;

    const senhaNormalizada = senhaDigitada
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

    if (senhaNormalizada === "coracao") {

        // =========================
        // ACESSO AUTORIZADO
        // =========================

        const abertura =
            document.getElementById("aberturaSite");

        // Faz vídeo + senha desaparecerem juntos
        abertura.classList.add("aberturaSaindo");

        setTimeout(function () {

            // Esconde completamente a abertura
            abertura.style.display = "none";

            // Mostra os termos
            document.getElementById("login")
                .style.setProperty("display", "block", "important");

        }, 800);

    } else {

        alert("❌ Senha incorreta. Acesso não autorizado.");

        document.getElementById("senha").value = "";
        document.getElementById("senha").focus();
    }
}

/* =========================
   CONFIRMAR TERMOS
   ========================= */

function confirmarTermos() {

    const aceite =
        document.getElementById("aceiteTermos");

    if (!aceite.checked) {

        alert(
            "⚠️ É necessário ler e aceitar os termos de uso para prosseguir."
        );

        return;
    }

    // ESCONDE OS TERMOS
    document.getElementById("login")
        .style.setProperty("display", "none", "important");

    // MOSTRA TITULARIDADE VALIDADA
    const titularidade =
        document.getElementById("titularidadeValidada");

    titularidade
        .style.setProperty("display", "block", "important");

    // MANTÉM O SITE ESCONDIDO
    document.getElementById("conteudoSite")
        .style.setProperty("display", "none", "important");


    // =========================
    // INICIA O VÍDEO JUNTO COM A MENSAGEM
    // =========================

    const video =
        document.getElementById("videoTitularidade");

    if (video) {

        video.currentTime = 0;

        video.play().catch(function (erro) {
            console.log("Não foi possível iniciar o vídeo automaticamente:", erro);
        });
    }

    const videoTitularidade = document.getElementById("videoTitularidade");

videoTitularidade.addEventListener("ended", function () {
    this.pause();
    this.currentTime = this.duration;
});

    // =========================
    // AGUARDA 8 SEGUNDOS
    // =========================

    setTimeout(function () {

        // ESCONDE TITULARIDADE
        titularidade
            .style.setProperty("display", "none", "important");

        // PARA O VÍDEO
        if (video) {
            video.pause();
            video.currentTime = 0;
        }

        // MOSTRA O CONTEÚDO DO SITE
        document.getElementById("conteudoSite")
            .style.setProperty("display", "block", "important");

    }, 8000);
}

// =========================================================
// QUEM É MAIS?
// =========================================================

function responderCoracao(botao) {

    // Identifica a pergunta correspondente
    const pergunta =
        botao.closest(".pergunta-coracao");


    if (!pergunta) {
        return;
    }


    // =====================================================
    // REMOVE SELEÇÃO ANTERIOR
    // =====================================================

    const botoes =
        pergunta.querySelectorAll("button");


    botoes.forEach(function (btn) {

        btn.classList.remove("selecionada");

    });


    // =====================================================
    // MARCA RESPOSTA
    // =====================================================

    botao.classList.add("selecionada");


    // =====================================================
    // VERIFICA QUANTAS FORAM RESPONDIDAS
    // =====================================================

    const perguntas =
        document.querySelectorAll(".pergunta-coracao");


    let respondidas = 0;


    perguntas.forEach(function (item) {

        if (
            item.querySelector(".selecionada")
        ) {

            respondidas++;

        }

    });


    // =====================================================
    // TODAS RESPONDIDAS
    // =====================================================

    if (respondidas === perguntas.length) {

        const final =
            document.getElementById("fimQuemEMais");


        if (final) {

            final.style.display =
                "block";


            final.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        }

    }

}


// =========================================================
// CONTADOR DO RELACIONAMENTO
// =========================================================

function atualizarContador() {

    // 09 de maio de 2026
    const inicio =
        new Date(2026, 4, 9, 0, 0, 0);


    const agora =
        new Date();


    // =====================================================
    // DIFERENÇA DE MESES E DIAS
    // =====================================================

    let anos =
        agora.getFullYear() -
        inicio.getFullYear();


    let meses =
        agora.getMonth() -
        inicio.getMonth();


    let dias =
        agora.getDate() -
        inicio.getDate();


    if (dias < 0) {

        meses--;


        const ultimoDiaMesAnterior =
            new Date(
                agora.getFullYear(),
                agora.getMonth(),
                0
            ).getDate();


        dias +=
            ultimoDiaMesAnterior;

    }


    if (meses < 0) {

        anos--;

        meses += 12;

    }


    // =====================================================
    // HORAS, MINUTOS E SEGUNDOS
    // =====================================================

    const diferenca =
        agora - inicio;


    const horas =
        Math.floor(
            (diferenca /
                (1000 * 60 * 60)) % 24
        );


    const minutos =
        Math.floor(
            (diferenca /
                (1000 * 60)) % 60
        );


    const segundos =
        Math.floor(
            (diferenca /
                1000) % 60
        );


    // =====================================================
    // ATUALIZA HTML
    // =====================================================

    const mesesElemento =
        document.getElementById("meses");


    const diasElemento =
        document.getElementById("dias");


    const horasElemento =
        document.getElementById("horas");


    const minutosElemento =
        document.getElementById("minutos");


    const segundosElemento =
        document.getElementById("segundos");


    if (mesesElemento) {

        mesesElemento.textContent =
            (anos * 12) + meses;

    }


    if (diasElemento) {

        diasElemento.textContent =
            dias;

    }


    if (horasElemento) {

        horasElemento.textContent =
            String(horas).padStart(2, "0");

    }


    if (minutosElemento) {

        minutosElemento.textContent =
            String(minutos).padStart(2, "0");

    }


    if (segundosElemento) {

        segundosElemento.textContent =
            String(segundos).padStart(2, "0");

    }

}

// =========================================================
// INICIAR CONTADOR
// =========================================================

document.addEventListener("DOMContentLoaded", function () {

    atualizarContador();


    setInterval(
        atualizarContador,
        1000
    );

});


// =========================================================
// ADITIVO AO CONTRATO
// =========================================================

function aceitarAditivo() {

    const ciencia =
        document.getElementById("cienciaAditivo");

    const aceite =
        document.getElementById("aceiteAditivo");

    const consulta =
        document.getElementById("consultaAditivo");


    if (
        !ciencia.checked ||
        !aceite.checked ||
        !consulta.checked
    ) {

        alert(
            "Para prosseguir, é necessário declarar ciência e aceitar integralmente o presente Aditivo."
        );

        return;
    }


    // Esconde o aditivo
    document.getElementById("aditivoContrato").style.display =
        "none";


    // Mostra a avaliação
    document.getElementById("interrogatorioContrato").style.display =
        "block";


    // Mostra o quiz
    document.getElementById("quiz").style.display =
        "block";


    // Carrega a primeira pergunta
    carregarPergunta();


    // Vai para a avaliação
    document.getElementById("interrogatorioContrato").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}

// =========================================================
// QUIZ — RENOVAÇÃO DO CONTRATO
// =========================================================

const perguntas = [

    {
        pergunta:
            "Conforme os registros desta história, qual foi a data do primeiro beijo entre as partes?",

        alternativas: [
            "22/02/2026",
            "01/03/2026",
            "11/04/2026",
            "08/03/2026"
        ],

        correta: 1
    },


    {
        pergunta:
            "Qual foi o primeiro apelido registrado pela contratante para se referir ao contratante?",

        alternativas: [
            "Amor",
            "Coração",
            "Mozão",
            "Vida"
        ],

        correta: 1
    },


    {
        pergunta:
            "Qual cor consta como preferência em comum entre as partes?",

        alternativas: [
            "Azul",
            "Preto",
            "Vermelho"
        ],

        correta: 1
    },


    {
        pergunta:
            "Se estivessem em um restaurante e o garçom perguntasse o pedido sem apresentar o cardápio, qual suco provavelmente seria escolhido pela contratante?",

        alternativas: [
            "Acerola",
            "Maracujá",
            "Cajá",
            "Goiaba"
        ],

        correta: 2
    },


    {
        pergunta:
            "Qual escolha teria maior chance de deixar a contratante feliz?",

        alternativas: [
            "Pipoca",
            "Salgadinho",
            "Petisco",
            "Biscoito"
        ],

        correta: 0
    },


    {
        pergunta:
            "Qual foi o primeiro presente entregue pela contratante ao contratante?",

        alternativas: [
            "Meias",
            "Chaveiro",
            "Pulseira",
            "Camisa"
        ],

        correta: 1
    },


    {
        pergunta:
            "Qual característica do contratante costuma ser mencionada primeiro pela contratante?",

        alternativas: [
            "Seu cheirinho",
            "Seu cabelinho liso",
            "Seus olhinhos puxados",
            "Seu sorriso"
        ],

        correta: 1
    },


    {
        pergunta:
            "Qual foi a primeira ideia registrada durante a criação deste espaço virtual?",

        alternativas: [
            "O contrato",
            "A carta",
            "O vídeo",
            "O quiz"
        ],

        correta: 0
    },


    {
        pergunta:
            "Qual é o personagem favorito da contratante?",

        alternativas: [
            "Mickey",
            "Angel",
            "Stitch",
            "Bob Esponja"
        ],

        correta: 2
    },


    {
        pergunta:
            "Após participar dos testes e desenvolvimento deste projeto, qual título foi concedido ao contratante?",

        alternativas: [
            "Programador",
            "Inspiração",
            "Primeiro cobaia",
            "Designer"
        ],

        correta: 2
    }

];


// =========================================================
// VARIÁVEIS DO QUIZ
// =========================================================

let perguntaAtual = 0;

let respostas = [];

let respostasPistas = {
    pista1: "",
    pista2: "",
    pista3: ""
};

let codigoGerado = "";


// =========================================================
// CARREGAR PERGUNTA
// =========================================================

function carregarPergunta() {

    const pergunta =
        perguntas[perguntaAtual];


    document.getElementById("numeroPergunta").textContent =
        `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;


    document.getElementById("barraProgresso").style.width =
        `${((perguntaAtual + 1) / perguntas.length) * 100}%`;


    document.getElementById("pergunta").textContent =
        pergunta.pergunta;


    const alternativas =
        document.getElementById("alternativas");


    alternativas.innerHTML = "";


    pergunta.alternativas.forEach(function (texto, indice) {

        const botao =
            document.createElement("button");


        botao.className =
            "opcao";


        botao.textContent =
            texto;


        if (
            respostas[perguntaAtual] === indice
        ) {

            botao.classList.add("selecionada");

        }


        botao.onclick = function () {

            respostas[perguntaAtual] =
                indice;


            carregarPergunta();

        };


        alternativas.appendChild(botao);

    });


    // Botão anterior

    document.getElementById("btnAnterior").style.display =
        perguntaAtual === 0
            ? "none"
            : "inline-block";


    // Botão próximo

    document.getElementById("btnProximo").textContent =
        perguntaAtual === perguntas.length - 1
            ? "Finalizar avaliação"
            : "Próxima ➡";

}


// =========================================================
// PERGUNTA ANTERIOR
// =========================================================

function anteriorPergunta() {

    if (perguntaAtual > 0) {

        perguntaAtual--;

        carregarPergunta();

    }

}


// =========================================================
// PRÓXIMA PERGUNTA
// =========================================================

function proximaPergunta() {

    if (
        respostas[perguntaAtual] == null
    ) {

        alert(
            "Escolha uma alternativa antes de continuar."
        );

        return;

    }


    if (
        perguntaAtual <
        perguntas.length - 1
    ) {

        perguntaAtual++;

        carregarPergunta();

    }

    else {

        finalizarQuiz();

    }

}


// =========================================================
// FINALIZAR AS 10 QUESTÕES
// =========================================================

function finalizarQuiz() {

    document.getElementById("pergunta").style.display =
        "none";


    document.getElementById("alternativas").style.display =
        "none";


    document.querySelector(".botoesQuiz").style.display =
        "none";


    document.querySelector(".progresso").style.display =
        "none";


    document.getElementById("etapaFinalQuiz").style.display =
        "block";


    document.getElementById("etapaFinalQuiz").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}

// =========================================================
// DECLARAÇÕES DO CONTRATANTE — ETAPA FINAL
// 3 PERGUNTAS ABERTAS
// =========================================================

function verificarPistas() {

    const resposta1 =
        document.getElementById("respostaSentimento1").value.trim();

    const resposta2 =
        document.getElementById("respostaSentimento2").value.trim();

    const resposta3 =
        document.getElementById("respostaSentimento3").value.trim();


    // =====================================================
    // VERIFICA SE AS 3 DECLARAÇÕES FORAM PREENCHIDAS
    // =====================================================

    const todasPreenchidas =
        resposta1 !== "" &&
        resposta2 !== "" &&
        resposta3 !== "";


    return {

        resposta1: resposta1,
        resposta2: resposta2,
        resposta3: resposta3,

        todasPreenchidas: todasPreenchidas

    };

}


// =========================================================
// PROSSEGUIR COM A ANÁLISE
// =========================================================

function prosseguirAnalise() {

    const pistas =
        verificarPistas();


    if (!pistas.todasPreenchidas) {

        alert(
            "Para prosseguir com a análise, responda as 3 declarações."
        );

        return;

    }


    // =====================================================
    // GUARDA AS 3 RESPOSTAS
    // =====================================================

    respostasPistas.pista1 =
        pistas.resposta1;

    respostasPistas.pista2 =
        pistas.resposta2;

    respostasPistas.pista3 =
        pistas.resposta3;


    // =====================================================
    // LIMPA AS PISTAS ANTIGAS
    // =====================================================

    respostasPistas.pista4 = "";
    respostasPistas.pista5 = "";


    // =====================================================
    // ESCONDE A ETAPA FINAL DO QUIZ
    // =====================================================

    document.getElementById("etapaFinalQuiz").style.display =
        "none";


    // =====================================================
    // MOSTRA CONFIRMAÇÃO
    // =====================================================

    document.getElementById("assinaturaQuiz").style.display =
        "block";


    document.getElementById("assinaturaQuiz").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}

// =========================================================
// CONFIRMAR RESPOSTAS
// =========================================================

function confirmarQuiz() {

    const nome =
        document
            .getElementById("nomeConfirmacao")
            .value
            .trim();


    const aceite =
        document
            .getElementById("confirmacaoRespostas")
            .checked;


    if (nome === "") {

        alert(
            "Digite seu nome para confirmar."
        );

        document
            .getElementById("nomeConfirmacao")
            .focus();

        return;

    }


    if (!aceite) {

        alert(
            "Confirme suas respostas antes de continuar."
        );

        return;

    }


    nomeContratante =
        nome;


    document.getElementById("assinaturaQuiz").style.display =
        "none";


    document.getElementById("analiseProcesso").style.display =
        "block";


    document.getElementById("analiseProcesso").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });


    setTimeout(function () {

        mostrarResultado();

    }, 2500);

}


// =========================================================
// CALCULAR NOTA
// =========================================================

function calcularNota() {

    let acertos = 0;


    perguntas.forEach(function (pergunta, index) {

        if (
            respostas[index] === pergunta.correta
        ) {

            acertos++;

        }

    });


    return acertos;

}


// =========================================================
// GERAR CÓDIGO
// =========================================================

function gerarCodigo() {

    return (
        respostasPistas.pista1.length +
        "" +
        respostasPistas.pista2.length +
        "" +
        respostasPistas.pista3.length
    );

}


// =========================================================
// MOSTRAR RESULTADO
// =========================================================

function mostrarResultado() {

    const acertos =
        calcularNota();


    const pistas =
        verificarPistas();


    document.getElementById("analiseProcesso").style.display =
        "none";


    document.getElementById("resultadoFinal").style.display =
        "block";


    document.getElementById("pontuacaoFinal").textContent =
        acertos;


    document.getElementById("statusAvaliacao").textContent =
        acertos >= 7
            ? "Aprovado"
            : "Não aprovado";


    document.getElementById("statusEtapaFinal").textContent =
        pistas.todasPreenchidas
            ? "Concluída"
            : "Pendente";


    document.getElementById("statusConfirmacao").textContent =
        "Confirmada";


    const decisao =
        document.getElementById("decisaoFinal");


    const codigoArea =
        document.getElementById("codigoGerado");


    const novaTentativa =
        document.getElementById("novaTentativa");


    // =====================================================
    // APROVADO
    // =====================================================

    if (
        acertos >= 7 &&
        pistas.todasPreenchidas
    ) {

        if (acertos === 10) {

            decisao.innerHTML = `

                <h3>APROVADO COM EXCELÊNCIA</h3>

                <p>
                    O contratante demonstrou elevado conhecimento
                    acerca dos fatos, memórias e registros desta relação.
                </p>

                <p>
                    <strong>Decisão:</strong><br>
                    Aprovação integral.
                </p>

            `;

        }

        else if (acertos >= 8) {

            decisao.innerHTML = `

                <h3>APROVADO</h3>

                <p>
                    Verifica-se conhecimento satisfatório
                    da relação e de seus principais registros.
                </p>

                <p>
                    <strong>Decisão:</strong><br>
                    Pedido deferido.
                </p>

            `;

        }

        else {

            decisao.innerHTML = `

                <h3>APROVADO POR MARGEM MÍNIMA</h3>

                <p>
                    O contratante atingiu a pontuação mínima
                    exigida para prosseguimento do processo.
                </p>

                <p>
                    <strong>Decisão:</strong><br>
                    Pedido deferido.
                </p>

                <p>
                    Fica registrada a necessidade de maior atenção
                    aos detalhes da relação.
                </p>

            `;

        }


        // =================================================
        // GERA CÓDIGO
        // =================================================

        codigoGerado =
            gerarCodigo();


        document.getElementById("codigoAcesso").textContent =
            codigoGerado;


        codigoArea.style.display =
            "block";


        novaTentativa.style.display =
            "none";


        // =================================================
        // RENOVAÇÃO APROVADA
        // =================================================

        document.getElementById("renovacao").style.display =
            "block";


        document.getElementById("dadosContratante").textContent =
            `Contratante: ${nomeContratante}`;


        document.getElementById("resultadoContratante").textContent =
            `Resultado da avaliação: ${acertos}/10`;

    }


    // =====================================================
    // NÃO APROVADO
    // =====================================================

    else {

        decisao.innerHTML = `

            <h3>PROCESSO INCONCLUSIVO</h3>

            <p>
                Após análise das informações apresentadas,
                não foi atingida a pontuação mínima necessária
                para conclusão do processo.
            </p>

            <p>
                <strong>Decisão:</strong><br>
                Pedido temporariamente indeferido.
            </p>

            <p>
                Uma nova tentativa será concedida ao contratante.
            </p>

        `;


        codigoArea.style.display =
            "none";


        novaTentativa.style.display =
            "block";


        document.getElementById("novaTentativa").scrollIntoView({
            behavior: "smooth"
        });

    }

}


// =========================================================
// COPIAR CÓDIGO
// =========================================================

function copiarCodigo() {

    if (!codigoGerado) {
        return;
    }


    navigator.clipboard.writeText(codigoGerado)

        .then(function () {

            document.getElementById("mensagemCopiado").style.display =
                "block";


            setTimeout(function () {

                document.getElementById("mensagemCopiado").style.display =
                    "none";

            }, 2500);

        })


        .catch(function () {

            alert(
                "Não foi possível copiar automaticamente. Código: " +
                codigoGerado
            );

        });

}


// =========================================================
// NOVA TENTATIVA
// =========================================================

function reiniciarQuiz() {

    perguntaAtual = 0;

    respostas = [];


   respostasPistas = {
    pista1: "",
    pista2: "",
    pista3: ""
};


    codigoGerado = "";


    // =====================================================
    // ESCONDER ETAPAS
    // =====================================================

    document.getElementById("resultadoFinal").style.display =
        "none";


    document.getElementById("novaTentativa").style.display =
        "none";


    document.getElementById("renovacao").style.display =
        "none";


    document.getElementById("certificado").style.display =
        "none";


    document.getElementById("surpresaFinal").style.display =
        "none";


    document.getElementById("videoFinal").style.display =
        "none";


    document.getElementById("etapaFinalQuiz").style.display =
        "none";


    document.getElementById("assinaturaQuiz").style.display =
        "none";


    document.getElementById("analiseProcesso").style.display =
        "none";


    // =====================================================
    // LIMPAR CAMPOS
    // =====================================================

    document.getElementById("respostaPista1").value =
        "";


    document.getElementById("respostaPista2").value =
        "";


    document.getElementById("respostaPista3").value =
        "";


    document.getElementById("respostaPista4").value =
        "";


    document.getElementById("respostaPista5").value =
        "";


    document.getElementById("nomeConfirmacao").value =
        "";


    document.getElementById("confirmacaoRespostas").checked =
        false;


    // =====================================================
    // RESTAURAR QUIZ
    // =====================================================

    document.getElementById("pergunta").style.display =
        "block";


    document.getElementById("alternativas").style.display =
        "block";


    document.querySelector(".botoesQuiz").style.display =
        "flex";


    document.querySelector(".progresso").style.display =
        "block";


    carregarPergunta();


    document.getElementById("quiz").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


// =========================================================
// MOSTRAR RENOVAÇÃO
// =========================================================

function mostrarRenovacao() {

    document.getElementById("resultadoFinal").style.display =
        "none";


    document.getElementById("renovacao").style.display =
        "block";


    document.getElementById("dadosContratante").textContent =
        `Contratante: ${nomeContratante}`;


    document.getElementById("resultadoContratante").textContent =
        `Resultado da avaliação: ${calcularNota()}/10`;


    document.getElementById("renovacao").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}

// =========================
// MOSTRAR CERTIFICADO
// =========================

function mostrarCertificado() {

    document.getElementById("renovacao").style.display =
        "none";

    document.getElementById("certificado").style.display =
        "block";

    document.getElementById("surpresaFinal").style.display =
        "none";

    document.getElementById("videoFinal").style.display =
        "none";

    document.getElementById("certificado").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


// =========================
// MOSTRAR SURPRESA
// =========================

function mostrarSurpresa() {

    document.getElementById("certificado").style.display =
        "none";

    document.getElementById("surpresaFinal").style.display =
        "block";

    document.getElementById("videoFinal").style.display =
        "none";

    document.getElementById("codigoSurpresa").value =
        "";

    document.getElementById("acessoAutorizado").style.display =
        "none";

    document.getElementById("codigoInvalido").style.display =
        "none";

    document.getElementById("codigoSurpresa").style.border =
        "";

    document.getElementById("surpresaFinal").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


// =========================
// VALIDAR CÓDIGO DA SURPRESA
// =========================

function validarCodigoSurpresa() {

    const codigoDigitado =
        document.getElementById("codigoSurpresa")
        .value
        .trim();

    const acesso =
        document.getElementById("acessoAutorizado");

    const erro =
        document.getElementById("codigoInvalido");

    acesso.style.display = "none";
    erro.style.display = "none";

    if (
        codigoDigitado === codigoGerado &&
        codigoGerado !== ""
    ) {

        acesso.style.display =
            "block";

        document.getElementById("codigoSurpresa").style.border =
            "2px solid #8b5e3c";

    } else {

        erro.style.display =
            "block";

        document.getElementById("codigoSurpresa").style.border =
            "";
    }
}


// =========================
// MOSTRAR VÍDEO FINAL
// =========================

function mostrarVideo() {

    document.getElementById("surpresaFinal").style.display =
        "none";

    document.getElementById("videoFinal").style.display =
        "block";

    document.getElementById("videoFinal").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


// =========================
// FINAL DO PROCESSO
// =========================

function encerrarProcesso() {

    document.getElementById("videoFinal").style.display =
        "none";

    document.getElementById("disposicaoFinal").style.display =
        "block";

    document.getElementById("disposicaoFinal").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


// =========================
// INICIALIZAÇÃO FINAL
// =========================

document.addEventListener("DOMContentLoaded", function () {

    // Inicializa o contador
    atualizarContador();

    // Inicializa o quiz
    if (
        document.getElementById("quiz") &&
        document.getElementById("pergunta")
    ) {

        carregarPergunta();

    }

});

// =========================
// CONTROLE DE EXIBIÇÃO
// =========================

function esconderTodasEtapasFinais() {

    const etapas = [
        "resultadoFinal",
        "novaTentativa",
        "renovacao",
        "certificado",
        "surpresaFinal",
        "videoFinal"
    ];

    etapas.forEach(function (id) {

        const elemento = document.getElementById(id);

        if (elemento) {
            elemento.style.display = "none";
        }

    });
}

// =========================
// GARANTIR ESTADO INICIAL
// =========================

document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // ELEMENTOS FINAIS
    // =========================

    const etapasOcultas = [
        "titularidadeValidada",
        "contrato",
        "contratoAssinado",
        "interrogatorioContrato",
        "etapaFinalQuiz",
        "assinaturaQuiz",
        "analiseProcesso",
        "resultadoFinal",
        "novaTentativa",
        "renovacao",
        "certificado",
        "surpresaFinal",
        "videoFinal"
    ];

    etapasOcultas.forEach(function (id) {

        const elemento =
            document.getElementById(id);

        if (elemento) {
            elemento.style.display = "none";
        }

    });

    // =========================
    // CONTEÚDO DO SITE
    // =========================

    const conteudo =
        document.getElementById("conteudoSite");

    if (conteudo) {
        conteudo.style.display = "none";
    }


    // =========================
    // LOGIN
    // =========================

    const login =
        document.getElementById("login");

    if (login) {
        login.style.display = "block";
    }


    // =========================
    // INICIALIZAR QUIZ
    // =========================

    if (
        document.getElementById("quiz") &&
        document.getElementById("pergunta")
    ) {

        carregarPergunta();

    }


    // =========================
    // INICIALIZAR CONTADOR
    // =========================

    atualizarContador();

});
