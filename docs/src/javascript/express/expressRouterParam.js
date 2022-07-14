app.param('spellId', (req, res, next, id) => {
    let spellId = Number(id);
      try {
        const found = SpellBook.find((spell) => {
          return spellId === spell.id;
        })
        if (found) {
          req.spell = found;
          next();
        } else {
          next(new Error('Your magic spell was not found in any of our tomes'));
        };
      } catch (err) {
        next(err)
      }
  });
  