"strict mode";

sp.GameLayer = cc.Layer.extend({
    isMouseDown: false,

    init: function () {
        this._super();
        console.log("GameLayer");
        audioEngine.rewindMusic();

        var size = cc.Director.getInstance().getWinSize();

        var parallax = new cc.ParallaxNode();
        this.addChild(parallax,-1);
        var parallax2 = new cc.ParallaxNode();
        this.addChild(parallax2,100);

        this.helloLabel = cc.LabelTTF.create("Spiffy Trip\nИди вправо и мочи всех", "Impact", 18);
        // position the label on the center of the screen
        this.helloLabel.setPosition(size.width / 2, size.height - 40);
        // add the label as a child to this layer
        this.addChild(this.helloLabel, 5);


        cc.MenuItemFont.setFontName("Impact");
        cc.MenuItemFont.setFontSize(12);
        var item1 = cc.MenuItemFont.create("Back", this.onBack, this);
        var item2 = cc.MenuItemFont.create("Reset", this.onReset, this);

        var menu = cc.Menu.create( item1, item2);
        menu.alignItemsVertically();
        menu.setPosition(320-48,224);
        //this.addChild(menu, 300);
        parallax2.addChild(menu, 100, cc.p(0,0),cc.p(300, 220));  //to make it still

        /*
         var map = cc.TMXTiledMap.create(s_TMX);
         this.addChild(map, -1, TAG_TILE_MAP);
         var s = map.getContentSize();
         map.runAction(cc.MoveTo.create(10.0, cc.p(-120, 0)));
         */


        g_spriteTukki = sp.loadTukki();
        this.addChild(g_spriteTukki,1);
        g_spriteTukki.setAnchorPoint(0.5,0);
        g_spriteTukki.playAnimation("walking_right");
//        g_spriteTukki.setRotation(15);
        g_spriteTukki.setSkewX(-5);
//        g_spriteTukki.setScale(2,2);

        var background = new cc.Sprite.create(s_Back1,cc.rect(0,0,640,240));
        background.setAnchorPoint(0,0);
        parallax.addChild(background, -2, cc.p(0.07,0),cc.p(0,40));
        //generate level bg fg
        var oldLandN = -1;
        var oldBushN = -1;
        var landN = -1;
        var bushN = -1;
        for(var x=0; x<36; x++) {
            do {
                landN = Math.round(Math.random()*5);
            } while(landN === oldLandN);
            oldLandN = landN;
            var land = new cc.Sprite.create(s_Land,cc.rect(2,0+landN*100,318,100));
            //land.setAnchorPoint(0,-1);
            parallax.addChild(land, 2, cc.p(1,0),cc.p(-316 + x*316, 4));
            do {
                bushN = Math.round(Math.random()*5);
            } while(bushN === oldBushN);
            oldBushN = bushN;
            var bush = new cc.Sprite.create(s_Bush,cc.rect(0,0+bushN*100,320,100));
            bush.setAnchorPoint(0,0);
            bush.setScale(0.5+Math.random());
            bush.setSkewX(-15+30*Math.random()); //скос
            parallax.addChild(bush, 1, cc.p(0.1+Math.random(),0),cc.p(-20 + x*320, 40));
        }
//        parallax.runAction(cc.ScaleTo.create(10.0, 0.3, 0.3));

//        parallax.setAnchorPoint(0,1);
        //in front of
        for(var x=0; x<36; x++) {
            var bush = new cc.Sprite.create(s_Bush,cc.rect(0,0+Math.round(Math.random()*5)*100,320,100));
            bush.setAnchorPoint(0,-1);
//            bush.setScale(2,2);
            bush.setSkewX(-5+10*Math.random()); //скос
            parallax2.addChild(bush, 1, cc.p(2+Math.random()*2,0),cc.p(-20 + x*320, -150-(Math.round(Math.random()*8))));

        }
        parallax.setPosition(0,0);
        parallax2.setPosition(0,0);
//        parallax2.runAction(cc.MoveTo.create(30.0, cc.p(-100, 0)));
//        parallax.runAction(cc.MoveTo.create(30.0, cc.p(-100, 0)));

        g_spriteTukki.setPosition(0, 30);
        g_spriteTukki.runAction(cc.MoveTo.create(60.0, cc.p(1960, 30)));
        var followAction = cc.Follow.create(g_spriteTukki, cc.rect(0, 0,2960 - 100, 240));
        this.runAction(followAction);

        this.setAnchorPoint(0,-1);
        //this.runAction(cc.ScaleTo.create(60.0, 2.3, 2.3));
//        this.setRotation(1);
    },
    onReset: function() {
        console.log("Game reset");
        var soundId = audioEngine.playEffect(sfx_blob);

        var nextScene = cc.Scene.create();
        var nextLayer = new sp.GameLayer();
        var transition = cc.TransitionProgressRadialCCW.create;
        nextLayer.init();
        nextScene.addChild(nextLayer);

        this.unscheduleUpdate();
        cc.Director.getInstance().replaceScene(transition(0.5, nextScene));
    },
    onBack: function() {
        console.log("Game Back");
        var soundId = audioEngine.playEffect(sfx_blob);

        var nextScene = cc.Scene.create();
        var nextLayer = new sp.MainMenuLayer();
        var transition = cc.TransitionProgressRadialCW.create;
        nextLayer.init();
        nextScene.addChild(nextLayer);

        this.unscheduleUpdate();
        cc.Director.getInstance().replaceScene(transition(0.5, nextScene));
    },
});
