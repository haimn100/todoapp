const db = require('../../dbconfig');

class Todo {

    static TABLE = "todos";

    constructor({id,task,completed,created_at}){

        this.id = id;
        this.task = task;
        this.completed = completed;
        this.created_at = created_at;
    }

    static async find () {
        const data = await db(this.TABLE).select();
        return data.length > 0 ? data.map(item=> new Todo(item)): [];
    }

    static async findOne (id) {
        const [todo] = await db(this.TABLE).where('id',id).select();
        return todo ? new Todo(todo): null;
    }

    static async add(task,completed = false){
        const [todo] = await db(this.TABLE).insert({task, completed},'*');
        return todo ? new Todo(todo): null;
    }

    async save ()  {
        return await db(Todo.TABLE).where('id', this.id).update({task:this.task, completed: this.completed});
    }

    async delete() {
        return await db(Todo.TABLE).where('id', this.id).del();
    }
}

module.exports = Todo;