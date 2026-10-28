/* Estatística de visitas — Umami Cloud (sem cookies, anônimo).
   Para ativar, cole abaixo o "Website ID" do painel do Umami da Talita. */
(function () {
  var UMAMI_ID = 'f0b72775-1e97-4e07-9952-65d86e5647d0';
  var DOMINIO = 'talitamoretti.com.br';
  if (!UMAMI_ID) return;

  var s = document.createElement('script');
  s.defer = true;
  s.src = 'https://cloud.umami.is/script.js';
  s.setAttribute('data-website-id', UMAMI_ID);
  s.setAttribute('data-domains', DOMINIO);
  s.setAttribute('data-do-not-track', 'true');
  document.head.appendChild(s);

  function ev(nome, dados) { try { if (window.umami && umami.track) umami.track(nome, dados); } catch (e) {} }

  /* Cliques que interessam: WhatsApp (de qual botão), redes sociais, e-mail, chat e perguntas frequentes */
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (!t || !t.closest) return;
    var a = t.closest('a[href]');
    if (a) {
      var h = a.getAttribute('href') || '';
      if (h.indexOf('wa.me') > -1 || h.indexOf('whatsapp') > -1) return ev('whatsapp', { botao: a.id || 'link' });
      if (h.indexOf('instagram.com') > -1) return ev('instagram');
      if (h.indexOf('facebook.com') > -1) return ev('facebook');
      if (h.indexOf('mailto:') === 0) return ev('email');
    }
    if (t.closest('.chip.wa')) return ev('whatsapp', { botao: 'chat' });
    if (t.closest('#chatLaunch')) return ev('chat-aberto');
    var q = t.closest('.faq-q');
    if (q && !q.parentElement.classList.contains('open')) return ev('faq-aberta', { pergunta: (q.textContent || '').trim().replace(/[+−×\s]+$/, '').slice(0, 80) });
  }, true);
})();
