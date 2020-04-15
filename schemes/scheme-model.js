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
    add,
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
   return db('steps as st') 
   .join('schemes as sc', 'sc.id', 'st.scheme_id')
   .select('st.id', 'st.instructions', 'sc.scheme_name as scheme')
   .where('st.scheme_id', id);
   
}

function add(scheme){
    return db('schemes')
    .insert(scheme)
    .then(ids => {
        return findById(ids[0]);
    });
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