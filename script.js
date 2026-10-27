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
  
</script>

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

    // =========================================================
// NOSSO CANTINHO — ÁLBUM DE FOTOS
// =========================================================
    
(() => {
  "use strict";

  const db = window.supabaseClient;
  const BUCKET = "album-casal";
  const TABELA = "album_memorias";

  const $ = (id) => document.getElementById(id);

  const el = {
    secao: $("albumCasal"),
    vazio: $("albumVazio"),
    inicio: $("albumInicio"),
    meses: $("albumMeses"),
    conteudoMes: $("albumConteudoMes"),
    tituloMes: $("albumTituloMes"),
    galeria: $("albumGaleria"),
    formulario: $("albumFormulario"),
    arquivos: $("albumArquivos"),
    data: $("albumData"),
    legenda: $("albumLegenda"),
    uploadStatus: $("albumUploadStatus"),
    status: $("albumStatus"),
    visualizador: $("albumVisualizador"),
    fotoAmpliada: $("albumFotoAmpliada"),
    legendaAmpliada: $("albumLegendaAmpliada"),
    baixar: $("albumBaixar"),
    excluir: $("albumExcluir")
  };

  let usuario = null;
  let fotos = [];
  let mesAtual = null;
  let fotoAtual = null;
  let enviando = false;
  let urls = new Map();

  const nomesMeses = [
    "Janeiro", "Fevereiro", "Março", "Abril",
    "Maio", "Junho", "Julho", "Agosto",
    "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  function dataHoje() {
    const d = new Date();
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 10);
  }

  function chaveMes(data) {
    return String(data || "").slice(0, 7);
  }

  function nomeMes(chave) {
    const [ano, mes] = chave.split("-").map(Number);
    return `${nomesMeses[mes - 1]} de ${ano}`;
  }

  function aviso(texto) {
    if (el.status) el.status.textContent = texto;
  }

  function botao(texto, classe, acao) {
    const b = document.createElement("button");
    b.type = "button";
    b.className = classe;
    b.textContent = texto;
    b.addEventListener("click", acao);
    return b;
  }

  function mostrarInicio() {
    el.inicio.hidden = true;
    el.vazio.hidden = true;
    el.conteudoMes.hidden = true;
    el.formulario.hidden = true;

    el.secao.hidden = false;
    el.secao.scrollIntoView({ behavior: "smooth" });

    carregarFotos();
  }

  function fecharAlbum() {
    el.secao.hidden = true;

    if (typeof window.voltarParaInicio === "function") {
      window.voltarParaInicio();
    }
  }

  async function obterUrl(caminho) {
    if (urls.has(caminho)) return urls.get(caminho);

    const { data, error } = await db.storage
      .from(BUCKET)
      .createSignedUrl(caminho, 3600);

    if (error) throw error;

    urls.set(caminho, data.signedUrl);
    return data.signedUrl;
  }

  async function carregarFotos() {
    if (!db) {
      aviso("A conexão com o Supabase não foi encontrada.");
      return;
    }

    aviso("Carregando nossas lembranças...");

    try {
      const { data: sessao, error: erroAuth } =
        await db.auth.getUser();

      if (erroAuth) throw erroAuth;

      if (!sessao.user) {
        fotos = [];
        mostrarVazio(
          "Entre no site com uma sessão autorizada para acessar o álbum."
        );
        return;
      }

      usuario = sessao.user;

      const { data, error } = await db
        .from(TABELA)
        .select(
          "id,tipo,caminho_arquivo,legenda,data_lembranca,criado_por,criado_em"
        )
        .eq("tipo", "foto")
        .order("data_lembranca", { ascending: false });

      if (error) throw error;

      fotos = data || [];

      if (mesAtual) {
        const existe = fotos.some(
          f => chaveMes(f.data_lembranca || f.criado_em) === mesAtual
        );

        if (existe) {
          abrirMes(mesAtual);
        } else {
          mesAtual = null;
          mostrarListaInicial();
        }
      } else {
        mostrarListaInicial();
      }

      aviso(
        fotos.length
          ? `${fotos.length} foto(s) no nosso álbum.`
          : "Nosso álbum ainda está vazio."
      );
    } catch (erro) {
      console.error("Erro ao carregar álbum:", erro);
      aviso(
        "Não foi possível carregar as fotos. Verifique as permissões do Supabase."
      );
    }
  }

  function mostrarVazio(texto) {
    el.inicio.hidden = true;
    el.conteudoMes.hidden = true;
    el.formulario.hidden = true;
    el.vazio.hidden = false;

    const p = el.vazio.querySelector("p");
    if (p && texto) p.textContent = texto;
  }

  function mostrarListaInicial() {
    el.vazio.hidden = true;
    el.conteudoMes.hidden = true;
    el.formulario.hidden = true;

    if (!fotos.length) {
      mostrarVazio();
      return;
    }

    el.inicio.hidden = false;
    el.meses.replaceChildren();

    const grupos = new Map();

    for (const foto of fotos) {
      const chave = chaveMes(foto.data_lembranca || foto.criado_em);
      if (!/^\d{4}-\d{2}$/.test(chave)) continue;

      if (!grupos.has(chave)) grupos.set(chave, []);
      grupos.get(chave).push(foto);
    }

    for (const [chave, grupo] of [...grupos.entries()].sort(
      (a, b) => b[0].localeCompare(a[0])
    )) {
      const cartao = botao("", "album-mes", () => abrirMes(chave));

      const capa = document.createElement("img");
      capa.className = "album-capa";
      capa.alt = nomeMes(chave);
      capa.loading = "lazy";

      const info = document.createElement("span");
      info.className = "album-mes-info";

      const titulo = document.createElement("strong");
      titulo.textContent = nomeMes(chave);

      const quantidade = document.createElement("small");
      quantidade.textContent =
        `${grupo.length} ${grupo.length === 1 ? "foto" : "fotos"}`;

      info.append(titulo, quantidade);
      cartao.append(capa, info);
      el.meses.append(cartao);

      obterUrl(grupo[0].caminho_arquivo)
        .then(url => { capa.src = url; })
        .catch(erro => console.error("Erro na capa:", erro));
    }
  }

  function abrirMes(chave) {
    mesAtual = chave;
    el.vazio.hidden = true;
    el.inicio.hidden = true;
    el.conteudoMes.hidden = false;
    el.formulario.hidden = true;
    el.tituloMes.textContent = nomeMes(chave);
    el.galeria.replaceChildren();

    const grupo = fotos.filter(
      f => chaveMes(f.data_lembranca || f.criado_em) === chave
    );

    for (const foto of grupo) {
      const b = botao("", "album-foto", () => abrirFoto(foto));
      const img = document.createElement("img");

      img.alt = foto.legenda || "Lembrança do casal";
      img.loading = "lazy";
      b.append(img);
      el.galeria.append(b);

      obterUrl(foto.caminho_arquivo)
        .then(url => { img.src = url; })
        .catch(erro => console.error("Erro na foto:", erro));
    }
  }

  function escolherFotos() {
    if (enviando) return;

    el.arquivos.value = "";
    el.arquivos.click();
  }

  function formularioComFotos() {
    if (!el.arquivos.files.length) return;

    el.formulario.hidden = false;
    el.vazio.hidden = true;
    el.uploadStatus.textContent =
      `${el.arquivos.files.length} foto(s) selecionada(s).`;

    el.data.value = mesAtual
      ? `${mesAtual}-${dataHoje().slice(8, 10)}`
      : dataHoje();

    // Garante uma data válida dentro do mês selecionado.
    if (mesAtual && chaveMes(el.data.value) !== mesAtual) {
      const [ano, mes] = mesAtual.split("-").map(Number);
      const ultimoDia = new Date(ano, mes, 0).getDate();

      el.data.value =
        `${mesAtual}-${String(ultimoDia).padStart(2, "0")}`;
    }

    el.legenda.value = "";
  }

  async function salvarFotos(evento) {
    evento.preventDefault();

    if (enviando) return;

    const arquivos = Array.from(el.arquivos.files || []);
    const data = el.data.value;
    const legenda = el.legenda.value.trim();

    if (!usuario || !arquivos.length || !data) {
      el.uploadStatus.textContent =
        "Selecione fotos e informe a data.";
      return;
    }

    if (arquivos.some(f => !f.type.startsWith("image/"))) {
      el.uploadStatus.textContent =
        "Escolha somente arquivos de imagem.";
      return;
    }

    if (arquivos.some(f => f.size > 15 * 1024 * 1024)) {
      el.uploadStatus.textContent =
        "Cada foto deve ter no máximo 15 MB.";
      return;
    }

    enviando = true;

    const enviarBotao = el.formulario.querySelector(
      'button[type="submit"]'
    );

    enviarBotao.disabled = true;
    el.uploadStatus.textContent = "Salvando suas fotos...";

    let salvas = 0;

    try {
      for (const arquivo of arquivos) {
        const nomeSeguro = arquivo.name
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-zA-Z0-9._-]/g, "_");

        const caminho =
          `${usuario.id}/${crypto.randomUUID()}-${nomeSeguro}`;

        const { error: erroUpload } = await db.storage
          .from(BUCKET)
          .upload(caminho, arquivo, {
            upsert: false,
            contentType: arquivo.type
          });

        if (erroUpload) throw erroUpload;

        const { error: erroRegistro } = await db
          .from(TABELA)
          .insert({
            tipo: "foto",
            caminho_arquivo: caminho,
            legenda: legenda || null,
            data_lembranca: data,
            criado_por: usuario.id
          });

        if (erroRegistro) {
          await db.storage.from(BUCKET).remove([caminho]);
          throw erroRegistro;
        }

        salvas++;
      }

      el.uploadStatus.textContent = "Fotos salvas com sucesso!";
      el.arquivos.value = "";
      el.formulario.hidden = true;

      await carregarFotos();

      if (mesAtual && chaveMes(data) === mesAtual) {
        abrirMes(mesAtual);
      } else if (mesAtual) {
        mesAtual = null;
        mostrarListaInicial();
      }
    } catch (erro) {
      console.error("Erro ao enviar fotos:", erro);

      el.uploadStatus.textContent = salvas
        ? `${salvas} foto(s) salvas. Algumas não puderam ser enviadas.`
        : "Não foi possível salvar. Confira a conexão e as permissões do Supabase.";

      await carregarFotos();
    } finally {
      enviando = false;
      enviarBotao.disabled = false;
    }
  }

  async function abrirFoto(foto) {
    fotoAtual = foto;

    try {
      const url = await obterUrl(foto.caminho_arquivo);

      el.fotoAmpliada.src = url;
      el.legendaAmpliada.textContent = foto.legenda || "";
      el.baixar.href = url;
      el.baixar.download =
        foto.caminho_arquivo.split("/").pop() || "lembranca.jpg";

      el.visualizador.showModal();
    } catch (erro) {
      console.error("Erro ao abrir foto:", erro);
      aviso("Não foi possível abrir esta foto.");
    }
  }

  async function excluirFoto() {
    if (!fotoAtual || enviando) return;

    if (!confirm("Deseja excluir esta foto do álbum?")) return;

    enviando = true;
    el.excluir.disabled = true;

    try {
      const { error: erroRegistro } = await db
        .from(TABELA)
        .delete()
        .eq("id", fotoAtual.id);

      if (erroRegistro) throw erroRegistro;

      const { error: erroArquivo } = await db.storage
        .from(BUCKET)
        .remove([fotoAtual.caminho_arquivo]);

      if (erroArquivo) {
        console.error("Arquivo não removido:", erroArquivo);
      }

      urls.delete(fotoAtual.caminho_arquivo);
      el.visualizador.close();
      el.fotoAmpliada.removeAttribute("src");
      fotoAtual = null;

      await carregarFotos();

      if (mesAtual) abrirMes(mesAtual);
    } catch (erro) {
      console.error("Erro ao excluir:", erro);
      aviso("Não foi possível excluir. Confira as permissões.");
    } finally {
      enviando = false;
      el.excluir.disabled = false;
    }
  }

  $("albumAdicionar").addEventListener("click", escolherFotos);
  $("albumAdicionarTopo").addEventListener("click", escolherFotos);
  $("albumAdicionarMes").addEventListener("click", escolherFotos);

  el.arquivos.addEventListener("change", formularioComFotos);
  el.formulario.addEventListener("submit", salvarFotos);
  el.excluir.addEventListener("click", excluirFoto);

  $("albumCancelar").addEventListener("click", () => {
    el.formulario.hidden = true;
    el.arquivos.value = "";
    if (!fotos.length) mostrarVazio();
  });

  $("albumFechar").addEventListener("click", () => {
    el.visualizador.close();
  });

  $("albumVoltarMes").addEventListener("click", () => {
    mesAtual = null;
    mostrarListaInicial();
  });

  $("albumVoltar").addEventListener("click", fecharAlbum);

  el.visualizador.addEventListener("click", evento => {
    if (evento.target === el.visualizador) {
      el.visualizador.close();
    }
  });

  // Usada pelo botão "Nossas Memórias" no menu.
  window.abrirNossoAlbum = mostrarInicio;

  if (db) {
    // Não altera a agenda; carrega os dados quando o álbum é aberto.
    el.vazio.hidden = true;
    el.inicio.hidden = true;
    el.conteudoMes.hidden = true;
  } else {
    aviso("Configure a conexão do Supabase antes de usar o álbum.");
  }
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
