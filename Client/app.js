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
    };
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
      this.playerHealth += healValue;
    },
  },
});

app.mount("#game");
