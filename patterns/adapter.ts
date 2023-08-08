interface IRepository {
    findOne: (filter: string) => void;
}

class Sequelize implements IRepository {
    constructor (private readonly db: string) {
    }

    findOne (filter: string) {
        console.log('[Sequelize] Return data by', filter, 'from', this.db);
    }
}

class MyOrm {
    getOne (db: string, filter: string) {
        console.log('[MyOrm] Return data by', filter, 'from', db);
    }
}

class MyOrmAdapter implements IRepository {
    private readonly myOrm: MyOrm = new MyOrm();

    constructor (private readonly db: string) {}

    findOne (filter: string) {
        this.myOrm.getOne(this.db, filter);
    }
}

class Repository {
    constructor (private readonly repository: IRepository) {
    }

    findOne (filter: string) {
        return this.repository.findOne(filter);
    }
}

const sequelizeRepo: Repository = new Repository(new Sequelize('localhost:3000/db'));
const myOrmRepo: Repository = new Repository(new MyOrmAdapter('localhost:3000/db'));

sequelizeRepo.findOne('SEQ.Filter')
myOrmRepo.findOne('MO.Filter')
