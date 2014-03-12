var Cell = function () {

    var Cell = function Cell(alive) {
        this.setAlive(alive);
    };

    Cell.prototype.isAlive = function () {
        return this._alive;
    };

    Cell.prototype.setAlive = function (alive) {
        this._alive = alive;
    };

    return Cell;
}.call(null);

var Grid = function () {

    var Grid = function Grid(size) {
        var i, j;
        this._size = size;
        this._rows = [];
        for (i = 0; i < size; i++) {
            var row = [];
            for (j = 0; j < size; j++) {
                row.push(new Cell(false));
            }
            this._rows.push(row);
        }
    };

    Grid.prototype.forEach = function (fn) {
        this._rows.forEach(function (row, y) {
            row.forEach(function (cell, x) {
                fn(cell, x, y);
            });
        });
    };

    Grid.prototype.getCell = function (x, y) {
        var row = this._rows[y];
        if (typeof row === 'undefined') {
            return undefined;
        }
        return row[x];
    };

    Grid.prototype.nNeighboors = function (x, y) {

        var top   = y - 1,
            btm   = y + 1,
            left  = x - 1,
            right = x + 1;

        var neighboors = [
            this.getCell(left, top), this.getCell(x, top), this.getCell(right, top),
            this.getCell(left, y),                         this.getCell(right, y),
            this.getCell(left, btm), this.getCell(x, btm), this.getCell(right, btm)
        ];

        return neighboors.filter(function (cell) {
          return typeof cell !== 'undefined';
        }).reduce(function (alive, cell) {
            return cell.isAlive() ? alive + 1 : alive;
        }, 0);
    };

    Grid.prototype.size = function () {
        return this._size;
    };

    return Grid;

}.call(null);

var Game = function () {

    var Game = function Game(size, ctx) {
        this._grid = new Grid(size);
        this._ctx = ctx;
    };

    Game.prototype.next = function () {
        var cGrid = this._grid,
            nGrid = new Grid(cGrid.size());

        cGrid.forEach(function (cell, x, y) {
            var cCell = cGrid.getCell(x, y),
                nCell = nGrid.getCell(x, y),
                nNeighboors = cGrid.nNeighboors(x, y);

            if (cCell.isAlive()) {
                if (nNeighboors <= 1 || nNeighboors >= 4) {
                    nCell.setAlive(false);
                } else {
                    nCell.setAlive(true);
                }
            } else {
                if (nNeighboors === 3) {
                    nCell.setAlive(true);
                } else {
                    nCell.setAlive(false);
                }
            }
        });

        this._grid = nGrid;
    };

    Game.prototype.draw = function () {
        var ctx = this._ctx;
        this._grid.forEach(function (cell, x, y) {
            ctx.fillStyle = cell.isAlive() ? '#FFF' : '#000';
            ctx.fillRect((x * 10) + x, (y * 10) + y, 10, 10);
        });
    };

    Game.prototype.addShape = function (shape, x, y) {
        var grid = this._grid;
        shape.forEach(function (row, yOffset) {
            row.forEach(function (alive, xOffset) {
                var cell = grid.getCell(x + xOffset, y + yOffset);
                if (typeof cell !== 'undefined') {
                    cell.setAlive(alive);
                }
            });
        });
    };

    return Game;

}.call(null);



