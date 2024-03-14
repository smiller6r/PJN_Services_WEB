/**
* Template Name: Gp
* Updated: Jan 29 2024 with Bootstrap v5.3.2
* Template URL: https://bootstrapmade.com/gp-free-multipurpose-html-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
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


    

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
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
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
    on('click', '.scrollto', function (e) {
        if (select(this.hash)) {
            e.preventDefault()

            let navbar = select('#navbar')
            if (navbar.classList.contains('navbar-mobile')) {
                navbar.classList.remove('navbar-mobile')
                let navbarToggle = select('.mobile-nav-toggle')
                navbarToggle.classList.toggle('bi-list')
                navbarToggle.classList.toggle('bi-x')
            }

            // Get the target element's ID
            let target = select(this.hash);

            // Perform scrolling after animation completion
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest'
            });
        }
    }, true)

  
   /* Scroll with ofset on page load with hash links in the url
   */
   window.addEventListener('load', () => {
    if (window.location.hash) {
        if (document.querySelector(window.location.hash)) {
            const offset = parseInt(window.location.hash.getAttribute('data-offset')) || 0;
            setTimeout(() => {
                scrollto(window.location.hash, offset);
            }, 1000); // Zpoždění pro posunutí na místo na stránce
        }
    }
});


  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Clients Slider
   */
  new Swiper('.clients-slider', {
    speed: 400,
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
        slidesPerView: 2,
        spaceBetween: 40
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 60
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 80
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 120
      }
    }
  });

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

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
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
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  });




    $(document).ready(function () {
        $('#myForm').submit(function (e) {
            e.preventDefault(); // Zabr�n� v�choz�mu chov�n� formul��e (tj. p�esm�rov�n�)

            // Zobraz� zpr�vu "Loading" p�i odes�l�n� formul��e
            $('.loading').show();

            $.ajax({
                type: 'POST',
                url: 'email.php', // Adresa, kam se budou pos�lat data
                data: new FormData(this), // Pou�it� FormData pro z�sk�n� dat formul��e v�etn� soubor�
                contentType: false,
                processData: false,
                success: function (response) {
                    // Skryje zpr�vu "Loading" po �sp�n�m odesl�n� formul��e
                    $('.loading').hide();

                    // Zobraz� zpr�vu o �sp�n�m odesl�n�
                    $('.sent-message').show();

                    // Skryje p��padnou p�edchoz� chybovou zpr�vu
                    $('.error-message').hide();

                    $('#myForm')[0].reset(); // Vyma�eme formul�� po odesl�n�
                },
                error: function (xhr, status, error) {
                    // Skryje zpr�vu "Loading" po chyb� p�i odes�l�n� formul��e
                    $('.loading').hide();

                    // Zobraz� chybovou zpr�vu
                    $('.error-message').text('Error: ' + error).show();

                    // Skryje p��padnou p�edchoz� �sp�nou zpr�vu
                    $('.sent-message').hide();
                }
            });
        });
    });



    document.addEventListener("DOMContentLoaded", function () {
        // Funkce pro nastaven� cookie
        function setLanguageCookie(language) {
            document.cookie = "selectedLanguage=" + language + ";path=/";
        }

        // Funkce pro z�sk�n� hodnoty cookie
        function getLanguageCookie() {
            var name = "selectedLanguage=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var cookieArray = decodedCookie.split(';');
            for (var i = 0; i < cookieArray.length; i++) {
                var cookie = cookieArray[i];
                while (cookie.charAt(0) === ' ') {
                    cookie = cookie.substring(1);
                }
                if (cookie.indexOf(name) === 0) {
                    return cookie.substring(name.length, cookie.length);
                }
            }
            return null;
        }

        // Funkce pro zm�nu jazyka
        function changeLanguage(language) {
            // Skryje v�echny elementy s t��dou language-*
            var allElements = document.querySelectorAll('[class*="language-"]');
            allElements.forEach(function (element) {
                element.style.display = 'none';
            });

            // Zobraz� elementy s p��slu�nou t��dou pro vybran� jazyk
            var selectedElements = document.querySelectorAll('.language-' + language);
            selectedElements.forEach(function (element) {
                element.style.display = 'inline';
            });

            // Aktualizuje obr�zek vybran�ho jazyka
            var selectedImage = document.querySelector(".selected-language");
            var newImageSrc = document.querySelector('.dropdown ul li a[hreflang="' + language + '"] img').getAttribute("src");
            selectedImage.setAttribute("src", newImageSrc);

            // Ulo�� vybran� jazyk do souboru cookie
            setLanguageCookie(language);

            // Aktualizuje placeholder na z�klad� vybran�ho jazyka
            changePlaceholder(language);
        }

        // Funkce pro nastaven� jazyka podle nastaven� prohl�e�e
        function setLanguageFromBrowser() {
            var browserLanguage = navigator.language || navigator.userLanguage;

            if (browserLanguage.startsWith("cs")) {
                changeLanguage("cs");
            } else if (browserLanguage.startsWith("de")) {
                changeLanguage("de");
            } else {
                changeLanguage("en");
            }
        }

        // Funkce pro nastaven� placeholder� na z�klad� vybran�ho jazyka
        function changePlaceholder(language) {
            var nameInput = document.getElementById('name');
            var subjectInput = document.getElementById('subject');
            var messageInput = document.getElementById('message');
            if (language === 'cs') {
                nameInput.placeholder = 'Jm\u00e9no'; // Jm�no
                subjectInput.placeholder = 'P\u0159edm\u011bt zpr\u00e1vy'; // P�edm�t zpr�vy
                messageInput.placeholder = 'Zpr\u00e1va'; // Zpr�va
            } else if (language === 'en') {
                nameInput.placeholder = 'Name';
                subjectInput.placeholder = 'Subject';
                messageInput.placeholder = 'Text of the message';
            } else if (language === 'de') {
                nameInput.placeholder = 'Name';
                subjectInput.placeholder = 'Thema';
                messageInput.placeholder = 'Text der Nachricht';
            }
        }


        // Na�te ulo�en� jazyk z cookies a zobraz� ho
        var savedLanguage = getLanguageCookie();
        if (savedLanguage) {
            // Zm�n� jazyk na ulo�en� jazyk
            changeLanguage(savedLanguage);
        } else {
            // Nastav� jazyk podle nastaven� prohl�e�e, pokud nen� ulo�en ��dn� jazyk
            setLanguageFromBrowser();
        }

        // Z�sk�n� v�ech odkaz� pro zm�nu jazyka
        var languageLinks = document.querySelectorAll(".dropdown ul li a");

        // P�id�n� poslucha�e ud�lost� kliknut� na odkazy pro zm�nu jazyka
        languageLinks.forEach(function (link) {
            link.addEventListener("click", function (event) {
                event.preventDefault(); // Zabra�uje v�choz�mu chov�n� odkazu

                // Z�sk�n� jazyka z atributu hreflang odkazu
                var selectedLanguage = link.getAttribute("hreflang");

                // Zm�na jazyka
                changeLanguage(selectedLanguage);
            });
        });
      
        const header = document.querySelector('#header');
        const headerOffset = header.offsetHeight;
        
        console.log("Výška záhlaví:", headerOffset);
        
        const scrollto = (el) => {
            const headerOffset = 130; // Výška záhlaví
            const targetElement = document.querySelector(el);
            let targetOffset = targetElement.getBoundingClientRect().top + window.scrollY + 50; // Přidání offsetu 50 px pro "milling"
        
            // Přidání offsetu pro specifické cílové prvky
            if (el === "#milling") {
                targetOffset -= 180; // Další posun pro "#milling"
            } else if (el === "#turning") {
                targetOffset -= 180;
            } else if (el === "#lasercutting") {
                targetOffset -= 180;
            } else if (el === "#bending") {
                targetOffset -= 180;
            } else if (el === "#welding") {
                targetOffset -= 180;
            } else if (el === "#surface") {
                targetOffset -= 180;
            }
            
        
            window.scrollTo({
                top: targetOffset - headerOffset,
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest'
            });
        };
        
        // Volání funkce scrollto pro různé odkazy
        document.querySelectorAll('a.scrollto').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = this.getAttribute('href');
                scrollto(target);
            });
        });
        
      });
    

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()