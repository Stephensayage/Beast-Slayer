function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
const beastImgs = [
  "https://www.flaticon.com/svg/static/icons/svg/2463/2463654.svg",
  "https://www.flaticon.com/svg/static/icons/svg/2463/2463666.svg",
  "https://www.flaticon.com/svg/static/icons/svg/2463/2463611.svg",
];
// function randomBeast(beastImgs) {
//   return beastImgs[Math.floor(Math.random() * beastImgs.length)];
// }

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      beastHealth: 100,
      currentRound: 0,
      specialCooldown: 0,
      healCoolDown: 0,
      winner: null,
      logMessages: [],
      beastImgs: [
        "https://www.flaticon.com/svg/static/icons/svg/2463/2463654.svg",
        "https://www.flaticon.com/svg/static/icons/svg/2463/2463666.svg",
        "https://www.flaticon.com/svg/static/icons/svg/2463/2463611.svg",
      ],
    };
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.beastHealth <= 0) {
        this.playerHealth = 0;
        this.beastHealth = 0;
        this.winner = "draw";
      } else if (value <= 0) {
        this.playerHealth = 0;
        this.winner = "beast";
      }
    },
    beastHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.playerHealth = 0;
        this.beastHealth = 0;
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "player";
        this.beastHealth = 0;
      }
    },
  },
  computed: {
    beastBarStyles() {
      if (this.beastHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.beastHealth + "%" };
    },
    playerBarStyles() {
      if (this.playerHealth < 0) {
        return { width: "0%" };
      }
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
      this.logMessage("The Player", "attack", attackValue);
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = getRandomValue(8, 18);
      this.playerHealth -= attackValue;
      this.logMessage("The Beast", "attacked", attackValue);
    },
    specialAttackBeast() {
      this.currentRound++;
      this.specialCooldown = 3;
      const attackValue = getRandomValue(10, 22);
      this.beastHealth -= attackValue;
      this.logMessage("The Player", "special-attacked", attackValue);
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
      this.logMessage("The Player", "healed", healValue);
    },
    surrender() {
      this.playerHealth = 0;
    },
    playAgain() {
      this.winner = null;
      this.currentRound = 0;
      this.healCoolDown = 0;
      this.specialCooldown = 0;
      this.playerHealth = 100;
      this.beastHealth = 100;
      this.logMessages = [];
    },
    logMessage(user, action, value) {
      this.logMessages.unshift({
        actionBy: user,
        actionType: action,
        actionValue: value,
      });
    },
    getRandomBeast(beastImgs) {
      return beastImgs[Math.floor(Math.random() * beastImgs.length)];
    },
  },
});

app.mount("#game");
