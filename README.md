# Studio Cassa — studiocassa.com.br

Site estático. HTML + CSS + JavaScript puro, sem build, sem npm, sem framework.
Para trabalhar nele basta abrir a pasta e editar. Para ver, abra o `index.html`
direto no navegador — funciona por `file://`, sem servidor.


> ## ⚠ MODO RASCUNHO — o site está fora do Google de propósito
>
> Enquanto ele vive em `gabrielcassa.github.io/studiocassa/`, as 7 páginas estão
> com `noindex, nofollow` e o `CNAME` está desativado. Isso é deliberado: dá para
> ver o site no ar, trabalhar melhorias e estudar o mercado sem que o Google
> indexe um rascunho — e sem que um domínio ainda não registrado derrube tudo.
>
> **Para publicar de verdade, na ordem:**
>
> 1. Registrar `studiocassa.com.br` no registro.br.
> 2. `git mv CNAME.desativado CNAME`
> 3. Apagar o bloco marcado `RASCUNHO` (o comentário + a linha `meta robots`) de
>    `index.html`, `portfolio.html`, `contato.html` e `projeto.html`. Achar com:
>    `grep -rn RASCUNHO *.html`
>    Não mexer no `noindex` de `404.html`, `blog.html` e do post — esses continuam
>    fora do índice de propósito.
> 4. No DNS: 4 registros `A` do apex para 185.199.108.153, .109.153, .110.153 e
>    .111.153, mais `CNAME www → gabrielcassa.github.io`.
> 5. Em Settings → Pages, marcar **Enforce HTTPS** (o certificado pode levar 24h).
> 6. Só então rodar o PageSpeed Insights.
>
> Enquanto o CNAME estiver desativado, `canonical`, `og:url` e o `sitemap.xml`
> continuam apontando para `studiocassa.com.br`. Está certo assim: eles descrevem
> onde o site VAI morar, e o `noindex` impede que isso confunda algum buscador
> nesse meio-tempo.

---

## Se você só quer fazer UMA coisa

| Quero… | Mexa só em… |
|---|---|
| Adicionar ou editar um projeto | `assets/js/dados.js` + as imagens |
| Liberar uma loja que migrou | `assets/js/dados.js`, campo `bloqueio` |
| Trocar o selo do hero/rodapé | `assets/js/dados.js`, objeto `SELO` |
| Trocar um texto do site | o próprio HTML **e** `assets/js/i18n.js` |
| Trocar o WhatsApp ou o Instagram | `assets/js/site.js`, constantes no topo |
| Publicar o blog | ver "Ligar o blog" |

---

## Os arquivos

```
index.html            landing principal
portfolio.html        grade de projetos + filtros
projeto.html          página de um caso; lê ?id= da URL
contato.html
blog.html             construído e DESLIGADO
blog/<slug>.html      idem
404.html
CNAME                 só o domínio
robots.txt  sitemap.xml
prepara-imagens.ps1   trata os prints e as logos
assets/
  css/base.css        tokens, reset, tipografia, utilitários
  css/site.css        seções e componentes
  js/dados.js         TODO o conteúdo: SELO, PROJETOS, SERVICOS, PROCESSO, POSTS
  js/render.js        monta HTML a partir do dados.js — nenhum evento aqui
  js/site.js          comportamento: nav, menu, carrossel, modal, abas, filtros
  js/i18n.js          dicionário pt completo + en vazio
  img/portfolio/      capas    <id>-capa.jpg   1200x900
  img/logos/          logos    <id>.png        fundo transparente
  img/og/             imagem de compartilhamento
  favicon/
```

**`render.js` e `site.js` são dois arquivos por separação de responsabilidade**,
não por peso: o navegador baixa os dois de qualquer jeito. `render.js` só produz
HTML; todo `addEventListener` está no `site.js`.

---

## Adicionar um projeto

1. Salve o print da loja em `_prints/<id>.png` e a logo em `_logos/<id>.png`.
   O `<id>` é o `id` do projeto no `dados.js`, sem acento e com hífen.
2. Rode na raiz:

   ```powershell
   .\prepara-imagens.ps1 -Aplicar
   ```

   Ele gera `assets/img/portfolio/<id>-capa.jpg` (1200×900) e
   `assets/img/logos/<id>.png`, e com `-Aplicar` já escreve os caminhos no
   `dados.js`. Se uma capa passar de **200 KB** ele avisa na tela — quando
   avisar, rode de novo com `-Qualidade 70`.
3. Confira o card na home, em `portfolio.html` e em `projeto.html?id=<id>`.
4. Some a URL do projeto ao `sitemap.xml` (tem um comentário lá explicando).

As pastas `_prints/` e `_logos/` estão no `.gitignore`: o cru não é publicado.

### Por que um projeto pode não aparecer

São **duas travas**, ambas no `dados.js`:

1. Um projeto só é impresso com `status:"concluido"` **e** `url` **e** `capa`
   **e** `logo`. Faltando um, o card não existe em lugar nenhum — de propósito,
   para não haver card quebrado. A exceção é `exibicao:"citacao"`, que precisa
   só de `url` porque não tem card nem imagem.
