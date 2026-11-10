const artigos = [
  { categoria: 'Skincare', titulo: '5 passos para uma pele radiante', descricao: 'Uma rotina simples para cuidar da sua pele todos os dias.', imagem: 'imagens/skincare.jpg', conteudo: 'Comece com uma limpeza suave, aplique hidratante adequado ao seu tipo de pele e use protetor solar diariamente. Introduza produtos novos aos poucos e observe como sua pele reage.' },
  { categoria: 'Maquiagem', titulo: 'Maquiagem natural para o dia a dia', descricao: 'Como criar uma make leve e iluminada em poucos minutos.', imagem: 'imagens/maquiagem.jpg', conteudo: 'Prepare a pele com hidratante, use uma base leve ou corretivo apenas onde precisar e finalize com blush, máscara de cílios e um gloss de sua preferência.' },
  { categoria: 'Cabelos', titulo: 'Segredos para cabelos saudáveis', descricao: 'Hábitos simples que fazem diferença nos seus fios.', imagem: 'imagens/cabelos.jpg', conteudo: 'Evite calor excessivo, use condicionador após a lavagem e escolha produtos adequados ao seu cabelo. Para proteger os fios, desembarace com cuidado.' },
  { categoria: 'Skincare', titulo: 'Seu ritual de autocuidado', descricao: 'Reserve pequenos momentos para cuidar de você.', imagem: 'imagens/autocuidado.jpg', conteudo: 'Uma rotina de autocuidado pode incluir limpeza facial, hidratação, descanso e momentos longe das telas. O mais importante é que seja agradável e possível de manter.' },
  { categoria: 'Maquiagem', titulo: 'Itens essenciais no nécessaire', descricao: 'O básico para montar seu kit de maquiagem.', imagem: 'imagens/maquiagem.jpg', conteudo: 'Um kit versátil pode conter corretivo, blush, máscara de cílios, batom e pincéis. Escolha cores e texturas que combinem com seu estilo.' },
  { categoria: 'Cabelos', titulo: 'Como cuidar dos fios no verão', descricao: 'Dicas para manter seus cabelos bonitos nos dias quentes.', imagem: 'imagens/cabelos.jpg', conteudo: 'Depois de piscina ou praia, enxágue os fios com água limpa. Use produtos condicionantes e reduza o uso de ferramentas térmicas quando possível.' }
];

const lista = document.querySelector('#lista-artigos');
const pesquisa = document.querySelector('#pesquisa');
const botoes = document.querySelectorAll('.filtro');
let categoriaAtual = 'Todos';
const favoritos = new Set(JSON.parse(localStorage.getItem('bellaGlowFavoritos') || '[]'));

function mostrarArtigos() {
  const termo = pesquisa.value.toLocaleLowerCase('pt-BR').trim();
  const filtrados = artigos.map((artigo, indice) => ({ ...artigo, indice }))
    .filter(artigo => (categoriaAtual === 'Todos' || artigo.categoria === categoriaAtual) &&
      `${artigo.titulo} ${artigo.descricao} ${artigo.categoria}`.toLocaleLowerCase('pt-BR').includes(termo));
  lista.innerHTML = filtrados.map(artigo => `
    <article class="artigo">
      <img src="${artigo.imagem}" alt="Imagem ilustrativa sobre ${artigo.categoria}" loading="lazy">
      <div class="artigo-corpo">
        <span class="categoria">${artigo.categoria}</span>
        <h3>${artigo.titulo}</h3>
        <p>${artigo.descricao}</p>
        <div class="artigo-acoes">
          <button class="ler" data-ler="${artigo.indice}">Ler artigo →</button>
          <button class="favorito" data-favorito="${artigo.indice}" aria-label="Favoritar ${artigo.titulo}" aria-pressed="${favoritos.has(artigo.indice)}">${favoritos.has(artigo.indice) ? '♥' : '♡'}</button>
        </div>
      </div>
    </article>`).join('');
  document.querySelector('#sem-resultados').hidden = filtrados.length > 0;
}

botoes.forEach(botao => botao.addEventListener('click', () => {
  categoriaAtual = botao.dataset.categoria;
  botoes.forEach(item => item.classList.toggle('ativo', item === botao));
  mostrarArtigos();
}));
pesquisa.addEventListener('input', mostrarArtigos);
lista.addEventListener('click', evento => {
  const ler = evento.target.closest('[data-ler]');
  const favorito = evento.target.closest('[data-favorito]');
  if (ler) {
    const artigo = artigos[Number(ler.dataset.ler)];
    alert(`${artigo.titulo}\n\n${artigo.conteudo}`);
  }
  if (favorito) {
    const indice = Number(favorito.dataset.favorito);
    favoritos.has(indice) ? favoritos.delete(indice) : favoritos.add(indice);
    localStorage.setItem('bellaGlowFavoritos', JSON.stringify([...favoritos]));
    mostrarArtigos();
  }
});
document.querySelector('#form-newsletter').addEventListener('submit', evento => {
  evento.preventDefault();
  document.querySelector('#mensagem-newsletter').textContent = 'Formulário demonstrativo: conecte um serviço de newsletter para receber inscrições reais.';
  evento.target.reset();
});
mostrarArtigos();
