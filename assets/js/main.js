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
    const scrollto = (el) => {
        let header = select('#header');
        let headerOffset = header.offsetHeight;
        let targetElement = select(el);
        let targetOffset = targetElement.getBoundingClientRect().top + window.scrollY;

        window.scrollTo({
            top: targetOffset - headerOffset,
            behavior: 'smooth'
        });
    };

    

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
    on('click', '.navbar .dropdown > a', function (e) {
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
                block: 'start'
            });
        }
    }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
    window.addEventListener('load', () => {
        if (window.location.hash) {
            if (select(window.location.hash)) {
                let target = select(window.location.hash);
                setTimeout(() => {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 1000); // Delay for scrolling to the page
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
            e.preventDefault(); // Zabrání výchozímu chování formuláøe (tj. pøesmìrování)

            // Zobrazí zprávu "Loading" pøi odesílání formuláøe
            $('.loading').show();

            $.ajax({
                type: 'POST',
                url: 'email.php', // Adresa, kam se budou posílat data
                data: new FormData(this), // Použití FormData pro získání dat formuláøe vèetnì souborù
                contentType: false,
                processData: false,
                success: function (response) {
                    // Skryje zprávu "Loading" po úspìšném odeslání formuláøe
                    $('.loading').hide();

                    // Zobrazí zprávu o úspìšném odeslání
                    $('.sent-message').show();

                    // Skryje pøípadnou pøedchozí chybovou zprávu
                    $('.error-message').hide();

                    $('#myForm')[0].reset(); // Vymažeme formuláø po odeslání
                },
                error: function (xhr, status, error) {
                    // Skryje zprávu "Loading" po chybì pøi odesílání formuláøe
                    $('.loading').hide();

                    // Zobrazí chybovou zprávu
                    $('.error-message').text('Error: ' + error).show();

                    // Skryje pøípadnou pøedchozí úspìšnou zprávu
                    $('.sent-message').hide();
                }
            });
        });
    });



    document.addEventListener("DOMContentLoaded", function () {
        // Funkce pro nastavení cookie
        function setLanguageCookie(language) {
            document.cookie = "selectedLanguage=" + language + ";path=/";
        }

        // Funkce pro získání hodnoty cookie
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

        // Funkce pro zmìnu jazyka
        function changeLanguage(language) {
            // Skryje všechny elementy s tøídou language-*
            var allElements = document.querySelectorAll('[class*="language-"]');
            allElements.forEach(function (element) {
                element.style.display = 'none';
            });

            // Zobrazí elementy s pøíslušnou tøídou pro vybraný jazyk
            var selectedElements = document.querySelectorAll('.language-' + language);
            selectedElements.forEach(function (element) {
                element.style.display = 'inline';
            });

            // Aktualizuje obrázek vybraného jazyka
            var selectedImage = document.querySelector(".selected-language");
            var newImageSrc = document.querySelector('.dropdown ul li a[hreflang="' + language + '"] img').getAttribute("src");
            selectedImage.setAttribute("src", newImageSrc);

            // Uloží vybraný jazyk do souboru cookie
            setLanguageCookie(language);

            // Aktualizuje placeholder na základì vybraného jazyka
            changePlaceholder(language);
        }

        // Funkce pro nastavení jazyka podle nastavení prohlížeèe
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

        // Funkce pro nastavení placeholderù na základì vybraného jazyka
        function changePlaceholder(language) {
            var nameInput = document.getElementById('name');
            var subjectInput = document.getElementById('subject');
            var messageInput = document.getElementById('message');
            if (language === 'cs') {
                nameInput.placeholder = 'Jm\u00e9no'; // Jméno
                subjectInput.placeholder = 'P\u0159edm\u011bt zpr\u00e1vy'; // Pøedmìt zprávy
                messageInput.placeholder = 'Zpr\u00e1va'; // Zpráva
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


        // Naète uložený jazyk z cookies a zobrazí ho
        var savedLanguage = getLanguageCookie();
        if (savedLanguage) {
            // Zmìní jazyk na uložený jazyk
            changeLanguage(savedLanguage);
        } else {
            // Nastaví jazyk podle nastavení prohlížeèe, pokud není uložen žádný jazyk
            setLanguageFromBrowser();
        }

        // Získání všech odkazù pro zmìnu jazyka
        var languageLinks = document.querySelectorAll(".dropdown ul li a");

        // Pøidání posluchaèe událostí kliknutí na odkazy pro zmìnu jazyka
        languageLinks.forEach(function (link) {
            link.addEventListener("click", function (event) {
                event.preventDefault(); // Zabraòuje výchozímu chování odkazu

                // Získání jazyka z atributu hreflang odkazu
                var selectedLanguage = link.getAttribute("hreflang");

                // Zmìna jazyka
                changeLanguage(selectedLanguage);
            });
        });


        // Vyberte všechny odkazy v dropdown menu
        var dropdownLinks = document.querySelectorAll('.dropdown ul li a');

        // Pøidání posluchaèe událostí kliknutí na každý odkaz v dropdown menu
        dropdownLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                // Zavøení dropdown menu
                var dropdownMenu = link.closest('.dropdown').querySelector('ul');
                dropdownMenu.classList.remove('show');
            });
        });



    });


    document.addEventListener('DOMContentLoaded', () => {
        const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
        const navbar = document.querySelector('#navbar');

        // Funkce pro zmìnu ikony na mobilním menu
        const toggleMobileNavIcon = () => {
            mobileNavToggle.classList.toggle('bi-list');
            mobileNavToggle.classList.toggle('bi-x');
        };

        // Pøidání event listeneru pro kliknutí na ikonu mobilního menu
        mobileNavToggle.addEventListener('click', () => {
            navbar.classList.toggle('navbar-mobile');
            toggleMobileNavIcon();
        });

        // Pøidání event listeneru pro každý odkaz v navigaèním menu
        navbar.querySelectorAll('.nav-link').forEach(navLink => {
            navLink.addEventListener('click', () => {
                if (navbar.classList.contains('navbar-mobile')) {
                    navbar.classList.remove('navbar-mobile');
                    toggleMobileNavIcon();
                }
            });
        });
    });




  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()