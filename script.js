// =========================================================
// NOSSO CANTINHO ❤️
// SCRIPT PRINCIPAL
// PARTE 1 — ABERTURA E ACESSO
// =========================================================

document.addEventListener("DOMContentLoaded", function () {
    const video = document.getElementById("videoAbertura");
    const sistemaTitularidade = document.getElementById("sistemaTitularidade");

    // Esconde a senha enquanto o vídeo estiver passando
    sistemaTitularidade.style.display = "none";

    video.muted = true;
    video.playsInline = true;
    video.loop = false;

    function mostrarSenha() {
        video.pause();

        // Exibe a senha somente após o término do vídeo
        sistemaTitularidade.style.display = "block";
    }

    // Aguarda o vídeo terminar
    video.addEventListener("ended", mostrarSenha, { once: true });

    video.play().catch(function (erro) {
        console.log("Erro ao reproduzir o vídeo de abertura:", erro);
    });
});

// =========================
// VERIFICAR SENHA
// =========================

function verificarSenha() {
    const campoSenha = document.getElementById("senha");
    const abertura = document.getElementById("aberturaSite");
    const termos = document.getElementById("login");
    const titularidade = document.getElementById("titularidadeValidada");
    const conteudo = document.getElementById("conteudoSite");
    const menu = document.getElementById("menuPrincipal");

    if (!campoSenha || campoSenha.value.trim() !== "coracao") {
        alert("Senha incorreta. Tente novamente.");

        if (campoSenha) {
            campoSenha.value = "";
            campoSenha.focus();
        }

        return;
    }

    // Esconde as outras telas
    if (titularidade) {
        titularidade.style.setProperty("display", "none", "important");
    }

    if (conteudo) {
        conteudo.style.setProperty("display", "none", "important");
    }

    if (menu) {
        menu.style.display = "none";
    }

    // Esconde a abertura
    if (abertura) {
        abertura.style.display = "none";
    }

    // Mostra os termos de uso
    if (termos) {
        termos.style.setProperty("display", "block", "important");
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
    // AGUARDA 7 SEGUNDOS
    // =========================

    setTimeout(function () {

        // ESCONDE TITULARIDADE
        titularidade
            .style.setProperty("display", "none", "important");

        // PARA O VÍDEO
        if (video) {
            video.pause();
        }

        // MOSTRA O CONTEÚDO DO SITE
        document.getElementById("conteudoSite")
            .style.setProperty("display", "block", "important");

    }, 7000);
}

// =========================================================
// MENU PRINCIPAL — NOSSO CANTINHO 
// =========================================================

function abrirHistoria() {
    const menu = document.getElementById("menuPrincipal");
    const historia = document.getElementById("historiaAniversario");
    const contrato = document.getElementById("contratoNamoro");

    if (!menu || !historia || !contrato) {
        alert("Não foi possível abrir as lembranças. Verifique os elementos do menu.");
        return;
    }

    menu.style.display = "none";
    contrato.style.display = "none";
    historia.style.display = "block";

    window.scrollTo({ top: 0, behavior: "smooth" });
}

function abrirContrato() {
    const menu = document.getElementById("menuPrincipal");
    const historia = document.getElementById("historiaAniversario");
    const contrato = document.getElementById("contratoNamoro");

    if (!menu || !historia || !contrato) {
        alert("Não foi possível abrir o contrato. Verifique os elementos do menu.");
        return;
    }

    menu.style.display = "none";
    historia.style.display = "none";
    contrato.style.display = "block";

    window.scrollTo({ top: 0, behavior: "smooth" });
}

function voltarMenu() {
    const menu = document.getElementById("menuPrincipal");
    const historia = document.getElementById("historiaAniversario");
    const contrato = document.getElementById("contratoNamoro");

    if (!menu || !historia || !contrato) {
        alert("Não foi possível voltar ao menu. Verifique os elementos do menu.");
        return;
    }

    historia.style.display = "none";
    contrato.style.display = "none";
    menu.style.display = "block";

    window.scrollTo({ top: 0, behavior: "smooth" });
}

const SUPABASE_URL = "https://spfgfesqgxfygtgxegvf.supabase.co";
const SUPABASE_KEY = "sb_publishable_9gjjw2NYkRvEwwr3zZgPyA_f8jsA8jU";
const CASAL_ID = "6a9b8c1d-2e3f-4a5b-8c7d-9e0f1a2b3c4d";

const clienteSupabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
);
window.supabaseClient = clienteSupabase;
let compromissos = [];
let usuarioConectado = false;
let carregando = false;
let compromissoEditando = null;
let canalAgenda = null;

