# Voice Word Chain Game - Peppa Pig Theme Requirements

## Theme Overview
Transform the voice word game into a fun, child-friendly experience inspired by Peppa Pig's distinctive visual style. The design should be bright, cheerful, playful, and welcoming for all ages.

---

## Color Palette

### Primary Colors
```
Peppa Pink:       #FF6B9D (Main accent, buttons, highlights)
Daddy Pig Blue:   #5BB1E8 (Player 1 color, headers)
Mummy Pig Orange: #FF8C42 (Player 2 color, accents)
George Dino Blue: #4A90E2 (Secondary buttons)
Muddy Brown:      #8B7355 (Borders, outlines)
```

### Background Colors
```
Sky Blue:         #B8E6F5 (Main background)
Grass Green:      #9FD356 (Bottom sections, footers)
Sunshine Yellow:  #FFE66D (Success highlights)
Cloud White:      #FFFFFF (Cards, panels)
Hill Green:       #7BC043 (Accent backgrounds)
```

### Feedback Colors
```
Success Green:    #7BC043 (Valid words - matches grass/hills)
Error Red:        #FF6B6B (Invalid words - bright red)
Warning Yellow:   #FFD93D (Timer warnings)
Neutral Gray:     #E8E8E8 (Disabled states)
```

### Text Colors
```
Primary Text:     #2C3E50 (Dark blue-gray)
Secondary Text:   #7F8C8D (Medium gray)
White Text:       #FFFFFF (On colored backgrounds)
```

---

## Typography

### Font Families

**Primary Font** (Headings, Large Text):
```css
font-family: 'Fredoka One', 'Comic Sans MS', 'Chalkboard SE', cursive;
/* Rounded, playful, bold */
```

**Secondary Font** (Body Text):
```css
font-family: 'Quicksand', 'Comic Sans MS', 'Trebuchet MS', sans-serif;
/* Clean, readable, friendly */
```

**Fallback Chain**:
```css
'Fredoka One', 'Comic Sans MS', 'Marker Felt', 'Bradley Hand', cursive
```

### Font Sizes
```
Game Title:       3.5rem - 4rem (56px - 64px)
Player Names:     2rem - 2.5rem (32px - 40px)
Timer:            4rem - 5rem (64px - 80px)
Current Word:     3rem - 4rem (48px - 64px)
Word History:     1.25rem (20px)
Buttons:          1.5rem (24px)
Body Text:        1rem (16px)
Small Text:       0.875rem (14px)
```

### Font Weights
- Headings: 700 (Bold)
- Subheadings: 600 (Semi-bold)
- Body: 400 (Regular)
- Emphasis: 500 (Medium)

---

## Layout & Structure

### Overall Page Layout

```
┌─────────────────────────────────────┐
│  ☀️  WORD CHAIN GAME  ☁️ ☁️        │  ← Sky blue header with sun/clouds
├─────────────────────────────────────┤
│                                     │
│    [Game Content Area - White]      │  ← Rounded white card floating
│                                     │     on sky background
│                                     │
├─────────────────────────────────────┤
│  🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿            │  ← Grass footer
└─────────────────────────────────────┘
```

### Border Radius
```css
Large containers:  24px - 32px
Cards:            20px - 24px
Buttons:          16px - 20px
Small elements:   12px - 16px
Circular:         50% (for avatars, icons)
```

### Shadows
```css
/* Soft, playful shadows */
Card shadow:      0 8px 20px rgba(0, 0, 0, 0.12)
Button shadow:    0 4px 12px rgba(0, 0, 0, 0.15)
Hover shadow:     0 6px 16px rgba(0, 0, 0, 0.2)
Active shadow:    0 2px 6px rgba(0, 0, 0, 0.1)
```

---

## Component Styling

### Game Setup Screen

