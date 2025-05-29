const heart = document.getElementById('heart');
const numIcons = 25;

const avatarUrls = [
    'image214.jpg', 'image215.jpg', 'image217.jpg', 'image218.jpg', 'image219.jpg', 'image220.jpg',
    'image221.jpg', 'image225.jpg', 'image226.jpg', 'image227.jpg', 'image228.jpg', 'image229.jpg',
    'image230.jpg', 'image231.jpg', 'image233.jpg', 'image234.jpg', 'image235.jpg', 'image236.jpg',
    'image239.jpg', 'image240.jpg', 'image241.jpg', 'image242.jpg', 'image246.jpg', 'image247.jpg',
    'image248.jpg', 'image249.jpg', 'image250.jpg', 'image251.jpg', 'image252.jpg', 'image253.jpg',
    'image256.jpg', 'image258.jpg', 'image259.jpg', 'image261.jpg', 'image262.png', 'image263.jpg',
    'image264.jpg', 'image265.jpg', 'image266.jpg', 'image267.jpg', 'image268.jpg', 'image269.jpg',
    'image271.jpg', 'image272.jpg', 'image274.jpg', 'image275.jpg', 'image276.jpg', 'image277.jpg',
    'image278.jpg', 'image280.jpg', 'image281.jpg', 'image282.jpg', 'image283.jpg', 'image284.jpg',
    'image285.jpg', 'image288.jpg', 'image289.jpg', 'image290.jpg', 'image292.jpg', 'image293.jpg',
    'image294.jpg', 'image295.jpg', 'image296.jpg', 'image297.jpg', 'image298.jpg', 'image299.jpg',
    'image300.jpg',
];

// Embaralha o array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const selectedAvatars = shuffleArray([...avatarUrls]).slice(0, numIcons);

function heartFunction(t) {
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    return { x, y };
}

function createHeart() {
  heart.innerHTML = '';
  const containerSize = heart.offsetWidth;
  const radius = containerSize / 2 * 1;
  const iconSize = containerSize * 0.18;

  for (let i = 0; i < selectedAvatars.length; i++) {
    const t = Math.PI * 2 * (i / selectedAvatars.length);
    const pos = heartFunction(t);
    const x = containerSize / 2 + pos.x * (radius / 16);
    const y = containerSize / 2 - pos.y * (radius / 16);

    const icon = document.createElement('div');
    icon.classList.add('icon');
    const img = document.createElement('img');
    img.src = `assets/image/${selectedAvatars[i]}`;
    icon.appendChild(img);

    icon.style.width = iconSize + 'px';
    icon.style.height = iconSize + 'px';
    icon.style.left = (x - iconSize / 2) + 'px';
    icon.style.top = (y - iconSize / 2) + 'px';

    heart.appendChild(icon);
  }

  anime({
    targets: '.icon',
    scale: [
      { value: 1, duration: 1200 },
      { value: 1.1, duration: 1200 },
      { value: 1, duration: 1200 }
    ],
    delay: anime.stagger(80),
    loop: true,
    easing: 'easeInOutSine'
  });
}

createHeart();

window.addEventListener('resize', () => {
    createHeart();
});

const heartBeat = anime.timeline({
    targets: '#heart',
    autoplay: false,
    easing: 'easeInOutSine'
});

heartBeat
    .add({ scale: 1.1, duration: 150 })
    .add({ scale: 1, duration: 150 })
    .add({ scale: 1.05, duration: 150 })
    .add({ scale: 1, duration: 150 });

heart.addEventListener('mouseenter', () => {
    heartBeat.restart();
});

heart.addEventListener('mouseleave', () => {
    heartBeat.pause();
});

// Opcional: toque em dispositivos móveis
heart.addEventListener('touchstart', () => {
    heartBeat.restart();
});

// Atualiza aleatoriamente algumas imagens a cada 30 segundos
function updateRandomIcons() {
  const icons = document.querySelectorAll('.icon img');
  const numToUpdate = 5;  // Número de imagens a trocar
  const indices = [];

  // Seleciona índices únicos
  while (indices.length < numToUpdate) {
    const rand = Math.floor(Math.random() * icons.length);
    if (!indices.includes(rand)) {
      indices.push(rand);
    }
  }

  // Troca as imagens selecionadas
  indices.forEach(idx => {
    const newImg = avatarUrls[Math.floor(Math.random() * avatarUrls.length)];
    icons[idx].src = `assets/image/${newImg}`;
  });
}

// Troca imagens a cada 3 segundos
setInterval(updateRandomIcons, 3000);