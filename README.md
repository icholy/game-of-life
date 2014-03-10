Game Of Life
============

Example [pluker](http://embed.plnkr.co/Z4cxoqkmwfAGk95rtXQ8/preview):


``` js
var glider = [
  [false, true, false],
  [false, false, true],
  [true,  true,  true]
];

$(function () {
  
  var ctx  = $("#canvas")[0].getContext('2d'),
      size = 100,
      game = new Game(size, ctx);
  
  game.addShape(glider, 0, 0);
  game.addShape(glider, 3, 3);
  game.addShape(glider, 6, 5);
  game.addShape(glider, 10, 10);
  
  setInterval(function () {
    game.next();  
    game.draw();
  }, 100);
  
});
```

[John Conway explains his Game Of Life](http://www.youtube.com/watch?v=E8kUJL04ELA)
