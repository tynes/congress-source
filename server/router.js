const memberCtrl = require('./controllers/memberController.js');

module.exports = app => {
  app.get('/allMembers', (req, res) => {
    memberCtrl.getMembers()
      .then(members => res.send(members))
      .catch(err => console.log(err));
  });
  app.get('/members', (req, res) => {
    const begin = req.query.begin;
    const end = req.query.end;
    memberCtrl.getMembersBetween(begin, end)
      .then(members => res.send(members))
      .catch(err => console.log('error in route', err));
  });
  app.get('/party', (req, res) => {
    const party = req.query.party;
    const begin = req.query.begin;
    const end = req.query.end;
    memberCtrl.getMembersInParty(party)
      .then(members => {
        const sliced = members.slice(begin, end);
        res.send(sliced);
      })
      .catch(err => console.log('error in /party', err));
  });
  app.get('/search', (req, res) => {
    const query = req.query.name;
    let membersByLast;
    let membersByFirst;
    memberCtrl.searchByLastName(query)
      .then(members => {
        membersByLast = members;
      })
      .catch(err => console.log('error in membersByLast', err));
    memberCtrl.searchByFirstName(query)
      .then(members => {
        membersByFirst = members;
      })
      .catch(err => console.log('error in membersByFirst', err));
    return membersByLast.concat(membersByFirst);
  });
};
