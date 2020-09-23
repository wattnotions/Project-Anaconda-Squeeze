"""
Sample Python/Pygame Programs
Simpson College Computer Science
http://programarcadegames.com/
http://simpson.edu/computer-science/
"""
 
import pygame
import pygame_textinput
import os
 
# Define some colors
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
GREEN = (0, 255, 0)
RED = (255, 0, 0)
 
 
def draw_stick_figure(screen, x, y):
    # Head
    pygame.draw.ellipse(screen, WHITE, [1 + x, y, 10, 10], 0)
    
    
# Create TextInput-object
#textinput = pygame_textinput.TextInput()

 
    
 
# Setup
pygame.init()
 
# Set the width and height of the screen [width,height]

WIDTH = 700
HEIGHT = 500

X_AX_OF = 50
Y_AX_OF = 50

size = [700, 500]
screen = pygame.display.set_mode(size)
 
pygame.display.set_caption("My Game")
 
# Loop until the user clicks the close button.
done = False
 
# Used to manage how fast the screen updates
clock = pygame.time.Clock()
 
# Hide the mouse cursor
pygame.mouse.set_visible(0)
 
# Speed in pixels per frame
x_speed = 0
y_speed = 0
 
# Current position
x_coord = X_AX_OF
y_coord = (HEIGHT - Y_AX_OF) - 5






SQUEEZE_TIME   =   2000      # game time in milliseconds
squeeze_data   = []           # list to hold squeeze data


GRAPH_PIXELS   = WIDTH - (X_AX_OF*2)   #Number of pixels on the X axis of the graph section
PIX_PER_SECOND = SQUEEZE_TIME/GRAPH_PIXELS  # line update in milliseconds

MOVEX = pygame.USEREVENT +1
pygame.time.set_timer(MOVEX, int(PIX_PER_SECOND))

print(PIX_PER_SECOND)


display_instructions = True
instruction_page = 1

username = ''
font = pygame.font.Font(None, 36) 
# -------- Instruction Page Loop -----------
while not done and display_instructions:


    # Set the screen background
    screen.fill(WHITE)

    events = pygame.event.get()
    for event in events:
        if event.type == pygame.QUIT:
            done = True
        if event.type == pygame.K_UP:
            instruction_page += 1
            if instruction_page == 2:
                display_instructions = False
                
        if event.type == pygame.K_SPACE:
                    f = open(username+".csv", "w")
                    f.close()
                    text = font.render("New save file created, press space to start", True, BLACK)
                    screen.blit(text, [10, 200])
                
        
 
    
 
    if instruction_page == 1:
        # Draw instructions, page 1
        # This could also load an image created in another program.
        # That could be both easier and more flexible.
 
        text = font.render("Enter your first name and your age. E.G. shane26:", True, BLACK)
        screen.blit(text, [10, 10])
        
        text = font.render("Press enter when finished", True, BLACK)
        screen.blit(text, [10, 50])
 
        # Blit its surface onto the screen
       # screen.blit(textinput.get_surface(), (10, 100))
        
        
    
 
    
         # Feed it with events every frame
         
        
       # if textinput.update(events):
       #         username = textinput.get_text()
            
        if username:    
            if (username + ".csv" in os.listdir("user_data")):
                text = font.render("User data found, welcome back " + username, True, BLACK)
                screen.blit(text, [10, 150])
            else:
                text = font.render("User file not found, press space to make new file", True, BLACK)
                screen.blit(text, [10, 150])
                
                
                
                
          
            #instruction_page = 2
        
 
        if instruction_page == 2:
        # Draw instructions, page 1
        # This could also load an image created in another program.
        # That could be both easier and more flexible.
        
            pass
            
            
            
    # Limit to 60 frames per second
    clock.tick(60)
 
    # Go ahead and update the screen with what we've drawn.
    pygame.display.flip()
 

 
# -------- Main Program Loop -----------

screen.fill(BLACK)
while not done:
    # --- Event Processing
    
    
    oldx = x_coord
    oldy = y_coord
    
    
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            done = True
            # User pressed down on a key
 
        elif event.type == pygame.KEYDOWN:
            # Figure out if it was an arrow key. If so
            # adjust speed.
            if event.key == pygame.K_LEFT:
                x_speed = -3
            elif event.key == pygame.K_RIGHT:
                x_speed = 3
            elif event.key == pygame.K_UP:
                y_speed = -3
            elif event.key == pygame.K_DOWN:
                y_speed = 3
 
        # User let up on a key
        elif event.type == pygame.KEYUP:
            # If it is an arrow key, reset vector back to zero
            if event.key == pygame.K_LEFT or event.key == pygame.K_RIGHT:
                x_speed = 0
            elif event.key == pygame.K_UP or event.key == pygame.K_DOWN:
                y_speed = 0
                
        elif event.type == MOVEX:
            if x_coord < (WIDTH - X_AX_OF):
                x_coord += 1
            else:
                done = True
            
 
    # --- Game Logic
 
    # Move the object according to the speed vector.
    #x_coord = x_coord + x_speed
    
    
    
    y_coord = y_coord + y_speed
    squeeze_data.append(y_coord)
    
    
    
    pygame.draw.line(screen, WHITE, [X_AX_OF, HEIGHT - Y_AX_OF], [ WIDTH - X_AX_OF, HEIGHT - Y_AX_OF], 1)
    pygame.draw.line(screen, WHITE, [X_AX_OF, HEIGHT - Y_AX_OF], [ X_AX_OF, Y_AX_OF], 1)
    pygame.draw.line(screen, WHITE, [WIDTH - X_AX_OF, HEIGHT - Y_AX_OF], [ WIDTH - X_AX_OF, Y_AX_OF], 1)
    
    pygame.draw.line(screen, WHITE, [oldx, oldy], [x_coord, y_coord], 1)
 
    # --- Drawing Code
 
    # First, clear the screen to WHITE. Don't put other drawing commands
    # above this, or they will be erased with this command.
   # screen.fill(WHITE)
 
    #draw_stick_figure(screen, x_coord, y_coord)
 
 
    # Go ahead and update the screen with what we've drawn.
    pygame.display.flip()
 
    # Limit frames per second
    clock.tick(60)
 
print(len(squeeze_data))
print(squeeze_data[1:100])
 
# Close the window and quit.
pygame.quit()