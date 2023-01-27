const txtElement = ["Teknik Informatika", "Politeknik Negeri Bwi"];
let count = 0;
let txtIndex = 0;
let currentTxt = '';
let words = '';

(function ngetik(){

	if(count == txtElement.length){
		count = 0;
	}

	currentTxt = txtElement[count];

	words = currentTxt.slice(0, ++txtIndex);

  // Manipulasi DOM
	document.querySelector('.efek-ngetik').textContent = words;
  

	setTimeout(ngetik, 200);
	if(words.length == currentTxt.length){
		count++;
		txtIndex = 0;
	}
}

)();

(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function (e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function (e) {
        e.preventDefault();
        portfolioFilters.forEach(function (el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function () {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      // once: true,
      mirror: false
    })
  });

})()

/* CANVAS HOME SCREEN */
{
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById('Homecanvas'),
      antialias: true,
  });
  
  const geometry = new THREE.SphereGeometry(1, 32, 32);
  const material = new THREE.MeshPhongMaterial();
  const mesh = new THREE.Mesh(geometry, material);
  
  const starsGeometry = new THREE.SphereGeometry(4, 32, 32);
  const starsMaterial = new THREE.MeshBasicMaterial();
  const starsMesh = new THREE.Mesh(starsGeometry, starsMaterial);
  
  const light = new THREE.DirectionalLight(0xcccccc, 1);
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  
  camera.position.z = 3;
  light.position.set(5, 3, 5);
  
  material.map = new THREE.TextureLoader().load('https://i.ibb.co/g4VRvbF/mars-1k-color.jpg');
  material.bumpMap = new THREE.TextureLoader().load('https://i.ibb.co/LPrJnqC/ayumarsbump1k.jpg');
  material.bumpScale = 0.015;
  
  starsMaterial.map = new THREE.TextureLoader().load('https://images.unsplash.com/photo-1498116069452-debf99cb30f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80');
  starsMaterial.side = THREE.BackSide;
  
  scene.add(mesh);
  scene.add(light);
  scene.add(starsMesh);
  
  document.addEventListener('mousemove', (e) => {
      camera.position.x = (e.x - (window.innerWidth / 2)) * 0.002;
      camera.lookAt(scene.position);
  });
  
  const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
  
      mesh.rotation.y -= 0.004;
      mesh.rotation.x -= 0.004;
  };
  
  animate();
  
  
  let speed = 100;
  let scale = 0.17; // Image scale (I work on 1080p monitor)
  let myCanvasAnimation;
  let ctxAnimation;
  let logoColor;
  
  let image = {
      x: 200,
      y: 300,
      xspeed: 10,
      yspeed: 10,
      img: new Image()
  };
  
  (function main() {
      myCanvasAnimation = document.getElementById("animation-astro");
      ctxAnimation = myCanvasAnimation.getContext("2d");
      image.img.src = 'https://i.ibb.co/Y3XxFgm/astronout.png';
  
      myCanvasAnimation.width = window.innerWidth;
      myCanvasAnimation.height = 650;
  
      update();
  })();
  
  function update() {
      setTimeout(() => {
          ctxAnimation.clearRect(0, 0, myCanvasAnimation.width, myCanvasAnimation.height);
          ctxAnimation.drawImage(image.img, image.x, image.y, image.img.width * scale, image.img.height * scale);
          //Move the logo
          image.x += image.xspeed;
          image.y += image.yspeed;
          //Check for collision 
          checkHitBox();
          update();
      }, speed)
  }
  
  //Check for border collision
  function checkHitBox() {
      if (image.x + image.img.width * scale >= myCanvasAnimation.width || image.x <= 0) {
          image.xspeed *= -1;
      }
  
      if (image.y + image.img.height * scale >= myCanvasAnimation.height || image.y <= 0) {
          image.yspeed *= -1;
      }
  }
  }

