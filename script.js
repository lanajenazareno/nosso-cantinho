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

  // ==========================================
  // NOSSO CANTINHO — ÁLBUM DE FOTOS
  // ==========================================

  const db = window.supabaseClient;
  const BUCKET = "album-casal";
  const TABELA = "album_memorias";
  const TAMANHO_MAXIMO = 50 * 1024 * 1024;
  const URL_EXPIRACAO = 3600;

  const $ = (id) => document.getElementById(id);

  const elementos = {
    data: $("albumDataNavegacao"),
    novaLembranca: $("albumNovoRegistro"),
    formulario: $("albumFormulario"),
    arquivos: $("albumArquivo"),
    legenda: $("albumLegenda"),
    dataFormulario: $("albumData"),
    enviar: $("albumEnviar"),
    cancelar: $("albumCancelar"),
    status: $("albumStatus"),
    carregando: $("albumCarregando"),
    galeria: $("albumGaleria"),
    meses: $("albumListaMeses"),
    visualizador: $("albumVisualizador"),
    imagem: $("albumImagemAtual"),
    legendaImagem: $("albumLegendaAtual"),
    contador: $("albumContador"),
    anterior: $("albumFotoAnterior"),
    proxima: $("albumFotoProxima"),
    baixar: $("albumBaixar"),
    excluir: $("albumExcluir"),
    fechar: $("albumFecharVisualizador")
  };

  let usuario = null;
  let fotos = [];
  let fotosDoDia = [];
  let indiceAtual = 0;
  let dataAtual = dataLocalHoje();
  let carregando = false;
  let enviando = false;

  function dataLocalHoje() {
    const agora = new Date();
    const ano = agora.getFullYear();
    const mes = String(agora.getMonth() + 1).padStart(2, "0");
    const dia = String(agora.getDate()).padStart(2, "0");
    return `${ano}-${mes}-${dia}`;
  }

  function formatarData(data) {
    if (!data) return "";
    const [ano, mes, dia] = data.slice(0, 10).split("-");
    return `${dia}/${mes}/${ano}`;
  }

  function deslocarMes(data, quantidade) {
    const [ano, mes, dia] = data.split("-").map(Number);
    const dataBase = new Date(ano, mes - 1 + quantidade, 1);
    const ultimoDia = new Date(
      dataBase.getFullYear(),
      dataBase.getMonth() + 1,
      0
    ).getDate();

    dataBase.setDate(Math.min(dia, ultimoDia));

    return [
      dataBase.getFullYear(),
      String(dataBase.getMonth() + 1).padStart(2, "0"),
      String(dataBase.getDate()).padStart(2, "0")
    ].join("-");
  }

  function escapar(valor) {
    return String(valor ?? "").replace(/[&<>"']/g, caractere => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[caractere]);
  }

  function informar(mensagem, erro = false) {
    if (!elementos.status) return;
    elementos.status.textContent = mensagem;
    elementos.status.style.color = erro ? "#b42318" : "";
  }

  function mostrarCarregamento(mostrar, mensagem = "Carregando nossas lembranças...") {
    if (!elementos.carregando) return;
    elementos.carregando.hidden = !mostrar;
    elementos.carregando.textContent = mensagem;
  }

  function abrirFormulario(data = dataAtual) {
    if (!elementos.formulario) return;

    elementos.formulario.hidden = false;

    if (elementos.dataFormulario) {
      elementos.dataFormulario.value = data;
    }

    if (elementos.arquivos) elementos.arquivos.value = "";
    if (elementos.legenda) elementos.legenda.value = "";

    informar("");

    elementos.formulario.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
  }

  function fecharFormulario() {
    if (elementos.formulario) elementos.formulario.hidden = true;
    if (elementos.arquivos) elementos.arquivos.value = "";
    if (elementos.legenda) elementos.legenda.value = "";
    informar("");
  }

  async function obterUsuario() {
    if (!db?.auth) {
      throw new Error(
        "A conexão com o Supabase não foi encontrada. Confira window.supabaseClient."
      );
    }

    const { data, error } = await db.auth.getUser();

    if (error) throw error;

    if (!data?.user) {
      throw new Error(
        "Você precisa estar conectada ao Supabase para acessar o álbum."
      );
    }

    usuario = data.user;
    return usuario;
  }

  async function obterUrlFoto(caminho) {
    const { data, error } = await db.storage
      .from(BUCKET)
      .createSignedUrl(caminho, URL_EXPIRACAO);

    if (error) throw error;
    return data.signedUrl;
  }

  async function carregarFotos() {
    if (carregando) return;

    carregando = true;
    mostrarCarregamento(true);

    try {
      await obterUsuario();

      const { data, error } = await db
        .from(TABELA)
        .select("id,tipo,caminho_arquivo,legenda,data_lembranca,criado_por,criado_em")
        .order("data_lembranca", { ascending: false })
        .order("criado_em", { ascending: false });

      if (error) throw error;

      fotos = (data || []).filter(foto =>
        foto.tipo === "imagem" &&
        foto.caminho_arquivo &&
        foto.data_lembranca
      );

      await renderizar();
    } catch (erro) {
      console.error("Erro ao carregar álbum:", erro);
      mostrarCarregamento(true, erro.message || "Não foi possível carregar as lembranças.");
    } finally {
      carregando = false;
    }
  }

  function datasDisponiveis() {
    return [...new Set(fotos.map(foto =>
      String(foto.data_lembranca).slice(0, 10)
    ))].sort((a, b) => b.localeCompare(a));
  }

  async function renderizar() {
    mostrarCarregamento(false);

    if (!elementos.galeria) return;

    if (elementos.data) elementos.data.value = dataAtual;

    const datas = datasDisponiveis();

    if (datas.includes(dataAtual)) {
      await renderizarDia(dataAtual);
    } else {
      renderizarDatas(datas);
    }

    renderizarMesesAnteriores(dataAtual);
  }

  function renderizarDatas(datas) {
    elementos.galeria.innerHTML = "";

    if (!datas.length) {
      elementos.galeria.innerHTML =
        '<p class="album-vazio">Ainda não temos fotos guardadas. Vamos criar nossa primeira lembrança? 🫀</p>';
      return;
    }

    const titulo = document.createElement("h3");
    titulo.className = "album-subtitulo";
    titulo.textContent = "Nossas lembranças";
    elementos.galeria.appendChild(titulo);

    const grade = document.createElement("div");
    grade.className = "album-grade-dias";

    datas.forEach(data => {
      const quantidade = fotos.filter(f =>
        String(f.data_lembranca).slice(0, 10) === data
      ).length;

      const botao = document.createElement("button");
      botao.type = "button";
      botao.className = "album-dia-card";
      botao.innerHTML =
        `<span class="album-dia-icone">📸</span>` +
        `<strong>${escapar(formatarData(data))}</strong>` +
        `<span>${quantidade} ${quantidade === 1 ? "foto" : "fotos"}</span>`;

      botao.addEventListener("click", () => {
        dataAtual = data;
        if (elementos.data) elementos.data.value = data;
        renderizar();
      });

      grade.appendChild(botao);
    });

    elementos.galeria.appendChild(grade);
  }

  async function renderizarDia(data) {
    elementos.galeria.innerHTML = "";

    const fotosDia = fotos.filter(foto =>
      String(foto.data_lembranca).slice(0, 10) === data
    );

    const cabecalho = document.createElement("div");
    cabecalho.className = "album-dia-cabecalho";

    const titulo = document.createElement("h3");
    titulo.textContent = `Lembranças de ${formatarData(data)}`;

    const voltar = document.createElement("button");
    voltar.type = "button";
    voltar.textContent = "← Todas as datas";
    voltar.addEventListener("click", () => renderizarDatas(datasDisponiveis()));

    cabecalho.append(titulo, voltar);
    elementos.galeria.appendChild(cabecalho);

    if (!fotosDia.length) {
      const vazio = document.createElement("p");
      vazio.className = "album-vazio";
      vazio.textContent = "Ainda não há fotos neste dia.";
      elementos.galeria.appendChild(vazio);
      return;
    }

    const grade = document.createElement("div");
    grade.className = "album-grade-fotos";
    elementos.galeria.appendChild(grade);

    for (const foto of fotosDia) {
      const cartao = document.createElement("article");
      cartao.className = "album-foto-card";
      cartao.innerHTML = '<div class="album-foto-placeholder">Carregando foto...</div>';
      grade.appendChild(cartao);

      try {
        const url = await obterUrlFoto(foto.caminho_arquivo);

        const imagem = document.createElement("img");
        imagem.src = url;
        imagem.alt = foto.legenda || `Lembrança de ${formatarData(data)}`;
        imagem.loading = "lazy";

        imagem.addEventListener("click", () => abrirVisualizador(foto, fotosDia));

        cartao.innerHTML = "";
        cartao.appendChild(imagem);

        if (foto.legenda) {
          const legenda = document.createElement("p");
          legenda.textContent = foto.legenda;
          cartao.appendChild(legenda);
        }

        const dataFoto = document.createElement("small");
        dataFoto.textContent = formatarData(data);
        cartao.appendChild(dataFoto);
      } catch (erro) {
        console.error("Erro ao carregar uma foto:", erro);
        cartao.textContent = "Não foi possível carregar esta foto.";
      }
    }
  }

  function renderizarMesesAnteriores(dataReferencia) {
    if (!elementos.meses) return;

    elementos.meses.innerHTML = "";

    const titulo = document.createElement("h3");
    titulo.textContent = "Mesmo dia nos meses anteriores";
    elementos.meses.appendChild(titulo);

    const lista = document.createElement("div");
    lista.className = "album-meses-lista";

    let encontrados = 0;

    for (let i = 1; i <= 60; i++) {
      const dataAnterior = deslocarMes(dataReferencia, -i);
      const temFotos = fotos.some(foto =>
        String(foto.data_lembranca).slice(0, 10) === dataAnterior
      );

      if (!temFotos) continue;

      encontrados++;

      const botao = document.createElement("button");
      botao.type = "button";
      botao.className = "album-mes-item";
      botao.textContent = `📅 ${formatarData(dataAnterior)} — Ver lembranças`;

      botao.addEventListener("click", () => {
        dataAtual = dataAnterior;
        if (elementos.data) elementos.data.value = dataAnterior;
        renderizar();
      });

      lista.appendChild(botao);
    }

    if (!encontrados) {
      const aviso = document.createElement("p");
      aviso.textContent = "Ainda não há lembranças deste dia nos meses anteriores.";
      lista.appendChild(aviso);
    }

    elementos.meses.appendChild(lista);
  }

  async function abrirVisualizador(foto, lista) {
    if (!elementos.visualizador) return;

    fotosDoDia = lista;
    indiceAtual = lista.findIndex(item => item.id === foto.id);

    if (indiceAtual < 0) indiceAtual = 0;

    await atualizarVisualizador();

    elementos.visualizador.hidden = false;
  }

  async function atualizarVisualizador() {
    const foto = fotosDoDia[indiceAtual];
    if (!foto) return;

    try {
      const url = await obterUrlFoto(foto.caminho_arquivo);

      if (elementos.imagem) {
        elementos.imagem.src = url;
        elementos.imagem.alt = foto.legenda || "Nossa lembrança";
      }

      if (elementos.legendaImagem) {
        elementos.legendaImagem.textContent =
          foto.legenda || formatarData(foto.data_lembranca);
      }

      if (elementos.contador) {
        elementos.contador.textContent =
          `${indiceAtual + 1} de ${fotosDoDia.length}`;
      }

      if (elementos.anterior) {
        elementos.anterior.disabled = indiceAtual <= 0;
      }

      if (elementos.proxima) {
        elementos.proxima.disabled = indiceAtual >= fotosDoDia.length - 1;
      }

      if (elementos.baixar) {
        elementos.baixar.onclick = () => baixarFoto(url, foto.id);
      }

      if (elementos.excluir) {
        const podeExcluir = foto.criado_por === usuario?.id;
        elementos.excluir.hidden = !podeExcluir;
        elementos.excluir.onclick = () => excluirFoto(foto);
      }
    } catch (erro) {
      console.error("Erro ao abrir foto:", erro);
      informar("Não foi possível abrir esta foto.", true);
    }
  }

  async function baixarFoto(url, id) {
    try {
      const resposta = await fetch(url);
      if (!resposta.ok) throw new Error("Falha ao baixar a imagem.");

      const blob = await resposta.blob();
      const link = document.createElement("a");
      const temporaria = URL.createObjectURL(blob);

      link.href = temporaria;
      link.download = `lembranca-${id}.jpg`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(temporaria);
    } catch (erro) {
      console.error(erro);
      window.open(url, "_blank", "noopener");
    }
  }

  async function excluirFoto(foto) {
    if (foto.criado_por !== usuario?.id) {
      informar("Você só pode excluir as fotos que adicionou.", true);
      return;
    }

    if (!confirm("Deseja excluir esta foto da lembrança?")) return;

    try {
      const { error: erroArquivo } = await db.storage
        .from(BUCKET)
        .remove([foto.caminho_arquivo]);

      if (erroArquivo) throw erroArquivo;

      const { error: erroRegistro } = await db
        .from(TABELA)
        .delete()
        .eq("id", foto.id)
        .eq("criado_por", usuario.id);

      if (erroRegistro) throw erroRegistro;

      if (elementos.visualizador) elementos.visualizador.hidden = true;

      informar("Foto excluída.");
      await carregarFotos();
    } catch (erro) {
      console.error("Erro ao excluir foto:", erro);
      informar("Não foi possível excluir a foto: " + erro.message, true);
    }
  }

  async function guardarFotos(evento) {
    evento.preventDefault();

    if (enviando) return;

    try {
      await obterUsuario();

      const arquivos = Array.from(elementos.arquivos?.files || []);
      const data = elementos.dataFormulario?.value;
      const legenda = (elementos.legenda?.value || "").trim();

      if (!arquivos.length) {
        informar("Escolha pelo menos uma foto.", true);
        return;
      }

      if (!data) {
        informar("Escolha a data da lembrança.", true);
        return;
      }

      const arquivoInvalido = arquivos.find(arquivo =>
        !arquivo.type.startsWith("image/") ||
        arquivo.size > TAMANHO_MAXIMO
      );

      if (arquivoInvalido) {
        informar("Use somente imagens de até 50 MB cada.", true);
        return;
      }

      enviando = true;

      if (elementos.enviar) {
        elementos.enviar.disabled = true;
        elementos.enviar.textContent = "Guardando...";
      }

      informar("Guardando nossas lembranças...");

      const registros = [];
      const caminhosEnviados = [];

      try {
        for (const arquivo of arquivos) {
          const extensao = (arquivo.name.split(".").pop() || "jpg")
            .toLowerCase()
            .replace(/[^a-z0-9]/g, "");

          const caminho =
            `${usuario.id}/${Date.now()}-${crypto.randomUUID()}.${extensao}`;

          const { error: erroUpload } = await db.storage
            .from(BUCKET)
            .upload(caminho, arquivo, {
              upsert: false,
              contentType: arquivo.type
            });

          if (erroUpload) throw erroUpload;

          caminhosEnviados.push(caminho);

          registros.push({
            tipo: "imagem",
            caminho_arquivo: caminho,
            legenda,
            data_lembranca: data,
            criado_por: usuario.id
          });
        }

        const { error: erroBanco } = await db
          .from(TABELA)
          .insert(registros);

        if (erroBanco) throw erroBanco;
      } catch (erro) {
        if (caminhosEnviados.length) {
          await db.storage.from(BUCKET).remove(caminhosEnviados);
        }
        throw erro;
      }

      dataAtual = data;
      if (elementos.data) elementos.data.value = data;

      fecharFormulario();
      informar("Fotos guardadas com sucesso! 🫀");
      await carregarFotos();
    } catch (erro) {
      console.error("Erro ao guardar fotos:", erro);
      informar("Não foi possível guardar: " + erro.message, true);
    } finally {
      enviando = false;

      if (elementos.enviar) {
        elementos.enviar.disabled = false;
        elementos.enviar.textContent = "Guardar fotos";
      }
    }
  }

  // Abre o álbum na data escolhida pela agenda.
  window.abrirAlbumNaData = async function(data) {
    if (!data) return;

    dataAtual = String(data).slice(0, 10);

    if (elementos.data) elementos.data.value = dataAtual;

    const secao = $("albumCasal");

    if (secao) {
      secao.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }

    await carregarFotos();

    const existe = fotos.some(foto =>
      String(foto.data_lembranca).slice(0, 10) === dataAtual
    );

    if (!existe) abrirFormulario(dataAtual);
  };

  // Botões e campos.
  elementos.novaLembranca?.addEventListener("click", () => {
    abrirFormulario(elementos.data?.value || dataAtual);
  });

  elementos.cancelar?.addEventListener("click", fecharFormulario);
  elementos.formulario?.addEventListener("submit", guardarFotos);

  elementos.data?.addEventListener("change", () => {
    dataAtual = elementos.data.value || dataLocalHoje();
    renderizar();
  });

  elementos.anterior?.addEventListener("click", async () => {
    if (indiceAtual > 0) {
      indiceAtual--;
      await atualizarVisualizador();
    }
  });

  elementos.proxima?.addEventListener("click", async () => {
    if (indiceAtual < fotosDoDia.length - 1) {
      indiceAtual++;
      await atualizarVisualizador();
    }
  });

  elementos.fechar?.addEventListener("click", () => {
    if (elementos.visualizador) elementos.visualizador.hidden = true;
  });

  // Inicialização.
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", carregarFotos, { once: true });
  } else {
    carregarFotos();
  }
})();
</script>
      
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
