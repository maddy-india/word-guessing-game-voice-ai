# Voice Word Chain Game - Project Specification

## Overview
A two-player voice-controlled word game where players take turns saying words that begin with the last letter of the previous word. The game validates words in real-time and provides visual feedback.

---

## Game Rules

### Core Gameplay
1. **Turn-Based**: Two players alternate turns
2. **Word Chain Rule**: Each word must start with the last letter of the previous player's word
   - Example: "apple" → "elephant" → "tiger" → "rocket"
3. **Timer**: Each player has a configurable time limit per turn (set at game start)
4. **No Repeats**: Words cannot be reused within the same game session
5. **Valid Words Only**: Must be valid English words (no proper nouns, no numbers, no person names)

### Win/Loss Conditions
- Player loses if:
  - Timer runs out before saying a valid word
  - Says an invalid word
  - Says a repeated word
  - Says a word that doesn't follow the chain rule

---

## Version 1 (MVP) - Local Two-Player

### Required Features

#### 1. Game Setup Screen
- Input fields for Player 1 and Player 2 names
- Timer configuration (dropdown or input: 10s, 15s, 30s, 60s, custom)
- Start Game button

#### 2. Game Board
- **Current Turn Indicator**: Clearly show whose turn it is
- **Timer Display**: Live countdown showing remaining time
- **Word History**: Display all words played in chronological order
- **Current Word Display**: Show the word as it's being spoken (real-time transcription)
- **Validation Feedback**: 
  - Green flash + checkmark for valid word
  - Red flash + X for invalid word
  - Show reason for invalid (e.g., "Not a valid word", "Word already used", "Doesn't start with 'E'")

#### 3. Voice Recognition
- Push-to-talk or auto-listen when turn starts
- Real-time word transcription display
- Visual indicator when listening (microphone icon animation)
- Ability to cancel/retry if misheard

#### 4. Word Validation System
- Check if word is valid English word
- Detect and reject proper nouns (names, places)
- Detect and reject numbers
- Verify word starts with correct letter
- Check against used words list

#### 5. Game Controls
- Restart game button
- Pause/Resume functionality
- Mute/Unmute voice feedback (optional text-to-speech announcements)

---

## Technical Stack

### Frontend Framework
- **React** (v18+) with functional components and hooks
- **Tailwind CSS** for styling and animations
- **Vite** for build tooling (faster than Create React App)

### Voice Recognition
- **Web Speech API**
  - `SpeechRecognition` / `webkitSpeechRecognition`
  - Browser-native, no API keys needed
  - Supported in Chrome, Edge, Safari

### Word Validation APIs

#### Primary: Datamuse API
- **Endpoint**: `https://api.datamuse.com/words?sp={word}&md=f`
- Free, no API key required
- Returns word frequency and parts of speech
- Can filter proper nouns

#### Fallback: Free Dictionary API
- **Endpoint**: `https://api.dictionaryapi.dev/api/v2/entries/en/{word}`
- Free, no API key required
- Provides definitions and word type

#### Additional Validation
- Regex for number detection: `/^\d+$|.*\d.*/`
- Maintain a blacklist of common proper nouns
- First letter capitalization check

### State Management
- **React Context API** for global game state
- **Local State** (useState) for component-specific state

### Timer Implementation
- JavaScript `setInterval` with React hooks
- `useEffect` for side effects
- Audio cue when time is running low (optional)

---

## Architecture (Extensible for v2 Multiplayer)

### Design Principles
1. **Separation of Concerns**: Game logic separate from UI
2. **State Centralization**: All game state in one place (easy to sync)
3. **API Abstraction**: Validation logic in separate service layer
4. **Event-Driven**: Use event system for game actions (easy to broadcast)

### Recommended File Structure

```
/src
  /components
    /setup
      - GameSetup.jsx          # Initial configuration screen
      - PlayerInput.jsx        # Player name inputs
      - TimerConfig.jsx        # Timer settings
    
    /game
      - GameBoard.jsx          # Main game container
      - TurnIndicator.jsx      # Shows current player
      - Timer.jsx              # Countdown display
      - WordDisplay.jsx        # Current word + validation feedback
      - WordHistory.jsx        # List of all played words
      - VoiceInput.jsx         # Microphone controls
      - GameControls.jsx       # Restart, pause, etc.
    
    /ui
      - Button.jsx             # Reusable button component
      - Card.jsx               # Container component
      - FlashAnimation.jsx     # Green/red flash effect
  
  /hooks
    - useVoiceRecognition.js  # Speech API wrapper
    - useTimer.js             # Countdown timer logic
    - useGameState.js         # Game state management
    - useWordValidation.js    # Word validation logic
  
  /services
    - wordValidator.js        # API calls to validation services
    - gameEngine.js           # Core game logic (rules, scoring)
    - storageService.js       # Local storage for game stats (v2: API calls)
  
  /context
    - GameContext.jsx         # Global game state provider
  
  /utils
    - constants.js            # Game constants (timer options, etc.)
    - helpers.js              # Utility functions
    - validation.js           # Client-side validation helpers
  
  /types (optional if using TypeScript)
    - game.types.ts           # Type definitions
  
  - App.jsx                   # Root component
  - main.jsx                  # Entry point
```

