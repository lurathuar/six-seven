# 🚽 Toilet Flyer 💩

A hilarious web game where you launch a person from a toilet and they fly across the sky while pooping!

## Gameplay

### How to Play:

1. **Timing Phase (Toilet Scene)**
   - Watch the power bar below the toilet
   - The bar fills up and down continuously
   - Click when it turns **GREEN** for the best launch
   - **Red** = weak launch, **Yellow** = better, **GREEN** = maximum power!

2. **Flying Phase**
   - Your character launches with the power you built up
   - They fly across the sky while pooping particles trail behind
   - Your score increases based on how long you fly
   - Bonus multiplier based on your launch efficiency and level

3. **Leveling System**
   - Each successful flight adds to your total score
   - Get 500+ total points to level up
   - Higher levels give better bonuses for perfect launches

## Game Features

- ✅ 3 main scenes: Toilet, Flying, Game Over
- ✅ Power bar with color-coded feedback (Red → Yellow → Green)
- ✅ Physics-based flight mechanics
- ✅ Particle effects for poop trail
- ✅ Score tracking and level progression
- ✅ Multiple difficulty levels (1-10)
- ✅ Bonus multipliers for perfect timing

## How to Run

### Option 1: Using Python (built-in)
```bash
python -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

### Option 2: Using Node.js
```bash
npx http-server
```

### Option 3: Using VS Code Live Server
- Install Live Server extension (ritwickdey.LiveServer)
- Right-click on index.html and select "Open with Live Server"

## Project Structure

```
k:/mangud/
├── index.html       # Main HTML file
├── game.js          # Game logic with Phaser 3
├── package.json     # Project metadata
└── README.md        # This file
```

## Technologies Used

- **Framework**: Phaser 3 (https://phaser.io/)
- **Language**: JavaScript (ES6)
- **Physics**: Arcade Physics engine
- **Rendering**: HTML5 Canvas

## Game Mechanics

### Power Bar System
- Bar oscillates smoothly from 0-100%
- Color coding: Red (0-33%) → Yellow (34-66%) → Green (67-100%)
- Perfect zone is 75-85% (brightest green)
- Efficiency multiplier based on accuracy

### Scoring
- Base score: 1 point per 30ms of flight time
- Multiplier applied based on launch efficiency
- Level bonus stacks on perfect launches
- Total score tracks all flights combined

### Level Progression
- Starts at Level 1
- Unlock higher levels with 500+ total score
- Max level: 10
- Higher levels give better bonuses for perfect launches

## Future Enhancements

- Power-ups during flight (shields, speed boost, etc.)
- Different character skins
- Obstacle avoidance
- Two-player mode
- Sound effects and music
- Mobile touchscreen support

---

**Enjoy your flights!** 🌟💨
