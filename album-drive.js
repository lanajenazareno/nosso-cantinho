Esse
/* =========================================
   NOSSO CANTINHO — ÁLBUM GOOGLE DRIVE
========================================= */

const GOOGLE_CLIENT_ID =
"162069055708-3o0uiev4n06h364c2fon0l1id644kttv.apps.googleusercontent.com";

const GOOGLE_API_KEY = "AIzaSyAW-QJQHmfF1uCRbhrVOOSaPPtq95ExOZk";

const GOOGLE_PROJECT_NUMBER = "162069055708";

let tokenGoogle = null;
let pickerCarregado = false;

function carregarGooglePicker() {
    return new Promise((resolve, reject) => {
        if (pickerCarregado) return resolve();

        if (!window.gapi) {
            reject(new Error("Biblioteca Google não carregada."));
            return;
        }

        gapi.load("picker", {
            callback: () => {
                pickerCarregado = true;
                resolve();
            },
            onerror: () => reject(
                new Error("Não foi possível carregar o Google Picker.")
            )
        });
    });
}

function conectarGoogleDrive() {
    if (!window.google?.accounts?.oauth2) {
        alert("A conexão Google ainda está carregando.");
        return;
    }

    const cliente = google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_CLIENT_ID,
        scope: "https://www.googleapis.com/auth/drive.file",

        callback: async (resposta) => {
            if (resposta.error) {
                alert("Não foi possível conectar ao Google Drive.");
                return;
            }

            tokenGoogle = resposta.access_token;

            try {
                await carregarGooglePicker();

                const pastaSalva =
                    localStorage.getItem("pastaMemoriasDrive");

                if (pastaSalva) {
                    await carregarFotosDrive();
                } else {
                    abrirSeletorPasta();
                }

            } catch (erro) {
                console.error(erro);
                alert("Erro ao acessar o álbum. Tente novamente.");
            }
        }
    });

    cliente.requestAccessToken();
}

function abrirSeletorPasta() {
    const visualizacao = new google.picker.DocsView(
        google.picker.ViewId.FOLDERS
    );

    visualizacao.setSelectFolderEnabled(true);
    visualizacao.setIncludeFolders(true);

    const picker = new google.picker.PickerBuilder()
        .setAppId(GOOGLE_PROJECT_NUMBER)
        .setDeveloperKey(GOOGLE_API_KEY)
        .setOAuthToken(tokenGoogle)
        .addView(visualizacao)
        .setCallback(async (dados) => {
            if (dados.action === google.picker.Action.PICKED) {
                const pasta = dados.docs[0];

                localStorage.setItem(
                    "pastaMemoriasDrive",
                    pasta.id
                );

                alert("Pasta do casal selecionada!");

                try {
                    await carregarFotosDrive();
                } catch (erro) {
                    console.error(erro);
                    alert("Não foi possível carregar as fotos.");
                }
            }
        })
        .build();

    picker.setVisible(true);
}

/* =========================================
   ENVIAR FOTOS PARA O DRIVE
========================================= */

async function enviarFotoDrive(arquivo) {
    const pasta = localStorage.getItem("pastaMemoriasDrive");

    if (!pasta || !tokenGoogle) {
        throw new Error("Conecte ao Google Drive primeiro.");
    }

    const limite = 15 * 1024 * 1024;

    if (arquivo.size > limite) {
        throw new Error(
            arquivo.name + " ultrapassa o limite de 15 MB."
        );
    }

    const limiteTipo = arquivo.type.startsWith("image/");

    if (!limiteTipo) {
        throw new Error("Selecione somente imagens.");
    }

    const metadata = {
        name: arquivo.name,
        mimeType: arquivo.type,
        parents: [pasta]
    };

    const boundary = "nossoCantinhoBoundary" +
        Date.now();

    const corpo = new Blob([
        "--" + boundary + "\r\n" +
        "Content-Type: application/json; charset=UTF-8\r\n\r\n" +
        JSON.stringify(metadata) + "\r\n" +

        "--" + boundary + "\r\n" +
        "Content-Type: " + arquivo.type + "\r\n\r\n",

        arquivo,

        "\r\n--" + boundary + "--"
    ]);

    const resposta = await fetch(
        "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,mimeType,createdTime",
        {
            method: "POST",
            headers: {
                Authorization: "Bearer " + tokenGoogle,
                "Content-Type":
                    "multipart/related; boundary=" + boundary
            },
            body: corpo
        }
    );

    if (!resposta.ok) {
        const erro = await resposta.text();
        console.error(erro);
        throw new Error("Falha ao enviar " + arquivo.name);
    }

    return resposta.json();
}

