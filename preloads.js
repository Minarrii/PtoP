function preload0() {
    backgroundDark = loadImage("prologue assets/darkbg.jpg");
    backgroundLight = loadImage("prologue assets/brightbg.jpg");
    museumImg = loadImage("prologue assets/museum.jpg");
    startBtnImg = loadImage("prologue assets/start.png");
    inputPromptImg = loadImage("prologue assets/namebox.png");
    continueBtnImg = loadImage("prologue assets/continue.png");
    ghostImg = loadImage("prologue assets/ghost asset.png");
    shakeSound = loadSound('prologue assets/soundeffect.mp3');
    dialogueBoxImg = loadImage("prologue assets/dialoguebox.png");
    nextButtonImg = loadImage("prologue assets/nextbrush.png");
    myFont = loadFont("prologue assets/Typo_Crayon M.ttf");
}

function preload1() {
    titleBack = loadImage('assets/stage1/titleBack.png');
    startBut = loadImage('assets/stage1/startBut.png');
    startButCl = loadImage('assets/stage1/startButCl.png');
    art = loadImage('assets/stage1/art.png');
    doma = loadImage('assets/stage1/doma.png');
    bubble = loadImage('assets/stage1/bubble.png');
    bawl = loadImage('assets/stage1/bawl.png');
    whisk = loadImage('assets/stage1/whisk.png');
    scoreBoard = loadImage('assets/stage1/scoreBoard.png');
    gauge = loadImage('assets/stage1/gauge.png');
    board = loadImage('assets/stage1/zone.png');
    butter = loadImage('assets/stage1/butter.png');
    milkWoman = createVideo(['assets/stage1/milkmilk.mp4']);
    milk2 = loadImage('assets/stage1/milk_2.png');
    milk3 = loadImage('assets/stage1/milk_3.png');
    milk4 = loadImage('assets/stage1/milk_4.png');
    milk5 = loadImage('assets/stage1/milk_5.png');
    hurryUp = loadImage('assets/stage1/Hurry up_ghost.png');

}

function preload2() {
    womanbg = loadImage("assets/stage2/woman_bg.png")
    goldCropImg = loadImage("assets/stage2/goldCrop.png");
    normalCropImg = loadImage("assets/stage2/crop.png");
    darkCropImg = loadImage("assets/stage2/darkCrop.png");
    equipmentImg = loadImage("assets/stage2/equipment.png");
    scoreBoard = loadImage("assets/stage2/scoreboard.png");
    noWomanbg = loadImage("assets/stage2/nowoman_bg_red.png");
    cropcrop = createVideo(['assets/stage2/cropcrop.mp4'])


}


function preload3() {
    man_bg = loadImage('assets/stage3/man_bg.png');
    man_face_bg = loadImage('assets/stage3/man_face_bg.png');
    bird = loadImage('assets/stage3/bird.png');
    face = loadImage('assets/stage3/face.png');
    pipe = loadImage('assets/stage3/pipe.png');
    greenApple = loadImage('assets/stage3/bigger green apple.png');
    retroCamera = loadImage('assets/stage3/camera screen.png');
    darkCamera = loadImage('assets/stage3/dark camera screen.png');
    targetImages[0] = greenApple;
    targetImages[1] = bird;
    targetImages[2] = face;
    targetImages[3] = pipe;
    flash = loadImage('assets/stage3/flash.png');
    camSound=loadSound('assets/stage3/cam.mp3');
}

function preload4() {
    cooking_bg = loadImage('assets/cooking/cooking_bg.png');
    butter_bg = loadImage('assets//cooking/butter_bg.png');
    pie_bg = loadImage('assets/cooking/pie_bg.png');
    applepie_bg = loadImage('assets/cooking/applepie_bg.png');

    butterImg = loadImage('assets/cooking/butter.png');
    flourImg = loadImage('assets/cooking/flour.png');
    appleImg = loadImage('assets/cooking/red_apple.png');
    banjukImg = loadImage('assets/cooking/banjuk.png');

    cookingghostImg = loadImage('assets/cooking/cooking_gst.png');
    chatImg = loadImage('assets/cooking/chat.png');
    handImg = loadImage('assets/cooking/hand.png');
    oven_darkbg = loadImage('assets/cooking/oven_pie_dark.png')
    oven_lightbg = loadImage('assets/cooking/oven_pie_light.png')

}

function preload5() {
    backToStartClicked = loadImage('assets/last/back to start_clicked.png');
    backToStart = loadImage('assets/last/back to start.png');
    painter = loadImage('assets/last/painter.png');
    last_bg = loadImage('assets/last/last_bg_typo.PNG');
    drawdraw = createVideo(['assets/last/drawdraw.mp4']);
    kid_painting= createVideo(['assets/last/kid_painting.mp4']);
    ghost_painter=loadImage('assets/last/ghost_painter.png');
    whiteLast=loadImage('assets/last/white_last.png');
    theEndGst=loadImage('assets/last/theendgst.png');

    milkWoman.hide();//DOM에 표시되는 걸 막기 위함 
    drawdraw.hide();
    cropcrop.hide();
    kid_painting.hide();
    

}
