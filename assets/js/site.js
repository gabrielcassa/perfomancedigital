/* ==========================================================================
   site.js — Studio Cassa
   JavaScript vanilla, sem dependência, sem type="module" (quebraria em file://).
   O MESMO arquivo roda em todas as páginas: por isso todo bloco começa com um
   guard que sai fora se o elemento não existir naquela página.
   ========================================================================== */
(function () {
  'use strict';

  /* ======================================================================
     CONSTANTES — declaradas UMA vez, em um lugar só.
     O handle do Instagram ainda vai mudar; por isso ele não aparece escrito
     em nenhum HTML. Trocar aqui troca o site inteiro.
     ====================================================================== */
  var WHATSAPP  = '5532999144851';
  var INSTAGRAM = 'xpinformatica_';
  var EMAIL     = 'gabriel.cassa02@outlook.com';

  /* ----------------------------------------------------------------------
     whats(texto) — monta o link do WhatsApp com a mensagem já preenchida.
     Cada seção manda a sua mensagem, via data-zap="...".
     ---------------------------------------------------------------------- */
  function whats(texto) {
    var base = 'https://wa.me/' + WHATSAPP;
    return texto ? base + '?text=' + encodeURIComponent(texto) : base;
  }

  function insta() {
    return 'https://www.instagram.com/' + INSTAGRAM + '/';
  }

  /* Liga todo [data-zap] ao link certo. Elemento sem texto no data-zap
     recebe o WhatsApp sem mensagem. */
  function ligarZaps() {
    var alvos = document.querySelectorAll('[data-zap]');
    if (!alvos.length) return;
    Array.prototype.forEach.call(alvos, function (a) {
      a.setAttribute('href', whats(a.getAttribute('data-zap')));
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener');
    });
  }

  /* Idem para o Instagram e o e-mail. */
  function ligarContatos() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-insta]'), function (a) {
      a.setAttribute('href', insta());
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener');
      if (a.hasAttribute('data-insta-handle')) a.textContent = '@' + INSTAGRAM;
    });
    Array.prototype.forEach.call(document.querySelectorAll('[data-email]'), function (a) {
      a.setAttribute('href', 'mailto:' + EMAIL);
      if (a.hasAttribute('data-email-texto')) a.textContent = EMAIL;
    });
  }

  /* ----------------------------------------------------------------------
     jsonLdSameAs() — o sameAs do JSON-LD sai daqui, e não do HTML, porque o
     handle do Instagram ainda vai mudar e não pode estar escrito em página
     nenhuma. Um endereço só, na constante lá em cima.
     ---------------------------------------------------------------------- */
  function jsonLdSameAs() {
    var bloco = document.querySelector('script[type="application/ld+json"][data-jsonld]');
    if (!bloco) return;

    try {
      var dados = JSON.parse(bloco.textContent);
      dados.sameAs = [insta()];
      bloco.textContent = JSON.stringify(dados, null, 2);
    } catch (e) {
      /* JSON-LD malformado não pode derrubar o resto do site */
    }
  }

  /* ----------------------------------------------------------------------
     revelar() — IntersectionObserver, threshold .15, escalonado por
     data-atraso (ms) e unobserve depois. Sem IO, mostra tudo na hora.
     ---------------------------------------------------------------------- */
  function revelar() {
    var itens = document.querySelectorAll('.rv');
    if (!itens.length) return;

    var parado = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (parado || !('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(itens, function (el) { el.classList.add('in'); });
      return;
    }

    Array.prototype.forEach.call(itens, function (el) {
      var atraso = el.getAttribute('data-atraso');
      if (atraso) el.style.setProperty('--atraso', atraso + 'ms');
    });

    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        obs.unobserve(e.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    Array.prototype.forEach.call(itens, function (el) { obs.observe(el); });
  }

  /* ----------------------------------------------------------------------
     contadores() — anima de 0 até o alvo com requestAnimationFrame e
     easeOutExpo, formatando em pt-BR. Dispara UMA vez (unobserve na hora),
     então rolar de volta não reinicia. Com reduced-motion mostra o valor
     final direto, sem animar.
     ---------------------------------------------------------------------- */
  function contadores() {
    var alvos = document.querySelectorAll('[data-contador]');
    if (!alvos.length) return;

    var fmt = new Intl.NumberFormat('pt-BR');

    function escrever(el, valor) {
      el.textContent = (el.getAttribute('data-prefixo') || '') + fmt.format(valor);
    }

    var parado = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (parado || !('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(alvos, function (el) {
        escrever(el, parseInt(el.getAttribute('data-n'), 10) || 0);
      });
      return;
    }

    function animar(el) {
      var fim = parseInt(el.getAttribute('data-n'), 10) || 0;
      var dur = 1400, t0 = null;

      function passo(agora) {
        if (t0 === null) t0 = agora;
        var t = Math.min((agora - t0) / dur, 1);
        var e = (t === 1) ? 1 : 1 - Math.pow(2, -10 * t);   /* easeOutExpo */
        escrever(el, Math.round(fim * e));
        if (t < 1) requestAnimationFrame(passo);
        else escrever(el, fim);                             /* trava no alvo */
      }
      requestAnimationFrame(passo);
    }

    /* zera só na hora de observar, para que sem JS o HTML já mostre o número */
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (!e.isIntersecting) return;
        obs.unobserve(e.target);
        animar(e.target);
      });
    }, { threshold: 0.4 });

    Array.prototype.forEach.call(alvos, function (el) {
      escrever(el, 0);
      obs.observe(el);
    });
  }

  /* ----------------------------------------------------------------------
     suave() — devolve o behavior de rolagem a usar. Com reduced-motion tem
     que ser 'auto': um behavior explícito VENCE o scroll-behavior do CSS,
     então passar 'smooth' fixo furaria a preferência do visitante.
     ---------------------------------------------------------------------- */
  function suave() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'auto' : 'smooth';
  }

  /* ----------------------------------------------------------------------
     focaveisEm(raiz) — os elementos que de fato recebem foco dentro de raiz.
     Usado pelo modal e pelo menu.
     ---------------------------------------------------------------------- */
  function focaveisEm(raiz) {
    return Array.prototype.filter.call(
      raiz.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'),
      function (el) { return el.offsetParent !== null; });
  }

  /* prendeTab(e, lista) — devolve o foco ao começo/fim ao sair da lista */
  function prendeTab(e, lista) {
    if (e.key !== 'Tab' || !lista.length) return;
    var primeiro = lista[0], ultimo = lista[lista.length - 1];
    if (e.shiftKey && document.activeElement === primeiro) {
      e.preventDefault(); ultimo.focus();
    } else if (!e.shiftKey && document.activeElement === ultimo) {
      e.preventDefault(); primeiro.focus();
    }
  }

  /* ----------------------------------------------------------------------
     carrossel() — setas com estado disabled nas pontas e arrasto por
     pointer events. No toque não há listener: o swipe nativo é melhor do
     que qualquer coisa que eu escrevesse por cima.
     ---------------------------------------------------------------------- */
  function carrossel() {
    var caixa = document.querySelector('[data-carrossel]');
    if (!caixa) return;

    var trilho = caixa.querySelector('.carrossel__trilho');
    var antes  = caixa.querySelector('[data-carrossel-antes]');
    var depois = caixa.querySelector('[data-carrossel-depois]');
    if (!trilho || !antes || !depois) return;

    function passo() {
      var card = trilho.querySelector('.projeto');
      return card ? card.getBoundingClientRect().width + 24 : trilho.clientWidth;
    }

    function estado() {
      var max = trilho.scrollWidth - trilho.clientWidth;
      antes.disabled  = trilho.scrollLeft <= 1;
      depois.disabled = trilho.scrollLeft >= max - 1;
    }

    antes.addEventListener('click', function () {
      trilho.scrollBy({ left: -passo(), behavior: suave() });
    });
    depois.addEventListener('click', function () {
      trilho.scrollBy({ left: passo(), behavior: suave() });
    });

    trilho.addEventListener('scroll', estado, { passive: true });
    window.addEventListener('resize', estado);
    estado();

    var arrastando = false, x0 = 0, s0 = 0, moveu = 0;

    trilho.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'touch') return;
      arrastando = true; moveu = 0;
      x0 = e.clientX; s0 = trilho.scrollLeft;
      trilho.classList.add('arrastando');
    });

    trilho.addEventListener('pointermove', function (e) {
      if (!arrastando) return;
      var d = e.clientX - x0;
      moveu = Math.max(moveu, Math.abs(d));
      trilho.scrollLeft = s0 - d;
      if (moveu > 4) e.preventDefault();
    });

    function soltar() {
      if (!arrastando) return;
      arrastando = false;
      trilho.classList.remove('arrastando');
      /* engole o clique que abriria um modal no fim de um arrasto */
      if (moveu > 6) {
        trilho.addEventListener('click', function engole(ev) {
          ev.stopPropagation(); ev.preventDefault();
          trilho.removeEventListener('click', engole, true);
        }, true);
      }
    }
    trilho.addEventListener('pointerup', soltar);
    trilho.addEventListener('pointercancel', soltar);
    trilho.addEventListener('pointerleave', soltar);
  }

  /* ----------------------------------------------------------------------
     modalProjeto() — abre por id, fecha no ESC / backdrop / ✕, prende o foco
     e devolve o foco ao card de origem. O conteúdo vem do render.js.
     ---------------------------------------------------------------------- */
  function modalProjeto() {
    var modal = document.getElementById('modal-projeto');
    if (!modal || !window.SCRender) return;

    var corpo  = modal.querySelector('.modal__corpo');
    var fechar = modal.querySelector('[data-modal-fechar]');
    var origem = null;

    function abrir(id, botao) {
      var p = window.SCRender.projetoPorId(id);
      if (!p || !window.SCRender.projetoVisivel(p)) return;

      origem = botao || null;
      corpo.innerHTML = window.SCRender.htmlModal(p);
      ligarZaps();
      modal.hidden = false;
      document.body.classList.add('travado');
      (focaveisEm(modal)[0] || fechar).focus();
    }

    function fecharModal() {
      if (modal.hidden) return;
      modal.hidden = true;
      corpo.innerHTML = '';
      document.body.classList.remove('travado');
      if (origem) { origem.focus(); origem = null; }
    }

    /* delegação: vale para o carrossel e para a grade do portfolio.html */
    document.addEventListener('click', function (e) {
      var botao = e.target.closest('[data-projeto]');
      if (botao) { abrir(botao.getAttribute('data-projeto'), botao); return; }
      if (e.target.closest('[data-modal-fechar]')) fecharModal();
    });

    /* o backdrop é o próprio .modal; o painel fica dentro dele */
    modal.addEventListener('mousedown', function (e) {
      if (e.target === modal) fecharModal();
    });

    document.addEventListener('keydown', function (e) {
      if (modal.hidden) return;
      if (e.key === 'Escape') { fecharModal(); return; }
      prendeTab(e, focaveisEm(modal));
    });
  }

  /* ----------------------------------------------------------------------
     abas() — troca de painel dos serviços. Setas, Home/End, aria-selected
     e roving tabindex.
     ---------------------------------------------------------------------- */
  function abas() {
    var caixa = document.querySelector('[data-servicos]');
    if (!caixa) return;

    var botoes = Array.prototype.slice.call(caixa.querySelectorAll('.aba'));
    var paineis = Array.prototype.slice.call(caixa.querySelectorAll('.abas__painel'));
    if (!botoes.length) return;

    function selecionar(i, focar) {
      botoes.forEach(function (b, j) {
        b.setAttribute('aria-selected', String(j === i));
        b.tabIndex = (j === i) ? 0 : -1;
      });
      paineis.forEach(function (p, j) { p.hidden = (j !== i); });
      if (focar) botoes[i].focus();
    }

    botoes.forEach(function (b, i) {
      b.addEventListener('click', function () { selecionar(i, false); });
      b.addEventListener('keydown', function (e) {
        var n = null;
        if (e.key === 'ArrowRight') n = (i + 1) % botoes.length;
        else if (e.key === 'ArrowLeft') n = (i - 1 + botoes.length) % botoes.length;
        else if (e.key === 'Home') n = 0;
        else if (e.key === 'End') n = botoes.length - 1;
        if (n === null) return;
        e.preventDefault();
        selecionar(n, true);
      });
    });
  }

  /* ----------------------------------------------------------------------
     filtros() — os filtros por tipo da grade de portfolio.html.
     ---------------------------------------------------------------------- */
  function filtros() {
    var tira = document.querySelector('[data-filtros]');
    if (!tira) return;

    var grade = document.querySelector('.grade-projetos');
    if (!grade) return;

    tira.addEventListener('click', function (e) {
      var b = e.target.closest('[data-filtro]');
      if (!b) return;
      var alvo = b.getAttribute('data-filtro');

      Array.prototype.forEach.call(tira.querySelectorAll('[data-filtro]'), function (x) {
        x.setAttribute('aria-pressed', String(x === b));
      });
      Array.prototype.forEach.call(grade.children, function (item) {
        item.hidden = (alvo !== 'Todos' && item.getAttribute('data-tipo') !== alvo);
      });
    });
  }

  /* ----------------------------------------------------------------------
     navScroll() — a nav ganha borda e sombra depois de 40px.
     ---------------------------------------------------------------------- */
  function navScroll() {
    var nav = document.querySelector('.nav');
    if (!nav) return;

    function checar() { nav.classList.toggle('rolou', window.scrollY > 40); }
    checar();
    window.addEventListener('scroll', checar, { passive: true });
  }

  /* ----------------------------------------------------------------------
     menuMobile() — hambúrguer → tela cheia. Trava o scroll do body, fecha
     no ESC e ao clicar num link, e devolve o foco ao botão.
     ---------------------------------------------------------------------- */
  function menuMobile() {
    var botao = document.querySelector('.hamburguer');
    var menu  = document.getElementById('menu');
    if (!botao || !menu) return;

    /* O resto da página fica inerte enquanto o menu está aberto. Sem isto,
       o Tab sai do overlay e vai parar num link do corpo da página — que,
       com o body travado em overflow:hidden, está fora da tela e não dá
       para alcançar. A nav fica de fora porque o hambúrguer vive nela e
       precisa continuar focável para fechar o menu. */
    function outros() {
      return Array.prototype.filter.call(document.body.children, function (el) {
        return el !== menu && !el.contains(botao);
      });
    }

    /* o ciclo de foco é o hambúrguer mais o que estiver dentro do menu */
    function ciclo() { return [botao].concat(focaveisEm(menu)); }

    function abrir() {
      menu.classList.add('aberto');
      menu.removeAttribute('inert');
      outros().forEach(function (el) { el.setAttribute('inert', ''); });
      botao.setAttribute('aria-expanded', 'true');
      document.body.classList.add('travado');
      var primeiro = focaveisEm(menu)[0];
      if (primeiro) primeiro.focus();
    }

    function fechar(devolverFoco) {
      menu.classList.remove('aberto');
      menu.setAttribute('inert', '');
      outros().forEach(function (el) { el.removeAttribute('inert'); });
      botao.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('travado');
      if (devolverFoco) botao.focus();
    }

    menu.setAttribute('inert', '');

    botao.addEventListener('click', function () {
      if (botao.getAttribute('aria-expanded') === 'true') fechar(true);
      else abrir();
    });

    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) fechar(false);
    });

    document.addEventListener('keydown', function (e) {
      if (!menu.classList.contains('aberto')) return;
      if (e.key === 'Escape') { fechar(true); return; }
      prendeTab(e, ciclo());
    });

    /* se a janela passar dos 960px com o menu aberto, ele some por CSS —
       o body não pode ficar travado nem o resto inerte */
    window.matchMedia('(min-width: 960px)').addEventListener('change', function (e) {
      if (e.matches && menu.classList.contains('aberto')) fechar(false);
    });
  }

  /* ----------------------------------------------------------------------
     flutuantes() — WhatsApp e voltar-ao-topo aparecem depois de 400px.
     ---------------------------------------------------------------------- */
  function flutuantes() {
    var caixa = document.querySelector('.flutuantes');
    if (!caixa) return;

    var botoes = caixa.querySelectorAll('.flutuante');

    function checar() {
      var mostra = window.scrollY > 400;
      Array.prototype.forEach.call(botoes, function (b) {
        b.classList.toggle('mostra', mostra);
        /* escondido de verdade: não entra na ordem de tabulação */
        if (b.tagName === 'A' || b.tagName === 'BUTTON') b.tabIndex = mostra ? 0 : -1;
      });
    }

    checar();
    window.addEventListener('scroll', checar, { passive: true });
  }

  /* ----------------------------------------------------------------------
     voltarAoTopo()
     ---------------------------------------------------------------------- */
  function voltarAoTopo() {
    var botao = document.querySelector('[data-topo]');
    if (!botao) return;

    botao.addEventListener('click', function () {
      var parado = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: parado ? 'auto' : 'smooth' });
      var pular = document.querySelector('.pular');
      if (pular) pular.focus();
    });
  }

  /* ----------------------------------------------------------------------
     ano() — © do rodapé.
     ---------------------------------------------------------------------- */
  function ano() {
    var alvos = document.querySelectorAll('[data-ano]');
    if (!alvos.length) return;
    var agora = String(new Date().getFullYear());
    Array.prototype.forEach.call(alvos, function (el) { el.textContent = agora; });
  }

  /* ----------------------------------------------------------------------
     O que o render.js precisa daqui. É a única superfície compartilhada
     entre os dois arquivos — de propósito.
     ---------------------------------------------------------------------- */
  window.SC = {
    WHATSAPP:  WHATSAPP,
    INSTAGRAM: INSTAGRAM,
    EMAIL:     EMAIL,
    whats:     whats,
    ligarZaps: ligarZaps
  };

  /* ----------------------------------------------------------------------
     Arranque. DOM já está pronto: os scripts ficam no fim do <body>.
     A ordem está escrita só aqui — o render.js define, não dispara.
     ---------------------------------------------------------------------- */

  /* 1. conteúdo que vem do dados.js — tem que existir antes do resto */
  if (window.SCRender) window.SCRender.montarTudo();

  /* 2. ligações e comportamentos — tudo que é addEventListener está aqui */
  ligarZaps();
  ligarContatos();
  jsonLdSameAs();
  navScroll();
  menuMobile();
  carrossel();
  modalProjeto();
  abas();
  filtros();
  flutuantes();
  voltarAoTopo();
  ano();

  /* 3. i18n antes das animações: em pt não mexe no DOM, mas em outro idioma
        precisa trocar o texto antes de qualquer coisa entrar na tela */
  if (typeof iniciarI18n === 'function') iniciarI18n();

  /* 4. observadores por último: só agora existem os nós gerados acima */
  revelar();
  contadores();
})();