/* ASTRONOT KEDUA */
{    let speed = 100;
  let scale = 0.100; // Image scale (I work on 1080p monitor)
  let myCanvasAnimation;
  let ctxAnimation;
  
  let image = {
      x: 700,
      y: 100,
      xspeed: 10,
      yspeed: 10,
      img: new Image()
  };
  
  (function main() {
      myCanvasAnimation = document.getElementById("animation-astro2");
      ctxAnimation = myCanvasAnimation.getContext("2d");
      image.img.src = 'https://i.ibb.co/Y3XxFgm/astronout.png';
  
      myCanvasAnimation.width = window.innerWidth;
      myCanvasAnimation.height = 650;
  
      update();
  })();
  
  function update() {
      setTimeout(() => {
          ctxAnimation.clearRect(0, 0, myCanvasAnimation.width, myCanvasAnimation.height);
          ctxAnimation.drawImage(image.img, image.x, image.y, image.img.width * scale, image.img.height * scale);
          //Move the logo
          image.x += image.xspeed;
          image.y += image.yspeed;
          //Check for collision 
          checkHitBox();
          update();
      }, speed)
  }
  
  //Check for border collision
  function checkHitBox() {
      if (image.x + image.img.width * scale >= myCanvasAnimation.width || image.x <= 0) {
          image.xspeed *= -1;
      }
  
      if (image.y + image.img.height * scale >= myCanvasAnimation.height || image.y <= 0) {
          image.yspeed *= -1;
      }
  }
}

