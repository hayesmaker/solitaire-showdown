var Solitaire;
(function (Solitaire) {
    (function (Game) {
        var Main = (function () {
            function Main() {
                this.hello = 'hello world';
                console.log('Main App init', this.hello, Phaser);
            }
            return Main;
        })();
        Game.Main = Main;
    })(Solitaire.Game || (Solitaire.Game = {}));
    var Game = Solitaire.Game;
})(Solitaire || (Solitaire = {}));