/* =========================================
   CARREGAR FOTOS DO DRIVE
========================================= */

async function carregarFotosDrive() {
    const pasta = localStorage.getItem("pastaMemoriasDrive");

    if (!pasta || !tokenGoogle) return;

    const consulta = encodeURIComponent(
        "'" + pasta + "' in parents and trashed = false and mimeType contains 'image/'"
    );

    const url =
        "https://www.googleapis.com/drive/v3/files" +
        "?q=" + consulta +
        "&orderBy=createdTime desc" +
        "&pageSize=100" +
        "&fields=files(id,name,mimeType,createdTime)";

    const resposta = await fetch(url, {
        headers: {
            Authorization: "Bearer " + tokenGoogle
        }
    });

    if (!resposta.ok) {
        throw new Error("Não foi possível consultar a pasta.");
    }

    const dados = await resposta.json();

    await mostrarFotos(dados.files || []);
}

/* =========================================
   ORGANIZAR E EXIBIR FOTOS POR MÊS
========================================= */

async function mostrarFotos(fotos) {
    const container = document.querySelector(
        "#nossasMemorias .album-container"
    );

    const vazio = document.getElementById("albumVazio");

    if (!container || !vazio) return;

    container.querySelectorAll(".album-mes").forEach(secao => {
        secao.remove();
    });

    const grupos = {};

    fotos.forEach(foto => {
        const data = new Date(foto.createdTime);

        const chave =
            data.getFullYear() + "-" +
            String(data.getMonth() + 1).padStart(2, "0");

        if (!grupos[chave]) {
            grupos[chave] = {
                titulo: data.toLocaleDateString("pt-BR", {
                    month: "long",
                    year: "numeric"
                }),
                fotos: []
            };
        }

        grupos[chave].fotos.push(foto);
    });

    const meses = Object.keys(grupos).sort().reverse();

    for (const mes of meses) {
        const secao = document.createElement("div");
        secao.className = "album-mes";

        const titulo = document.createElement("h3");
        titulo.textContent =
            grupos[mes].titulo.charAt(0).toUpperCase() +
            grupos[mes].titulo.slice(1);

        const grade = document.createElement("div");
        grade.className = "album-grade";

        secao.appendChild(titulo);
        secao.appendChild(grade);

        container.insertBefore(secao, vazio);

        for (const foto of grupos[mes].fotos) {
            const imagem = document.createElement("img");

            imagem.alt = foto.name;
            imagem.loading = "lazy";

            imagem.style.width = "100%";
            imagem.style.aspectRatio = "1 / 1";
            imagem.style.objectFit = "cover";
            imagem.style.borderRadius = "12px";

            grade.appendChild(imagem);

            try {
                const arquivo = await fetch(
                    "https://www.googleapis.com/drive/v3/files/" +
                    encodeURIComponent(foto.id) + "?alt=media",
                    {
                        headers: {
                            Authorization: "Bearer " + tokenGoogle
                        }
                    }
                );

                if (!arquivo.ok) {
                    throw new Error("Falha ao carregar imagem.");
                }

                const blob = await arquivo.blob();
                imagem.src = URL.createObjectURL(blob);

            } catch (erro) {
                console.error(erro);
                imagem.alt = "Não foi possível carregar esta foto.";
            }
        }
    }

    vazio.style.display = fotos.length ? "none" : "block";
}

/* =========================================
   BOTÃO ADICIONAR FOTOS
========================================= */

function iniciarSeletorAlbum() {
    const seletor = document.getElementById(
        "albumSelecionarFotos"
    );

    if (!seletor || seletor.dataset.iniciado === "sim") {
        return;
    }

    seletor.dataset.iniciado = "sim";

    seletor.addEventListener("change", async () => {
        const arquivos = Array.from(seletor.files || []);

        if (!arquivos.length) return;

        alert("Foto selecionada! Iniciando envio...");

        if (!tokenGoogle) {
            alert("Conecte ao Google Drive primeiro.");
            seletor.value = "";
            return;
        }

        try {
            for (const arquivo of arquivos) {
                await enviarFotoDrive(arquivo);
            }

            alert("Fotos adicionadas ao nosso álbum!");

            await carregarFotosDrive();

        } catch (erro) {
            console.error(erro);
            alert("Erro ao enviar: " + erro.message);

        } finally {
            seletor.value = "";
        }
    });
}

if (document.readyState === "loading") {
    document.addEventListener(
        "DOMContentLoaded",
        iniciarSeletorAlbum
    );
} else {
    iniciarSeletorAlbum();
}

window.conectarGoogleDrive = conectarGoogleDrive;
