function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      curreutRound: 0,
      winner: null,
      logMessage: [],
    };
  },
  methods: {
    startGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.curreutRound = 0;
      this.winner = null;
      logMessage = [];
    },
    attackMonster() {
      this.curreutRound++;
      const attackValue = getRandomValue(5, 12);
      this.monsterHealth -= attackValue;
      this.addLogMessage('player', 'attack', attackValue);
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = getRandomValue(8, 12);
      this.playerHealth -= attackValue;
      this.addLogMessage('monster', 'attack', attackValue);
    },
    specialAttackMonster() {
      this.curreutRound++;
      const attackValue = getRandomValue(10, 25);
      this.monsterHealth -= attackValue;
      this.addLogMessage('player', 'special-attack', attackValue);
      this.attackPlayer();
    },
    healPlayer() {
      this.curreutRound++;
      const healValue = getRandomValue(8, 20);
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.addLogMessage('player', 'heal', healValue);
      this.attackPlayer();
    },
    surrender() {
      this.winner = 'monster';
    },
    addLogMessage(who, what, value) {
      this.logMessage.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = 'draw';
      } else if (value <= 0) {
        this.winner = 'monster';
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = 'draw';
      } else if (value <= 0) {
        this.winner = 'player';
      }
    },
  },
  computed: {
    monsterBarStyles() {
      if (this.monsterHealth < 0) {
        return { width: '0%' };
      }
      return { width: this.monsterHealth + '%' };
    },
    playerBarStyles() {
      if (this.playerHealth < 0) {
        return { width: '0%' };
      }
      return { width: this.playerHealth + '%' };
    },
    mayUseSpecialAttack() {
      return this.curreutRound % 3 !== 0;
    },
  },
});

app.mount('#game');
