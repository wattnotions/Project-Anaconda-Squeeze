function Intro()
{
	
	this.setup = function()
	{
		createCanvas(windowWidth, windowHeight);
	}
    this.draw = function()
    {
        
		rectMode(CENTER);
        rect(windowWidth/2, windowHeight/2, 150, 40);     
    }

    this.mouseClicked = function()
    {
		this.sceneManager.showScene( Game );
        
    }

    

}
