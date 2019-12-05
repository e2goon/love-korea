
(function() {

  var swiperMain = new Swiper('.notify', {
    loop: true,
    pagination: {
      el: '.notify .swiper-pagination',
      clickable: true,
      renderBullet: function (index, className) {
        var notifyItem = this.slides[index].querySelector('.notify-item');
        return '<button type="button" class="' + className + '">' + notifyItem.dataset.bulletName + '</button>';
      },
    }
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
} ());
