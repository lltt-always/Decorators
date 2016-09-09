window.onload = () => {

    /*添加防御值(改变类的方法的传参)*/
    function decorateArmour(target, key, descriptor) {
        console.log(target);
        console.log(key);
        console.log(descriptor);

        let method = descriptor.value;
        let moreDef = 100;
        descriptor.value = (...args) => {
            args[0] += moreDef;
            let ret = method.apply(target, args);
            return ret;
        }
    }

    /*对人物能力进行评估(添加类的方法内的操作)*/
    function evaluation(target, key, descriptor) {
        let method = descriptor.value;
        descriptor.value = (...args) => {
            let ret = method.apply(target, args);
            let evaluation = args[0] + args[1] + args[2];
            console.log(`综合评价====>${evaluation}`);
            return ret
        }
    }

    /*对Man类添加属性，以该方式添加的属性不能被继承*/
    function addAttribute(target) {
        target.add_attribute = '附加属性：幸运星';
    }

    /*增加飞行技能，在Man类上添加canFly方法，可以被继承*/
    function addFly(canFly) {
        return (target) => {
            target.prototype.canFly = () => {
                let skill = canFly ? "附加技能：飞行" : "";
                return skill;
            }
            return target;
        }
    }

    @addFly(true)
    @addAttribute
    class Man {

        constructor(def = 5, atk = 5, hp = 5) {
            this.init(def, atk, hp);
        }

        @decorateArmour
        @evaluation
        init(def, atk, hp) {
            this.def = def;
            this.atk = atk;
            this.hp = hp;
        }

        toString() {
            return `防御力：${this.def}；攻击力：${this.atk}；生命值：${this.hp}。`
        }
    }

    let IronMan = new Man();
    console.log(`当前状态====>${IronMan}`);
    console.log(IronMan.canFly());
    console.log(Man.prototype);
    console.log(Man.add_attribute);
}