const hoje = new Date();
let dataVisualizada = new Date(
  hoje.getFullYear(),
  hoje.getMonth(),
  1
);

let dataSelecionada = dataLocal(hoje);

function dataLocal(data) {
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const dia = String(data.getDate()).padStart(2, "0");
  return `${ano}-${mes}-${dia}`;
}

function dataPorExtenso(data) {
  const [ano, mes, dia] = data.split("-").map(Number);
  return new Date(ano, mes - 1, dia).toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

function mostrarMensagem(texto) {
  const lista = document.getElementById("agendaLista");
  if (lista) {
    lista.innerHTML = "";
    const mensagem = document.createElement("p");
    mensagem.textContent = texto;
    lista.appendChild(mensagem);
  }
}

async function verificarSessao() {
  try {
    const { data, error } = await clienteSupabase.auth.getSession();

    if (error) throw error;

    usuarioConectado = Boolean(data.session);

    if (!usuarioConectado) {
      mostrarMensagem(
        "Esta agenda precisa ser conectada à conta do casal neste dispositivo antes de carregar os compromissos."
      );
      return false;
    }

    return true;
  } catch (erro) {
    console.error("Erro ao verificar sessão:", erro);
    mostrarMensagem("Não foi possível verificar a conexão da agenda.");
    return false;
  }
}

async function carregarCompromissos() {
  if (!usuarioConectado || carregando) return;

  carregando = true;

  try {
    const { data, error } = await clienteSupabase
      .from("agenda_events")
      .select("*")
      .eq("couple_id", CASAL_ID)
      .order("event_date", { ascending: true });

    if (error) throw error;

    compromissos = (data || []).map(item => ({
      id: item.id,
      titulo: item.title || "",
      data: String(item.event_date || "").slice(0, 10),
      hora: item.event_time
        ? String(item.event_time).slice(0, 5)
        : "",
      local: item.location || "",
      detalhes: item.details || "",
      lembrete: Boolean(item.reminder_enabled),
      lembreteMinutos: item.reminder_minutes ?? 30,
      concluido: Boolean(item.completed)
    }));

    renderizarCalendario();
    renderizarCompromissos();

  } catch (erro) {
    console.error("Erro ao carregar compromissos:", erro);
    mostrarMensagem("Não foi possível carregar os compromissos.");

  } finally {
    carregando = false;
  }
}

<script>
const VAPID_PUBLIC_KEY = "BOD1z2LPVE2HG9TvBdBHaUNSEvfay8DCDmYpqNibKOS3-vp8301E2uiQVr7Z9iW2qca7uu6Fdn4ekdVQx10QKSg";

function converterChaveBase64(valor) {
  const base64 = valor
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  const decodificado = atob(
    base64 + "=".repeat((4 - base64.length % 4) % 4)
  );

  return Uint8Array.from(
    decodificado,
    caractere => caractere.charCodeAt(0)
  );
}

document.addEventListener("DOMContentLoaded", () => {
  const botaoNotificacoes =
    document.getElementById("ativarNotificacoes");

  if (botaoNotificacoes) {
   botaoNotificacoes.addEventListener("click", async () => {
  const status = document.getElementById("statusNotificacoes");

  try {
    if (typeof clienteSupabase === "undefined") {
      throw new Error("A conexão com o Supabase não foi encontrada.");
    }

    if (
      !("serviceWorker" in navigator) ||
      !("PushManager" in window) ||
      !("Notification" in window)
    ) {
      throw new Error("Este navegador não suporta notificações push.");
    }

    const registro = await navigator.serviceWorker.ready;
    let inscricao = await registro.pushManager.getSubscription();

    // DESATIVAR NOTIFICAÇÕES
    if (inscricao) {
      status.textContent = "Desativando notificações...";

      const { error } = await clienteSupabase
        .from("push_subscriptions")
        .update({ enabled: false })
        .eq("endpoint", inscricao.endpoint);

      if (error) throw error;

      await inscricao.unsubscribe();

      botaoNotificacoes.textContent = "🔔 Ativar notificações";
      botaoNotificacoes.dataset.ativadas = "false";
      status.textContent = "Notificações desativadas.";
      return;
    }

    // ATIVAR NOTIFICAÇÕES
    status.textContent = "Ativando notificações...";

    if (Notification.permission === "denied") {
      throw new Error(
        "As notificações estão bloqueadas. Libere a permissão nas configurações do navegador."
      );
    }

    const permissao = await Notification.requestPermission();

    if (permissao !== "granted") {
      throw new Error("Permissão para notificações não concedida.");
    }

    if (
      typeof VAPID_PUBLIC_KEY === "undefined" ||
      typeof converterChaveBase64 !== "function"
    ) {
      throw new Error("A configuração das notificações está incompleta.");
    }

    inscricao = await registro.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: converterChaveBase64(VAPID_PUBLIC_KEY)
    });

    const dados = inscricao.toJSON();

    const { error } = await clienteSupabase
      .from("push_subscriptions")
      .upsert(
        {
          endpoint: inscricao.endpoint,
          p256dh: dados.keys.p256dh,
          auth: dados.keys.auth,
          enabled: true
        },
        { onConflict: "endpoint" }
      );

    if (error) {
      await inscricao.unsubscribe();
      throw error;
    }

    botaoNotificacoes.textContent = "🔕 Desativar notificações";
    botaoNotificacoes.dataset.ativadas = "true";
    status.textContent = "Notificações ativadas!";

  } catch (erro) {
    console.error("Erro nas notificações:", erro);
    status.textContent =
      "Erro: " + (erro.message || "Não foi possível atualizar as notificações.");
  }
});
  }
});
</script>