**Background**: Sky blue gradient with white fluffy clouds
**Main Card**: Large rounded white card in center
**Inputs**: Rounded text fields with thick borders (3px) in Muddy Brown
**Buttons**: 
- Start button: Large, Peppa Pink, with bounce animation
- Settings: George Blue with gear icon

**Visual Elements**:
- Peppa and George silhouettes in corners
- Small muddy puddles scattered around
- Sun in top right corner
- Hills in background

### Game Board

**Layout**:
```
┌────────────────────────────────────┐
│  Player 1 🎯  |  Timer ⏱️  | Player 2 🎯  │  ← Top bar
├────────────────────────────────────┤
│                                    │
│     [Large Current Word Display]   │  ← Center focus
│                                    │
├────────────────────────────────────┤
│  📝 Word History (scrollable)      │  ← Bottom section
└────────────────────────────────────┘
```

**Player Turn Indicator**:
- Active player: Bright colored border (pulsing), larger size
- Inactive player: Grayed out, smaller
- Show player avatar (pig character icon)
- Bouncing arrow pointing to active player

**Timer Display**:
- Huge circular timer in center top
- Background: Sunshine Yellow when time is good
- Warning state (< 10s): Pulsing orange
- Critical state (< 5s): Pulsing red with shake
- Numbers in Fredoka One font, extra bold

**Current Word Display**:
- Extra large text (4rem+)
- White rounded rectangle background
- Thick colored border matching current player
- Drop shadow for depth
- Appears with bounce-in animation

### Word History List

**Style**:
- Alternating row colors (very light pink/blue)
- Each word in a rounded pill shape
- Player color-coded dots/avatars next to each word
- ✓ checkmark for valid, ✗ for invalid
- Auto-scroll to bottom for new words
- Cute icon dividers between words

**Word Pills**:
```css
background: white
border: 2px solid {player-color}
border-radius: 20px
padding: 8px 16px
margin: 4px
display: inline-block
```

### Buttons

**Primary Button** (Start, Submit):
```css
background: Peppa Pink gradient
color: white
border: 3px solid Muddy Brown
border-radius: 20px
padding: 16px 32px
font-size: 1.5rem
font-weight: bold
box-shadow: 0 6px 0 #C74C74 (darker pink)
/* Pressed state: translate down 4px, reduce shadow */
```

**Secondary Button** (Cancel, Back):
```css
background: white
color: Daddy Pig Blue
border: 3px solid Daddy Pig Blue
/* Same structure as primary */
```

**Icon Buttons** (Mic, Volume):
```css
Circular (50% border-radius)
Size: 60px x 60px
Icon size: 32px
Background: White or player color
Border: 3px solid Muddy Brown
```

**Hover Effects**:
- Scale up 1.05
- Brightness increase 1.1
- Wiggle animation (rotate ±3deg)

**Active/Pressed**:
- Scale down 0.95
- Move down 4px
- Shadow reduces

### Voice Input Component

**Microphone Button**:
- Large circular button (80px - 100px)
- Peppa Pink when inactive
- Pulsing red ripple when active/listening
- Microphone icon (lucide-react)
- "Tap to Speak" text below

**Listening State**:
- Concentric circles rippling out (like sound waves)
- Microphone icon bounces gently
- Background changes to light red gradient
- "Listening..." text with animated dots

**Transcription Display**:
- Speech bubble shape (tail pointing to mic button)
- White background with Muddy Brown border
- Real-time text appears with typing animation
- Max width constraint, wraps to multiple lines

### Validation Feedback

**Valid Word**:
```css
Animation: Flash green (200ms) → Scale up (1.2) → Scale back (1.0)
Background: Sunshine Yellow briefly
Border: 4px solid Success Green
Show: Large ✓ checkmark (animated draw-in)
Particle effect: Small stars/sparkles burst from word
Sound: Happy chime (optional)
```

