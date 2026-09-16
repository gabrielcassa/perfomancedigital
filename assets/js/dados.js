/* ==========================================================================
   dados.js — Studio Cassa
   Fonte única de conteúdo do site. Copiar para assets/js/dados.js.

   PLATAFORMA CONFERIDA EM 15/09/2026 buscando o HTML de cada URL e procurando
   a assinatura de cada plataforma (mitiendanube/tiendanube, cdn.shopify.com,
   tcdn.com.br, iset, lojaintegrada, wp-content). O campo `plataforma` abaixo é
   o que o endereço REALMENTE serve hoje — não o que foi contratado.

   COMO COMPLETAR
     capa    → assets/img/portfolio/<id>-capa.jpg    (1200x900 — prepara-imagens.ps1)
     logo    → assets/img/logos/<id>.png             (transparente — idem)
     segmento, ano, resumo, desafio, entrega
     resultado → SÓ com número real. Sem número, deixa "".

   TRÊS NÍVEIS DE EXIBIÇÃO  (campo `exibicao`)
     "destaque" → carrossel da home + grade do portfólio. SÓ e-commerce Nuvemshop.
     "grade"    → só na grade de portfolio.html, com card completo.
     "citacao"  → não tem card. Entra na lista compacta no fim do portfólio
                  ("Também passaram por aqui"), como nome + tipo + link.

   DUAS TRAVAS
     1. Nada é impresso sem url + capa + logo (exceto "citacao", que precisa só
        de url). Quem estiver incompleto não aparece — não existe card quebrado.
     2. `bloqueio` com texto esconde o projeto mesmo estando completo. É para
        loja pronta cujo domínio ainda não aponta para a Nuvemshop. Apagar o
        texto libera o card.
   ========================================================================== */

/* "13 lojas Nuvemshop no ar" = lojas Nuvemshop DISTINTAS, no ar e conferidas
   em 15/09/2026, em que ele trabalhou — construídas, migradas ou melhoradas:
   EA Labs, Ideal Forma, GIORNI, Casa Rigo, Zanelli, Flora Brinquedos, Giori,
   Serra Gerais, Colado, Galerie Du Parfum, VL Dicas, Aventtura X e Miscigenazo.
   Colado e Serra Gerais têm dois registros cada (serviços diferentes) e contam
   uma vez só. Quando as 4 migrações virarem, este número vai para 17. */
const SELO = {
  ativo:  true,
  texto:  "13 lojas Nuvemshop no ar",
  imagem: "",
  link:   ""
};

