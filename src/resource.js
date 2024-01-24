"strict mode";

var sp = {
    lastScore: 0,
    hiScore: 0,
    scoreLabel:null,
    hiScoreLabel:null,
    timerLabel:null,
    goalLabel:null,
};
var TAG_TUKKI = 221;
var TAG_TILE_MAP = 222;
var TAG_HOLE = 223;

var g_spriteTukki = null;
var audioEngine = cc.AudioEngine.getInstance();

//var s_HelloWorld = "res//HelloWorld.jpg";
//var s_CloseNormal = "res//CloseNormal.png";
//var s_CloseSelected = "res//CloseSelected.png";
var s_Tukki = "res//tukki.png";
//var s_Tileset00 = "res//tile00.png";
var s_Land = "res//land.fw.png";
var s_Back1 = "res//back1.fw.png";
var s_Bush = "res//bush.fw.png";
var s_Spider = "res//spider.fw.png";
//var s_TMX = "res//lvl00.tmx";
var s_Tripo = "res//tripo.fw.png";
var s_Tripo3 = "res//tripo3.fw.png";
var s_GamesJamGammIcon = "res//gamm_icon.png";
var s_FameLogo = "res//fame_logo.fw.png";


var bgm_1 = "res//bgm//bgm1.mp3";
var sfx_blob = "res//sfx//blob.wav";

var g_resources = [
    //image
//    {src:s_HelloWorld},
//    {src:s_CloseNormal},
//    {src:s_CloseSelected},
    {src:s_Tukki},
//    {src:s_Tileset00},
    {src:s_Spider},
    {src:s_Land},
    {src:s_Back1},
    {src:s_Bush},
    {src:s_Tripo},
    {src:s_Tripo3},
    {src:s_GamesJamGammIcon},
    {src:s_FameLogo},

    //plist

    //fnt

    //tmx
//    {src:s_TMX},

    //bgm
    {src:bgm_1},

    //effect
    {src:sfx_blob},
];

sp.loadTukki = function () {
    var animData =
    {
        "walking_left": {
            frameRects: [
                cc.rect(1 + 24 * 0, 1+42 * 0, 22, 40),
                cc.rect(1 + 24 * 1, 1+42 * 0, 22, 40),
                cc.rect(1 + 24 * 2, 1+42 * 0, 22, 40),
                cc.rect(1 + 24 * 3, 1+42 * 0, 22, 40)
            ],
            delay: 0.3
        },
        "walking_right": {
            frameRects: [
                cc.rect(1 + 24 * 0, 1+42 * 0, 22, 40),
                cc.rect(1 + 24 * 1, 1+42 * 0, 22, 40),
                cc.rect(1 + 24 * 2, 1+42 * 0, 22, 40),
                cc.rect(1 + 24 * 3, 1+42 * 0, 22, 40)
            ],
            delay: 0.3,
            flippedX: true
        },
        "jumping_right": {
            frameRects: [
                cc.rect(1 + 24 * 0, 1+42 * 1, 22, 40),
                cc.rect(1 + 24 * 1, 1+42 * 1, 22, 40),
                cc.rect(1 + 24 * 2, 1+42 * 1, 22, 40),
                cc.rect(1 + 24 * 3, 1+42 * 1, 22, 40)
            ],
            delay: 0.1,
            flippedX: true
        },
        "look_up_down": {
            frameRects: [
                cc.rect(1 + 24 * 0, 1+42 * 2, 22, 40),
                cc.rect(1 + 24 * 1, 1+42 * 2, 22, 40),
                cc.rect(1 + 24 * 0, 1+42 * 2, 22, 40),
                cc.rect(1 + 24 * 2, 1+42 * 2, 22, 40),
            ],
            delay: 0.52
        },
        "scared_left": {
            frameRects: [
                cc.rect(1 + 24 * 0, 1+42 * 3, 22, 40),
                cc.rect(1 + 24 * 1, 1+42 * 3, 22, 40),
            ],
            delay: 0.5
        },
        "scared_right": {
            frameRects: [
                cc.rect(1 + 24 * 0, 1+42 * 3, 22, 40),
                cc.rect(1 + 24 * 1, 1+42 * 3, 22, 40),
            ],
            delay: 0.53,
            flippedX: true
        }
    };
    var _g_spriteTukki = new AnimatedSprite(s_Tukki, animData);
    _g_spriteTukki.setAnchorPoint(0, -1);
    return _g_spriteTukki;
};

sp.loadSpider = function () {
    var animData =
    {
        "walking": {
            frameRects: [
                cc.rect(1 + 32 * 0, 1+32 * 0, 30, 30),
                cc.rect(1 + 32 * 1, 1+32 * 0, 30, 30),
                cc.rect(1 + 32 * 2, 1+32 * 0, 30, 30),
                cc.rect(1 + 32 * 1, 1+32 * 0, 30, 30),
            ],
            delay: 0.15
        }
    };
    var aniSpr = new AnimatedSprite(s_Spider, animData);
    aniSpr.setAnchorPoint(0.5, 0.5);
    return aniSpr;
};

sp.setLastScore = function (score) {
    this.lastScore = score;
    if (score > this.hiScore) {
        this.hiScore = score;
        sys.localStorage.setItem('hiScore', this.hiScore);
    }
    sys.localStorage.setItem('lastScore', this.lastScore);
};

sp.initData = function () {
    if (sys.localStorage.getItem('STgameData') == null) {
        sys.localStorage.setItem('hiScore', '0');
        sys.localStorage.setItem('lastScore', '0');
        sys.localStorage.setItem('STgameData', 2014);
        return;
    }
    this.hiScore = parseInt(sys.localStorage.getItem('hiScore'));
};

sp.addScoreLabelsToLayer = function (layer) {
    sp.scoreLabel = cc.LabelTTF.create("Score: ####", "Impact", 12);
    sp.scoreLabel.setAnchorPoint(0, 0.5);
    sp.scoreLabel.setPosition(8, 224);
    layer.addChild(sp.scoreLabel, 500);

    sp.hiScoreLabel = cc.LabelTTF.create("Hi-Score: ####", "Impact", 12);
    sp.hiScoreLabel.setAnchorPoint(0, 0.5);
    sp.hiScoreLabel.setPosition(8, 214);
    sp.hiScoreLabel.setColor(cc.c3b(200,200,200));
    layer.addChild(sp.hiScoreLabel, 500);

    sp.timerLabel = cc.LabelTTF.create("Timer: ####", "Impact", 12);
    sp.timerLabel.setAnchorPoint(0, 0.5);
    sp.timerLabel.setPosition(8, 204);
    sp.timerLabel.setColor(cc.c3b(200,200,255));
    layer.addChild(sp.timerLabel, 500);

    sp.goalLabel = cc.LabelTTF.create("GOAL: ~ = ~`~", "Impact", 12);
    sp.goalLabel.setAnchorPoint(0.5, 0.5);
    sp.goalLabel.setPosition(320/2, 224);
    layer.addChild(sp.goalLabel , 500);
};