**Invalid Word**:
```css
Animation: Flash red (200ms) → Shake horizontally (4 oscillations)
Background: Light red briefly
Border: 4px solid Error Red
Show: Large ✗ mark (animated draw-in)
Text below: Reason in small friendly font
Sound: Gentle "uh-oh" tone (optional)
```

**Visual Feedback Examples**:
- "❌ Word already used!"
- "❌ Must start with 'E'"
- "❌ Not a real word"
- "❌ Names don't count!"
- "✅ Perfect!"

### Timer Component

**Design**:
- Large circular progress ring
- Fills counter-clockwise
- Color transitions:
  - > 15s: Sunshine Yellow
  - 10-15s: Orange
  - 5-10s: Light Red (pulsing)
  - < 5s: Bright Red (pulsing + shake)
- Large numbers in center (Fredoka One)
- Small "seconds" text below number

**Animations**:
- Smooth rotation of progress arc
- Pulse effect when < 10s (scale 1.0 → 1.1)
- Shake effect when < 5s
- Flash red when time expires

### Modal/Popup Dialogs

**Structure**:
```
Overlay: Semi-transparent dark (rgba(0,0,0,0.3))
Modal: Large rounded white card
Header: Colored bar (Peppa Pink or Daddy Blue)
Content: Padded, centered
Footer: Buttons right-aligned
```

**Types**:

1. **Game Over Modal**:
   - Winner announcement with confetti animation
   - Player avatar large and centered
   - "🎉 [Player Name] Wins! 🎉"
   - Final score/word count
   - Peppa jumping animation
   - Buttons: "Play Again" (Peppa Pink), "Exit" (Gray)

2. **Pause Modal**:
   - Frosted glass effect on background
   - Simple "Game Paused" text
   - Resume/Restart buttons

3. **Settings Modal**:
   - Volume controls with slider
   - Timer adjustment
   - Player name edit
   - Voice recognition toggle

---

## Decorative Elements

### Background Elements

**Sky Section**:
- Gradient: `linear-gradient(to bottom, #B8E6F5 0%, #E8F6FC 100%)`
- Floating clouds (white, rounded, slow drift animation)
- Sun in corner (yellow circle with rays)
- Optional: Birds flying (simple V shapes)

**Grass Section**:
- Wavy green strip at bottom
- Small flowers scattered
- Muddy puddles (brown ovals with shine)
- Blades of grass texture

**Side Decorations**:
- Peppa's house silhouette (left side)
- Trees (simple rounded green circles on brown trunks)
- Hills (rounded green curves)
- Fence posts (simple brown rectangles)

### Character Elements

**Player Avatars**:
- Circular frames (bordered)
- Pig face icons (simplified):
  - Player 1: Pink pig (Peppa-style)
  - Player 2: Blue pig (George-style)
- Expressions change based on game state:
  - Thinking (waiting for turn)
  - Speaking (mouth open)
  - Happy (correct word)
  - Sad (wrong word/lost)

**Celebratory Elements**:
- Confetti burst on win (colored circles, triangles)
- Star sparkles on correct word
- Muddy splash on wrong word
- Jumping animation for winner

---

## Animations

### Entrance Animations

**Page Load**:
```css
Clouds: Slide in from sides (1s ease-out)
Sun: Scale up + rotate (0.8s ease-out, 0.2s delay)
Main card: Drop down + bounce (0.6s cubic-bezier)
Buttons: Pop in one by one (0.3s each, staggered)
```

**Turn Start**:
```css
Active player indicator: Bounce (0.4s)
Microphone button: Pulse (0.5s)
Previous word: Slide up and fade (0.3s)
```

### Ongoing Animations

**Idle States**:
- Clouds: Slow horizontal drift (60s loop)
- Sun: Gentle rotation (30s loop)
- Grass: Sway slightly (8s loop, subtle)
- Waiting player: Gentle bob (3s loop)

**Attention Grabbers**:
- Active player: Border pulse (1.5s loop)
- Microphone ready: Bounce (2s loop)
- Timer low: Pulse + shake (1s loop)