const PROJETOS = [

  /* =====================================================================
     E-COMMERCE NUVEMSHOP — NO AR, CONFERIDO. É a vitrine principal.
     ===================================================================== */

  { id:"ea-labs", nome:"EA Labs Nutrition", tipo:"E-commerce completo", status:"concluido", exibicao:"destaque",
    plataforma:"Nuvemshop", tema:"Brasília", segmento:"Suplementos", ano:"",
    url:"https://easuplementos.com/", capa:"", logo:"",
    resumo:"", desafio:"Migração vinda da Shopify.", entrega:[], resultado:"", imagens:[], depoimento:{autor:"",texto:""} },

  { id:"ideal-forma", nome:"Ideal Forma", tipo:"E-commerce completo", status:"concluido", exibicao:"destaque",
    plataforma:"Nuvemshop", tema:"Amazonas", segmento:"", ano:"",
    url:"https://www.idealforma.shop/", capa:"", logo:"",
    resumo:"", desafio:"", entrega:[], resultado:"", imagens:[], depoimento:{autor:"",texto:""} },

  { id:"giorni", nome:"GIORNI", tipo:"E-commerce completo", status:"concluido", exibicao:"destaque",
    plataforma:"Nuvemshop", tema:"", segmento:"", ano:"",
    url:"https://giornioficial.com.br/", capa:"", logo:"",
    resumo:"Loja Nuvemshop construída do zero.", desafio:"", entrega:[], resultado:"", imagens:[], depoimento:{autor:"",texto:""} },

  /* ---- Nuvemshop, mas o trabalho foi melhoria / página de produto ----------
     Ele confirmou: do zero só a GIORNI. CONFERIR, uma a uma, se foi melhoria
     de CRO ou página de produto — hoje estão todas como Otimização. */

  { id:"casa-rigo", nome:"Casa Rigo", tipo:"Otimização", status:"concluido", exibicao:"grade",
    plataforma:"Nuvemshop", tema:"", segmento:"", ano:"",
    url:"https://casarigo.com/", capa:"", logo:"",
    resumo:"", desafio:"", entrega:[], resultado:"", imagens:[], depoimento:{autor:"",texto:""} },

  { id:"zanelli-coffee", nome:"Zanelli Coffee", tipo:"Otimização", status:"concluido", exibicao:"grade",
    plataforma:"Nuvemshop", tema:"", segmento:"Café especial", ano:"",
    url:"https://loja.zanellicoffee.com/", capa:"", logo:"",
    resumo:"", desafio:"", entrega:[], resultado:"", imagens:[], depoimento:{autor:"",texto:""} },

  { id:"flora-brinquedos", nome:"Flora Brinquedos Educativos", tipo:"Otimização", status:"concluido", exibicao:"grade",
    plataforma:"Nuvemshop", tema:"", segmento:"Brinquedos educativos", ano:"",
    url:"https://florabrinquedoseducativos.com.br/", capa:"", logo:"",
    resumo:"", desafio:"", entrega:[], resultado:"", imagens:[], depoimento:{autor:"",texto:""} },

  /* =====================================================================
     ⏳ MIGRAÇÕES EM VOO — a loja Nuvemshop está pronta, o domínio ainda aponta
     para a plataforma antiga. Conferido em 15/09/2026: o endereço devolve a
     plataforma de ONDE ele migrou, ou seja, o visitante veria justamente a
     loja que foi substituída.

     A URL já está preenchida, porque o domínio não muda — muda o apontamento.
     Quem segura é o campo `bloqueio`: **enquanto `bloqueio` tiver texto, o
     projeto não renderiza, mesmo com url, capa e logo prontos.**
     No dia em que a loja virar, apague o texto do `bloqueio` daquele projeto
     (vira "") e ele entra sozinho no carrossel.
     ===================================================================== */

  { id:"quero-melancia", nome:"Quero Melancia", tipo:"E-commerce completo", status:"concluido", exibicao:"destaque",
    plataforma:"Nuvemshop", tema:"Ipanema", segmento:"Moda feminina", ano:"",
    url:"https://www.queromelancia.com.br/", capa:"", logo:"",
    bloqueio:"domínio ainda responde Tray — apagar quando apontar para a Nuvemshop",
    resumo:"", desafio:"Migração vinda da Tray.", entrega:[], resultado:"", imagens:[], depoimento:{autor:"",texto:""} },

  { id:"shalom-adonai", nome:"Livraria Shalom Adonai", tipo:"E-commerce completo", status:"concluido", exibicao:"destaque",
    plataforma:"Nuvemshop", tema:"Ipanema", segmento:"Livraria", ano:"",
    url:"https://livrariashalomadonai.com.br/", capa:"", logo:"",
    bloqueio:"domínio ainda responde WordPress — apagar quando apontar para a Nuvemshop",
    resumo:"", desafio:"", entrega:[], resultado:"", imagens:[], depoimento:{autor:"",texto:""} },

  { id:"neurocapsule", nome:"NeuroCapsule", tipo:"E-commerce completo", status:"concluido", exibicao:"destaque",
    plataforma:"Nuvemshop", tema:"Brasília", segmento:"Suplementos", ano:"",
    url:"https://loja.neurocapsule.com.br/", capa:"", logo:"",
    bloqueio:"domínio ainda responde WordPress — apagar quando apontar para a Nuvemshop",
    resumo:"", desafio:"E-commerce completo mais todas as páginas de produto.", entrega:[], resultado:"", imagens:[], depoimento:{autor:"",texto:""} },

  { id:"ga-equestre", nome:"GA Equestre", tipo:"E-commerce completo", status:"concluido", exibicao:"destaque",
    plataforma:"Nuvemshop", tema:"Ipanema", segmento:"Equitação", ano:"",
    url:"https://www.gaequestre.com.br/", capa:"", logo:"",
    bloqueio:"domínio ainda responde iSet — apagar quando apontar para a Nuvemshop",
    resumo:"", desafio:"Migração vinda da iSet, com estruturação de automações.", entrega:[], resultado:"", imagens:[], depoimento:{autor:"",texto:""} },

  /* Estas três não vieram na lista de URLs — falta o endereço, não o apontamento. */

  { id:"romance-enxovais", nome:"Romance Enxovais", tipo:"E-commerce completo", status:"concluido", exibicao:"destaque",
    plataforma:"Nuvemshop", tema:"Ipanema", segmento:"Cama, mesa e banho", ano:"",
    url:"", capa:"", logo:"",
    resumo:"", desafio:"Migração vinda da Octopus. Marca no mercado desde 1994.", entrega:[], resultado:"", imagens:[], depoimento:{autor:"",texto:""} },

  { id:"croche-vitoria", nome:"Crochê Vitória", tipo:"E-commerce completo", status:"concluido", exibicao:"destaque",
    plataforma:"Nuvemshop", tema:"Ipanema", segmento:"Decoração em crochê", ano:"",
    url:"", capa:"", logo:"",
    resumo:"", desafio:"Migração vinda da Yampi. Fabricante de Ibitinga desde 1987.", entrega:[], resultado:"", imagens:[], depoimento:{autor:"",texto:""} },

  { id:"bella-caza-decor", nome:"Bella Caza Decor", tipo:"E-commerce completo", status:"concluido", exibicao:"destaque",
    plataforma:"", tema:"", segmento:"Decoração", ano:"",
    url:"", capa:"", logo:"",
    resumo:"", desafio:"", entrega:[], resultado:"", imagens:[], depoimento:{autor:"",texto:""} },

  /* =====================================================================
     MELHORIA EM LOJA DE OUTRA PLATAFORMA — só citação.
     CONFERIR se algum destes foi página de produto em vez de melhoria.
     ===================================================================== */

  { id:"just-leve", nome:"Just Leve", tipo:"Otimização", status:"concluido", exibicao:"citacao",
    plataforma:"Shopify", tema:"", segmento:"", ano:"",
    url:"https://justleve.com.br/", capa:"", logo:"",
    resumo:"", desafio:"", entrega:[], resultado:"", imagens:[], depoimento:{autor:"",texto:""} },

  { id:"numa-chocolates", nome:"Numa Chocolates", tipo:"Otimização", status:"concluido", exibicao:"citacao",
    plataforma:"Shopify", tema:"", segmento:"Chocolates", ano:"",
    url:"https://www.numachocolates.com.br/", capa:"", logo:"",
    resumo:"", desafio:"", entrega:[], resultado:"", imagens:[], depoimento:{autor:"",texto:""} },

  { id:"arz-home-design", nome:"ARZ Home Design", tipo:"Otimização", status:"concluido", exibicao:"citacao",
    plataforma:"Loja Integrada", tema:"", segmento:"Decoração e mesa posta", ano:"",
    url:"https://loja.arzhomedesign.com/", capa:"", logo:"",
    resumo:"", desafio:"", entrega:[], resultado:"", imagens:[], depoimento:{autor:"",texto:""} },

  /* =====================================================================
     LANDING PAGE
     ===================================================================== */

  { id:"two-beats", nome:"Two Beats", tipo:"Landing page", status:"concluido", exibicao:"grade",
    plataforma:"WordPress", tema:"", segmento:"Experiência sensorial", ano:"",
    url:"https://twobeatslive.com.br/", capa:"", logo:"",
    resumo:"", desafio:"", entrega:[], resultado:"", imagens:[], depoimento:{autor:"",texto:""} },

  { id:"new-capelli", nome:"New Capelli", tipo:"Landing page", status:"concluido", exibicao:"grade",
    plataforma:"WordPress", tema:"Elementor Pro", segmento:"", ano:"",
    url:"https://loja.newcapellioficial.com.br/", capa:"", logo:"",
    resumo:"", desafio:"", entrega:[], resultado:"", imagens:[], depoimento:{autor:"",texto:""} },

  /* CONFERIR O NOME: no quadro está "GFX Reservatórios", mas a URL que você
     mandou abre como "Toledo Reservatórios Metálicos". */
  { id:"toledo-reservatorios", nome:"Toledo Reservatórios", tipo:"Landing page", status:"concluido", exibicao:"citacao",
    plataforma:"WordPress", tema:"", segmento:"Reservatórios metálicos", ano:"",
    url:"https://xn--toledoreservatrios-31b.com.br/", capa:"", logo:"",
    resumo:"", desafio:"", entrega:[], resultado:"", imagens:[], depoimento:{autor:"",texto:""} },

  { id:"mbs-purificadores", nome:"MBS Purificadores", tipo:"Landing page", status:"concluido", exibicao:"citacao",
    plataforma:"", tema:"", segmento:"", ano:"",
    url:"", capa:"", logo:"",
    resumo:"", desafio:"", entrega:[], resultado:"", imagens:[], depoimento:{autor:"",texto:""} },

  { id:"fraktal-softwares", nome:"Fraktal Softwares", tipo:"Landing page", status:"concluido", exibicao:"citacao",
    plataforma:"", tema:"", segmento:"Software", ano:"",
    url:"", capa:"", logo:"",
    resumo:"", desafio:"Contrato recorrente, uma landing por mês.", entrega:[], resultado:"", imagens:[], depoimento:{autor:"",texto:""} },

  /* =====================================================================
     PÁGINA DE PRODUTO — citar, com dois ou três em card para enriquecer.
     ===================================================================== */

  { id:"fazenda-giori", nome:"Fazenda Giori", tipo:"Página de produto", status:"concluido", exibicao:"grade",
    plataforma:"Nuvemshop", tema:"Flex", segmento:"Café especial", ano:"",
    url:"https://giori.farm/", capa:"", logo:"",
    resumo:"Melhoria de CRO mais páginas de produto.", desafio:"", entrega:[], resultado:"", imagens:[], depoimento:{autor:"",texto:""} },

  { id:"cafe-serra-gerais-ppp", nome:"Café Serra Gerais", tipo:"Página de produto", status:"concluido", exibicao:"grade",
    plataforma:"Nuvemshop", tema:"Ipanema", segmento:"Café especial", ano:"",
    url:"https://serragerais.com.br/", capa:"", logo:"",
    resumo:"2 páginas de produto perfeitas.", desafio:"", entrega:[], resultado:"", imagens:[], depoimento:{autor:"",texto:""} },

  { id:"life-nt", nome:"Life NT", tipo:"Página de produto", status:"concluido", exibicao:"citacao",
    plataforma:"Shopify", tema:"", segmento:"", ano:"",
    url:"https://lifent.com.br/", capa:"", logo:"",
    resumo:"", desafio:"", entrega:[], resultado:"", imagens:[], depoimento:{autor:"",texto:""} },

  { id:"luna", nome:"Luna Confecções", tipo:"Página de produto", status:"concluido", exibicao:"citacao",
    plataforma:"Tray", tema:"", segmento:"Confecção", ano:"",
    url:"https://www.luna.com.br/", capa:"", logo:"",
    resumo:"", desafio:"", entrega:[], resultado:"", imagens:[], depoimento:{autor:"",texto:""} },

  { id:"no-glamour", nome:"No Glamour Cosméticos", tipo:"Página de produto", status:"concluido", exibicao:"citacao",
    plataforma:"", tema:"", segmento:"Cosméticos", ano:"",
    url:"", capa:"", logo:"",
    resumo:"1 página de produto perfeita.", desafio:"", entrega:[], resultado:"", imagens:[], depoimento:{autor:"",texto:""} },

  { id:"real-conforto", nome:"Real Conforto", tipo:"Página de produto", status:"concluido", exibicao:"citacao",
    plataforma:"", tema:"", segmento:"", ano:"",
    url:"", capa:"", logo:"",
    resumo:"3 páginas de produto mais revisão das melhorias.", desafio:"", entrega:[], resultado:"", imagens:[], depoimento:{autor:"",texto:""} },

  /* =====================================================================
     OTIMIZAÇÃO / CRO — citar, com alguns em card.
     ===================================================================== */

  { id:"colado", nome:"Colado", tipo:"Otimização", status:"concluido", exibicao:"grade",
    plataforma:"Nuvemshop", tema:"Flex", segmento:"", ano:"",
    url:"https://www.colado.art.br/", capa:"", logo:"",
    resumo:"", desafio:"Loja migrada da Shopify.", entrega:[], resultado:"", imagens:[], depoimento:{autor:"",texto:""} },

  { id:"galerie-du-parfum", nome:"Galerie Du Parfum", tipo:"Otimização", status:"concluido", exibicao:"grade",
    plataforma:"Nuvemshop", tema:"", segmento:"Perfumaria", ano:"",
    url:"https://www.galerieduparfum.com.br/", capa:"", logo:"",
    resumo:"", desafio:"", entrega:[], resultado:"", imagens:[], depoimento:{autor:"",texto:""} },

  { id:"vl-dicas-de-rica", nome:"VL Dicas de Rica", tipo:"Otimização", status:"concluido", exibicao:"grade",
    plataforma:"Nuvemshop", tema:"Ipanema Casa e Decor", segmento:"Decants de perfume", ano:"",
    url:"https://vldicasderica.lojavirtualnuvem.com.br/", capa:"", logo:"",
    resumo:"", desafio:"", entrega:[], resultado:"", imagens:[], depoimento:{autor:"",texto:""} },

  { id:"aventturax", nome:"Aventtura X", tipo:"Otimização", status:"concluido", exibicao:"citacao",
    plataforma:"Nuvemshop", tema:"", segmento:"", ano:"",
    url:"https://www.aventturax.com.br/", capa:"", logo:"",
    resumo:"", desafio:"", entrega:[], resultado:"", imagens:[], depoimento:{autor:"",texto:""} },

  { id:"miscigenazo", nome:"Miscigenazo", tipo:"Otimização", status:"concluido", exibicao:"citacao",
    plataforma:"Nuvemshop", tema:"", segmento:"", ano:"",
    url:"https://miscigenazo.com.br/", capa:"", logo:"",
    resumo:"", desafio:"", entrega:[], resultado:"", imagens:[], depoimento:{autor:"",texto:""} },

  { id:"cafe-serra-gerais-cro", nome:"Café Serra Gerais", tipo:"Otimização", status:"concluido", exibicao:"citacao",
    plataforma:"Nuvemshop", tema:"Ipanema", segmento:"Café especial", ano:"",
    url:"https://serragerais.com.br/", capa:"", logo:"",
    resumo:"Melhorias de layout e implementações.", desafio:"", entrega:[], resultado:"", imagens:[], depoimento:{autor:"",texto:""} },

  { id:"vital", nome:"VITAL", tipo:"Otimização", status:"concluido", exibicao:"citacao",
    plataforma:"Shopify", tema:"", segmento:"Suplementos", ano:"",
    url:"https://bevital.com.br/", capa:"", logo:"",
    resumo:"", desafio:"", entrega:[], resultado:"", imagens:[], depoimento:{autor:"",texto:""} },

  { id:"faol-apicultura", nome:"FAOL Apicultura", tipo:"Otimização", status:"concluido", exibicao:"grade",
    plataforma:"Shopify", tema:"Glozin", segmento:"Apicultura", ano:"",
    url:"https://faolapicultura.com.br/", capa:"", logo:"",
    resumo:"", desafio:"", entrega:[], resultado:"", imagens:[], depoimento:{autor:"",texto:""} },

  /* O quadro dizia "layout shopify", mas o site responde TRAY. CONFERIR. */
  { id:"glaucia-goulart", nome:"Glaucia Goulart Bolsas", tipo:"Otimização", status:"concluido", exibicao:"citacao",
    plataforma:"Tray", tema:"", segmento:"Bolsas no atacado", ano:"",
    url:"https://www.glauciagoulartbolsas.com.br/", capa:"", logo:"",
    resumo:"Implementação de layout.", desafio:"", entrega:[], resultado:"", imagens:[], depoimento:{autor:"",texto:""} },

  { id:"atuale-gerusa", nome:"Atuale Odontologia Integrada", tipo:"Otimização", status:"concluido", exibicao:"citacao",
    plataforma:"WordPress", tema:"", segmento:"Odontologia", ano:"",
    url:"https://atualeodontologiaintegrada.com.br/", capa:"", logo:"",
    resumo:"", desafio:"", entrega:[], resultado:"", imagens:[], depoimento:{autor:"",texto:""} },

  /* Grafia confirmada pela URL: Matosinhos, com S. Era duplicata no quadro. */
  { id:"patio-matosinhos", nome:"Pátio Matosinhos", tipo:"Otimização", status:"concluido", exibicao:"citacao",
    plataforma:"WordPress", tema:"", segmento:"São João del-Rei", ano:"",
    url:"https://patiomatosinhos.com.br/", capa:"", logo:"",
    resumo:"", desafio:"", entrega:[], resultado:"", imagens:[], depoimento:{autor:"",texto:""} },

  { id:"dolce-affetto", nome:"Dolce Affetto", tipo:"Otimização", status:"concluido", exibicao:"citacao",
    plataforma:"", tema:"", segmento:"", ano:"",
    url:"", capa:"", logo:"",
    resumo:"Cadastro de produto e ajuste de banners.", desafio:"", entrega:[], resultado:"", imagens:[], depoimento:{autor:"",texto:""} },

  /* =====================================================================
     MANUTENÇÃO — só citação.
     ===================================================================== */

  { id:"colado-manutencao", nome:"Colado", tipo:"Manutenção", status:"concluido", exibicao:"citacao",
    plataforma:"Nuvemshop", tema:"Flex", segmento:"", ano:"",
    url:"https://www.colado.art.br/", capa:"", logo:"",
    resumo:"Contrato de manutenção do e-commerce.", desafio:"", entrega:[], resultado:"", imagens:[], depoimento:{autor:"",texto:""} }

];

