import { createApp } from './vendor/vue.esm-browser.js';

const app = createApp({
    data() {
        return {
            firstValue: 0,
            secondValue: 0,
            operator: null,
        }
    },
    computed: {
        calculateResult() {
            let result = 0;
            if (this.operator) {
                switch (this.operator) {
                    case 'sum':
                        result = this.firstValue + this.secondValue;
                        break;
                    case 'subtract':
                        result = this.firstValue - this.secondValue;
                        break;
                    case 'multiply':
                        result = this.firstValue * this.secondValue;
                        break;
                    case 'divide':
                        result = this.firstValue / this.secondValue;
                        break;
                    default:
                        result = 0;
                        break;
                }
            }
            return result; 
        }
    }
})

const vm = app.mount('#app');