### Action Animations

**Microphone Activation**:
```css
Click: Scale down (0.1s) → Scale up 1.2 (0.2s)
Listening: Ripple waves (1s loop, 3 concentric circles)
Stop: Flash + scale back to normal (0.3s)
```

**Word Submission**:
```css
Valid: 
  - Flash green (0.2s)
  - Scale up 1.3 (0.3s)
  - Rotate 360° (0.5s)
  - Settle to normal (0.2s)
  - Confetti burst (1s, fades out)

Invalid:
  - Flash red (0.2s)
  - Shake horizontal (0.4s, ±10px, 4 times)
  - Scale down 0.9 briefly (0.2s)
  - Return to normal (0.2s)
  - Show X mark (draw animation, 0.3s)
```

**Turn Change**:
```css
Previous player: Fade + shrink (0.4s)
New player: Grow + bright highlight (0.5s, bounce)
Arrow indicator: Slide + point to new player (0.4s)
Sound: "Next player!" announcement (optional)
```

**Timer Countdown**:
```css
Normal: Smooth arc rotation
< 10s: Pulse scale 1.0 → 1.1 (0.5s loop)
< 5s: Shake + pulse + color pulse red (0.8s loop)
Expired: Explosion animation + buzzer visual
```

### Exit Animations

**Game End**:
```css
Winner card: Slide down from top (0.6s bounce)
Confetti: Fall from top (2s, physics-based)
Loser indicator: Fade out (0.5s)
Background: Dim slightly (0.4s)
```

---

## Icons & Graphics

### Icon Set (Lucide React)
```javascript
Microphone: <Mic />
Microphone Off: <MicOff />
Volume: <Volume2 />
Mute: <VolumeX />
Play: <Play />
Pause: <Pause />
Restart: <RotateCcw />
Settings: <Settings />
Close: <X />
Check: <Check />
Cross: <X />
Clock: <Clock />
Trophy: <Trophy />
Star: <Star />
```

### Custom Graphics Needed

**Simple SVG Illustrations**:
1. Peppa Pig silhouette (simplified, no licensing issues)
2. George Pig silhouette
3. Muddy puddle (brown oval with highlight)
4. Sun (circle with triangular rays)
5. Cloud (rounded blob shape)
6. Grass blade (simple green curve)
7. Tree (circle on stick)
8. Hills (smooth curves)
9. Fence (vertical rectangles)
10. Confetti pieces (colorful shapes)

**Style Guidelines for Custom Graphics**:
- Simple shapes, no complex details
- Thick outlines (3-4px) in Muddy Brown
- Solid fill colors from palette
- No gradients in graphics (only backgrounds)
- Hand-drawn appearance (slightly imperfect)

---

## Responsive Design

### Breakpoints
```css
Mobile:    < 640px   (1 column, vertical layout)
Tablet:    640-1024px (Adjusted spacing)
Desktop:   > 1024px   (Full layout)
```

### Mobile Adaptations
- Stack player indicators vertically
- Larger microphone button (touch-friendly)
- Smaller word history (limited entries)
- Bottom sheet for settings instead of modal
- Reduce decorative elements
- Simpler animations (performance)

### Tablet Adaptations
- Side-by-side player indicators
- Medium-sized elements
- Moderate decorations
- Full animation set

### Desktop
- Full decorative elements
- Additional background graphics
- More elaborate animations
- Spacious layout

---

## Accessibility Considerations

### Color Contrast
- All text meets WCAG AA standards
- Valid/invalid feedback not solely color-based (icons too)
- High contrast mode option

### Font Sizing
- Minimum 16px for body text
- Scalable with browser zoom
- Clear visual hierarchy

### Interactive Elements
- Minimum touch target: 44px x 44px
- Keyboard navigation support
- Focus indicators (thick colored outline)
- Screen reader labels for all interactive elements

