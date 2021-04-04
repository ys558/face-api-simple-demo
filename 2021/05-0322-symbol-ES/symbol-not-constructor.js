let emperor = {
  prince: ['prince1', 'prince2', 'prince3'],
  princess: ['princess1', 'princess2',],
}

// ! error
// ! TypeError: Symbol is not a constructor:
// ! Symbol函数前不能使用new命令，否则会报错。这是因为生成的 Symbol 是一个原始类型的值，不是对象。
// // const prince1 =  new Symbol('如花')
// // emperor[prince1] = '如花'
