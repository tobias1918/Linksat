// Cuando se hace click en una pregunta
$('.pregunta').on('click', function () {
    // Si la pregunta en la que se hizo click NO está abierta.
    if (!$('#' + $(this).data('resp_id')).hasClass('resp_act')) {
      // Cierro la que esté abierta, si es que hay alguna
      $('.ico_resp').removeClass('ico_resp_act');
      $('.resp_act').css('height', 0);
      $('.resp_act').removeClass('resp_act');
      // Abro la pregunta en la que se hizo click
      var $respuesta = $('#' + $(this).data('resp_id'));
      $respuesta.css('height', 'auto'); // Altura fija de 40px
      $respuesta.addClass('resp_act');
      $('i', this).addClass('ico_resp_act');
    // Si no, si la pregunta ya está abierta
    } else {
      // La cierro
      $('.ico_resp').removeClass('ico_resp_act');
      $('.resp_act').css('height', 0);
      $('.resp_act').removeClass('resp_act');
    }
});

// Control del mensaje de Linky
document.addEventListener('DOMContentLoaded', function() {
  const mensajeLinky = document.getElementById('mensajeLinky');
  const botonLinky = document.querySelector('.floating-button');
  let timeoutOcultar;
  
  // Función para mostrar mensaje
  function mostrarMensaje(tiempoAutoOcultar = 8000) {
      if (mensajeLinky) {
          mensajeLinky.classList.add('visible');
          
          // Limpiar timeout anterior si existe
          if (timeoutOcultar) {
              clearTimeout(timeoutOcultar);
          }
          
          // Auto-ocultar después del tiempo especificado
          timeoutOcultar = setTimeout(function() {
              mensajeLinky.classList.remove('visible');
          }, tiempoAutoOcultar);
      }
  }
  
  // Función para ocultar mensaje
  function ocultarMensaje() {
      if (mensajeLinky) {
          mensajeLinky.classList.remove('visible');
          if (timeoutOcultar) {
              clearTimeout(timeoutOcultar);
          }
      }
  }
  
  // Mostrar mensaje después de 1 segundo (por única vez)
  setTimeout(function() {
      mostrarMensaje(8000); // Se oculta después de 8 segundos
  }, 1000);
  
  // Al hacer clic en Linky, ocultar mensaje
  botonLinky.addEventListener('click', function(e) {
      ocultarMensaje();
  });
  
  // Al pasar el mouse, mostrar mensaje SOLO si está oculto
  botonLinky.addEventListener('mouseenter', function() {
      if (mensajeLinky && !mensajeLinky.classList.contains('visible')) {
          mostrarMensaje(3000); // Se oculta después de 3 segundos
      }
  });
  
  // Opcional: mantener mensaje mientras el mouse está sobre el mensaje
  mensajeLinky.addEventListener('mouseenter', function() {
      if (timeoutOcultar) {
          clearTimeout(timeoutOcultar);
      }
  });
  
  mensajeLinky.addEventListener('mouseleave', function() {
      if (mensajeLinky.classList.contains('visible')) {
          timeoutOcultar = setTimeout(function() {
              mensajeLinky.classList.remove('visible');
          }, 2000); // Se oculta 2 segundos después de salir
      }
  });
});

/**
 * Hero Mobile Controller + Contador de Estadísticas
 */