### Alternative Feedback
- Visual feedback for audio events
- Text alternatives for sound effects
- Caption options for voice feedback

---

## Sound Design (Optional)

### Sound Effects
- **Microphone Start**: Gentle "bloop" sound
- **Valid Word**: Happy chime / ding
- **Invalid Word**: Gentle "uh-oh" / soft buzzer
- **Timer Warning**: Gentle tick-tock
- **Timer Expired**: Soft buzzer (not harsh)
- **Turn Change**: Whoosh sound
- **Game Win**: Cheerful fanfare

### Voice Feedback (Text-to-Speech)
- Friendly, clear voice
- Announce player turns: "Player 1's turn!"
- Timer warnings: "10 seconds left"
- Validation: "Good word!" / "Try again!"

### Volume Control
- Master volume slider
- Mute toggle (visual indicator)
- Separate controls for effects vs. voice

---

## Sample Component Styles (CSS/Tailwind)

### Main Game Container
```jsx
<div className="min-h-screen bg-gradient-to-b from-sky-300 to-sky-100 relative overflow-hidden">
  {/* Clouds */}
  <div className="absolute top-10 left-10 w-32 h-20 bg-white rounded-full opacity-80 animate-drift-slow" />
  
  {/* Sun */}
  <div className="absolute top-8 right-12 w-24 h-24 bg-yellow-300 rounded-full shadow-lg animate-spin-slow" />
  
  {/* Main Content */}
  <div className="container mx-auto px-4 py-8">
    {/* Game card */}
  </div>
  
  {/* Grass Footer */}
  <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-green-500 to-green-400">
    {/* Small flowers, muddy puddles */}
  </div>
</div>
```

### Button Component
```jsx
<button className="
  bg-pink-400 hover:bg-pink-500 
  text-white font-bold text-xl
  px-8 py-4 rounded-2xl
  border-4 border-amber-900
  shadow-[0_6px_0_#C74C74]
  hover:shadow-[0_4px_0_#C74C74]
  active:shadow-[0_2px_0_#C74C74]
  active:translate-y-1
  transition-all duration-150
  hover:scale-105
">
  Start Game
</button>
```

### Current Word Display
```jsx
<div className="
  bg-white rounded-3xl 
  border-4 border-blue-400
  shadow-xl
  px-12 py-8
  text-center
  animate-bounce-in
">
  <p className="text-6xl font-bold text-gray-800">
    {currentWord}
  </p>
</div>
```

### Timer Component
```jsx
<div className="relative w-40 h-40">
  {/* Progress ring SVG */}
  <svg className="transform -rotate-90">
    <circle 
      className="text-yellow-200"
      stroke="currentColor"
      strokeWidth="12"
      fill="transparent"
      r="60"
      cx="80"
      cy="80"
    />
    <circle 
      className="text-yellow-400 transition-all duration-1000"
      stroke="currentColor"
      strokeWidth="12"
      strokeDasharray={circumference}
      strokeDashoffset={offset}
      strokeLinecap="round"
      fill="transparent"
      r="60"
      cx="80"
      cy="80"
    />
  </svg>
  
  {/* Timer text */}
  <div className="absolute inset-0 flex items-center justify-center">
    <span className="text-5xl font-bold text-gray-800">
      {timeRemaining}
    </span>
  </div>
</div>
```

---

