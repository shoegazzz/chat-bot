let humanStage = '0'
let botStage = '0'
let selected = false
let ans = ''

const contributions = {
    first: {
        name: 'Первый',
        term: '1 год',
        bid: '1%',
        minAmount: '5000 руб.',
    },
    managed: {
        name: 'Управляемый',
        term: '5 лет',
        bid: '5%',
        minAmount: '10000 руб.',
    }
}

let replicas = {
    bot: {
        0: { content: 'Задайте вопрос', human: '0' },
        1: {
            ['управляемый']: {
                content: `Вклад ${contributions.managed.name}: срок ${contributions.managed.term}, 
            ставка ${contributions.managed.bid}, минимальная сумма ${contributions.managed.minAmount}  
            Вы согласны открыть вклад?`, human: '1'
            },
            ['первый']: {
                content: `Вклад ${contributions.first.name}: срок ${contributions.first.term}, 
            ставка ${contributions.first.bid}, минимальная сумма ${contributions.first.minAmount}  
            Вы согласны открыть вклад?`, human: '1'
            }
        },
        2: {
            ["не"]: { content: 'Жаль, что условия вам не подошли. Приходите еще', human: null },
            ["да"]: { content: 'Отлично! Вклад открыт', human: null },
            ["согласен"]: { content: 'Отлично! Вклад открыт', human: null }
        }
    },
    human: {
        0: { keys: ['управляемый', 'первый'], bot: '1' },
        1: { keys: ['не', 'да', 'согласен'], bot: '2' }
    }
}

function startChat() {
    while (replicas.human[humanStage].bot) {
        if (selected) {
            ans = prompt(replicas.bot[botStage][selected].content);
            humanStage = replicas.bot[botStage][selected].human;
        } else {
            ans = prompt(replicas.bot[botStage].content);
            humanStage = replicas.bot[botStage].human;
        }
        for (i = 0; i < replicas.human[humanStage].keys.length; i++) {
            if (ans.toLowerCase().includes(replicas.human[humanStage].keys[i])) {
                selected = replicas.human[humanStage].keys[i]
                botStage = replicas.human[humanStage].bot
            }
        }
        if (!selected) {
            alert('Я не понял ваш запрос')
        }
    }
}

startChat()