"strict mode";

sp.MyScene = cc.Scene.extend({
    onEnter: function () {
        this._super();

        audioEngine.setMusicVolume(0.5);
        audioEngine.playMusic(bgm_1, true);
        sp.initData(); //read score and so

        var layer = new sp.Disclamer();
//        var layer = new sp.MainMenuLayer();
        this.addChild(layer);
        layer.init();
    }
});