## Custom Tailwind Configuration

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'peppa-pink': '#FF6B9D',
        'daddy-blue': '#5BB1E8',
        'mummy-orange': '#FF8C42',
        'george-blue': '#4A90E2',
        'muddy-brown': '#8B7355',
        'sky-blue': '#B8E6F5',
        'grass-green': '#9FD356',
        'hill-green': '#7BC043',
      },
      fontFamily: {
        'peppa': ['Fredoka One', 'Comic Sans MS', 'cursive'],
        'body': ['Quicksand', 'Comic Sans MS', 'sans-serif'],
      },
      animation: {
        'bounce-in': 'bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'shake': 'shake 0.4s ease-in-out',
        'pulse-slow': 'pulse 2s ease-in-out infinite',
        'drift-slow': 'drift 60s linear infinite',
        'spin-slow': 'spin 30s linear infinite',
      },
      keyframes: {
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-10px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(10px)' },
        },
        drift: {
          '0%': { transform: 'translateX(-100px)' },
          '100%': { transform: 'translateX(100vw)' },
        },
      },
      boxShadow: {
        'button': '0 6px 0 #C74C74',
        'button-hover': '0 4px 0 #C74C74',
        'button-active': '0 2px 0 #C74C74',
      },
    },
  },
}
```

---

## Google Fonts Import

```html
<!-- In index.html or CSS -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fredoka+One&family=Quicksand:wght@400;500;600;700&display=swap" rel="stylesheet">
```

---

## Implementation Checklist

### Phase 1: Base Theme
- [ ] Set up color palette in Tailwind config
- [ ] Import and configure fonts
- [ ] Create background layout (sky, clouds, grass)
- [ ] Style main game container
- [ ] Apply rounded corners and shadows

### Phase 2: Component Styling
- [ ] Style buttons with Peppa theme
- [ ] Create player indicator components
- [ ] Design timer component
- [ ] Style word display area
- [ ] Create word history list design

### Phase 3: Animations
- [ ] Implement entrance animations
- [ ] Add button hover/press effects
- [ ] Create validation feedback animations
- [ ] Add timer warning animations
- [ ] Implement turn change transitions

### Phase 4: Decorations
- [ ] Add cloud elements with drift animation
- [ ] Add sun with rotation
- [ ] Create grass footer with details
- [ ] Add side decorative elements
- [ ] Create player avatars/icons

### Phase 5: Polish
- [ ] Add confetti effect
- [ ] Create game over modal
- [ ] Implement responsive design
- [ ] Add sound effects (optional)
- [ ] Test all animations and transitions

---

## Reference Images & Inspiration

### Peppa Pig Color Scheme
- Official Peppa Pig colors: Pink (#FF6B9D), Red (#E85D75)
- Backgrounds: Bright sky blue, grass green
- Simple shapes and thick outlines

### Similar UI Styles
- PBS Kids games
- Nick Jr. web games
- Preschool educational apps
- Cartoon Network online games

### Design Principles
- **Simplicity**: Easy to understand at a glance
- **Brightness**: Cheerful, optimistic colors
- **Friendliness**: No sharp edges, welcoming
- **Playfulness**: Bouncy, animated, fun
- **Clarity**: Clear visual hierarchy

---

## Notes for Developers

1. **Keep it performant**: Too many animations can slow down the game
   - Use CSS transforms (GPU-accelerated)
   - Debounce decorative animations
   - Reduce decorations on mobile

2. **Maintain theme consistency**: 
   - All buttons should follow same style
   - Color usage should be predictable
   - Animations should feel cohesive

3. **Don't overdo decorations**:
   - Game content should be focus
   - Decorations enhance, not distract
   - Balance fun with usability

4. **Test with target audience**:
   - Show to children (if appropriate)
   - Test with different age groups
   - Ensure parents/adults find it acceptable

5. **Licensing awareness**:
   - Do NOT use actual Peppa Pig characters/copyrighted imagery
   - Create inspired-by designs, not copies
   - Use similar style, not exact assets

---

## Final Result Description

The game should feel like:
- A sunny day outside
- Playful and encouraging
- Friendly competition
- Educational but fun
- Appropriate for all ages
- Visually appealing without being overwhelming

The player should feel:
- Happy and engaged
- Excited to play their turn
- Encouraged when doing well
- Not discouraged when making mistakes
- Like they're in a fun, safe environment

---

**End of Theme Requirements**

Provide this document to Claude Code along with the main specification to implement the complete Peppa Pig themed voice word game.
