class Card {
    // 卡池及概率数据
    static CardData = {
        rate_5: 6,
        rate_4: 51,
        rate_target: 50,
        guarantee_5: 90,
        guarantee_4: 10,

        permanent_5: [
            {
                name: '刻晴',
                rarity: 5,
                type: '角色'
            },
            {
                name: '七七',
                rarity: 5,
                type: '角色'
            },
            {
                name: '莫娜',
                rarity: 5,
                type: '角色'
            },
            {
                name: '迪卢克',
                rarity: 5,
                type: '角色'
            },
            {
                name: '琴',
                rarity: 5,
                type: '角色'
            }
        ],

        permanent_4: [
            {
                name: '常驻武器',
                rarity: 4,
                type: '武器'
            },
            {
                name: '常驻角色',
                rarity: 4,
                type: '角色'
            },
        ],

        permanent_3: [
            {
                name: '常驻武器',
                rarity: 3,
                type: '武器'
            },
        ],

        pool_5: [
            {
                name: '温蒂',
                rarity: 5,
                type: '角色'
            }
        ],

        pool_4: [
            {
                name: '雷泽',
                rarity: 4,
                type: '角色'
            },
            {
                name: '砂糖',
                rarity: 4,
                type: '角色'
            },
            {
                name: '诺艾尔',
                rarity: 4,
                type: '角色'
            }
        ],
    }

    constructor(last_5 = 0, last_4 = 0, LastIsTarget_5 = false, LastIsTarget_4 = false) {
        this.last_5 = last_5
        this.last_4 = last_4
        this.LastIsTarget_5 = LastIsTarget_5
        this.LastIsTarget_4 = LastIsTarget_4
    }

    // 按照官方概率抽卡
    take() {
        this.last_5 += 1
        this.last_4 += 1

        // 保底运算
        if (this.last_5 == Card.CardData.guarantee_5) {
            return this._take_5()
        }

        if (this.last_4 == Card.CardData.guarantee_4) {
            return this._take_4()
        }

        // 正常抽卡
        const rate = Card._Random(1000)

        if (rate < Card.CardData.rate_5) {
            return this._take_5()
        }
        else if (rate < Card.CardData.rate_4 + Card.CardData.rate_5) {
            return this._take_4()
        }
        else {
            return this._take_3()
        }
    }

    // 按照玩家统计概率抽卡
    dy_take() {
        this.last_5 += 1
        this.last_4 += 1

        // 保底运算
        if (this.last_5 == Card.CardData.guarantee_5) {
            return this._take_5()
        }

        if (this.last_4 == Card.CardData.guarantee_4) {
            return this._take_4()
        }

        // 正常抽卡
        const rate = Card._Random(1000)

        if (rate < this._dy_rate_5()) {
            return this._take_5()
        }
        else if (rate < Card.CardData.rate_4 + Card.CardData.rate_5) {
            return this._take_4()
        }
        else {
            return this._take_3()
        }
    }

    // 获取5星物品
    _take_5() {
        // 判断是否应该大保底
        if (!this.LastIsTarget_5) {
            this.LastIsTarget_5 = true
            this.last_5 = 0
            return Card._take_pool_5()
        }

        // 判断是否应该出UP
        if (Card._Random(100) > Card.CardData.rate_target) {
            this.LastIsTarget_5 = false
            this.last_5 = 0
            return Card._take_permanent_5()
        } else {
            this.LastIsTarget_5 = true
            this.last_5 = 0
            return Card._take_pool_5()
        }

    }

    // 获取4星物品
    _take_4() {
        // 判断是否应该大保底
        if (!this.LastIsTarget_4) {
            this.LastIsTarget_4 = true
            this.last_4 = 0
            return Card._take_pool_4()
        }

        // 判断是否应该出UP
        if (Card._Random(100) > Card.CardData.rate_target) {
            this.LastIsTarget_4 = false
            this.last_4 = 0
            return Card._take_permanent_4()
        } else {
            this.LastIsTarget_4 = true
            this.last_4 = 0
            return Card._take_pool_4()
        }
    }

    // 获取3星物品
    _take_3() {
        return Card.CardData.permanent_3[Card._Random(Card.CardData.permanent_3.length)]
    }

    // 五星物品的动态概率
    _dy_rate_5() {
        if (this.last_5 + 1 <= 73) {
            return 6
        }
        else if (this.last_5 + 1 < 90) {
            return 6 + 53 * (this.last_5 + 1 - 73)
        }
        else {
            return 1000
        }
    }

    // 获取5星UP池
    static _take_pool_5() {
        return Card.CardData.pool_5[Card._Random(Card.CardData.pool_5.length)]
    }

    // 获取5星常驻池
    static _take_permanent_5() {
        return Card.CardData.permanent_5[Card._Random(Card.CardData.permanent_5.length)]
    }

    // 获取4星UP池
    static _take_pool_4() {
        return Card.CardData.pool_4[Card._Random(Card.CardData.pool_4.length)]
    }

    // 获取4星常驻池
    static _take_permanent_4() {
        return Card.CardData.permanent_4[Card._Random(Card.CardData.permanent_4.length)]
    }

    // 获取指定域内随机数
    static _Random(min, max) {
        switch (arguments.length) {
            case 1:
                return parseInt(Math.random() * min + 1, 10) - 1

            case 2:
                return parseInt(Math.random() * (max - min + 1) + min, 10)

            default:
                return 0
        }
    }
}

module.exports = Card

/**
 *  描述
 * 
 *  顶层：  take()
 *          dy_take()
 *  中层：  _take_5()
 *          _take_4()
 *          _take_3()
 *  底层：  _take_pool_5()
 *          _take_permanent_5()
 *          _take_pool_4()
 *          _take_permanent_4()
 *  数据：  CardData
 *          _dy_rate_5()
 *  概率：  _Random(min, max)
 */