### Key Abstractions for Network Extensibility

#### 1. Game State Object (Centralized)
```javascript
{
  gameId: string,
  players: [
    { id: string, name: string, score: number },
    { id: string, name: string, score: number }
  ],
  currentTurn: number (player index),
  usedWords: string[],
  wordHistory: [
    { word: string, playerId: string, isValid: boolean, timestamp: number }
  ],
  timerDuration: number,
  timeRemaining: number,
  gameStatus: 'setup' | 'playing' | 'paused' | 'finished',
  winner: string | null
}
```

#### 2. Action-Based State Updates
```javascript
// All state changes through actions (easy to send over network)
dispatch({ 
  type: 'WORD_SUBMITTED', 
  payload: { word: 'apple', playerId: 'player1' } 
})

dispatch({ 
  type: 'TIMER_TICK', 
  payload: { timeRemaining: 25 } 
})

dispatch({ 
  type: 'TURN_END', 
  payload: { success: true } 
})
```

#### 3. Service Layer Pattern
```javascript
// v1: Local implementation
// v2: Replace with WebSocket/HTTP calls

class GameService {
  submitWord(gameId, word) { }
  validateWord(word, previousWord) { }
  endTurn(gameId, playerId) { }
  getGameState(gameId) { }
}
```

---

## Version 2 (Future) - Network Multiplayer

### Additional Requirements

#### Backend
- **WebSocket Server** (Socket.io or native WebSockets)
  - Real-time turn synchronization
  - Broadcast game state changes
  - Handle disconnections/reconnections

- **REST API** (Express.js/Node.js or similar)
  - Game room creation
  - Player matchmaking
  - Game history storage
  - Leaderboards

- **Database** (MongoDB/PostgreSQL)
  - Store game sessions
  - Player profiles
  - Word history across all games
  - Statistics and analytics

#### Frontend Changes
- Lobby system (create/join game rooms)
- Player matchmaking
- Network state indicators (connection status)
- Spectator mode
- Chat functionality (optional)
- Reconnection handling

#### Architecture Updates
- Replace local state updates with WebSocket events
- Server-authoritative validation (prevent cheating)
- Optimistic UI updates with server confirmation
- Error handling for network issues

---

## Development Phases

### Phase 1: Core Game Logic (No Voice)
- Implement game state management
- Build UI components
- Text input for testing
- Word validation logic
- Timer functionality

### Phase 2: Voice Integration
- Add speech recognition
- Real-time transcription display
- Voice feedback (text-to-speech)

### Phase 3: Polish & UX
- Animations and visual feedback
- Sound effects
- Game statistics tracking
- Responsive design

### Phase 4: Testing & Optimization
- Cross-browser testing (Chrome, Safari, Edge)
- Performance optimization
- Accessibility improvements
- Error handling edge cases

---

## Technical Considerations

### Browser Compatibility
- Web Speech API works in Chrome, Edge, Safari (with webkit prefix)
- Provide fallback UI for unsupported browsers
- Test microphone permissions handling

### Performance
- Debounce API calls for word validation
- Cache validated words locally
- Optimize re-renders with React.memo

### Accessibility
- Keyboard shortcuts for all actions
- Screen reader support
- Visual alternatives to audio feedback
- High contrast mode

### Security (v1)
- Input sanitization
- Rate limiting on API calls (if needed)

### Security (v2)
- Authentication (OAuth, JWT)
- Anti-cheat mechanisms (server validation)
- Rate limiting
- DDoS protection

---

## API Integration Details

### Datamuse API Example
```
GET https://api.datamuse.com/words?sp=apple&md=f

Response:
[
  {
    "word": "apple",
    "score": 1000,
    "tags": ["f:12.345678"]  // frequency
  }
]

// Empty array = word doesn't exist
```

### Free Dictionary API Example
```
GET https://api.dictionaryapi.dev/api/v2/entries/en/apple

Response:
{
  "word": "apple",
  "meanings": [...],
  ...
}

// 404 = word doesn't exist
```

