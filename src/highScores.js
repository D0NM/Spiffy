"strict mode";

sp.HighScores = cc.Layer.extend({
    onEnter: function () {
        this._super();

        //sp.setLastScore(123);  //was for dbg

        var layer = cc.LayerGradient.create();
        this.addChild(layer, 0);

        layer.init(cc.c4b(25, 10, 10, 255), cc.c4b(20, 20, 200, 255), cc.p(0.41, -1.4));

        var icon = cc.Sprite.create(s_GamesJamGammIcon);
        var logo = cc.Sprite.create(s_FameLogo);
        this.addChild(logo);
        logo.setPosition(48, 48 - 24 - 48);
        logo.setScale(0.25);
        logo.setOpacity(0);
        logo.runAction(
            cc.Spawn.create(
                cc.FadeIn.create(0.5),
                cc.MoveTo.create(1.0, cc.p(48, 48 - 24))
            )
        );

        this.addChild(icon);
        icon.setPosition(320 - 48 + 12, 48 - 16 - 48);
        icon.setScale(0.25);
        icon.setOpacity(0);
        icon.runAction(
            cc.Spawn.create(
                cc.FadeIn.create(0.5),
                cc.MoveTo.create(1.0, cc.p(320 - 48 + 12, 48 - 16))
            )
        );


        var textScore = cc.LabelTTF.create("High Score: " + sp.hiScore,
            "Impact", 32, cc.size(300, 220), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        textScore.setPosition(320 / 2, 240 / 2 + 48);
        textScore.setOpacity(0);
        this.addChild(textScore, 1);
        textScore.runAction(cc.Sequence.create(
            cc.Spawn.create(
                cc.FadeIn.create(1.0),
                cc.MoveTo.create(1.0, cc.p(320 / 2, 240 / 2))
            ),
            cc.DelayTime.create(1.5),
            cc.MoveTo.create(1.0, cc.p(320 / 2, 240 / 2 + 24)),
            cc.DelayTime.create(4.0),
            cc.FadeOut.create(0.5)
        ));


        if (sp.hiScore > 0) {
            var text = cc.LabelTTF.create("Вы должны стараться лучше, ведь даже Димон набрал " + (9 + Math.round(sp.hiScore * 1.123))
                +". \nTry again. Even Dimon's got " + (9 + Math.round(sp.hiScore * 1.123))+".",
                "Impact", 16, cc.size(300, 220), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            text.setPosition(320 / 2, 240 / 2 - 100);
            text.setOpacity(0);
            this.addChild(text, 1);
            text.runAction(cc.Sequence.create(
                cc.DelayTime.create(2.0),
                cc.Spawn.create(
                    cc.FadeIn.create(1.0),
                    cc.MoveTo.create(1.0, cc.p(320 / 2, 240 / 2 - 32)),
                    cc.TintBy.create(1.0, -127 * Math.random(), -127 * Math.random(), 0)
                ),
                cc.DelayTime.create(4.0),
                cc.FadeOut.create(0.5)
            ));
        }

        for (i = 0; i < 5; i++) {
            spr1 = sp.loadSpider();
            spr1.playAnimation("walking");
//                spr1.setOpacity(55);
            spr1.setPosition(32 + i * 64, 240 - Math.random() * 48 - ((5 - i) * 20));
            spr1.setRotation(180);
            if (Math.random() < 0.3) {
                spr1.setScale(0.1 + Math.random() * 0.3);
                spr1.setRotation(Math.random() * 360);
                spr1.runAction(cc.RotateTo.create(4.0 + Math.random() * 3, spr1.getRotation() + 90 - Math.random() * 180));
            } else {
                spr1.setScale(0.2 + Math.random() * 0.2);
                spr1.runAction(cc.MoveBy.create(7.0 + Math.random() * 3, cc.p(30 - 60 * Math.random(), -90 + Math.random() * 20)));
            }
            this.addChild(spr1, 0);
        }

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
