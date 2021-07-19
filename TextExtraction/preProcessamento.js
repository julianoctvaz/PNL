const fs = require('fs');
let natural = require('natural');
let tokenizer = new natural.WordTokenizer();

const dataset = require('/Users/julianoctvaz/Documents/disciplinas-2020-2/Processamento de Linguagem Natural/database1PLN.json');

async function appendText(path, name, text) {
    try {
        fs.appendFileSync(`./${path}/${name}.txt`, text);
    } catch (err) {
        /* Handle the error */
    }
}

function createFile(array, path) {
    array.forEach(item => {
    let exist = false;
    item.text.forEach(token => {
        item.entities.forEach(ent => {
            const idx = ent.value.indexOf(token);
            if(idx === 0) {
                appendText('./', path,`${token} B-${ent.entity}`+"\n");
                exist = true;
            } else if (idx !== -1) {
                appendText('./', path,`${token} I-${ent.entity}`+"\n");
                exist = true;
            }
        })
        if (!exist) {
            appendText('./', path,`${token} O`+"\n");
        }
        exist = false;
    })
    appendText('./', path,"\n");
})
}

const examples = dataset.rasa_nlu_data.common_examples.map(item => {
    return {
        text: tokenizer.tokenize(item.text),
        entities: item.entities.map(ent => {
            return {
                entity: ent.entity,
                value: tokenizer.tokenize(ent.value)
            }
        })
    }
});

const trainLength = Math.floor(examples.length * 0.6);
const testAndValidLength = (examples.length - trainLength)/2;
let trainArray = [];
let testArray = [];
let validArray = [];

for(let i = 0; i < examples.length; i++) {
    if (i < trainLength) trainArray.push(examples[i]);
    else if(i < trainLength + testAndValidLength) testArray.push(examples[i]);
    else validArray.push(examples[i]);
}

createFile(trainArray, 'train');
createFile(testArray,'test');
createFile(validArray,'valid');

// examples.forEach(item => {
//     let exist = false;
//     item.text.forEach(token => {
//         item.entities.forEach(ent => {
//             const idx = ent.value.indexOf(token);
//             if(idx === 0) {
//                 appendText('./','train',`${token} B-${ent.entity}`+"\n");
//                 exist = true;
//             } else if (idx !== -1) {
//                 appendText('./','train',`${token} I-${ent.entity}`+"\n");
//                 exist = true;
//             }
//         })
//         if (!exist) {
//             appendText('./','train',`${token} O`+"\n");
//         }
//         exist = false;
//     })
//     appendText('./','train',"\n");
// })
