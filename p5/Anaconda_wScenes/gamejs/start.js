

function preload()
{
    
}

function setup()
{
    createCanvas(windowWidth, windowHeight);

    var mgr = new SceneManager();
    
    mgr.wire();
    mgr.showScene( Intro );
}
