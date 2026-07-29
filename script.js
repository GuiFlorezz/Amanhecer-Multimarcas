/* ================= HEADER BLUR ON SCROLL ================= */
const header = document.querySelector('header');
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    if (backToTop) {
        if (window.scrollY > 50) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    }
});

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ================= BANCO DE DADOS FICTÍCIO ORIGINAL ================= */
const cars = [
    { id: 1, marca: 'Porsche', modelo: '911 Carrera S', ano: 2024, km: '0', combustivel: 'Gasolina', transmissao: 'Automática', preco: 980000, img: 'https://images.unsplash.com/photo-1503376713210-9150ee8c4d32?auto=format&fit=crop&q=80&w=600' },
    { id: 2, marca: 'Mercedes-Benz', modelo: 'AMG GT', ano: 2023, km: '5.000', combustivel: 'Gasolina', transmissao: 'Automática', preco: 850000, img: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=600' },
    { id: 3, marca: 'BMW', modelo: 'X6 M Competition', ano: 2024, km: '0', combustivel: 'Gasolina', transmissao: 'Automática', preco: 1100000, img: 'https://images.unsplash.com/photo-1555037015-1498966bcd7c?auto=format&fit=crop&q=80&w=600' },
    { id: 4, marca: 'Audi', modelo: 'RS e-tron GT', ano: 2022, km: '12.000', combustivel: 'Elétrico', transmissao: 'Automática', preco: 750000, img: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=600' },
    { id: 5, marca: 'Porsche', modelo: 'Cayenne Coupé', ano: 2023, km: '8.500', combustivel: 'Híbrido', transmissao: 'Automática', preco: 620000, img: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=600' },
    { id: 6, marca: 'Mercedes-Benz', modelo: 'GLE 400d', ano: 2021, km: '25.000', combustivel: 'Diesel', transmissao: 'Automática', preco: 480000, img: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&q=80&w=600' },
    { id: 7, marca: 'BMW', modelo: 'M3 Competition', ano: 2022, km: '15.000', combustivel: 'Gasolina', transmissao: 'Automática', preco: 580000, img: 'https://images.unsplash.com/photo-1556800572-1b8aeef2c54f?auto=format&fit=crop&q=80&w=600' },
    { id: 8, marca: 'Audi', modelo: 'Q8 S-line', ano: 2023, km: '10.000', combustivel: 'Gasolina', transmissao: 'Automática', preco: 520000, img: 'https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?auto=format&fit=crop&q=80&w=600' }
];

/* Formatar Moeda BR */
const formatPrice = (price) => {
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

/* ================= INTEGRAÇÃO DO ESTOQUE (LOCALSTORAGE) ================= */
let inventory = JSON.parse(localStorage.getItem('amanhecer_inventory'));

// Se o localStorage estiver vazio, converte o banco fictício para o padrão do Admin
if (!inventory || inventory.length === 0) {
    inventory = cars.map(c => ({
        id: c.id,
        name: `${c.marca} ${c.modelo}`,
        year: c.ano.toString(),
        km: c.km === '0' ? '0 km' : `${c.km} km`,
        price: formatPrice(c.preco),
        condition: c.km === '0' ? 'Novo' : 'Seminovo',
        gear: c.transmissao,
        fuel: c.combustivel,
        options: 'Bancos em couro, Teto solar panorâmico, Ar digital dual zone, Central multimídia',
        desc: 'Veículo em excelente estado de conservação, revisões em dia e com garantia Amanhecer Multimarcas.',
        img: c.img
    }));
    localStorage.setItem('amanhecer_inventory', JSON.stringify(inventory));
}

/* ================= RENDERIZAR CARROS (INDEX) ================= */
const stockGrid = document.getElementById('stock-grid');

const renderCars = (carArray) => {
    if (!stockGrid) return; 
    
    stockGrid.innerHTML = '';
    
    if (carArray.length === 0) {
        stockGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--gold);">Nenhum veículo encontrado com estes filtros.</p>';
        return;
    }

    carArray.forEach(car => {
        const carHTML = `
            <div class="car-card">
                <div class="car-img-wrapper">
                    <img src="${car.img}" alt="${car.name}" loading="lazy">
                    ${car.condition === 'Novo' ? '<span class="badge-novo" style="position:absolute; top:10px; right:10px; background:var(--gold); color:#000; padding:2px 8px; border-radius:4px; font-weight:bold; font-size:0.8rem;">0KM</span>' : ''}
                </div>
                <div class="car-info">
                    <h3 class="car-title">${car.name}</h3>
                    <div class="car-price">${car.price}</div>
                    <div class="car-details">
                        <span>📅 ${car.year}</span>
                        <span>🛣️ ${car.km}</span>
                        <span>⛽ ${car.fuel}</span>
                        <span>⚙️ ${car.gear}</span>
                    </div>
                    <a href="pages/detalhes.html?id=${car.id}" class="btn btn-outline" style="width: 100%; border-color: var(--border); display: block; text-align: center; margin-top: 15px;">Ver Detalhes</a>
                </div>
            </div>
        `;
        stockGrid.insertAdjacentHTML('beforeend', carHTML);
    });
};

if (stockGrid) {
    renderCars(inventory);
}

/* ================= LÓGICA DE FILTRO ================= */
const parsePriceToNumber = (priceString) => {
    if(!priceString) return 0;
    return parseFloat(priceString.replace('R$', '').replace(/\./g, '').replace(',', '.').trim());
};

const btnSearch = document.getElementById('btn-search');
if (btnSearch) {
    btnSearch.addEventListener('click', () => {
        const marcaVal = document.getElementById('filter-marca')?.value.toLowerCase();
        const anoVal = document.getElementById('filter-ano')?.value;
        const precoVal = document.getElementById('filter-preco')?.value;

        const filtered = inventory.filter(car => {
            let match = true;
            if (marcaVal && !car.name.toLowerCase().includes(marcaVal)) match = false;
            
            const carYear = parseInt(car.year.split('/')[0]);
            if (anoVal && carYear < parseInt(anoVal)) match = false;
            
            if (precoVal && parsePriceToNumber(car.price) > parseInt(precoVal)) match = false;
            
            return match;
        });

        renderCars(filtered);
        
        const estoqueSec = document.getElementById('estoque');
        if (estoqueSec) {
            estoqueSec.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

/* ================= EFEITO ILHA DINÂMICA & ANIMATION ================= */
document.addEventListener('DOMContentLoaded', () => {
    const mainSection = document.querySelector('.hero') || document.querySelector('.car-details-section') || document.querySelector('main');

    function checkScroll() {
        if (!mainSection || !header) return;

        const sectionBottom = mainSection.offsetTop + mainSection.offsetHeight;

        if (window.scrollY >= sectionBottom - 80) { 
            header.classList.add('island-mode');
        } else {
            header.classList.remove('island-mode');
        }
    }

    window.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal, .reveal-right').forEach(el => {
        observer.observe(el);
    });

    checkScroll();
});

/* ================= MENU HAMBÚRGUER ================= */
const btnMobile = document.getElementById('mobile-menu');
const menuLinks = document.querySelector('.nav-links');

if (btnMobile && menuLinks) {
    btnMobile.addEventListener('click', (e) => {
        e.stopPropagation();
        menuLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            menuLinks.classList.remove('active');
        });
    });

    document.addEventListener('click', (e) => {
        if (!btnMobile.contains(e.target) && !menuLinks.contains(e.target)) {
            menuLinks.classList.remove('active');
        }
    });
}

/* ================= FAQ ACCORDION ================= */
const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach(item => {
    const accHeader = item.querySelector('.accordion-header');
    if (accHeader) {
        accHeader.addEventListener('click', () => {
            accordionItems.forEach(otherItem => {
                if (otherItem !== item) otherItem.classList.remove('active');
            });
            item.classList.toggle('active');
        });
    }
});

/* ================= GALERIA DE FOTOS ================= */
function changeImage(element) {
    const mainImage = document.getElementById('main-car-image');
    if (mainImage) {
        mainImage.src = element.src;
    }

    const thumbs = document.querySelectorAll('.thumb');
    thumbs.forEach(thumb => thumb.classList.remove('active'));
    element.classList.add('active');
}

/* ================= CARREGAMENTO DA PÁGINA DE DETALHES (detalhes.html) ================= */
document.addEventListener('DOMContentLoaded', () => {
    const detailTitle = document.getElementById('detail-title');
    if (!detailTitle) return; // Só roda se estiver na página de detalhes

    // Captura o ID da URL
    const urlParams = new URLSearchParams(window.location.search);
    const carId = urlParams.get('id');

    // Carrega o estoque atual do localStorage
    const currentInventory = JSON.parse(localStorage.getItem('amanhecer_inventory')) || [];
    
    // Busca o veículo comparando IDs como String
    const car = currentInventory.find(c => String(c.id) === String(carId));

    if (car) {
        // Função auxiliar segura para atualizar elementos
        const setContent = (id, val) => {
            const el = document.getElementById(id);
            if (el) el.textContent = val || '--';
        };

        setContent('detail-title', car.name);
        setContent('detail-price', car.price);
        setContent('detail-year', car.year);
        setContent('detail-km', car.km);
        setContent('detail-gear', car.gear);
        setContent('detail-fuel', car.fuel);
        setContent('detail-desc', car.desc);
        setContent('detail-condition', car.condition || 'Exclusivo');

        // --- SUPORTE COMPLETO PARA MULTI-IMAGENS ---
        let imageList = [];
        const rawImages = car.images || car.fotos || car.galeria || car.img;

        if (Array.isArray(rawImages)) {
            imageList = rawImages;
        } else if (typeof rawImages === 'string' && rawImages.trim() !== '') {
            imageList = rawImages.split(',').map(url => url.trim()).filter(url => url !== '');
        }

        // Garante que a foto de capa (car.img) esteja inclusa na galeria
        if (car.img && !imageList.includes(car.img)) {
            imageList.unshift(car.img);
        }

        // Remove duplicadas
        imageList = [...new Set(imageList)];

        // Imagem Principal
        const mainImage = document.getElementById('main-car-image');
        if (mainImage && imageList.length > 0) {
            mainImage.src = imageList[0];
        }

        // Renderiza Miniaturas da Galeria
        const thumbnailsContainer = document.getElementById('detail-thumbnails');
        if (thumbnailsContainer) {
            thumbnailsContainer.innerHTML = '';
            imageList.forEach((imgUrl, index) => {
                thumbnailsContainer.innerHTML += `
                    <img src="${imgUrl}" alt="${car.name}" class="thumb ${index === 0 ? 'active' : ''}" onclick="changeImage(this)">
                `;
            });
        }

        // Opcionais com Badge ✓
        const optionsList = document.getElementById('detail-options');
        if (optionsList) {
            optionsList.innerHTML = '';
            if (car.options) {
                const optionsArray = typeof car.options === 'string' ? car.options.split(',') : car.options;
                optionsArray.forEach(opt => {
                    if (opt && opt.trim() !== '') { 
                        optionsList.innerHTML += `
                            <div class="optional-card">
                                <span class="check-badge">✓</span>
                                <span>${opt.trim()}</span>
                            </div>
                        `;
                    }
                });
            }
        }

        // Link dinâmico do WhatsApp com mensagem personalizada
        const btnWhatsapp = document.getElementById('detail-whatsapp');
        if (btnWhatsapp && car.name) {
            const message = encodeURIComponent(`Olá, tenho interesse no ${car.name}`);
            btnWhatsapp.href = `https://wa.me/5521999999999?text=${message}`;
        }

    } else {
        alert('Desculpe, este veículo não foi encontrado ou já foi vendido.');
        window.location.href = '../index.html';
    }
});