class StartScene extends Phaser.Scene {
    constructor() {
        super({ key: 'StartScene' });
    }

    init(data) {
        this.level = data?.level || 1;
        this.totalScore = data?.totalScore || 0;
    }

    create() {
        // Background
        this.add.rectangle(400, 300, 800, 600, 0xE8F4F8);

        // Title
        this.add.text(400, 50, '🚽 TOILET FLYER 💩', {
            fontSize: '48px',
            fill: '#333',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Draw toilet
        this.add.rectangle(400, 180, 100, 120, 0xFFFFFF).setStrokeStyle(3, 0x333333);
        this.add.ellipse(400, 160, 80, 40, 0xFFFFFF).setStrokeStyle(3, 0x333333);
        
        // Person sitting
        this.add.circle(400, 130, 20, 0xF4A460);
        this.add.rectangle(400, 150, 50, 40, 0xEE82EE);

        // Instructions
        this.add.text(400, 320, 'PRESS SPACEBAR TO LAUNCH!', {
            fontSize: '36px',
            fill: '#FF0000',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        this.add.text(400, 400, `Level: ${this.level}`, {
            fontSize: '24px',
            fill: '#666'
        }).setOrigin(0.5);

        this.add.text(400, 440, `Total Score: ${this.totalScore}`, {
            fontSize: '24px',
            fill: '#666'
        }).setOrigin(0.5);

        this.add.text(400, 520, '💨 Fly as far as you can while pooping! 💨', {
            fontSize: '16px',
            fill: '#333',
            fontStyle: 'italic'
        }).setOrigin(0.5);

        // Add spacebar listener
        const self = this;
        this.input.keyboard.on('keydown-SPACE', function() {
            self.scene.start('FlyingScene', {
                level: self.level,
                totalScore: self.totalScore
            });
        });
    }
}


class FlyingScene extends Phaser.Scene {
    constructor() {
        super({ key: 'FlyingScene' });
    }

    init(data) {
        this.level = data?.level || 1;
        this.totalScore = data?.totalScore || 0;
        this.flightScore = 0;
    }

    create() {
        // Sky background
        this.add.rectangle(400, 300, 800, 600, 0x87CEEB);

        // Create person
        this.person = this.add.circle(50, 300, 20, 0xF4A460);
        this.physics.add.existing(this.person);
        
        // Level affects flight: higher level = faster and higher
        const speedBonus = 1 + (this.level * 0.2); // Each level adds 20% more speed
        const heightBonus = 1 + (this.level * 0.1); // Each level adds 10% more upward velocity
        
        this.person.body.setVelocityX(300 * speedBonus);
        this.person.body.setVelocityY(-150 * heightBonus);
        this.person.body.setAccelerationY(200 - (this.level * 5)); // Higher levels have less gravity

        // Poop particles
        this.poopEmitter = this.add.particles(0xA0522D);
        this.poopEmitter.createEmitter({
            speed: { min: -50, max: 50 },
            angle: { min: 200, max: 340 },
            scale: { start: 0.5, end: 0 },
            lifespan: 2000,
            gravityY: 200,
            follow: this.person
        });

        // Score display with level info
        this.scoreText = this.add.text(20, 20, 'Score: 0', {
            fontSize: '24px',
            fill: '#000',
            backgroundColor: '#FFFFFF',
            padding: { x: 10, y: 5 }
        });

        this.levelText = this.add.text(20, 60, `Level: ${this.level} 🚀`, {
            fontSize: '18px',
            fill: '#000',
            backgroundColor: '#FFFF00',
            padding: { x: 10, y: 5 }
        });

        this.flightTime = 0;
    }

    update() {
        this.flightTime += 1;
        this.flightScore = Math.floor(this.flightTime / 2);
        this.scoreText.setText('Score: ' + this.flightScore);

        // Check if person landed or went off screen
        if (this.person.y > 600 || this.person.x > 850) {
            this.scene.start('GameOverScene', {
                score: this.flightScore,
                level: this.level,
                totalScore: this.totalScore + this.flightScore
            });
        }
    }
}


class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    init(data) {
        this.score = data?.score || 0;
        this.level = data?.level || 1;
        this.totalScore = data?.totalScore || 0;
    }

    create() {
        // Background
        this.add.rectangle(400, 300, 800, 600, 0x2C3E50);

        // Landing message
        this.add.text(400, 100, '💩 LANDED! 💩', {
            fontSize: '48px',
            fill: '#FFFFFF'
        }).setOrigin(0.5);

        // Score display
        this.add.text(400, 180, `Flight Score: ${this.score}`, {
            fontSize: '32px',
            fill: '#FFD700'
        }).setOrigin(0.5);

        // Total score
        this.add.text(400, 280, `Total Score: ${this.totalScore}`, {
            fontSize: '28px',
            fill: '#FF6B9D'
        }).setOrigin(0.5);

        // Level info
        this.add.text(400, 350, `Level: ${this.level}`, {
            fontSize: '20px',
            fill: '#FFFFFF'
        }).setOrigin(0.5);

        // Next level button
        this.add.text(400, 480, 'PRESS SPACEBAR FOR NEXT FLIGHT', {
            fontSize: '20px',
            fill: '#00FF00',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        const nextLevel = this.totalScore >= 500 ? Math.min(this.level + 1, 10) : this.level;

        const self = this;
        this.input.keyboard.on('keydown-SPACE', function() {
            self.scene.start('StartScene', {
                level: nextLevel,
                totalScore: self.totalScore
            });
        });
    }
}

// Game config - must be after class definitions
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [StartScene, FlyingScene, GameOverScene],
    parent: 'game'
};

const game = new Phaser.Game(config);
