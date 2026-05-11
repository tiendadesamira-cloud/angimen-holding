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

    // Portfolio filters
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

    // LIGHTBOX (ficha proyecto al click sobre portfolio item)
    var lb       = document.getElementById('lightbox');
    var lbClose  = document.getElementById('lbClose');
    var lbImg    = document.getElementById('lbImg');
    var lbCat    = document.getElementById('lbCat');
    var lbTitle  = document.getElementById('lbTitle');
    var lbProj   = document.getElementById('lbProject');
    var lbLoc    = document.getElementById('lbLoc');
    var lbWork   = document.getElementById('lbWork');
    var lbDesc   = document.getElementById('lbDesc');

    function openLb(item) {
        if (!lb) return;
        var cat   = item.getAttribute('data-cat')  || '';
        var name  = item.getAttribute('data-name') || '';
        var loc   = item.getAttribute('data-loc')  || '';
        var work  = item.getAttribute('data-work') || '';
        var desc  = item.getAttribute('data-desc') || '';
        var img   = item.getAttribute('data-img')  || (item.querySelector('img') && item.querySelector('img').getAttribute('src')) || '';
        if (lbImg)   lbImg.src = img;
        if (lbCat)   lbCat.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
        if (lbTitle) lbTitle.textContent = name;
        if (lbProj)  lbProj.textContent = name;
        if (lbLoc)   lbLoc.textContent = loc;
        if (lbWork)  lbWork.textContent = work;
        if (lbDesc)  lbDesc.textContent = desc;
        lb.classList.add('is-open');
        lb.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }
    function closeLb() {
        if (!lb) return;
        lb.classList.remove('is-open');
        lb.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
    if (lb) {
        for (var p = 0; p < fitems.length; p++) {
            fitems[p].addEventListener('click', function () { openLb(this); });
        }
        if (lbClose) lbClose.addEventListener('click', closeLb);
        lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && lb.classList.contains('is-open')) closeLb();
        });
    }

    // FORM submit (mailto fallback)
    var form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var data = {};
            var inputs = form.querySelectorAll('input, select, textarea');
            for (var x = 0; x < inputs.length; x++) {
                if (inputs[x].name) data[inputs[x].name] = inputs[x].value;
            }
            var subject = encodeURIComponent('Send Project Request - ' + (data['project-type'] || 'Consulta'));
            var bodyParts = [
                'Name: ' + (data.name || ''),
                'Email: ' + (data.email || ''),
                'Phone: ' + (data.phone || ''),
                'Preferred contact: ' + (data['contact-method'] || ''),
                'Type of project: ' + (data['project-type'] || ''),
                'Property location: ' + (data.location || ''),
                '',
                'Message:', data.message || ''
            ];
            window.location.href = 'mailto:info@angimenholding.com?subject=' + subject + '&body=' + encodeURIComponent(bodyParts.join('\n'));
        });
    }
})();
