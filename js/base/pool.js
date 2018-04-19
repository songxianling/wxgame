const __ = {
    poolDic: Symbol('poolDic')
}

export default class Pool {
    constructor() {
        this[__.poolDic] = {}
    }

    getPoolBySign(name) {
        return this[__.poolDic][name] || (this[__.poolDic][name] = [])
    }

    getItemByClass(name, className) {
        let pool = this.getPoolBySign(name)
        let result = (pool.length ? pool.shift() : new className())
        return result
    }

    recover(name,instance){
        this.getPoolBySign(name).push(instance)
    }
}