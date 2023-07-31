class Transform {
    transform (vector) {
        console.log(`[${ this.name }] transform to `, vector);
    }
}

class Rotate {
    rotate (quaternion) {
        console.log(`[${ this.name }] rotate to `, quaternion);
    }
}

class Rigid {
    rigid () {
        console.log(`[${ this.name }] rigid`);
    }
}

function extendWithProxies(...classes) {

    return classes.reduce((acc, cls) => {
        Object.getOwnPropertyNames(cls.prototype).forEach(name => {
            if (name !== 'constructor' && name !== '__proto__') {
                let originalMethod = cls.prototype[name];
                acc.prototype[name] = new Proxy(originalMethod, {
                    apply: function(target, thisArg, argumentsList) {
                        return target.apply(acc.prototype, argumentsList);
                    }
                });
            }
        });
    }, class {});
}

function ext(...classes) {
    return classes.reduce((base, mixin) => {
        Object.getOwnPropertyNames(mixin.prototype).forEach(name => {
            if (name !== 'constructor') {
                base.prototype[name] = mixin.prototype[name];
            }
        });
        return base;
    }, class {})
}

class Entity extends ext(Rigid, Rotate, Transform) {
    constructor (name) {
        super();
        this.name = name;
    }
}

const entity = new Entity('Vanya');
entity.rotate('Rotate');
entity.rigid('Rotate');
entity.transform('1, 1, 1');
