"strict mode";

sp.Disclamer = cc.Scene.extend({
    onEnter: function () {
        this._super();

//        var layer = new sp.GameLayer();
        var layer = cc.LayerGradient.create();
        this.addChild(layer,0);
//        layer.init();
        layer.init( cc.c4b(25,10,10,255), cc.c4b(200,20,20,255), cc.p(0.31,-1.2));

        var icon = cc.Sprite.create(s_GamesJamGammIcon);
        var logo = cc.Sprite.create(s_FameLogo);
        this.addChild(logo);
        logo.setPosition(320/2, 240/2+10);
        logo.setOpacity(0);
        logo.runAction(
            cc.Spawn.create(
                cc.FadeIn.create(0.5),
                cc.MoveTo.create(0.5, cc.p(320/2, 240/2))
            )
        );

        this.scheduleOnce(function () {
            logo.runAction(
                    cc.FadeOut.create(0.5)
            );
            this.addChild(icon);
            icon.setPosition(320/2, 240/2-10);
            icon.setOpacity(0);
            icon.runAction(
                cc.Spawn.create(
                    cc.FadeIn.create(0.5),
                    cc.MoveTo.create(0.5, cc.p(320/2, 240/2))
                )
            );
        }, 2.0);

        this.scheduleOnce(function () {
            icon.runAction(
                cc.Spawn.create(
                cc.FadeOut.create(0.5),
                cc.MoveTo.create(1.0, cc.p(320/2, 240))
//                cc.RotateBy.create(1.0, -120)
                )
            );

            var text = cc.LabelTTF.create("В редких случаях с некоторыми пользователями может произойти ЭПИЛЕПТИЧЕСКИЙ ПРИПАДОК, вызванный воздействием на организм определенных вспышек света или оптических изображений.",
                "Impact", 19, cc.size(300, 220), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            text.setPosition(320 / 2, 240/2);
            text.setOpacity(0);
            this.addChild(text,1);
            text.runAction(cc.Sequence.create(
/*
                cc.Blink.create(1.0,3+Math.random()*10),
                cc.Blink.create(0.5,3+Math.random()*10),
                cc.Blink.create(1.0,3+Math.random()*10),
                cc.Blink.create(1.0,10+Math.random()*10),
*/
                cc.FadeIn.create(0.5),
                cc.TintBy.create(1, -127*Math.random(), -127*Math.random(), 0),
                cc.TintBy.create(1, 0, -127*Math.random(), -127*Math.random()),
                cc.TintBy.create(1, -127*Math.random(), -127*Math.random(), -127*Math.random()),
                cc.FadeOut.create(0.5)
            ));
            //this.runAction(cc.Blink.create(0.5,3+Math.random()*10));

            for(i=0; i<5; i++) {
                spr1 = sp.loadSpider();
                spr1.playAnimation("walking");
//                spr1.setOpacity(55);
                spr1.setPosition(32+i*64, 240-Math.random()*48-((5-i)*20));
                spr1.setRotation(180);
                if(Math.random()<0.3) {
                    spr1.setScale(0.3+Math.random()*1);
                    spr1.setRotation(Math.random()*360);
                    spr1.runAction(cc.RotateTo.create(2.0+Math.random()*3, spr1.getRotation()+90-Math.random()*180));
                } else {
                    spr1.runAction(cc.MoveBy.create(2.0+Math.random()*3, cc.p(30-60*Math.random(),-90+Math.random()*20)));
                }
                this.addChild(spr1,0);
            }

        }, 4.0);

        //next
        this.scheduleOnce(function () {
            var nextScene = cc.Scene.create();
            var nextLayer = new sp.MainMenuLayer();
            var transition = cc.TransitionProgressRadialCW.create;
            nextLayer.init();
            nextScene.addChild(nextLayer);
//            this.unscheduleUpdate();
            cc.Director.getInstance().replaceScene(transition(0.5, nextScene));
        }, 8.0);


    }
});
