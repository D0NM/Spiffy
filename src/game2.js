"strict mode";

sp.GameLayer2 = cc.Layer.extend({
    sTmp: null,

    init: function () {
        this._super();
        console.log("GameLayer2");
        audioEngine.rewindMusic();

        var size = cc.Director.getInstance().getWinSize();

        this.setKeyboardEnabled(true);
        if ('touches' in sys.capabilities)
            this.setTouchEnabled(true);
        else if ('mouse' in sys.capabilities)
            this.setMouseEnabled(true);
        //this.setMouseEnabled(true);

        var bgSpr = new cc.Sprite.create(s_Tripo3,cc.rect(320,0,320,240));
        bgSpr.setPosition(320/2, 240/2);
        this.addChild(bgSpr,-1);
        bgSpr.runAction(cc.RepeatForever.create(
            cc.Sequence.create(
                cc.ScaleTo.create(3+Math.random()*2, 1.2),
                cc.ScaleTo.create(3+Math.random()*2, 1)
            )
        ));

        //Goal + Scores
        sp.addScoreLabelsToLayer(this);

        var x = 8;
        var y = 32;
        var evenLine = true;
        var oldRx = -1;
        var oldRy = -1;
        var rx = -1;
        var ry = -1;
        var hole = null;
        var currScale = 1;
        var contentSize;
        //
        var SCALE_FACTOR = 1;

        while(y <= 240-16 ) {
            do {    //pick tile
                rx = Math.round(Math.random()*3)*64;
                ry = Math.round(Math.random())*64;
            } while(oldRx === rx && oldRy === ry );
            hole = new cc.Sprite.create(s_Tripo3,cc.rect(0+rx,0+ry,64,64));

            currScale = (0.3+Math.random()*0.7)*SCALE_FACTOR;
            hole.setSkewX(-5+10*Math.random()); //скос
            hole.setRotation(-15+30*Math.random());
            contentSize = hole.getContentSize();
            if(evenLine)
                x+= (hole.getScaleX() * contentSize.width)/2;
            else
                x-= (hole.getScaleX() * contentSize.width)/2;
            hole.setScale(currScale);
//            console.log("x "+x+" y "+y);
            hole.runAction(cc.RepeatForever.create(
                cc.Sequence.create(
                    cc.ScaleTo.create(0.3+Math.random()*0.2, currScale*0.9),
                    cc.ScaleTo.create(0.3+Math.random()*0.2, currScale)
                )
            ));
            //debg Sizedstuff
            var debugLabel = cc.LabelTTF.create(""+Math.round(currScale*10), "Impact", 10);
            // position the label on the center of the screen
            hole.addChild(debugLabel , 5);
            debugLabel.setAnchorPoint(0.5, 0.5);
            debugLabel.setPosition(0, 0);
            debugLabel.setRotation(-hole.getRotation());
            // add the label as a child to this layer

            if(x>24 && x<320-24) {
                this.addChild(hole, 1+(240-y), TAG_HOLE);
                hole.setPosition(x, y);
            }

            if(evenLine)
                x+= (hole.getScaleX() * contentSize.width)/2;
            else
                x-= (hole.getScaleX() * contentSize.width)/2;
            if(x>=320-32*SCALE_FACTOR || x <= 32*SCALE_FACTOR) {
                y+= 64*0.85*SCALE_FACTOR;
                x = evenLine ? 311 : 8;
                evenLine =! evenLine;
            }
        }

        g_spriteTukki = sp.loadTukki();
        this.addChild(g_spriteTukki,400, TAG_TUKKI);
        g_spriteTukki.setAnchorPoint(0.5,0);
        g_spriteTukki.playAnimation("walking_right");
//        g_spriteTukki.setRotation(15);
//        g_spriteTukki.setSkewX(-5);
//        g_spriteTukki.setScale(2,2);

        g_spriteTukki.setPosition(30, 3);


        cc.MenuItemFont.setFontName("Impact");
        cc.MenuItemFont.setFontSize(12);
        var item1 = cc.MenuItemFont.create("Back", this.onBack, this);
        var item2 = cc.MenuItemFont.create("Reset", this.onReset, this);

        var menu = cc.Menu.create( item1, item2);
        menu.alignItemsVertically();
        menu.setPosition(320-48,224);
        this.addChild(menu, 300);
    },
    onReset: function() {
        console.log("Game2 reset");
        var soundId = audioEngine.playEffect(sfx_blob);

        var nextScene = cc.Scene.create();
        var nextLayer = new sp.GameLayer2();
        var transition = cc.TransitionProgressRadialCCW.create;
        nextLayer.init();
        nextScene.addChild(nextLayer);

        this.unscheduleUpdate();
        cc.Director.getInstance().replaceScene(transition(0.5, nextScene));
    },
    onBack: function() {
        console.log("Game2 Back");
        var soundId = audioEngine.playEffect(sfx_blob);

        var nextScene = cc.Scene.create();
        var nextLayer = new sp.MainMenuLayer();
        var transition = cc.TransitionProgressRadialCW.create;
        nextLayer.init();
        nextScene.addChild(nextLayer);

        this.unscheduleUpdate();
        cc.Director.getInstance().replaceScene(transition(0.5, nextScene));
    },
    onTouchesBegan: function(touch, event){
//        console.log(touch, event);
        console.log("tBegan");
        var pos = touch[0].getLocation();
//        if(pos.x>50 || pos.y >50)
//            return;
        g_spriteTukki.setPosition(pos.x, pos.y);
    },
    onTouchesEnded: function(touch, event){
//        console.log(touch, event);
        console.log("tended");
        if(!touch[0])
            return;
        var pos = touch[0].getLocation();
//        if(pos.x>50 || pos.y >50) {
//            return;
//        }
        g_spriteTukki.setPosition(pos.x, pos.y);
    },
    onTouchesMoved:function (touches, event) {
        var touch = touches[0];
        var delta = touch.getDelta();

        var node = this.getChildByTag(TAG_TUKKI);
        var diff = cc.pAdd(delta, node.getPosition());
        node.setPosition(diff);
    },
/*
    onMouseDragged:function (event) {
        var delta = event.getDelta();
        var node = this.getChildByTag(TAG_TUKKI);
        var diff = cc.pAdd(delta, node.getPosition());
        node.setPosition(diff);
    },
*/
    onMouseDown:function(event) {
        var cpos;
        var pos = event.getLocation();
//        cc.log("onMouseDown at: " + pos.x + " " + pos.y );
//        g_spriteTukki.setPosition( pos );
        g_spriteTukki.playAnimation("look_up_down");

        var allChildren = this.getChildren();
        for(var i = 0; i< allChildren.length; i++) {
            if(allChildren[i].getTag() === TAG_HOLE) {
                cpos = allChildren[i].getPosition();
                if((pos.x > cpos.x-8 && pos.x < cpos.x+8) && (pos.y > cpos.y-8 && pos.y < cpos.y+8)) {
                    allChildren[i].setTag(0); //remove tag
                    //this.removeChild(allChildren[i]);
                    allChildren[i].stopAllActions();
                    allChildren[i].runAction(cc.Sequence.create(
                            cc.FadeTo.create(0.5+Math.random()*0.5, 55),
                            cc.ScaleTo.create(2+Math.random()*2, allChildren[i].getScale()/3)
                        )
                    );

                }
//                allChildren[i].setPosition(0,0);
            }
        }
    },
    onMouseDragged:function(event) {
        var pos = event.getLocation();
//        cc.log("onMouseDragged at: " + pos.x + " " + pos.y );
//        g_spriteTukki.setPosition( pos );
    },
    onMouseUp:function(event) {
        var pos = event.getLocation();
        var tPos = g_spriteTukki.getPosition();
//        g_spriteTukki.setPosition( pos );
//        cc.log("Tu:"+ tPos.x + " " + tPos.y+" onMouseUp at: " + pos.x + " " + pos.y );
        g_spriteTukki.stopAllActions();
        if(tPos.x > pos.x)
            g_spriteTukki.playAnimation("walking_left");
        else
            g_spriteTukki.playAnimation("walking_right");

        pos.y = Math.min(pos.y, 200); //to prevent Tuk go upper
        g_spriteTukki.runAction(cc.MoveTo.create(10.0, pos));
    },
    onRightMouseDown:function(event){
        var pos = event.getLocation();
//        g_spriteTukki.setPosition( pos );
//        cc.log("onRightMouseDown at: " + pos.x + " " + pos.y );
    }

});
