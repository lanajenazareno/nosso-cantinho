/* =========================================
   NOSSO CANTINHO — CONEXÃO GOOGLE DRIVE
========================================= */

const GOOGLE_CLIENT_ID =
"162069055708-3o0uiev4n06h364c2fon0l1id644kttv.apps.googleusercontent.com";

const GOOGLE_API_KEY = "COLE_SUA_CHAVE_DE_API_AQUI";

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
        alert("A conexão Google ainda está carregando. Tente novamente.");
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
                abrirSeletorPasta();
            } catch (erro) {
                alert(erro.message);
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
        .setCallback((dados) => {
            if (dados.action === google.picker.Action.PICKED) {
                const pasta = dados.docs[0];

                localStorage.setItem(
                    "pastaMemoriasDrive",
                    pasta.id
                );

                alert("Pasta do casal selecionada! ❤️");
            }
        })
        .build();

    picker.setVisible(true);
}

window.conectarGoogleDrive = conectarGoogleDrive;
