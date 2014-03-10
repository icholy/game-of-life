Game Of Life
============

Example [plunker](http://embed.plnkr.co/njPziANhBHacAufZEAKc/preview):


``` js
var glider = [
  [false, true, false],
  [false, false, true],
  [true,  true,  true]
];

$(function () {
  
  var $canvas = $('#canvas'),
      ctx     = $canvas[0].getContext('2d'),
      size    = 100,
      game    = new Game(size, ctx);
  
  $canvas.on('click', function (e) {
    var offset = $(this).offset(),
        x      = Math.floor((e.clientX - offset.left) / 11),
        y      = Math.floor((e.clientY - offset.top) / 11);
    game.addShape(glider, x, y);
    game.draw();
  });
  
  setInterval(function () {
    game.next();  
    game.draw();
  }, 100);
  
});
```

[John Conway explains his Game Of Life](http://www.youtube.com/watch?v=E8kUJL04ELA)
