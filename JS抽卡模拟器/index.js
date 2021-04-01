const Card = require('./src/Card')

const cd = new Card(
    last_5 = 0, // 距离上一个5星的抽数
    last_4 = 0, // 距离上一个4星的抽数
    LastIsTarget_5 = false, // 上一个5星是否是UP
    LastIsTarget_4 = true, // 上一个4星是否是UP
);
let all = 100000 // 总共抽多少发

let all_5 = 0
let all_4 = 0

for (let i = 0; i < all; i++) {
    const target = cd.dy_take()

    if (target.rarity == 5) all_5 += 1
    if (target.rarity == 4) all_4 += 1

    if (target.rarity == 5) {
        console.log(`rarity:${target.rarity},state:${cd.last_4}:${cd.last_5},target:${target.name}`)
    }
}

let all_3 = all - all_4 - all_5

console.log(`共参与了：${all}次运算，其中`)
console.log(`各星级物品总数：3:${all_3},4:${all_4},5:${all_5}`)
console.log(`各星级物品占比：3:${all_3 / all},4:${all_4 / all},5:${all_5 / all}`)