document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // ============================================
    // PARTE 1: CONTROL MÓVIL (ocultar robot y espaciado)
    // ============================================
    
    // Elementos del DOM
    const heroWrapper = document.querySelector('.hero__wrapper');
    const heroImage = document.querySelector('.hero__image-wrapper');
    const heroContainer = document.querySelector('.hero__container');
    
    // Verificar que los elementos existen
    if (!heroWrapper || !heroContainer) {
        console.warn('HeroController: No se encontraron los elementos necesarios');
    } else {
        // Configuración
        const CONFIG = {
            mobileBreakpoint: 768,
            mobileMarginTop: '60px',
            mobilePaddingTop: '40px',
            mobileGap: '15px'
        };
        
        // Variable para el timeout del resize
        let resizeTimeout;
        
        /**
         * Aplica estilos para móvil
         */
        function applyMobileStyles() {
            // Ocultar imagen si existe
            if (heroImage) {
                heroImage.style.display = 'none';
                heroImage.setAttribute('data-mobile-hidden', 'true');
            }
            
            // Ajustar espaciado
            heroWrapper.style.marginTop = CONFIG.mobileMarginTop;
            heroContainer.style.paddingTop = CONFIG.mobilePaddingTop;
            heroContainer.style.gap = CONFIG.mobileGap;
            
            // Añadir clase al body para estilos adicionales
            document.body.classList.add('mobile-hero-active');
        }
        
        /**
         * Restaura estilos para desktop/tablet
         */
        function removeMobileStyles() {
            // Mostrar imagen si existe
            if (heroImage) {
                heroImage.style.display = '';
                heroImage.removeAttribute('data-mobile-hidden');
            }
            
            // Restaurar espaciado
            heroWrapper.style.marginTop = '';
            heroContainer.style.paddingTop = '';
            heroContainer.style.gap = '';
            
            // Quitar clase del body
            document.body.classList.remove('mobile-hero-active');
        }
        
        /**
         * Verifica el tamaño de la pantalla y aplica los estilos correspondientes
         */
        function checkScreenSize() {
            const isMobile = window.innerWidth < CONFIG.mobileBreakpoint;
            
            if (isMobile) {
                applyMobileStyles();
            } else {
                removeMobileStyles();
            }
        }
        
        // Ejecutar al cargar la página
        checkScreenSize();
        
        // Ejecutar al redimensionar la ventana
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function() {
                checkScreenSize();
            }, 150);
        });
    }
    
    // ============================================
    // PARTE 2: CONTADOR DE ESTADÍSTICAS (SOLO +15 y +50)
    // ============================================
    
    // Elementos de las estadísticas (solo los que tienen animación)
    const statLocalidades = document.getElementById('stat-localidades');
    const statBarrios = document.getElementById('stat-barrios');
    
    // Verificar que existen los elementos
    if (statLocalidades && statBarrios) {
        
        // Configuración de los números (solo los que animamos)
        const statsConfig = [
            { element: statLocalidades, finalValue: 15, hasPlus: true, currentValue: 0 },
            { element: statBarrios, finalValue: 50, hasPlus: true, currentValue: 0 }
        ];
        
        // Flag para controlar que la animación se ejecute solo una vez
        let animationExecuted = false;
        
        /**
         * Formatea el número con o sin +
         */
        function formatNumber(value, hasPlus) {
            return hasPlus ? `+${value}` : `${value}`;
        }
        
        /**
         * Anima el contador de un elemento
         */
        function animateStat(stat, duration = 2000) {
            const startValue = 0;
            const endValue = stat.finalValue;
            const startTime = performance.now();
            
            function update(currentTime) {
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1);
                
                // Función de easing para que se vea más natural
                const easeOutQuart = 1 - Math.pow(1 - progress, 3);
                
                const currentValue = Math.floor(easeOutQuart * endValue);
                stat.element.textContent = formatNumber(currentValue, stat.hasPlus);
                stat.currentValue = currentValue;
                
                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    // Asegurar que llegue al valor final exacto
                    stat.element.textContent = formatNumber(endValue, stat.hasPlus);
                    stat.currentValue = endValue;
                }
            }
            
            requestAnimationFrame(update);
        }
        
        /**
         * Inicia la animación de todos los contadores
         */
        function startCounters() {
            if (animationExecuted) return;
            
            // Primero establecer todos en 0
            statsConfig.forEach(stat => {
                stat.element.textContent = formatNumber(0, stat.hasPlus);
                stat.currentValue = 0;
            });
            
            // Animar cada uno con un pequeño retraso entre ellos
            statsConfig.forEach((stat, index) => {
                setTimeout(() => {
                    animateStat(stat, 2000);
                }, index * 300); // 300ms de retraso entre cada contador
            });
            
            animationExecuted = true;
            console.log('🎯 Animación de contadores iniciada');
        }
        
        /**
         * Verifica si el elemento es visible en la pantalla
         */
        function isElementInViewport(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.bottom >= 0
            );
        }
        
        /**
         * Maneja el scroll para iniciar la animación cuando los números sean visibles
         */
        function handleScroll() {
            if (!animationExecuted && statLocalidades && isElementInViewport(statLocalidades)) {
                startCounters();
                // Una vez que se ejecuta, removemos el event listener
                window.removeEventListener('scroll', handleScroll);
            }
        }
        
        // Verificar si ya están visibles al cargar la página
        setTimeout(() => {
            if (isElementInViewport(statLocalidades)) {
                startCounters();
            } else {
                // Si no están visibles, esperamos al scroll
                window.addEventListener('scroll', handleScroll);
            }
        }, 500); // Pequeño retraso para asegurar que todo esté cargado
        
        // También verificar al redimensionar (por si cambia la visibilidad)
        window.addEventListener('resize', function() {
            if (!animationExecuted && isElementInViewport(statLocalidades)) {
                startCounters();
            }
        });
        
    } else {
        console.warn('Contador: No se encontraron los elementos de estadísticas');
    }
    
    // ============================================
    // PARTE 3: PREVENIR ANIMACIONES DURANTE RESIZE
    // ============================================
    
    // CSS adicional para prevenir animaciones durante el resize
    const style = document.createElement('style');
    style.textContent = `
        .resize-animation-stopper * {
            transition: none !important;
            animation: none !important;
        }
    `;
    document.head.appendChild(style);
    
    // Evento para prevenir animaciones durante el resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        document.body.classList.add('resize-animation-stopper');
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            document.body.classList.remove('resize-animation-stopper');
        }, 400);
    });
    
    console.log('✅ Hero Controller con Contadores inicializado');
});