/* ANIMASI BOLA */
{
  let canvasKita = document.getElementById("bola");
  canvasKita.width = 1000;
  canvasKita.height = 200;
  let ctx = canvasKita.getContext('2d');
  
  function bola(x, y, r, w, kanan, kiri, atas, bawah, speed) {
      this.x = x;
      this.y = y;
      this.r = r;
      this.w = w;
      this.kanan = kanan;
      this.kiri = kiri;
      this.atas = atas;
      this.bawah = bawah;
    
      this.render = function () {
          ctx.fillStyle = this.w;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
          ctx.fill();
      
          if (this.kanan) {
              this.x += speed;
          }
          if (this.kiri) {
              this.x -= speed;
          }
          if (this.atas) {
              this.y -= speed;
          }
          if (this.bawah) {
              this.y += speed;
          }
          if (this.y + this.r > canvasKita.height) {
              this.bawah = false;
              this.atas = true;
          } else if (this.y - this.r < 0) {
              this.bawah = true;
              this.atas = false;
          }
      
          if (this.x + this.r > canvasKita.width) {
              this.kanan = false;
              this.kiri = true;
          } else if (this.x - this.r < 0) {
              this.kanan = true;
              this.kiri = false;
          }
      };
  }

  let bola1 = new bola(200, 15, 45, 'red', false, true, false, true, 2);
  let bola2 = new bola(350, 300, 30, 'black', true, false ,true, false, 1);
  let bola3 = new bola(150, 200, 20, 'darkgray', false, true, true, false, 2);
  let bola4 = new bola(200, 15, 45, 'orange', false, true, false, true, 2);
  let bola6 = new bola(250,10,25,"Chartreuse",true,false,true,false,1);
  let bola7 = new bola(210,210,50,"MediumSpringGreen",true,false,false,true,3);
  let bola8 = new bola(250, 10, 25, 'brown', false, true, true, false, 2);
  let bola9 = new bola(100, 200, 50, 'cadetblue', true, false, false, true, 2);

  function animasi() {
      ctx.save();
      ctx.clearRect(0, 0, canvasKita.width, canvasKita.height);
    
      ctx.globalAlpha = 0.5;
      bola1.render();
      bola2.render();
      bola3.render();
      bola4.render();
      bola6.render();
      bola7.render();
      bola8.render();
      bola9.render();
      ctx.restore();
  }

  setInterval(animasi, 1);
}

  
/* CANVAS LOGO */
{
  let canvasKita = document.getElementById("myCanvas");
canvasKita.width = 400;
canvasKita.height = 400;
let ctx = canvasKita.getContext("2d");

// mendefinisikan image data
const imageData = ctx.getImageData( 0, 0, canvasKita.width, canvasKita.height);

/* Gambar Titik */
function gambar_titik(ImageDataTemp, x, y, r, g, b) {
    let indeks;
    indeks = 4 * (x + y * canvasKita.width);
    ImageDataTemp.data[indeks + 0] = r;
    ImageDataTemp.data[indeks + 1] = g;
    ImageDataTemp.data[indeks + 2] = b;
    ImageDataTemp.data[indeks + 3] = 255; // alpha
}

    /* Method DDA */
function gradient_line(imageData, x1, y1, x2, y2, r, g, b) {
    let dx = x2 - x1; // Bisa positif atau negatif
    let dy = y2 - y1; // Bisa positif atau negatif

    if (Math.abs(dx) > Math.abs(dy)) {
          // Penambahan pada sumbu x
        let y = y1;
        if (x2 > x1) {
            // Bergerak ke kanan
            for (let x = x1; x < x2; x++) {
                y = y + dy / Math.abs(dx); // 1/m
                gambar_titik(imageData, Math.ceil(x), Math.ceil(y), r, g, b);
            }
        } else {
            // Bergerak ke kiri
            for (let x = x1; x > x2; x--) {
              y = y + dy / Math.abs(dx); // 1/m
              gambar_titik(imageData, Math.ceil(x), Math.ceil(y), r, g, b);
            }
        }
    } else {
          // Penambahan pada sumbu y
          let x = x1;
        if (y2 > y1) {
            // Bergerak ke bawah
            for (let y = y1; y < y2; y++) {
              x = x + dx / Math.abs(dy); // m
              gambar_titik(imageData, Math.ceil(x), Math.ceil(y), r, g, b);
            }
        } else {
            // Bergerak ke atas
            for (let y = y1; y > y2; y--) {
              x = x + dx / Math.abs(dy); // m
              gambar_titik(imageData, Math.ceil(x), Math.ceil(y), r, g, b);
            }
        }
    }
}

    /* Fungsi Polygon */
function polygon(imageDataTemp, point_array, r, g, b) {
    let point = point_array[0];

    for (let i = 1; i < point_array.length; i++) {
        let point2 = point_array[i];
        gradient_line(imageDataTemp, point.x, point.y, point2.x, point2.y, r, g, b);
          point = point2;
    }
    gradient_line(imageDataTemp, point.x, point.y, point_array[0].x, point_array[0].y, r, g, b);
}

    /* Algoritma Flood Fill */
function floodFill(imageDataTemp, canvas, x0, y0, toFlood, warna) {
    let tumpukan = [];
    tumpukan.push({ x: x0, y: y0 });

    while (tumpukan.length > 0) {
        let titikSkrg = tumpukan.shift();
        let indexSkrg = 4 * (titikSkrg.x + titikSkrg.y * canvas.width);

        let r1 = imageDataTemp.data[indexSkrg + 0];
        let g1 = imageDataTemp.data[indexSkrg + 1];
        let b1 = imageDataTemp.data[indexSkrg + 2];

        if (r1 == toFlood.r && g1 == toFlood.g && b1 == toFlood.b) {
            imageDataTemp.data[indexSkrg + 0] = warna.r;
            imageDataTemp.data[indexSkrg + 1] = warna.g;
            imageDataTemp.data[indexSkrg + 2] = warna.b;
            imageDataTemp.data[indexSkrg + 3] = 255;

            tumpukan.push({ x: titikSkrg.x + 1, y: titikSkrg.y });
            tumpukan.push({ x: titikSkrg.x - 1, y: titikSkrg.y });
            tumpukan.push({ x: titikSkrg.x, y: titikSkrg.y + 1 });
            tumpukan.push({ x: titikSkrg.x, y: titikSkrg.y - 1 });
        }
    }
}

// kotak belah ketupat kecil tengah atas\
// x1 < x2 = kekanan, y1 < y2 kebawah
let pointArray = [
    { x: 150, y: 150 }, // x1 < x2 kekanan, y1 > y2 keatas
    { x: 200, y: 130 },
    { x: 250, y: 150 }, // <x2 kekanan, <y2 kebawah
    { x: 200, y: 170 }, // <x1 kekiri, <y2 kebawah

    //selanjurnya <x2 kekanan, <y2 kebawah
];

// (imagedataTemp, point array, r, g, b)
polygon(imageData, pointArray, 243, 205, 5); //biru ketupat kecil

// memberi flood fill pada poligon belah ketupat atas
floodFill( imageData, canvasKita, 200, 150, { r: 0, g: 0, b: 0 }, { r: 243, g: 205, b: 5 });

//  Membuat poligon Atas kiri
let pointArray33 = [
    {x : 80, y : 123},
    {x : 120, y : 138},
    {x : 200, y : 105},
    {x : 200, y : 70},
];
// (imagedataTemp, point array, r, g, b)
polygon(imageData, pointArray33, 241, 137, 4); //biru ketupat kecil

// memberi flood fill pada poligon atas kiri
floodFill(imageData,canvasKita,150,120,{r:0,g:0,b:0},{r:241,g:137,b:4});

// Membuat poligon sebelah kiri
let pointArray3 = [
    {x : 120, y : 265},
    {x : 80, y : 250},
    {x : 80, y : 123},
    {x : 120, y : 138}
];

// (imagedataTemp, point array, r, g, b)
polygon(imageData, pointArray3, 243, 205, 5); //biru ketupat kecil

// memberi flood fill pada poligon sebelah kiri
floodFill( imageData, canvasKita, 90, 200, { r: 0, g: 0, b: 0 }, { r: 243, g: 205, b: 5 });

/*Fungsi translasi*/
function translasi(titikLama, T){
    let x_baru = titikLama.x + T.x;
    let y_baru = titikLama.y + T.y;

    return {x:x_baru, y:y_baru};
}

//pencerminan polygon kanan
let pointArray10= [];
let temp = translasi(pointArray3[0], {x:160, y:0});
pointArray10.push(temp);
temp = translasi(pointArray3[1], {x:240, y:0});
pointArray10.push(temp);
temp = translasi(pointArray3[2], {x:240, y:0});
pointArray10.push(temp);
temp = translasi(pointArray3[3], {x:160, y:0});
pointArray10.push(temp);

polygon(imageData, pointArray10, 243, 205, 5);
/* untuk mewarnai*/
floodFill(imageData,canvasKita,300,200,{r:0,g:0,b:0},{r:243 ,g:205,b:5});

//pencerminan polygon atas
let pointArray20= [];
let temp2 = translasi(pointArray33[0], {x:240, y:0});
pointArray20.push(temp2);
temp2 = translasi(pointArray33[1], {x:160, y:0});
pointArray20.push(temp2);
temp2 = translasi(pointArray33[2], {x:0, y:0});
pointArray20.push(temp2);
temp2 = translasi(pointArray33[3], {x:0, y:0});
pointArray20.push(temp2);

polygon(imageData, pointArray20, 241, 137, 4);
/* untuk mewarnai*/
floodFill(imageData,canvasKita,250,120,{ r: 0, g: 0, b: 0 }, { r: 241, g: 137, b: 4 });

/* Menampilkan Image Data pada Canvas */
ctx.putImageData(imageData, 0, 0);

// pembuatan obyek tengah bawah
ctx.beginPath();
ctx.moveTo(150, 150);
ctx.lineTo(200, 170); //menarik garis dari titik (150,150) ke titik (200,170)
ctx.lineTo(250, 150); //membuat garis ke titik koordinat (250,150)
ctx.lineTo(250, 200); //membuat garis ke titik koordinat (250,200)
ctx.lineTo(200, 220); //membuat garis ke titik koordinat (200,200)
ctx.lineTo(150, 200); //membuat garis ke titik koordinat (150, 200)
ctx.fillStyle = "#ffd70e";
ctx.strokeStyle = "#ffd70e";
ctx.stroke();
ctx.fill();
ctx.closePath();

// pembuatan obyek sebelah bawah
ctx.beginPath();
ctx.moveTo(200, 250); //awal titik (tengah atas)
ctx.lineTo(150, 230);  //membuat garis ke titik koordinat (150, 230) (yang kiri atas)
ctx.lineTo(150, 275); //membuat garis ke titik koordinat (150, 275) (kiri bawah)
ctx.lineTo(200, 295); //membuat garis ke titik koordinat (200, 295) (tengah bawah)
ctx.lineTo(250, 275); //membuat garis ke titik koordinat (250, 275) (kanan bawah)
ctx.lineTo(250, 230); //membuat garis ke titik koordinat (250, 230) (kanan atas)
ctx.fillStyle = "#F3CD05";
ctx.strokeStyle = "#F3CD05";
ctx.stroke();
ctx.fill();
ctx.closePath();

// membuat gradien color
let gradient = ctx.createLinearGradient(0, 0, canvasKita.width, canvasKita.height);

//pembuatan obyek text dan manipulasi atributnya
gradient.addColorStop("0", "gold");
gradient.addColorStop("0.6", "#F18904");
gradient.addColorStop("1.0", "#F3CD05");
ctx.fillStyle = gradient; //mencetak gradien
ctx.font = "bold italic 50pt Arial";
ctx.fillText("Ayuwwee", 100, 360, 200, 150);

// CORNER PEMBUNGKUS LOGO
let rectWidth = 380; //panjang corner
let rectHeight = 350; //tinggi
let rectX = 10; //batas x corner
let rectY = 40;
let cornerRadius = 50; //radius corner kotak melingkar
//radius = jarak

// pembuatan corner
ctx.beginPath();
ctx.moveTo(rectX + cornerRadius, rectY); //titik atas kiri
ctx.lineTo(rectX + rectWidth - cornerRadius, rectY); //titik atas kanan
ctx.arcTo(rectX + rectWidth, rectY, rectX + rectWidth, rectY + cornerRadius, cornerRadius); //lingkaran pojok kanan atas

ctx.lineTo(rectX + rectWidth, rectY + rectHeight - cornerRadius); //garis kanan
ctx.arcTo(rectX + rectWidth, rectY + rectHeight, rectX - cornerRadius, rectY + rectHeight, cornerRadius); //lingkaran kiri bawah

ctx.lineTo(rectX + cornerRadius, rectY + rectHeight); //garis bawah
ctx.arcTo(rectX, rectY + rectHeight, rectX, rectY - cornerRadius, cornerRadius); //lingkaran kiri bawah

ctx.lineTo(rectX, rectY + cornerRadius); //garis kiri
ctx.arcTo(rectX, rectY, rectX + cornerRadius, rectY, cornerRadius); //lingkaran kiri atas
ctx.lineWidth = 5; //tebal corner
ctx.shadowOffsetX = 0; //shadow
ctx.shadowOffsetY = 0;
ctx.shadowBlur = 3; //shadow blurr 
ctx.shadowColor = "#ffd70e";
ctx.strokeStyle = "#F18904";
ctx.stroke();
}