### Validation Logic Flow
1. Check if word is empty or contains numbers → INVALID
2. Check if word is in usedWords array → INVALID (repeated)
3. Check if first letter matches last letter of previous word → INVALID
4. Call Datamuse API → If exists and not proper noun → VALID
5. If Datamuse fails, call Free Dictionary API → If exists → VALID
6. Otherwise → INVALID

---

## UI/UX Specifications

### Color Scheme
- **Primary**: Blue/Purple gradient for main UI
- **Success**: Green (#10B981) for valid words
- **Error**: Red (#EF4444) for invalid words
- **Neutral**: Gray for inactive states
- **Warning**: Yellow/Orange for timer low warning

### Animations
- **Valid Word**: Green flash (300ms) → fade out
- **Invalid Word**: Red flash (300ms) → shake animation
- **Timer Warning**: Pulse animation when < 5 seconds
- **Turn Change**: Smooth transition with slide effect
- **Microphone Active**: Ripple animation

### Typography
- **Headings**: Bold, large (2xl-4xl)
- **Current Word**: Extra large (4xl-6xl), centered
- **Timer**: Large, prominent
- **Word History**: Smaller, scrollable list

---

## Testing Checklist

### Functional Tests
- [ ] Game starts with correct initial state
- [ ] Timer counts down accurately
- [ ] Valid words are accepted
- [ ] Invalid words are rejected with correct reason
- [ ] Repeated words are detected
- [ ] Turn switches correctly after valid word
- [ ] Game ends when timer reaches 0
- [ ] Restart clears all state correctly

### Voice Tests
- [ ] Microphone permission requested
- [ ] Speech recognized accurately
- [ ] Handles background noise
- [ ] Works with different accents
- [ ] Handles homophones correctly (e.g., "there" vs "their")

### Edge Cases
- [ ] Player says nothing (timer runs out)
- [ ] Very long words (> 15 characters)
- [ ] Words with special characters
- [ ] Single letter words ("a", "I")
- [ ] Hyphenated words
- [ ] Multiple words spoken (take first word)

---

## Performance Targets

- First load: < 2 seconds
- Word validation: < 500ms
- Speech recognition latency: < 1 second
- Timer accuracy: ± 50ms
- Smooth animations: 60 FPS

---

## Dependencies to Install

```bash
npm create vite@latest voice-word-game -- --template react
cd voice-word-game
npm install
npm install tailwindcss postcss autoprefixer
npm install lucide-react  # For icons
```

### Optional Dependencies
```bash
npm install zustand  # Alternative to Context API for state
npm install react-toastify  # For notifications
npm install framer-motion  # For advanced animations
```

---

## Configuration Files Needed

### tailwind.config.js
- Configure custom colors for game states
- Add custom animations (flash, shake, pulse)

### .env (for v2)
```
VITE_API_URL=http://localhost:3000
VITE_WS_URL=ws://localhost:3000
```

---

## Next Steps for Implementation

1. **Initial Setup**: Create Vite + React project with Tailwind
2. **Build UI Components**: Start with static components
3. **Implement Game Logic**: Core rules without voice
4. **Add Voice Recognition**: Integrate Web Speech API
5. **Word Validation**: Connect to APIs
6. **Polish**: Animations, sounds, error handling
7. **Testing**: Comprehensive testing across browsers
8. **Documentation**: User guide and developer docs

---

## Success Criteria

### v1 MVP is complete when:
- ✅ Two players can play locally on same device
- ✅ Voice recognition works accurately
- ✅ Words are validated correctly against all rules
- ✅ Timer works precisely
- ✅ Visual feedback is clear and responsive
- ✅ Game is playable end-to-end without crashes
- ✅ Works in Chrome, Edge, and Safari

### v2 Multiplayer ready when:
- ✅ Code architecture supports network state sync
- ✅ Service layer abstracts game logic
- ✅ State updates are action-based
- ✅ Minimal refactoring needed to add WebSocket layer

---

## Additional Notes

- Start simple, iterate quickly
- Test voice recognition with different users
- Consider adding practice mode (solo play)
- Future: Add difficulty levels (word length requirements, topic restrictions)
- Future: Tournament mode with multiple rounds
- Future: Word definitions display after each valid word (educational)

---

## Questions to Consider During Development

1. How to handle ambiguous speech recognition? (confirmation step?)
2. Should there be a minimum word length? (3+ letters?)
3. Allow acronyms? (NASA, FBI)
4. How to handle contractions? (don't, won't)
5. Penalty for invalid words vs timer expiry?
6. Best UX for correcting misheard words?

---

**End of Specification**

This document should be provided to Claude Code to build the application. Claude Code will implement all features according to this spec with extensibility for network multiplayer in v2.
