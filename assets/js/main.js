/* Angimen Holding - JS comun para A/B/C */
(function () {
    'use strict';

    var topbar = document.getElementById('topbar');
    var hero   = document.querySelector('.hero');
    function onScroll() {
        if (!topbar) return;
        var y = window.scrollY || window.pageYOffset;
        if (y > 30) topbar.classList.add('is-scrolled');
        else topbar.classList.remove('is-scrolled');
        if (hero) {
            var heroBottom = hero.offsetTop + hero.offsetHeight - 80;
            if (y > heroBottom) topbar.classList.remove('on-hero');
            else topbar.classList.add('on-hero');
        }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    var burger = document.getElementById('burger');
    var nav    = document.getElementById('topbarNav');
    if (burger && nav) {
        burger.addEventListener('click', function () {
            var open = nav.classList.toggle('is-open');
            burger.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
        var links = nav.querySelectorAll('a');
        for (var i = 0; i < links.length; i++) {
            links[i].addEventListener('click', function () {
                nav.classList.remove('is-open');
                burger.setAttribute('aria-expanded', 'false');
            });
        }
    }

    var fadeEls = document.querySelectorAll('.fade-in');
    if ('IntersectionObserver' in window && fadeEls.length) {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) {
                    e.target.classList.add('is-visible');
                    io.unobserve(e.target);
                }
            });
        }, { threshold: 0.10, rootMargin: '0px 0px -50px 0px' });
        for (var j = 0; j < fadeEls.length; j++) io.observe(fadeEls[j]);
    } else {
        for (var k = 0; k < fadeEls.length; k++) fadeEls[k].classList.add('is-visible');
    }

    var fbtns  = document.querySelectorAll('.portfolio-filter');
    var fitems = document.querySelectorAll('.portfolio-item');
    if (fbtns.length && fitems.length) {
        for (var f = 0; f < fbtns.length; f++) {
            fbtns[f].addEventListener('click', function () {
                var filter = this.getAttribute('data-filter');
                for (var g = 0; g < fbtns.length; g++) fbtns[g].classList.remove('active');
                this.classList.add('active');
                for (var h = 0; h < fitems.length; h++) {
                    var cat = fitems[h].getAttribute('data-cat');
                    fitems[h].style.display = (filter === 'all' || cat === filter) ? '' : 'none';
                }
            });
        }
    }

    var form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var data = {};
            var inputs = form.querySelectorAll('input, select, textarea');
            for (var x = 0; x < inputs.length; x++) {
                if (inputs[x].name) data[inputs[x].name] = inputs[x].value;
            }
            var subject = encodeURIComponent('Solicitud - ' + (data['project-type'] || 'Consulta'));
            var bodyParts = [
                'Nombre: ' + (data.name || ''),
                'Email: ' + (data.email || ''),
                'Telefono: ' + (data.phone || ''),
                'Contacto preferido: ' + (data['contact-method'] || ''),
                'Tipo de proyecto: ' + (data['project-type'] || ''),
                'Ubicacion: ' + (data.location || ''),
                '',
                'Mensaje:', data.message || ''
            ];
            window.location.href = 'mailto:info@angimenholding.com?subject=' + subject + '&body=' + encodeURIComponent(bodyParts.join('\n'));
        });
    }
})();