/* OBYEK 3D */
{
  let width = 200;
  let height = 200;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#f5f8fd");
  const camera = new THREE.PerspectiveCamera(20, width / height, 0.1, 20);
  const canvas = document.getElementById('canvas1');
  const renderer = new THREE.WebGLRenderer({
    canvas
  });

  renderer.setSize(width, height);
  camera.position.z = 5;

  // /* Geometri Material */
  const geo = new THREE.BoxGeometry(1, 1, 1);

  // /* Custom Material */
  // const ATexture = new THREE.TextureLoader().load('https://iili.io/0PHZV2.md.jpg');
  const ATexture = new THREE.TextureLoader().load('https://iili.io/XTWztS.md.jpg');


  const material = new THREE.MeshBasicMaterial({
    map: ATexture
  });
  let mesh = new THREE.Mesh(geo, material);
  scene.add(mesh);

  let pageX = 0.5;
  let pageY = 0.5;

  document.body.addEventListener('mousemove', (event) => {
    pageX = event.pageX / window.innerHeight;
    pageY = event.pageY / window.innerHeight;
  });
  window.addEventListener('resize', function () {
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });

  function update() {
    // mesh.rotation.y = (pageY - 0.5) * 2;
    // mesh.rotation.x = (pageX - 0.5) * 2;
    mesh.rotation.y += 0.01;
    // mesh.rotation.x += 0.01;

    requestAnimationFrame(update);
    renderer.render(scene, camera);
  }
  update();
}