<script>
(() => {
  "use strict";

    /* ==========================================
   NOSSO CANTINHO — ÁLBUM DE FOTOS
   Tabela: album_memoria
   Bucket: album-casal
========================================== */

(() => {
  "use strict";

  const db = window.supabaseClient;
  const BUCKET = "album-casal";
  const TABELA = "album_memoria";
  const URL_VALIDADE = 3600;

  const $ = (id) => document.getElementById(id);

  const el = {
    secao: $("albumCasal"),
    voltar: $("albumVoltar"),
    contagem: $("albumContagem"),
    vazio: $("albumVazio"),
    inicio: $("albumInicio"),
    grade: $("albumMeses"),
    formulario: $("albumFormulario"),
    arquivos: $("albumArquivos"),
    data: $("albumData"),
    legenda: $("albumLegenda"),
    status: $("albumUploadStatus"),
    adicionar: $("albumAdicionar"),
    adicionarTopo: $("albumAdicionarTopo"),
    adicionarMes: $("albumAdicionarMes"),
    cancelar: $("albumCancelar"),
    conteudoMes: $("albumConteudoMes"),
    voltarMes: $("albumVoltarMes"),
    tituloMes: $("albumTituloMes"),
    galeriaMes: $("albumGaleria"),
    dialogo: $("albumVisualizador"),
    fechar: $("albumFechar"),
    foto: $("albumFotoAmpliada"),
    legendaAmpliada: $("albumLegendaAmpliada"),
    dataAmpliada: $("albumDataAmpliada"),
    baixar: $("albumBaixar"),
    excluir: $("albumExcluir"),
    compartilhar: $("albumCompartilhar"),
    anterior: $("albumFotoAnterior"),
    proxima: $("albumFotoProxima")
  };

  let memorias = [];
  let indiceAtual = -1;
  let urlsTemporarias = [];
  let carregando = false;

  function exigirCliente() {
    if (!db || !db.auth || !db.storage) {
      throw new Error(
        "Cliente Supabase não encontrado. Verifique window.supabaseClient."
      );
    }
  }

  function mostrarStatus(mensagem) {
    if (el.status) el.status.textContent = mensagem;
  }

  function formatarData(valor) {
    if (!valor) return "Data não informada";

    const data = new Date(valor + "T12:00:00");

    return Number.isNaN(data.getTime())
      ? valor
      : data.toLocaleDateString("pt-BR");
  }

  function nomeMes(valor) {
    if (!valor) return "Sem data";

    const data = new Date(valor + "T12:00:00");

    return Number.isNaN(data.getTime())
      ? "Sem data"
      : data.toLocaleDateString("pt-BR", {
          month: "long",
          year: "numeric"
        });
  }

  function escapar(texto) {
    return String(texto ?? "").replace(/[&<>"']/g, (caractere) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[caractere]);
  }

  async function verificarSessao() {
    exigirCliente();

    const { data, error } = await db.auth.getSession();

    if (error) throw error;

    if (!data.session) {
      throw new Error(
        "Você precisa estar autenticada no Supabase para acessar a galeria."
      );
    }

    return data.session;
  }

  async function criarUrl(caminho) {
    const { data, error } = await db.storage
      .from(BUCKET)
      .createSignedUrl(caminho, URL_VALIDADE);

    if (error) throw error;

    return data.signedUrl;
  }

  async function liberarUrls() {
    urlsTemporarias.forEach((url) => URL.revokeObjectURL(url));
    urlsTemporarias = [];
  }

  async function carregarGaleria() {
    if (carregando) return;

    carregando = true;

    try {
      await verificarSessao();
      mostrarStatus("Carregando fotos...");

      const { data, error } = await db
        .from(TABELA)
        .select("id,tipo,caminho_arquivo,legenda,data_lembranca")
        .eq("tipo", "foto")
        .order("data_lembranca", { ascending: false });

      if (error) throw error;

      memorias = data || [];

      await liberarUrls();
      await desenharGrade(memorias);

      if (el.contagem) {
        el.contagem.textContent =
          memorias.length +
          (memorias.length === 1 ? " foto" : " fotos");
      }

      if (el.vazio) {
        el.vazio.hidden = memorias.length > 0;
      }

      mostrarStatus("");
    } catch (erro) {
      console.error("Erro ao carregar galeria:", erro);
      mostrarStatus("Não foi possível carregar as fotos: " + erro.message);
    } finally {
      carregando = false;
    }
  }

  async function desenharGrade(lista) {
    if (!el.grade) return;

    el.grade.innerHTML = "";

    for (let i = 0; i < lista.length; i++) {
      const memoria = lista[i];

      const item = document.createElement("button");
      item.type = "button";
      item.className = "galeria-item-foto";
      item.setAttribute(
        "aria-label",
        memoria.legenda || "Abrir foto " + (i + 1)
      );

      const imagem = document.createElement("img");
      imagem.alt = memoria.legenda || "Foto da galeria";
      imagem.loading = "lazy";

      try {
        imagem.src = await criarUrl(memoria.caminho_arquivo);
      } catch (erro) {
        console.error("Não foi possível abrir uma foto:", erro);
        item.textContent = "Foto indisponível";
      }

      if (imagem.src) item.appendChild(imagem);

      item.addEventListener("click", () => abrirFoto(i));
      el.grade.appendChild(item);
    }
  }

  function abrirFormulario() {
    if (el.formulario) el.formulario.hidden = false;
    if (el.inicio) el.inicio.hidden = true;
    if (el.conteudoMes) el.conteudoMes.hidden = true;

    if (el.data && !el.data.value) {
      el.data.value = new Date().toLocaleDateString("en-CA");
    }

    mostrarStatus("");
  }

  function fecharFormulario() {
    if (el.formulario) el.formulario.hidden = true;
    if (el.inicio) el.inicio.hidden = false;
    if (el.conteudoMes) el.conteudoMes.hidden = true;

    if (el.formulario) el.formulario.reset();
    mostrarStatus("");
  }

  async function salvarFotos(evento) {
    evento.preventDefault();

    const arquivos = Array.from(el.arquivos?.files || []);
    const data = el.data?.value;
    const legenda = el.legenda?.value.trim() || "";

    if (!arquivos.length) {
      mostrarStatus("Selecione pelo menos uma foto.");
      return;
    }

    if (!data) {
      mostrarStatus("Escolha a data das fotos.");
      return;
    }

    if (arquivos.some((arquivo) => !arquivo.type.startsWith("image/"))) {
      mostrarStatus("Selecione somente arquivos de imagem.");
      return;
    }

    try {
      const sessao = await verificarSessao();
      const usuarioId = sessao.user.id;

      if (el.formulario) {
        el.formulario.querySelector('[type="submit"]').disabled = true;
      }

      let salvas = 0;

      for (const arquivo of arquivos) {
        mostrarStatus(
          `Salvando foto ${salvas + 1} de ${arquivos.length}...`
        );

        const nomeSeguro = arquivo.name
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-zA-Z0-9._-]/g, "_");

        const caminho =
          usuarioId + "/" + Date.now() + "_" +
          Math.random().toString(36).slice(2) + "_" + nomeSeguro;

        const { error: erroUpload } = await db.storage
          .from(BUCKET)
          .upload(caminho, arquivo, {
            contentType: arquivo.type,
            upsert: false
          });

        if (erroUpload) throw erroUpload;

        const { error: erroBanco } = await db
          .from(TABELA)
          .insert({
            tipo: "foto",
            caminho_arquivo: caminho,
            legenda,
            data_lembranca: data
          });

        if (erroBanco) {
          await db.storage.from(BUCKET).remove([caminho]);
          throw erroBanco;
        }

        salvas++;
      }

      mostrarStatus("Fotos salvas!");

      fecharFormulario();
      await carregarGaleria();
    } catch (erro) {
      console.error("Erro ao salvar fotos:", erro);
      mostrarStatus("Não foi possível salvar: " + erro.message);
    } finally {
      const botao = el.formulario?.querySelector('[type="submit"]');
      if (botao) botao.disabled = false;
    }
  }

  async function abrirFoto(indice) {
    if (indice < 0 || indice >= memorias.length) return;

    indiceAtual = indice;
    const memoria = memorias[indice];

    try {
      el.foto.src = await criarUrl(memoria.caminho_arquivo);
      el.foto.alt = memoria.legenda || "Foto da galeria";

      if (el.legendaAmpliada) {
        el.legendaAmpliada.textContent = memoria.legenda || "Foto";
      }

      if (el.dataAmpliada) {
        el.dataAmpliada.textContent = formatarData(memoria.data_lembranca);
      }

      if (el.baixar) {
        el.baixar.href = el.foto.src;
        el.baixar.download =
          "foto-" + (memoria.data_lembranca || "galeria") + ".jpg";
      }

      if (el.dialogo && !el.dialogo.open) {
        el.dialogo.showModal();
      }
    } catch (erro) {
      console.error("Erro ao abrir foto:", erro);
      mostrarStatus("Não foi possível abrir esta foto.");
    }
  }

  function navegarFoto(direcao) {
    if (!memorias.length) return;

    const novoIndice =
      (indiceAtual + direcao + memorias.length) % memorias.length;

    abrirFoto(novoIndice);
  }

  async function compartilharFoto() {
    const memoria = memorias[indiceAtual];
    if (!memoria) return;

    try {
      const url = await criarUrl(memoria.caminho_arquivo);

      if (navigator.share) {
        await navigator.share({
          title: memoria.legenda || "Foto da galeria",
          text: memoria.legenda || "",
          url
        });
      } else {
        await navigator.clipboard.writeText(url);
        mostrarStatus("Link da foto copiado.");
      }
    } catch (erro) {
      if (erro.name !== "AbortError") {
        console.error("Erro ao compartilhar:", erro);
        mostrarStatus("Não foi possível compartilhar esta foto.");
      }
    }
  }

  async function excluirFoto() {
    const memoria = memorias[indiceAtual];
    if (!memoria) return;

    if (!confirm("Deseja excluir esta foto da galeria?")) return;

    try {
      await verificarSessao();

      const { error: erroBanco } = await db
        .from(TABELA)
        .delete()
        .eq("id", memoria.id);

      if (erroBanco) throw erroBanco;

      const { error: erroArquivo } = await db.storage
        .from(BUCKET)
        .remove([memoria.caminho_arquivo]);

      if (erroArquivo) {
        console.error("O registro foi excluído, mas o arquivo não:", erroArquivo);
        mostrarStatus("Registro excluído, mas não foi possível apagar o arquivo.");
      }

      if (el.dialogo?.open) el.dialogo.close();

      indiceAtual = -1;
      await carregarGaleria();
    } catch (erro) {
      console.error("Erro ao excluir foto:", erro);
      mostrarStatus("Não foi possível excluir: " + erro.message);
    }
  }

  function abrirAlbum() {
    if (el.secao) el.secao.hidden = false;
    carregarGaleria();
  }

  // Disponível para o botão do site que abre a galeria.
  window.abrirAlbum = abrirAlbum;
  window.abrirNossoAlbum = abrirAlbum;

  el.adicionar?.addEventListener("click", abrirFormulario);
  el.adicionarTopo?.addEventListener("click", abrirFormulario);
  el.adicionarMes?.addEventListener("click", abrirFormulario);
  el.cancelar?.addEventListener("click", fecharFormulario);
  el.formulario?.addEventListener("submit", salvarFotos);

  el.voltarMes?.addEventListener("click", () => {
    if (el.conteudoMes) el.conteudoMes.hidden = true;
    if (el.inicio) el.inicio.hidden = false;
  });

  el.fechar?.addEventListener("click", () => el.dialogo?.close());
  el.anterior?.addEventListener("click", () => navegarFoto(-1));
  el.proxima?.addEventListener("click", () => navegarFoto(1));
  el.compartilhar?.addEventListener("click", compartilharFoto);
  el.excluir?.addEventListener("click", excluirFoto);

  el.dialogo?.addEventListener("click", (evento) => {
    if (evento.target === el.dialogo) el.dialogo.close();
  });

  document.addEventListener("keydown", (evento) => {
    if (!el.dialogo?.open) return;

    if (evento.key === "ArrowLeft") navegarFoto(-1);
    if (evento.key === "ArrowRight") navegarFoto(1);
  });

  // O filtro do seletor mostra apenas imagens.
  if (el.arquivos) el.arquivos.accept = "image/*";

})();
    
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
    login.style.setProperty("display", "none", "important");
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

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("./sw.js")
            .catch((erro) => {
                console.error(
                    "Erro ao registrar o service worker:",
                    erro
                );
            });
    });
}