const DEPOIMENTOS = [
  // { nome:"", segmento:"", nota:5, texto:"", audio:"" }
];

const SERVICOS = [
  { aba:"Loja virtual", nome:"E-commerce completo",
    destaque:"Meu carro-chefe",
    dor:"Quero vender online e não sei por onde começar",
    itens:["Layout desenhado com a identidade da marca",
           "Configuração de pagamento, frete e impostos",
           "Domínio próprio e SSL ativo",
           "Organização de menus, categorias e páginas",
           "Treinamento em vídeo com acesso vitalício"],
    cta:"Quero uma loja completa" },

  { aba:"Loja virtual", nome:"Migração de plataforma",
    dor:"Minha loja está numa plataforma que me trava",
    itens:["Migração de produtos, categorias e clientes",
           "Redirecionamento das URLs antigas para não perder Google",
           "Layout refeito na plataforma nova",
           "Conferência item a item antes de virar a chave"],
    cta:"Quero migrar minha loja" },

  { aba:"Otimização", nome:"Melhoria de CRO",
    dor:"Tenho visita mas não tenho venda",
    itens:["Revisão do caminho do cliente até o carrinho",
           "Ajuste de layout, banners e blocos de confiança",
           "Correção do que quebra no celular",
           "Ganho de velocidade de carregamento"],
    cta:"Quero otimizar minha loja" },

  { aba:"Otimização", nome:"Página de produto de best seller",
    dor:"Meu produto campeão tem a mesma página de todos os outros",
    itens:["Página exclusiva para o produto que mais vende",
           "Conteúdo que responde a objeção de compra",
           "Prova social e comparativo",
           "Feita para funcionar no celular primeiro"],
    cta:"Quero uma página de produto exclusiva" },

  { aba:"Site", nome:"Landing page",
    dor:"Preciso de uma página para captar cliente",
    itens:["Uma página, seções ilimitadas",
           "Design personalizado",
           "Botão de WhatsApp e formulário",
           "SEO básico e publicação no seu domínio"],
    cta:"Quero uma landing page" }
];

