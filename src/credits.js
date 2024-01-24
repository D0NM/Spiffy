"strict mode";
/**
 * Created by BMV on 23.04.14.
 */

sp.Credits = cc.Layer.extend({
    onEnter: function () {
        this._super();

//        var layer = new sp.GameLayer();
        var layer = cc.LayerGradient.create();
        this.addChild(layer,0);
//        layer.init();
        layer.init( cc.c4b(25,10,10,255), cc.c4b(200,20,20,255), cc.p(-0.31,1.2));


        var text = cc.LabelTTF.create("@d0Nm\nАвтор: Don Miguel\n \n \nAuthor: Дон Мигель\nwww.FaMeSoft.ru",
            "Impact", 31, cc.size(310, 230), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        /*
         var center = cc.LabelTTF.create("word wrap \"testing\" (bla0) bla1 'bla2' [bla3] (bla4) {bla5} {bla6} [bla7] (bla8) [bla9] 'bla0' \"bla1\"",
         "Impact", 18, cc.size(300, 220), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_TOP);
         */
//        text.setAnchorPoint(0.5, 0.5);
        text.setPosition(320 / 2, 240/2);

        this.addChild(text,10);

        text.runAction(cc.RotateBy.create(4.0,10-Math.random()*20));

        spr1 = sp.loadTukki();
        spr1.setAnchorPoint(0.5,0.5);
        spr1.playAnimation("look_up_down");
        spr1.setScale(2);
        spr1.setPosition(320/2, 240/2);
//        spr1.setRotation(25);
        this.addChild(spr1,1);

        /* spr1.runAction(cc.RepeatForever.create(
         cc.Sequence.create(
         cc.Repeat.create(
         cc.Spawn.create(
         cc.RotateBy.create(1, 360),
         cc.ScaleBy.create(1, 0.9)
         )
         , 10),
         cc.Spawn.create(
         cc.RotateBy.create(4, 360), cc.ScaleTo.create(4, 2)
         )
         )
         ));*/
        for(i=0; i<4; i++) {
            spr1 = sp.loadSpider();
            spr1.playAnimation("walking");
            spr1.setPosition(200+i*24, i*10+16+Math.random()*48);
            spr1.setScale(0.1+Math.random()*0.5);
            spr1.runAction(cc.MoveBy.create(4.0+Math.random()*3, cc.p(30-60*Math.random(),90+Math.random()*20)));
            this.addChild(spr1,0);
        }

        this.schedule(function () {
            var nextScene = cc.Scene.create();
            var nextLayer = new sp.MainMenuLayer();
            var transition = cc.TransitionProgressRadialCCW.create;
            nextLayer.init();
            nextScene.addChild(nextLayer);
//            this.unscheduleUpdate();
            cc.Director.getInstance().replaceScene(transition(0.5, nextScene));
        }, 4.0);


    }
});