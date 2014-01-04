/// <reference path="phaser.d.ts"/>

//import phaser = require("phaser");

module Solitaire {



    export module Game {
        export class Main {

            public hello:string = 'hello world';
            //public phaser:Phaser;

            constructor () {
                console.log('Main App init', this.hello, Phaser);
            }
        }
    }
}
