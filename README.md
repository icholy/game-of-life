Game Of Life
============

Example [plunker](http://embed.plnkr.co/njPziANhBHacAufZEAKc/preview):


``` js

var glider = [
  [false, true, false],
  [false, false, true],
  [true,  true,  true]
];

var lwsp = [
  [false, true, false, false, true],
  [true, false, false, false, false],
  [true, false, false, false, true],
  [true, true,  true,  true,  false]
];

var acorn = [
  [false, true,  false, false, false, false, false],
  [false, false, false, true,  false, false, false],
  [true,  true,  false, false, true,  true,  true ]
];


var rPentomino = [
  [false, true, true],
  [true,  true, false],
  [false, true, false]
];

var cycle = function (array) {
  var i = 0;
  return function () {
    if (i === array.length) {
      i = 0;
    };
    return array[i++];
  };
};

var nextShape = cycle([glider, lwsp, acorn, rPentomino]);

$(function () {
  
  var $canvas = $('#canvas'),
      ctx     = $canvas[0].getContext('2d'),
      size    = 100,
      game    = new Game(size, ctx);
  
  $canvas.on('click', function (e) {
    var offset = $(this).offset(),
        x      = Math.floor((e.clientX - offset.left) / 11),
        y      = Math.floor((e.clientY - offset.top) / 11),
        s      = nextShape();
    game.addShape(s, x, y);
    game.draw();
  });
  
  setInterval(function () {
    game.next();  
    game.draw();
  }, 100);
  
});
```

[John Conway explains his Game Of Life](http://www.youtube.com/watch?v=E8kUJL04ELA)
