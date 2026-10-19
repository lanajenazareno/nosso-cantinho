self.addEventListener("push", event => {
  let dados = {
    title: "Nosso Cantinho 🫀",
    body: "Vocês têm um compromisso marcado!",
    url: "/nosso-cantinho/"
  };

  if (event.data) {
    try {
      dados = { ...dados, ...event.data.json() };
    } catch {
      dados.body = event.data.text();
    }
  }

  event.waitUntil(
    self.registration.showNotification(dados.title, {
      body: dados.body,
      icon: "/nosso-cantinho/icon-192.png",
      badge: "/nosso-cantinho/icon-192.png",
      data: { url: dados.url || "/nosso-cantinho/" }
    })
  );
});

self.addEventListener("notificationclick", event => {
  event.notification.close();

  const destino = new URL(
    event.notification.data?.url || "/nosso-cantinho/",
    self.location.origin
  ).href;

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true })
      .then(janelas => {
        for (const janela of janelas) {
          if (janela.url.startsWith(self.location.origin) && "focus" in janela) {
            janela.navigate(destino);
            return janela.focus();
          }
        }
        return clients.openWindow(destino);
      })
  );
});
