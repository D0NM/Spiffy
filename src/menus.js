"strict mode";
/**
 * Created by BMV on 23.04.14.
 */

sp.MainMenuLayer = cc.Layer.extend({
    tAction: null, tAction2: null,
    tripo: null, tripo2: null,

    init: function () {
        this._super();

        //menus
        this.setTouchEnabled(true);
        this.setTouchPriority(cc.MENU_HANDLER_PRIORITY + 1);
        this.setTouchMode(cc.TOUCH_ONE_BY_ONE);



        spr1 = sp.loadTukki();
        spr1.setAnchorPoint(3.5,0.5);
        spr1.playAnimation("scared_right");
        spr1.setScale(2);
//        spr1.setPosition(270, 40);
        spr1.setPosition(320/2, 240/2);
        spr1.setRotation(25);
        this.addChild(spr1,29);

        spr1.runAction(cc.RepeatForever.create(
            cc.Sequence.create(
                cc.Repeat.create(
                    cc.Spawn.create(
                        cc.RotateBy.create(4, 360),
                        cc.ScaleBy.create(4, 0.9)
                    )
                    , 10),
                cc.Spawn.create(
                    cc.RotateBy.create(4, 360), cc.ScaleTo.create(4, 2)
                )
            )
        ));


        tripo2 = new cc.Sprite.create(s_Tripo);
        tripo2.setAnchorPoint(0.5, 0.5);
        tripo2.setPosition(320 / 2, 240 / 2);
        //tripo2.setRotation(-30 + 60 * Math.random());
        tripo2.setScale(0.12);
        this.addChild(tripo2, 21);
        tAction2 = tripo2.runAction(cc.ScaleTo.create(2.0, 2));

        tripo = new cc.Sprite.create(s_Tripo);
        tripo.setAnchorPoint(0.5, 0.5);
        tripo.setPosition(320 / 2, 240 / 2);
        //tripo.setRotation(-30 + 60 * Math.random());
        tripo.setScale(2);
        this.addChild(tripo, 20);
        tAction = tripo.runAction(cc.ScaleTo.create(2.0, 20));

        this.schedule(function () {
            tAction.stop();
            tAction2.stop();
            tripo.setRotation(tripo2.getRotation());
            tripo.setScale(2);
            tripo2.setScale(0.12);
            tripo2.setRotation(-20 + 40 * Math.random());
            tAction = tripo.runAction(cc.ScaleTo.create(2.0, 20));
//            tripo2.runAction(cc.FadeIn.create(0.3));
            tAction2 = tripo2.runAction(cc.ScaleTo.create(2.0, 2));
        }, 2.0);


        cc.MenuItemFont.setFontName("Impact");
        cc.MenuItemFont.setFontSize(22);
        var item1 = cc.MenuItemFont.create("Start Старт", this.onStartGame, this);
        var item1a = cc.MenuItemFont.create("dbgStart A", this.onStartGameA, this);
        var item2 = cc.MenuItemFont.create("Рекорды Hi-Scores", this.onHighScores, this);
        var item3 = cc.MenuItemFont.create("Credits Авторы", this.onCredits, this);
        var item4 = cc.MenuItemFont.create("Помощь Help", this.onHelp, this);
        var item5 = cc.MenuItemFont.create("Quit Выход", this.onQuit, this);

        var menu = cc.Menu.create( item1,item1a, item2, item3, item4, item5);
        menu.alignItemsVertically();
        menu.setColor(cc.c3b(127,255,0));
//        menu.setOpacity(220);

        // elastic effect
        var winSize = cc.Director.getInstance().getWinSize();

        var locChildren = menu.getChildren();
        var dstPoint = cc.p(0,0);
        for(var i = 0; i < locChildren.length; i++){
            var selChild = locChildren[i];
            if(selChild){
                dstPoint.x = selChild.getPositionX();
                dstPoint.y = selChild.getPositionY();
                var offset = 0|(winSize.width/2 + 50);
                if( i % 2 == 0)
                    offset = -offset;

                selChild.setPosition( dstPoint.x + offset, dstPoint.y);
                selChild.runAction(cc.EaseElasticOut.create(cc.MoveBy.create(2, cc.p(dstPoint.x - offset,0)), 0.35));
            }
        }
        /*this._disabledItem = item4;
        this._disabledItem.setEnabled( false );*/
        this.addChild(menu, 30);
        menu.setPosition(winSize.width/2, winSize.height/2);
    },
    onStartGame: function () {
        console.log("Start game");
        var soundId = audioEngine.playEffect(sfx_blob);

        var nextScene = cc.Scene.create();
        var nextLayer = new sp.GameLayer();
        var transition = cc.TransitionProgressRadialCW.create;
        nextLayer.init();
        nextScene.addChild(nextLayer);

        this.unscheduleUpdate();
        cc.Director.getInstance().replaceScene(transition(0.5, nextScene));
    },
    onStartGameA: function () {
        console.log("Start game A debug");
        var soundId = audioEngine.playEffect(sfx_blob);

        var nextScene = cc.Scene.create();
        var nextLayer = new sp.GameLayer2();
        var transition = cc.TransitionProgressRadialCW.create;
        nextLayer.init();
        nextScene.addChild(nextLayer);

        this.unscheduleUpdate();
        cc.Director.getInstance().replaceScene(transition(0.5, nextScene));
    },
    onHighScores: function () {
        console.log("High Scores");
        var soundId = audioEngine.playEffect(sfx_blob);

        var nextScene = cc.Scene.create();
        var nextLayer = new sp.HighScores();
        var transition = cc.TransitionProgressRadialCW.create;
        nextLayer.init();
        nextScene.addChild(nextLayer);

        this.unscheduleUpdate();
        cc.Director.getInstance().replaceScene(transition(0.5, nextScene));
    },
    onCredits: function () {
        console.log("Credits");
        var soundId = audioEngine.playEffect(sfx_blob);

        var nextScene = cc.Scene.create();
        var nextLayer = new sp.Credits();
        var transition = cc.TransitionProgressRadialCW.create;
        nextLayer.init();
        nextScene.addChild(nextLayer);

        this.unscheduleUpdate();
        cc.Director.getInstance().replaceScene(transition(0.5, nextScene));
    },
    onHelp: function () {
        console.log("Help");
        var soundId = audioEngine.playEffect(sfx_blob);

        var nextScene = cc.Scene.create();
        var nextLayer = new sp.Help();
        var transition = cc.TransitionProgressRadialCW.create;
        nextLayer.init();
        nextScene.addChild(nextLayer);

        this.unscheduleUpdate();
        cc.Director.getInstance().replaceScene(transition(0.5, nextScene));
    },
    onQuit: function() {
        var soundId = audioEngine.playEffect(sfx_blob);
        console.log("Quit");
//        document.location.href = "http://www.famesoft.ru";
        document.location.href = "http://gamesjam.org/639/";
    }
});