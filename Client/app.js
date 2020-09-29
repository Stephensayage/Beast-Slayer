function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      beastHealth: 100,
      currentRound: 0,
      specialCooldown: 0,
      healCoolDown: 0,
      winner: null,
    };
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.beastHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "beast";
      }
    },
    beastHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "player";
      }
    },
  },
  computed: {
    beastBarStyles() {
      return { width: this.beastHealth + "%" };
    },
    playerBarStyles() {
      return { width: this.playerHealth + "%" };
    },
    useSpecial() {
      return this.specialCooldown !== 0;
    },
    useHeal() {
      return this.healCoolDown !== 0;
    },
  },
  methods: {
    attackBeast() {
      this.currentRound++;
      if (this.healCoolDown > 0) {
        this.healCoolDown--;
      }
      if (this.specialCooldown > 0) {
        this.specialCooldown--;
      }
      const attackValue = getRandomValue(5, 13);
      this.beastHealth -= attackValue;
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = getRandomValue(8, 18);
      this.playerHealth -= attackValue;
    },
    specialAttackBeast() {
      this.currentRound++;
      this.specialCooldown = 3;
      const attackValue = getRandomValue(10, 22);
      this.beastHealth -= attackValue;
      this.attackPlayer();
    },
    healPlayer() {
      this.currentRound++;
      this.healCoolDown = 2;
      const healValue = getRandomValue(4, 8);
      if (this.playerHealth === 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
    },
    surrender() {
      this.currentRound = 0;
      this.healCoolDown = 0;
      this.specialCooldown = 0;
      this.playerHealth = 100;
      this.beastHealth = 100;
    },
    playAgain() {
      this.winner = null;
      this.surrender();
    },
  },
});

app.mount("#game");
