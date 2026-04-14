const backgroundThemes = ['sunset', 'dog', 'forest', 'space'];

function getTextColor(theme) {
    return theme === 'space' ? '#FFFFFF' : '#000000';
}

function drawBackground(scene) {
    const theme = backgroundThemes[Math.floor(Math.random() * backgroundThemes.length)];

    if (theme === 'sunset') {
        scene.add.rectangle(400, 300, 800, 600, 0xFF9A76);
        scene.add.circle(400, 500, 120, 0xFFD664);
        for (let i = 0; i < 6; i += 1) {
            scene.add.rectangle(160 + i * 120, 430, 80, 260, 0xD86F3D);
        }
    } else if (theme === 'dog') {
        scene.add.rectangle(400, 300, 800, 600, 0x96D4F2);
        scene.add.ellipse(400, 500, 760, 180, 0x7CC879);
        const body = scene.add.ellipse(430, 380, 220, 120, 0xD2A777);
        scene.add.circle(330, 360, 52, 0xD2A777);
        scene.add.rectangle(460, 430, 120, 24, 0x4E3B2F).setAngle(-15);
        scene.add.rectangle(520, 430, 120, 24, 0x4E3B2F).setAngle(15);
        scene.add.circle(300, 340, 12, 0x000000);
        scene.add.circle(360, 340, 12, 0x000000);
        scene.add.ellipse(320, 310, 40, 24, 0x4E3B2F);
        scene.add.circle(380, 320, 10, 0x4E3B2F);
    } else if (theme === 'forest') {
        scene.add.rectangle(400, 300, 800, 600, 0x7EC850);
        scene.add.rectangle(100, 300, 120, 420, 0x5A3E1E);
        scene.add.rectangle(220, 260, 120, 360, 0x5A3E1E);
        scene.add.polygon(520, 170, [0,80, 40,0, 80,80], 0x2E7D32);
        scene.add.polygon(620, 190, [0,90, 45,0, 90,90], 0x2E7D32);
        scene.add.circle(120, 200, 60, 0x2E7D32);
        scene.add.circle(220, 200, 70, 0x2E7D32);
    } else if (theme === 'space') {
        scene.add.rectangle(400, 300, 800, 600, 0x121B45);
        for (let i = 0; i < 30; i += 1) {
            scene.add.circle(Math.random() * 800, Math.random() * 300, 3, 0xFFFFFF);
        }
        scene.add.circle(700, 140, 80, 0x6374D2);
        scene.add.ellipse(680, 120, 140, 60, 0x2C3C72).setAlpha(0.6);
    }
    return theme;
}

function createPlayer(scene, x, y, scale = 1) {
    const player = scene.add.container(x, y);

    const skinColor = 0xF4A460;
    const shirtColor = 0x203060;
    const pantsColor = 0x102040;
    const shoeColor = 0x332211;

    const head = scene.add.circle(0, -42 * scale, 18 * scale, skinColor).setStrokeStyle(2, 0x333333);
    const body = scene.add.ellipse(0, 4 * scale, 42 * scale, 64 * scale, shirtColor).setStrokeStyle(2, 0x333333);
    const neck = scene.add.rectangle(0, -20 * scale, 12 * scale, 14 * scale, skinColor).setStrokeStyle(2, 0x333333);
    const leftArm = scene.add.rectangle(-30 * scale, 4 * scale, 12 * scale, 44 * scale, skinColor).setAngle(-20).setStrokeStyle(2, 0x333333);
    const rightArm = scene.add.rectangle(30 * scale, 4 * scale, 12 * scale, 44 * scale, skinColor).setAngle(20).setStrokeStyle(2, 0x333333);
    const leftSleeve = scene.add.rectangle(-24 * scale, 6 * scale, 20 * scale, 28 * scale, shirtColor).setAngle(-18);
    const rightSleeve = scene.add.rectangle(24 * scale, 6 * scale, 20 * scale, 28 * scale, shirtColor).setAngle(18);
    const leftLeg = scene.add.rectangle(-12 * scale, 44 * scale, 16 * scale, 44 * scale, pantsColor).setAngle(5).setStrokeStyle(2, 0x333333);
    const rightLeg = scene.add.rectangle(12 * scale, 44 * scale, 16 * scale, 44 * scale, pantsColor).setAngle(-5).setStrokeStyle(2, 0x333333);
    const leftShoe = scene.add.ellipse(-12 * scale, 68 * scale, 22 * scale, 10 * scale, shoeColor);
    const rightShoe = scene.add.ellipse(12 * scale, 68 * scale, 22 * scale, 10 * scale, shoeColor);
    const eyeLeft = scene.add.circle(-6 * scale, -48 * scale, 3 * scale, 0x000000);
    const eyeRight = scene.add.circle(6 * scale, -48 * scale, 3 * scale, 0x000000);
    const mouth = scene.add.arc(0, -36 * scale, 8 * scale, 0, Math.PI, false, 0x000000).setStrokeStyle(2, 0x000000);
    const hair = scene.add.rectangle(0, -56 * scale, 36 * scale, 16 * scale, 0x42210B).setStrokeStyle(2, 0x333333);

    player.add([body, neck, leftArm, rightArm, leftSleeve, rightSleeve, leftLeg, rightLeg, leftShoe, rightShoe, head, hair, eyeLeft, eyeRight, mouth]);
    return player;
}

