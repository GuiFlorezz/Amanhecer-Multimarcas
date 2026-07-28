/* ================= BANCO DE DADOS FICTÍCIO ================= */
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

/* ================= RENDERIZAR CARROS & FILTRO ================= */
const stockGrid = document.getElementById('stock-grid');

const renderCars = (carArray) => {
    if (!stockGrid) return; // Segurança: só executa se o elemento existir na página
    
    stockGrid.innerHTML = '';
    
    if (carArray.length === 0) {
        stockGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--gold);">Nenhum veículo encontrado com estes filtros.</p>';
        return;
    }

    carArray.forEach(car => {
        const carHTML = `
            <div class="car-card">
                <div class="car-img-wrapper">
                    <img src="${car.img}" alt="${car.marca} ${car.modelo}" loading="lazy">
                </div>
                <div class="car-info">
                    <h3 class="car-title">${car.marca} ${car.modelo}</h3>
                    <div class="car-price">${formatPrice(car.preco)}</div>
                    <div class="car-details">
                        <span>📅 ${car.ano}</span>
                        <span>🛣️ ${car.km} km</span>
                        <span>⛽ ${car.combustivel}</span>
                        <span>⚙️ ${car.transmissao}</span>
                    </div>
                    <a href="pages/detalhes.html" class="btn btn-outline" style="width: 100%; border-color: var(--border); display: block; text-align: center; margin-top: 15px;">Ver Detalhes</a>
                </div>
            </div>
        `;
        stockGrid.insertAdjacentHTML('beforeend', carHTML);
    });
};

if (stockGrid) {
    renderCars(cars);
}

// Lógica de Filtro
const btnSearch = document.getElementById('btn-search');
if (btnSearch) {
    btnSearch.addEventListener('click', () => {
        const marcaVal = document.getElementById('filter-marca')?.value;
        const anoVal = document.getElementById('filter-ano')?.value;
        const precoVal = document.getElementById('filter-preco')?.value;

        const filtered = cars.filter(car => {
            let match = true;
            if (marcaVal && car.marca !== marcaVal) match = false;
            if (anoVal && car.ano < parseInt(anoVal)) match = false;
            if (precoVal && car.preco > parseInt(precoVal)) match = false;
            return match;
        });

        renderCars(filtered);
        
        const estoqueSec = document.getElementById('estoque');
        if (estoqueSec) {
            estoqueSec.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

/* ======================================================
   EFEITO ILHA DINÂMICA AO SAIR DA SEÇÃO PRINCIPAL
   ====================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    
    // Busca a seção principal (Hero) do index ou a primeira seção da página (ex: galeria no detalhes)
    const mainSection = document.querySelector('.hero') || document.querySelector('.car-details-section') || document.querySelector('main');

    function checkScroll() {
        if (!mainSection) return;

        // Calcula o final da seção principal
        const sectionBottom = mainSection.offsetTop + mainSection.offsetHeight;

        // Ativa o modo ilha assim que o scroll passar do final da seção principal
        if (window.scrollY >= sectionBottom - 80) { // 80px de tolerância para transição suave
            header.classList.add('island-mode');
        } else {
            header.classList.remove('island-mode');
        }
    }

    // Eventos de scroll e redimensionamento de tela
    window.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);

    // --- ANIMATION: SCROLL REVEAL ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    // Aplica a animação nos cards de carros, filtros e seções
    document.querySelectorAll('.car-card, .filter-section, .about-content, .hero-content').forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });

    // Executa ao carregar a página
    checkScroll();
});


/* ================= HEADER BLUR ON SCROLL ================= */
const header = document.getElementById('header');
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

// --- 2. MENU HAMBÚRGUER (RESPONSIVO PARA CELULAR) ---
    const btnMobile = document.getElementById('mobile-menu');
    const menuLinks = document.querySelector('.nav-links');

    if (btnMobile && menuLinks) {
        // Abre ou fecha o menu ao tocar nos 3 riscos
        btnMobile.addEventListener('click', (e) => {
            e.stopPropagation();
            menuLinks.classList.toggle('active');
        });

        // Fecha o menu se você clicar em qualquer link
        document.querySelectorAll('.nav-links li a').forEach(link => {
            link.addEventListener('click', () => {
                menuLinks.classList.remove('active');
            });
        });

        // Fecha o menu se você clicar fora dele na tela
        document.addEventListener('click', (e) => {
            if (!btnMobile.contains(e.target) && !menuLinks.contains(e.target)) {
                menuLinks.classList.remove('active');
            }
        });
    }

/* ================= SCROLL REVEAL (Exibição dos elementos) ================= */
const reveals = document.querySelectorAll('.reveal, .reveal-right');

if ('IntersectionObserver' in window && reveals.length > 0) {
    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05 });

    reveals.forEach(el => revealOnScroll.observe(el));
} else {
    // Fallback: se houver qualquer incompatibilidade, exibe os elementos imediatamente
    reveals.forEach(el => el.classList.add('active'));
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

/* ================= GALERIA DE FOTOS (Página de Detalhes) ================= */
function changeImage(element) {
    const mainImage = document.getElementById('main-car-image');
    if (mainImage) {
        mainImage.src = element.src;
    }

    const thumbs = document.querySelectorAll('.thumb');
    thumbs.forEach(thumb => thumb.classList.remove('active'));
    element.classList.add('active');
}
