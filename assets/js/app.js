
var swiperMain = new Swiper('.notify', {
  pagination: {
    el: '.notify .swiper-pagination',
    clickable: true,
    renderBullet: function (index, className) {
      var notifyItem = this.slides[index].querySelector('.notify-item');
      return '<button type="button" class="' + className + '">' + notifyItem.dataset.bulletName + '</button>';
    },
  }
});
