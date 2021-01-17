const tree = {
  name: 'John',
  children: [
    {
      name: 'Jim',
      children: []
    },
    {
      name: 'Zoe',
      children: [
        {name: 'Kyle', children: []},
        {name: 'Sophia', children: [
          {name: 'Alex', children: []}
        ]},
      ]
    }
  ]
}

const getChildrenName = t => {
  if (t.children.length === 0) return

  t.children.forEach(child => {
    console.log(child.name)
    getChildrenName(child)
  });
}

getChildrenName(tree)