2. `bloqueio` com qualquer texto esconde o projeto **mesmo completo**. É a loja
   pronta cujo domínio ainda aponta para a plataforma antiga: publicar o card
   antes da virada mandaria o visitante para a loja que você substituiu.
   **Para liberar, apague o texto do `bloqueio` e nada mais.**

O campo `exibicao` decide onde o projeto aparece:

- `"destaque"` → carrossel da home **e** grade do portfólio. Só e-commerce Nuvemshop.
- `"grade"` → só na grade de `portfolio.html`.
- `"citacao"` → sem card; entra na lista "Também passaram por aqui".

Os filtros de `portfolio.html` são gerados dos `tipo` que de fato existem entre
os projetos visíveis. Não há lista de filtros escrita à mão.

---

## O selo

```js
const SELO = { ativo: true, texto: "…", imagem: "", link: "" };
```

Os **9 pontos** do site que mostram o selo (hero, seção de números, e o rodapé de
cada página) leem só esse objeto. O HTML de cada ponto é um `<p data-selo>` vazio.

- `imagem: ""` → mostra uma estrela ✦ e o `texto`.
- `imagem: "assets/img/…"` → troca a estrela pela imagem.
- `link: "…"` → o ponto **vira um `<a>`** clicável. Apagar o link faz voltar a `<p>`.

Caminho de imagem é sempre relativo à **raiz**; o `render.js` ajusta a
profundidade sozinho (é o que o `data-base="../"` no `<html>` das páginas de
`blog/` resolve).

---

## Trocar texto

O português mora no HTML; o `i18n.js` é o espelho para tradução. **Mudou um texto
visível, mude nos dois** — senão o dia em que o inglês entrar o site volta à
versão antiga. A chave está no próprio elemento, em `data-i18n`.

---

## Ligar o blog

Hoje ele está pronto e fora do ar. Para publicar:

1. apague o `<meta name="robots" content="noindex, nofollow">` de `blog.html` e
   de cada arquivo em `blog/`;
2. descomente o bloco marcado `BLOG:` no `index.html`;
3. some as URLs ao `sitemap.xml` e o link ao menu e ao rodapé.

O post que está lá é um **modelo** — leia antes de publicar, porque sai com a sua
assinatura.

---

## Publicar no GitHub Pages

Só na primeira vez:

```bash
git init
git add .
git commit -m "Site do Studio Cassa"
git branch -M main
git remote add origin https://github.com/gabrielcassa/<repo>.git
git push -u origin main
```

Depois: **Settings → Pages → Source: Deploy from a branch → `main` / `/ (root)`**.
Sem Actions — o Pages serve estático direto.

No DNS do domínio:

| tipo | nome | valor |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `gabrielcassa.github.io` |

Depois marque **Enforce HTTPS** no Settings → Pages. O certificado pode levar até
24h; se a opção estiver cinza, é só esperar o DNS propagar.

Publicações seguintes: `git add . && git commit -m "..." && git push`.

---

## Orçamento de peso

O que decide a velocidade do site são as **imagens**, não o código.

| item | hoje | teto |
|---|---|---|
| CSS + JS (soma dos gzip) | 36,96 KB | 45 KB, informativo |
| cada capa | — | **200 KB** |
| primeira dobra | 123,13 KB | 600 KB |

Meça o CSS/JS pela **soma dos gzip individuais**, não pelos bytes em disco e não
juntando os arquivos antes de comprimir — o navegador baixa cada um separado.

```bash
for f in assets/css/*.css assets/js/*.js; do
  printf "%-22s %5.2f KB gz\n" "$f" $(gzip -9c "$f" | wc -c | awk '{print $1/1024}')
done
```

Nunca comprima nome de classe nem tire comentário para caber: o repositório é a
fonte, e legibilidade vale mais que 1 KB.

---

## Limitações conhecidas

- **Quando o inglês for ligado, duas coisas continuam em português:** as mensagens
  do WhatsApp (estão escritas à mão no `data-zap` de cada HTML; a chave
  `flut.zapPadrao` existe no dicionário e ninguém a lê) e o corpo do artigo do
  blog (o `<main>` do post não tem `data-i18n`).
- **Não existe formulário de contato.** Site estático precisaria de um serviço de
  terceiro, e a página de contato funciona pelo WhatsApp. Se um dia entrar um
  formulário, ele vai precisar de uma página de agradecimento — a antiga
  `obrigado.html` foi removida porque era inalcançável e dizia "recebi sua
  mensagem" para quem nunca mandou nada.
- **A seção "Resultado real" (vídeo) está no HTML, comentada**, esperando um vídeo
  ou um print de loja. O CSS do mockup de celular já está pronto.
- **A foto do Sobre não existe**: no lugar há uma composição gráfica, com um TODO
  no `index.html`.

---

## Rodar um servidor local

Não é obrigatório — o site abre por `file://`. Mas se quiser:

```powershell
# Windows, sem instalar nada
$l = New-Object System.Net.HttpListener
$l.Prefixes.Add('http://localhost:8000/')
```

Mais simples: a extensão **Live Server** do VS Code, botão direito no
`index.html` → *Open with Live Server*.