const PROCESSO = [
  { n:"01", titulo:"Conversa",        texto:"A gente conversa pelo WhatsApp e eu entendo o que seu negócio precisa antes de falar de valor." },
  { n:"02", titulo:"Proposta",        texto:"Mando o escopo por escrito, com o que entra, o que não entra e o prazo." },
  { n:"03", titulo:"Briefing",        texto:"Reunião para levantar sua marca, seus produtos e seu cliente. Suas respostas guiam o projeto inteiro." },
  { n:"04", titulo:"Materiais",       texto:"Você me envia fotos, textos e logo. Quanto mais completo, mais rápido anda." },
  { n:"05", titulo:"Domínio",         texto:"O domínio é comprado por você. Eu mando as instruções e configuro o apontamento." },
  { n:"06", titulo:"Desenvolvimento", texto:"Eu construo e te mostro. Você tem 2 rodadas de revisão para ajustar." },
  { n:"07", titulo:"Entrega",         texto:"Site no ar e treinamento em vídeo para você tocar sozinho depois." }
];

/* O blog está CONSTRUÍDO e DESLIGADO (§15b). Este é o post modelo: existe
   para que o layout, o JSON-LD e o card já estejam prontos.

   PARA PUBLICAR O BLOG:
     1. tirar o <meta name="robots" content="noindex, nofollow"> de blog.html
        e de cada arquivo em blog/;
     2. descomentar o bloco marcado "BLOG:" no index.html;
     3. somar as URLs ao sitemap.xml e o link ao menu e ao rodapé.
   Nada de reescrever seção. */
const POSTS = [
  { slug:      "migrar-de-plataforma-sem-perder-o-google",
    categoria: "Migração",
    titulo:    "Migrar de plataforma sem perder o Google",
    resumo:    "O medo de todo lojista que troca de plataforma é sumir da busca. Dá para não sumir — e o trabalho é quase todo antes de virar a chave.",
    data:      "2026-09-16",
    leitura:   "3 min" }
];