class StartScene extends Phaser.Scene {
    constructor() {
        super({ key: 'StartScene' });
    }

    init(data) {
        this.level = data?.level || 1;
        this.totalScore = data?.totalScore || 0;
        this.coins = data?.coins || 0;
        this.theme = data?.theme || null;
    }

    create() {
        // Background
        this.theme = this.theme || drawBackground(this);
        const textColor = getTextColor(this.theme);

        // Title
        this.add.text(400, 50, '🚽 TOILET FLYER 💩', {
            fontSize: '48px',
            fill: textColor,
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Draw toilet
        this.add.rectangle(400, 180, 100, 120, 0xFFFFFF).setStrokeStyle(3, 0x333333);
        this.add.ellipse(400, 160, 80, 40, 0xFFFFFF).setStrokeStyle(3, 0x333333);

        // Person sitting - more realistic character
        createPlayer(this, 400, 140, 1.1);

        // Instructions
        this.add.text(400, 320, 'PRESS SPACEBAR TO LAUNCH!', {
            fontSize: '36px',
            fill: textColor,
            fontStyle: 'bold'
        }).setOrigin(0.5);

        this.add.text(400, 400, `Level: ${this.level}`, {
            fontSize: '24px',
            fill: textColor
        }).setOrigin(0.5);

        this.add.text(400, 440, `Total Score: ${this.totalScore}`, {
            fontSize: '24px',
            fill: textColor
        }).setOrigin(0.5);

        this.coinsText = this.add.text(400, 480, `Coins: ${this.coins}`, {
            fontSize: '24px',
            fill: textColor
        }).setOrigin(0.5);

        this.upgradeCost = 80;
        this.upgradeInfoText = this.add.text(400, 520, `Press U to upgrade +1 level for ${this.upgradeCost} coins`, {
            fontSize: '18px',
            fill: textColor
        }).setOrigin(0.5);

        this.upgradeStatusText = this.add.text(400, 550, '', {
            fontSize: '18px',
            fill: textColor
        }).setOrigin(0.5);

        const nextLevelLabel = (this.totalScore >= 300 || this.coins >= this.upgradeCost)
            ? 'Ready for next level!'
            : `Next level at 300 score or ${this.upgradeCost} coins`;

        this.nextLevelText = this.add.text(400, 580, nextLevelLabel, {
            fontSize: '18px',
            fill: textColor
        }).setOrigin(0.5);

        this.add.text(400, 590, '💨 Fly as far as you can while pooping! 💨', {
            fontSize: '16px',
            fill: textColor,
            fontStyle: 'italic'
        }).setOrigin(0.5);

        const self = this;
        this.updateStartTexts = function() {
            self.coinsText.setText(`Coins: ${self.coins}`);
            self.nextLevelText.setText((self.totalScore >= 300 || self.coins >= self.upgradeCost)
                ? 'Ready for next level!'
                : `Next level at 300 score or ${self.upgradeCost} coins`);
        };
        this.input.keyboard.on('keydown-U', function() {
            if (self.level >= 10) {
                self.upgradeStatusText.setText('Max level reached.');
                return;
            }
            if (self.coins >= self.upgradeCost) {
                self.coins -= self.upgradeCost;
                self.level += 1;
                self.upgradeStatusText.setText('Upgraded!');
                self.updateStartTexts();
            } else {
                self.upgradeStatusText.setText('Not enough coins.');
            }
        });

        this.input.keyboard.on('keydown-SPACE', function() {
            self.scene.start('FlyingScene', {
                level: self.level,
                totalScore: self.totalScore,
                coins: self.coins
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
        this.coins = data?.coins || 0;
        this.flightScore = 0;
    }

    create() {
        // Sky/background theme
        this.theme = drawBackground(this);
        const textColor = getTextColor(this.theme);

        // Create person with a more realistic body
        this.person = createPlayer(this, 50, 300, 1);
        this.physics.add.existing(this.person);
        this.person.body.setSize(50, 90);
        this.person.body.setOffset(-25, -50);
        
        // Level affects flight: higher level = more distance and control
        const speedBonus = 1 + (this.level * 0.18); // Each level adds 18% more speed
        const heightBonus = 1 + (this.level * 0.08); // Each level adds 8% more upward velocity
        
        this.person.body.setVelocityX(220 * speedBonus);
        this.person.body.setVelocityY(-170 * heightBonus);
        this.person.body.setAccelerationY(Math.max(30, 120 - (this.level * 4))); // Stronger lift at higher levels

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
            fill: textColor,
            backgroundColor: '#FFFFFF',
            padding: { x: 10, y: 5 }
        });

        this.levelText = this.add.text(20, 60, `Level: ${this.level} 🚀`, {
            fontSize: '18px',
            fill: textColor,
            backgroundColor: '#FFFF00',
            padding: { x: 10, y: 5 }
        });

        this.boostAvailable = true;
        this.add.text(650, 20, 'PRESS ENTER TO BOOST', {
            fontSize: '18px',
            fill: textColor,
            backgroundColor: '#FFFFFF',
            padding: { x: 8, y: 5 }
        }).setOrigin(0.5, 0);

        const self = this;
        this.input.keyboard.on('keydown-ENTER', function() {
            if (!self.boostAvailable) {
                return;
            }
            self.boostAvailable = false;
            self.person.body.setVelocityX(self.person.body.velocity.x + 130);
            self.person.body.setVelocityY(self.person.body.velocity.y - 100);
        });

        this.flightTime = 0;
    }

    update() {
        const distanceScore = Math.max(0, Math.floor((this.person.x - 50) / 2));
        const altitudeScore = Math.max(0, Math.floor((600 - this.person.y) / 10));
        this.flightScore = distanceScore + altitudeScore;
        this.scoreText.setText('Score: ' + this.flightScore);

        // Check if person landed or went off screen
        if (this.person.y > 650 || this.person.x > 1200) {
            this.scene.start('GameOverScene', {
                score: this.flightScore,
                level: this.level,
                totalScore: this.totalScore + this.flightScore,
                coins: this.coins
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
        this.coins = data?.coins || 0;
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
            fill: '#FFFFFF'
        }).setOrigin(0.5);

        // Total score
        this.add.text(400, 280, `Total Score: ${this.totalScore}`, {
            fontSize: '28px',
            fill: '#FFFFFF'
        }).setOrigin(0.5);

        const coinsEarned = Math.floor(this.score / 5);
        this.coins += coinsEarned;

        // Currency info
        this.add.text(400, 320, `Coins: ${this.coins} (+${coinsEarned} earned)`, {
            fontSize: '24px',
            fill: '#FFFFFF'
        }).setOrigin(0.5);

        // Level info
        this.add.text(400, 380, `Level: ${this.level}`, {
            fontSize: '20px',
            fill: '#FFFFFF'
        }).setOrigin(0.5);

        // Next level button
        this.add.text(400, 480, 'PRESS SPACEBAR FOR NEXT FLIGHT', {
            fontSize: '20px',
            fill: '#FFFFFF',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        this.add.text(400, 520, `Next level at 300 score or 80 coins`, {
            fontSize: '18px',
            fill: '#FFFFFF'
        }).setOrigin(0.5);

        const nextLevel = (this.totalScore >= 300 || this.coins >= 80) ? Math.min(this.level + 1, 10) : this.level;

        const self = this;
        this.input.keyboard.on('keydown-SPACE', function() {
            self.scene.start('StartScene', {
                level: nextLevel,
                totalScore: self.totalScore,
                coins: self.coins
            });
        });
    }
}

// Game config - must be after class definitions
const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600
    },
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
