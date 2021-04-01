class Damage {

    GradeSuppressionRate() {
        return (this.roleLevel + 100) /
            (this.roleLevel + this.monsterLevel + 200)
    }

    BaseDamage() {
        return this.ATK *
            this.skillRate *
            (1 + this.damageBonus +
                this.otherDamageBonus +
                this.talentDamageBonus) *
            (1 - this.monsterElementalResistance) *
            this.GradeSuppressionRate()
    }

    CriticalDamage() {
        return this.BaseDamage() * (1 + this.criticalDamageRate)
    }

    StatisticalTnjuryExpectation() {
        return this.BaseDamage() * (
            1 + this.criticalDamageRate *
            this.criticalRate
        )
    }

    constructor(data) {
        const {
            ATK,
            skillRate,
            damageBonus,
            otherDamageBonus,
            talentDamageBonus,
            criticalRate,
            criticalDamageRate,
            monsterElementalResistance,
            roleLevel,
            monsterLevel
        } = data

        this.ATK = ATK
        this.skillRate = skillRate
        this.damageBonus = damageBonus
        this.otherDamageBonus = otherDamageBonus
        this.talentDamageBonus = talentDamageBonus
        this.criticalRate = criticalRate
        this.criticalDamageRate = criticalDamageRate
        this.monsterElementalResistance = monsterElementalResistance
        this.roleLevel = roleLevel
        this.monsterLevel = monsterLevel
    }
}

let dm = new Damage({
    ATK: 2000, // 攻击力
    skillRate: 0.5, // 技能倍率
    damageBonus: 0.6, // 元素/物理伤害加成
    otherDamageBonus: 0.35, // 武器/圣遗物伤害加成
    talentDamageBonus: 0, // 角色天赋/命之座伤害加成
    criticalRate: 0.6, // 暴击率
    criticalDamageRate: 2.0, // 暴击伤害
    monsterElementalResistance: 0.1, // 怪物元素抗性
    roleLevel: 90, // 角色等级
    monsterLevel: 90, // 怪物等级
})

console.log(`等级压制比率：${dm.GradeSuppressionRate()}`)
console.log(`基础伤害值：${Math.ceil(dm.BaseDamage())}`)
console.log(`暴击伤害值：${Math.ceil(dm.CriticalDamage())}`)
console.log(`综合伤害值：${Math.ceil(dm.StatisticalTnjuryExpectation())}`)

