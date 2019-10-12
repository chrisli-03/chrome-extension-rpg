window.addEventListener('load', function () {
  Array.prototype.forEach.call(document.querySelectorAll('#enemy_list .link'), function(n) {
    n.href="javascript:;"
  })
})