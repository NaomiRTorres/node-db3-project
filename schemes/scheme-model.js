/*List of what is needed
find()
findById()
findSteps(id)
update(changes, id)
remove(id)
*/

const db = require('../data/db-config.js');

module.exports = {
    find,
    findById,
    findSteps,
    update,
    remove
}

function find() {
    return db('schemes');
}

function findById(id) {
    return db('schemes')
    .where({ id })
    .first();
}

function findSteps(id){
   return db('steps') 
   .join('schemes', 'schemes.id', 'steps.scheme_id')
   .select('steps.id', 'steps.step_number', 'scheme.scheme_name')
   
}

function update(changes, id){
    return db('schemes')
    .where({ id })
    .update(changes)
    .then(() => {
        return findById(id)
    });
}

function remove(id) {
    return db('schemes')
    .where({ id })
    .del();

}