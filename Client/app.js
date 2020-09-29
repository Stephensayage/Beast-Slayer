function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      beastHealth: 100,
    };
  },
  computed: {
    beastBarStyles() {
      return { width: this.beastHealth + "%" };
    },
    playerBarStyles() {
      return { width: this.playerHealth + "%" };
    },
  },
  methods: {
    attackBeast() {
      const attackValue = getRandomValue(5, 13);
      this.beastHealth -= attackValue;
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = getRandomValue(8, 18);
      this.playerHealth -= attackValue;
    },
    specialAttackBeast() {},
    healPlayer() {},
  },
});

app.mount("#game");
