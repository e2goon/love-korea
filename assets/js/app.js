
(function() {

  // main visual
  var swiperMain = new Swiper('.notify', {
    loop: true,
    effect: 'fade',
    speed: 1000,
    pagination: {
      el: '.notify .swiper-pagination',
      clickable: true,
      renderBullet: function (index, className) {
        var notifyItem = this.slides[index + 1].querySelector('.notify-item');
        return '<button type="button" class="' + className + '">' + notifyItem.dataset.bulletName + '</button>';
      },
    },
    navigation: {
      nextEl: '.notify .swiper-button-next',
      prevEl: '.notify .swiper-button-prev',
    },
  });

  var liveGallery = new Swiper('.live .swiper-container', {
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  function desktopMainMenu() {
    var menu = document.querySelector('.main-menu.is-desktop');
    var links = menu.querySelectorAll('a');
    window.addEventListener('scroll', function() {
      if (this.scrollY < 50) {
        menu.classList.remove('is-fixed');
      } else {
        menu.classList.add('is-fixed');
      }
    });
    menu.addEventListener('mouseenter', function() {
      menu.classList.add('is-open');
    });
    menu.addEventListener('mouseleave', function() {
      menu.classList.remove('is-open');
    });
    links.forEach(function(link, index) {
      link.addEventListener('focusin', function() {
        menu.classList.add('is-open');
      });
      if (index == links.length - 1) {
        link.addEventListener('focusout', function() {
          menu.classList.remove('is-open');
        });
      }
    })
  }

  function mainMenuToggle() {
    var $links = $('.main-menu.is-mobile .main-menu-list').find('.is-sub');
    $links.on('click', function() {
      $(this).toggleClass('is-active');
    });
  }

  function mobileMainMenu() {
    var $menu = $('.main-menu.is-mobile');
    var $btn = $menu.find('.main-menu-btn');
    $btn.click('click', function() {
      $menu.toggleClass('is-open');
    });
  }

  window.addEventListener('DOMContentLoaded', function() {
    desktopMainMenu();
    mobileMainMenu();
    mainMenuToggle();
  })

  // modal
  $('.video-play').on('click', function(e){
    var modalId = this.dataset.modalId
    layerOpen(modalId)
    e.preventDefault()
  })
} ());


/**
 * modal
 */
function layerOpen(obj) {
  var $obj = $('#' + obj),
      $fg = $obj.find('.modal-wrap'),
      $dim = $('.dim'),
      speed = 300,
      w = $(window).width();
  
  $obj.fadeIn(speed);
  $dim.fadeIn(speed);

  // MEMO: video iframe 추가
  if(obj === 'videoModal') {
    // append iframe
    $obj.find('.video').append('<iframe width="100%" src="https://www.youtube.com/embed/9v6oBBsW3gA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>')
    console.log('video')
  }

  // 팝업 정렬
  $fg.css({
      'margin-top': '-' + ($fg.outerHeight() / 2) + 'px',
      'margin-left': '-' + ($fg.outerWidth() / 2) + 'px'
  });
}

/**
* [modal-popup : 모달팝업 닫기]
* @param  {[object]}
*/
function layerClose(obj){
  var $obj = $('#' + obj),
      $dim = $('.dim'),
      speed = 300;
  
  $obj.fadeOut(speed);
  $dim.fadeOut(speed);
  if(obj === 'videoModal') {
    // append iframe
    setTimeout(function(){
      $obj.find('.video').empty()
    }, speed)
    console.log('video')
  }
}

