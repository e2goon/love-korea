
(function() {

  var swiperMain = new Swiper('.notify', {
    loop: true,
    // effect: 'fade',
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

  function mainMenu() {
    var menu = document.querySelector('.main-menu');
    window.addEventListener('scroll', function() {
      if (this.scrollY < 50) {
        menu.classList.remove('is-active');
      } else {
        menu.classList.add('is-active');
      }
    });
  }

  window.addEventListener('DOMContentLoaded', function() {
    mainMenu();
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
  $dim.css('filter', 'alpha(opacity=70)').fadeIn(speed);

  // MEMO: video iframe 추가
  if(obj === 'videoModal') {
    // append iframe
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
}

